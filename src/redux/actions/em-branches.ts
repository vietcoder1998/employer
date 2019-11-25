import { IEmBranches } from './../models/em-branches';
import { REDUX } from './../../common/const/actions';

export const getEmployerBranches = (data: IEmBranches) => ({
    type: REDUX.EM_BRANCHES.GET_EM_BRANCHES, 
    data
});