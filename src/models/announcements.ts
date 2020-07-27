export interface IAnnouncement {
    id?: string,
    imageUrl?: string;
    description?: string;
    announcementType?: {
        id?: number;
        name?: string;
        priority?: number
    };
    title?: string;
    viewNumber?: number;
    hidden?: boolean;
    createdDate?: number;
    lastModified?: number;
    admin?: {
        id?: string;
        firstName?: string;
        lastName?: string;
        avatarUrl?: string;
    }
    modifyAdmin?: {
        id?: string;
        firstName?: string;
        lastfName?: string;
        avartarUrl?: string;
    }
}

export interface IShift {
    id?: string,
    startTime?: string,
    endTime?: string,
    minSalary?: number,
    maxSalary?: number,
    unit?: string | 'ca' | 'giờ' | 'ngày' | 'tháng' | 'sản phẩm',
    mon?: boolean,
    tue?: boolean,
    wed?: boolean,
    thu?: boolean,
    fri?: boolean,
    sat?: boolean,
    sun?: boolean,
    genderRequireds?: Array<{
        id?: string
        gender?: 'MALE' | 'FEMALE' | 'BOTH',
        quantity?: number,
        applied?: number,
    }>,
    showErorrSelectTime?:boolean,
    showErrorGenderRequireds?: boolean

}

export interface IAnnoucementBody {
    id?: string,
    jobTitle?: string,
    jobNameID?: number,
    employerBranchID?: string,
    description?: string,
    requiredSkillIDs?: Array<any>,
    jobType?: string,
    expirationDate?: number,
    shifts?: Array<IShift>,
    requiredLanguageIDs?: Array<any>,
    requiredWorkingToolIDs?: Array<any>
    
}

export interface IAnnouncements {
    items?: Array<IAnnouncement>;
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
}

export interface ICreateNewAnnoucement {
    announcementTypeID?: number,
    imageUrl?: string,
    title?: string,
    content?: string,
    hidden?: boolean,
}