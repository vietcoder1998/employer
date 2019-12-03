export interface IApplyJobFilter {
   state?: 'PENDING' | 'REJECTED' | 'ACCEPTED'
};

export interface IApplyJob {
    id?: string,
    firstName?: string,
    lastName?: string,
    birthday?: number,
    avatarUrl?: string,
    email?: string,
    phone?: string,
    message?: string,
    gender?: 'MALE' | 'FEMALE',
    region?: {
        id?: number,
        name?: string
    },
    address?: string,
    lat?: number,
    lon?: number,
    profileVerified?: false,
    lookingForJob?: false,
    completePercent?: number,
    unlocked?: false,
    saved?: false,
    rating?: {
        attitudeRating?: number,
        skillRating?: number,
        jobAccomplishmentRating?: number,
        ratingCount?: number
    }
}

export interface IApplyJobs {
    items?: Array<IApplyJob>,
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
}