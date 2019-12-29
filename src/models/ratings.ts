export interface IRating {
    userID?: string,
    userType?: string,
    name?: string,
    avatarUrl?: string,
    createdDate?: number,
    workingEnvironmentRating?: number,
    lastModified?: number,
    salaryRating?: number,
    comment?: string
}

export interface IRatings {
    pageIndex?: number,
    pageSize?: number,
    totalItems?: number,
    items?: Array<IRating>
}