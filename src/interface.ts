export interface ToolListItemData {
  new: boolean,
  type: string,
  id: string,
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

export interface ArcToolModule {
  id: string,
  type: string,
  form: Array<FormData>
  implement?: (input: Object) => ArcToolResult
}

export interface ArcToolResult {
  code: number,
  result: string
}

export interface HistoryItemData {
  value: string,
  tool: string,
  time: number
}