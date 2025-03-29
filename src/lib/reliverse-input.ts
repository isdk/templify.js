import {
  inputPrompt,
  selectPrompt,
  multiselectPrompt,
  numberPrompt,
  confirmPrompt,
  msg,
  startPrompt,
  endPrompt,
} from "@reliverse/prompts";
import type { PromptOptions } from "@reliverse/prompts";
import { InputEnumOptionItem } from "./input-type.js";
import packageJson from "../../package.json" with { type: "json" };
import path from "path";
import { existsSync } from "fs";
import { loadConfigFile, saveConfigFile } from "./template-config.js";

const pkg = packageJson;


type PreventWrongTerminalSizeOptions = {
  isDev?: boolean;
  shouldExit?: boolean;
  minWidth?: number;
  minHeight?: number;
  sizeErrorDescription?: string;
};

type StartPromptOptions = PromptOptions & {
  clearConsole?: boolean;
  horizontalLine?: boolean;
  horizontalLineLength?: number;
  packageName?: string;
  packageVersion?: string;
  terminalSizeOptions?: PreventWrongTerminalSizeOptions;
  isDev?: boolean;
  prevent?: {
    unsupportedTTY?: boolean;
    wrongTerminalSize?: boolean;
    windowsHomeDirRoot?: boolean;
  };
};

type ListType = Array<string | number | InputEnumOptionItem>;

interface InputSchema {
  name: string;
  type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';
  enum?: ListType;
  minPick?: number;
  maxPick?: number;
  uniqueItems?: boolean;
  separator?: string;
  items?: InputSchema;
  properties?: Record<string, InputSchema>;
  title: string;
  description?: string;
  default?: any;
};

interface ProcessSchemaOptions {
  displayInstructions?: boolean;
  title?: string;
  description?: string;
  nonInteractive?: boolean;
  rootDir: string;
  dataPath?: string;
  defaultDataFileName?: string;
  data?: any;
}

export const basicStartPromptConfig = {
  titleColor: "cyan",
  borderColor: "dim",
  packageName: pkg.name,
  packageVersion: pkg.version,
} satisfies StartPromptOptions;

export const extendedStartPromptConfig = {
  ...basicStartPromptConfig,
  contentTypography: "italic",
  contentColor: "dim",
} satisfies StartPromptOptions;

export async function getInputDataBySchema(schema: InputSchema, options: ProcessSchemaOptions) {
  let data: any
  const nonInteractive = options.nonInteractive;
  if (nonInteractive) {
    let dataPath = options.dataPath;
    if (!dataPath) {
      dataPath = options.defaultDataFileName ?? 'templify-data';
    }
    const rootDir = options.rootDir;
    if (!path.isAbsolute(dataPath)) {dataPath = path.join(rootDir, dataPath)}

    if (existsSync(dataPath)) {
      data = loadConfigFile(dataPath);
    } else {
      const _data = generateDefaultDataFromSchema(schema);
      saveConfigFile(dataPath, _data);
    }

  } else {
    data = await getDataFromInput(schema, options);
  }

  if (options.data) {
    data = {...data, ...options.data};
  }

  return data
}


// walk through the schema and generate default data for non-interactive mode
function generateDefaultDataFromSchema(schema: InputSchema, result: any = {}) {
  switch (schema.type) {
    case 'string': {
      result[schema.name] = schema.default || '';
    } break;
    case 'integer':
    case 'number': {
      result[schema.name] = schema.default || 0;
    } break;
    case 'boolean': {
      result[schema.name] = schema.default || true;
    } break;
    case 'array': {
      result[schema.name] = schema.default || [];
      if (result[schema.name].length === 0) {
        const itemSchema = schema.items! || {};
        if (!itemSchema.type) {itemSchema.type = 'string'}
        result.push(generateDefaultDataFromSchema(itemSchema));
      }
    } break;
    case 'object': {
      const o = result[schema.name] = {};
      for (const [name, propSchema] of Object.entries(schema.properties || {})) {
        generateDefaultDataFromSchema({...propSchema, name}, o);
      }
    }
  }
  return result;
}

