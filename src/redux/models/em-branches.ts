export interface IEmBranch {
    id?: string,
    branchName?: string,
    contactEmail?: string,
    contactPhone?: string,
    region?: {
        id?: number,
        name?: string
    },
    address?: string,
    lat?: number,
    lon?: number,
    headquarters?: false,
    createdDate?: number,
    totalJob?: number
}

export interface IEmBranches {
    pageIndex?: number,
    pageSize?: number,
    totalItems?: number,
    items?: Array<IEmBranch>
}