export interface ToolListItemData {
  new: boolean,
  type: string,
  id: string
  form: Array<FormData>
}

export type ToolCategoryData = Array<string>

export type FormatOption = 'withArcTap' | 'positive' | 'nonNegative' | 'int' | 'float'

export interface FormData {
  type: 'aff' | 'arc' | 'number' | 'bezier' | 'easing',
  id: string,
  format?: Array<FormatOption>,
  required: boolean
}