export interface ISchoolBranch {
    id: number;
    name: string;
    imageUrl?: string;
}

export interface ISchoolBranches {
    items: Array<ISchoolBranch>;
    pageIndex: number;
    pageSize: number;
    totalItems: number;
}