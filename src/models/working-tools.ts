export interface IWorkingTool {
    id: number;
    name: string;
}

export interface IWorkingTools {
    items: Array<IWorkingTool>;
    pageIndex: number;
    pageSize: number;
    totalItems: number;
}