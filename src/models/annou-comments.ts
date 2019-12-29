export interface IAnnouComment {
    id?: number,
    userID?: string,
    userType?: string,
    name?: string,
    avatarUrl?: string,
    comment?: string,
    rating?: number,
    createdDate?: number,
    lastModified?: number
}

export interface IAnnouCommentsBody {
    rating?: string,
    userID?: string,
    userType?: string,
    createdDate?: string,
    lastModified?: string
}

export interface IAnnouComments {
    items?: Array<IAnnouComments>;
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
}