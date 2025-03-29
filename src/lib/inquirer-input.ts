import { confirm, input, select, checkbox, number } from '@inquirer/prompts';

interface Schema {
  name?: string;
  type?: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';
  enum?: any[];
  minPick?: number;
  maxPick?: number;
  uniqueItems?: boolean;
  title?: string;
  description?: string;
  default?: any;
  separator?: string;
  items?: Schema;
  properties?: { [key: string]: Schema };
  [k: string]: any;
}

async function promptForSchema(schema: Schema): Promise<any> {
  if (schema.enum) {
    return handleEnumPrompt(schema);
  }

  switch (schema.type) {
    case 'boolean':
      return handleBooleanPrompt(schema);
    case 'string':
      return handleStringPrompt(schema);
    case 'number':
    case 'integer':
      return handleNumberPrompt(schema);
    case 'array':
      return handleArrayPrompt(schema);
    case 'object':
      return handleObjectPrompt(schema);
    default:
      throw new Error(`Unsupported type: ${schema.type}`);
  }
}

async function handleEnumPrompt(schema: Schema) {
  const isMultiSelect = !(
    (!schema.minPick && !schema.maxPick) ||
    (schema.minPick === 1 && schema.maxPick === 1)
  );

  if (isMultiSelect) {
    return checkbox({
      message: schema.description || schema.title || schema.name || 'Select',
      choices: schema.enum!.map(value => ({ value, name: String(value) })),
      validate: (selected) => {
        if (schema.minPick && selected.length < schema.minPick) {
          return `Select at least ${schema.minPick} items`;
        }
        if (schema.maxPick && selected.length > schema.maxPick) {
          return `Select at most ${schema.maxPick} items`;
        }
        if (schema.uniqueItems !== false) {
          return selected.length === new Set(selected).size || 'Duplicate items detected';
        }
        return true;
      }
    });
  }

  return select({
    message: schema.description || schema.title || schema.name || 'Select',
    choices: schema.enum!.map(value => ({ value, name: String(value) })),
    default: schema.default,
  });
}

async function handleBooleanPrompt(schema: Schema) {
  return confirm({
    message: schema.description || schema.title || schema.name || 'Confirm',
    default: schema.default,
  });
}

async function handleStringPrompt(schema: Schema) {
  if (schema.minPick || schema.maxPick) {
    const separator = schema.separator || ',';
    const inputStr = await input({
      message: schema.description || schema.title || schema.name || 'Enter',
      default: Array.isArray(schema.default)
        ? schema.default.join(separator)
        : schema.default,
      validate: (value) => {
        const items = value.split(separator).filter(Boolean);
        return validateArrayItems(items, schema);
      }
    });

    return processStringArray(inputStr, schema);
  }

  return input({
    message: schema.description || schema.title || schema.name || 'Enter',
    default: schema.default,
  });
}

async function handleNumberPrompt(schema: Schema) {
  return number({
    message: schema.description || schema.title || schema.name || 'Enter',
    default: schema.default,
    validate: (value) => {
      if (schema.type === 'integer' && !Number.isInteger(value)) {
        return 'Please enter an integer';
      }
      return true;
    },
  });
}

async function handleArrayPrompt(schema: Schema) {
  const separator = schema.separator || ',';
  const inputStr = await input({
    message: schema.description || schema.title || schema.name || 'Enter',
    default: Array.isArray(schema.default)
      ? schema.default.join(separator)
      : schema.default,
    validate: (value) => {
      const items = value.split(separator).filter(Boolean);
      return validateArrayItems(items, schema);
    }
  });

  return processArrayItems(inputStr.split(separator).filter(Boolean), schema);
}

async function handleObjectPrompt(schema: Schema) {
  const result: Record<string, any> = {};
  for (const [propName, propSchema] of Object.entries(schema.properties || {})) {
    result[propName] = await promptForSchema(propSchema);
  }
  return result;
}

function validateArrayItems(items: string[], schema: Schema) {
  if (schema.minPick && items.length < schema.minPick) {
    return `At least ${schema.minPick} items required`;
  }
  if (schema.maxPick && items.length > schema.maxPick) {
    return `At most ${schema.maxPick} items allowed`;
  }
  if (schema.uniqueItems !== false && new Set(items).size !== items.length) {
    return 'Duplicate items are not allowed';
  }
  return true;
}

function processStringArray(inputStr: string, schema: Schema) {
  const separator = schema.separator || ',';
  const items = inputStr.split(separator).filter(Boolean);
  return schema.uniqueItems !== false ? [...new Set(items)] : items;
}

function processArrayItems(items: string[], schema: Schema) {
  const itemSchema = schema.items || { type: 'string' };
  const processed = items.map(item => {
    switch (itemSchema.type) {
      case 'number': return parseFloat(item);
      case 'integer': return parseInt(item, 10);
      case 'boolean': return item.toLowerCase() === 'true';
      default: return item;
    }
  });
  return schema.uniqueItems !== false ? [...new Set(processed)] : processed;
}

// 使用示例
const sampleSchema: Schema = {
  name: 'user',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'User Name',
      description: 'Enter your full name'
    },
    age: {
      type: 'integer',
      title: 'Age',
      minimum: 0
    },
    hobbies: {
      type: 'array',
      title: 'Hobbies',
      items: { type: 'string' },
      separator: ';',
      minPick: 2
    }
  }
};

promptForSchema(sampleSchema).then(result => {
  console.log('Final result:', JSON.stringify(result, null, 2));
});
