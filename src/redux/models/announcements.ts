export interface IAnnouncement {
    id?: string;
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

export interface shifts {
    id?: string,
    startTime?: string,
    endTime?: string,
    minSalary?: number,
    maxSalary?: number,
    unit?: 'ca' | 'giờ' | 'ngày' | 'tháng' | 'sản phẩm',
    mon?: false,
    tue?: false,
    wed?: false,
    thu?: false,
    fri?: false,
    sat?: false,
    sun?: false,
    genderRequireds?: Array<{
        id?: string,
        gender?: 'MALE' | 'FEMALE' | 'BOTH',
        quantity?: number
    }>
}

export interface IAnnoucementBody {
    jobTitle?: string,
    jobNameID?: number,
    employerBranchID?: string,
    description?: string,
    requiredSkillIDs?: Array<number>,
    jobType?: 'FULLTIME' | 'PARTTIME' | 'INTERNSHIP',
    expirationDate?: number,
    shifts?: Array<shifts>
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