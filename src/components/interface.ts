export interface ToolListItemData {
  name: string,
  new: boolean,
  type: string,
  id: string
  form: {
    main: Array<FormData>,
    opt: Array<FormData>
  }
}

export interface ToolCategoryData {
  id: string,
  name: string
}

export interface FormData {
  id: string,
  input: string,
  format?: string
}