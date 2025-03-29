export const InputTypes = ['string', 'number', 'boolean', 'array', 'object'] as const;
export type InputType = typeof InputTypes[number];

export interface BaseInputTypeItem {
  name?: string
  type?: InputType | string
  title?: string
  description?: string
  default?: any
}

export interface InputEnumOptionItem {
  value: string | number
  title?: string
  description?: string
}

export interface SelectInputTypeItem extends BaseInputTypeItem {
  enum?: (string | number | InputEnumOptionItem)[]
  minPick?: number
  maxPick?: number
  uniqueItems?: boolean
}

export interface StringInputTypeItem extends SelectInputTypeItem {
  type: 'string'
  pattern?: string|RegExp
  minLength?: number
  maxLength?: number
}

export interface NumberInputTypeItem extends SelectInputTypeItem {
  type: 'number'
  minimum?: number
  maximum?: number
}

export interface ArrayInputTypeItem extends SelectInputTypeItem {
  type: 'array'
  items?: InputSchema
}

export interface ObjectInputTypeItem extends BaseInputTypeItem {
  type: 'object'
  properties?: {
    [key: string]: InputSchema
  }
}

export type InputSchema = BaseInputTypeItem | StringInputTypeItem | NumberInputTypeItem | ArrayInputTypeItem | ObjectInputTypeItem;
