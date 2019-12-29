export interface INoti {
  id?: string,
  type?: string,
  title?: string,
  body?: string,
  data?: any,
  seen?: boolean,
  createdDate?: number
}

export interface INotis {
  pageIndex?: number,
  pageSize?: number,
  totalItems?: number,
  items?: Array<INoti>
}