async function getDataFromInput(schema: InputSchema, options?: Partial<ProcessSchemaOptions>): Promise<any> {
  if (schema.enum) {
    const isSingleSelect = (schema.minPick == null && schema.maxPick == null) || (schema.minPick === 1 && schema.maxPick === 1);
    const config: any = {
      ...options,
      title: schema.title || options?.title || schema.name,
      content: schema.description || options?.description,
      options: schema.enum.map(valueInfo => {
        if (typeof valueInfo !== 'object') {
          valueInfo = {
            value: valueInfo,
            title: String(valueInfo),
          }
        }
        if (!valueInfo.description) {valueInfo.description = valueInfo.value === schema.default ? 'Default' : undefined}
        return ({
        label: valueInfo.title || String(valueInfo.value),
        value: valueInfo.value,
        hint: valueInfo.description,
        })
      }),
    }

    if (isSingleSelect) {
      config.defaultValue = schema.default;
      const selected = await selectPrompt(config);
      return selected;
    }

    const defaultValue = Array.isArray(schema.default) ? schema.default : schema.default != null ? [schema.default] : undefined;
    const selected = await multiselectPrompt({
      ...config,
      defaultValue,
      minSelect: schema.minPick,
      maxSelect: schema.maxPick,
    });
    return schema.uniqueItems === false ? selected : [...new Set(selected)];
  }

  const handleArray = async (schema: InputSchema) => {
    const result: any[] = [];
    const maxPick = schema.maxPick || NaN;
    let i = 0;
    while (i++ < maxPick) {
      const value = await getDataFromInput({
        ...schema.items || { type: 'string' },
        title: `Add ${schema.items?.type}[${i}] to array (empty to finish)`
      } as any, options);
      if (value === undefined || value === "") break;
      result.push(value);
    }
    return result;
  };

  const handleObject = async (schema: InputSchema) => {
    const obj: Record<string, any> = {};
    const config = {
      ...extendedStartPromptConfig,
      ...options,
      title: schema.title || schema.name,
    }
    await startPrompt(config);
    for (const [propName, propSchema] of Object.entries(schema.properties || {})) {
      obj[propName] = await getDataFromInput({...propSchema, name: propName}, options);
    }
    await endPrompt(config);
    return obj;
  };

  try {
    switch (schema.type) {
      case 'string':
        return await inputPrompt({
          ...options,
          title: schema.title || schema.name,
          defaultValue: schema.default,
          hint: schema.description
        });

      case 'number':
      case 'integer':
        return (await numberPrompt({
          ...options,
          title: schema.title || schema.name,
          defaultValue: schema.default,
          validate: (value) => {
            const num = Number(value);
            if (isNaN(num)) return 'Invalid number';
            if (schema.type === 'integer' && !Number.isInteger(num)) {
              return 'Must be an integer';
            }
            if (schema.enum && !schema.enum.includes(num)) {
              return `Must be one of: ${schema.enum.join(', ')}`;
            }
            return true;
          }
        }));

      case 'boolean':
        return await confirmPrompt({
          ...options,
          title: schema.title || schema.name,
          defaultValue: schema.default
        });

      case 'array':
        return handleArray(schema);

      case 'object':
        return handleObject(schema);

      default:
        throw new Error(`Unsupported type: ${schema.type}`);
    }
  } catch (error) {
    msg({
      ...options,
      type: 'M_ERROR',
      title: `Error processing ${schema.name}`,
      content: String(error)
    });
    return schema.default;
  }
}

/*
// 示例使用
const userSchema: InputSchema = {
  name: 'user',
  type: 'object',
  title: 'User Registration',
  properties: {
    personalInfo: {
      name: 'personalInfo',
      type: 'object',
      title: 'Personal Information',
      properties: {
        name: {
          name: 'name',
          type: 'string',
          title: 'Full Name',
          description: 'Your full name',
          default: 'John Doe'
        },
        birthdate: {
          name: 'birthdate',
          type: 'string',
          title: 'Birth Date',
          default: '1990-01-01'
        },
        languages: {
          name: 'languages',
          type: 'array',
          title: 'Programming Languages',
          enum: ['JavaScript', 'TypeScript', 'Python'],
          minPick: 1,
          maxPick: 3
        }
      }
    },
    preferences: {
      name: 'preferences',
      type: 'object',
      title: 'User Preferences',
      properties: {
        darkMode: {
          name: 'darkMode',
          type: 'boolean',
          title: 'Enable Dark Mode',
          default: true
        },
        experienceLevel: {
          name: 'experienceLevel',
          type: 'integer',
          title: 'Experience Level',
          enum: [1, 2, 3],
          default: 2
        }
      }
    }
  }
};

// await startPrompt({...extendedConfig})

// 执行数据收集
getDataFromInput(userSchema, {displayInstructions: true}).then(result => {
  console.log('Final Result:', JSON.stringify(result, null, 2));
});
//*/