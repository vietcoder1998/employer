import { ISchoolBranches } from '../../models/school-branches';
import { REDUX } from '../../const/actions';

export const getSchoolBranches = (data?: ISchoolBranches) => ({
    type: REDUX.CONNECT_SCHOOL.GET_SCHOOL_BRANCHES, 
    data
});
