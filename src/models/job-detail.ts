import { IShiftDetail } from './job-annoucement-detail';
export default interface IJobDetail {
    isLoading?: boolean;
    jobTitle?: string;
    jobName?: string;
    employerName?: string;
    jobType?: string;
    createdDate?: number;
    expriratedDate?: number;
    description?: string;
    shifts?: Array<IShiftDetail>;
    employerUrl?: string;
    employerBranch?: string;
    repliedDate?: number;
    requiredSkills?: Array<any>;
    type?: string
}