import { IShiftDetail } from "./job-annoucement-detail";

export interface IApplyJobFilter {
    state?: 'PENDING' | 'REJECTED' | 'ACCEPTED'
};

export interface IApplyJob {
    student?: {
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
        profileVerified?: false,
        lookingForJob?: false,
        completePercent?: number,
        unlocked?: false,
        saved?: false, rating?: {
            attitudeRating?: number,
            skillRating?: number,
            jobAccomplishmentRating?: number,
            ratingCount?: number
        }
    },

    appliedDate?: 0,
    repliedDate?: 0,
    state?: 'PENDING' | 'ACCEPTED' | 'REJECTED',
    message?: string,
    appliedShifts?: Array<IShiftDetail>
}

export interface IApplyJobs {
    items?: Array<IApplyJob>,
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
}

export class ApplyJobsDto {
    private _ApplyJob: IApplyJob;
    constructor() {
        this._ApplyJob = {
            student: {
                id: null,
                firstName: null,
                lastName: null,
                birthday: null,
                avatarUrl: null,
                email: null,
                phone: null,
                gender: null,
                region: {
                    id: null,
                    name: null
                },
                address: null,
                lat: null,
                lon: null,
                profileVerified: false,
                lookingForJob: false,
                completePercent: null,
                unlocked: false,
                saved: false,
                rating: {
                    attitudeRating: null,
                    skillRating: null,
                    jobAccomplishmentRating: null,
                    ratingCount: null
                }
            }

        }
    }

    getApplyJobDto(): IApplyJob {
        return this._ApplyJob;
    }

    setApplyJobDto(value: any): IApplyJob {
        return this._ApplyJob = value;
    }
}