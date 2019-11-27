export interface IAnnouncement {
    imageUrl?: string;
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

export interface IShifts {
    id?: string|number,
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
        gender?: 'MALE' | 'FEMALE' | 'BOTH',
        quantity?: number,
    }>
}

export interface IAnnoucementBody {
    jobTitle?: string,
    jobNameID?: number,
    employerBranchID?: string,
    description?: string,
    requiredSkillIDs?: Array<any>,
    jobType?: string,
    expirationDate?: number,
    shifts?: Array<IShifts>
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