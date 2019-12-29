export interface ISavedCandidateProfileFilter {
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

export interface ISavedCandidateProfile {
    id?: string;
    candidate?: {
        id?: string;
        firstName?: string;
        lastName?: string;
        birthday?: number;
        avatarUrl?: string;
        email?: string;
        phone?: string;
        gender?: 'MALE' | 'FEMALE';
        region?: {
            id?: number;
            name?: string
        };
        address?: string;
        lat?: number;
        lon?: number;
        profileVerified?: false;
        lookingForJob?: false;
        completePercent?: number;
        unlocked?: false;
        saved?: false;
        rating?: {
            attitudeRating?: number;
            skillRating?: number;
            jobAccomplishmentRating?: number;
            ratingCount?: number
        }
    };
    createdDate?: number;
}

export interface ISavedCandidateProfiles {
    items?: Array<ISavedCandidateProfile>;
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
}