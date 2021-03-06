export interface IFindCandidateFilter {
    gender?: string;
    birthYearStart?: number;
    birthYearEnd?: number;
    regionID?: number | null;
    lookingForJob?: boolean;
    profileVerified?: boolean;
    completeProfile?: boolean;
    jobNameIDs?: Array<number>;
    skillIDs?: Array<number>;
    languageIDs?: Array<number>;
    unlocked?: boolean;
    ids?: Array<string>;
}

export interface IFindCandidate {
    id?: string,
    firstName?: string,
    lastName?: string,
    birthday?: number,
    avatarUrl?: string,
    email?: string,
    phone?: string,
    gender?: 'MALE' | 'FEMALE',
    region?: {
        id?: number,
        name?: string
    },
    address?: string,
    lat?: number,
    lon?: number,
    profileVerified?: boolean,
    lookingForJob?: boolean,
    completePercent?: number,
    unlocked?: boolean,
    saved?: boolean,
    rating?: {
        attitudeRating?: number,
        skillRating?: number,
        jobAccomplishmentRating?: number,
        ratingCount?: number,
    },
    coverUrl?: string;
}

export interface IFindCandidates {
    items?: Array<IFindCandidate>,
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
}