import { IWorkingTools } from './../../models/working-tools';
import { REDUX } from '../../const/actions';

export const getWorkingTools = (data?: IWorkingTools) => ({
    type: REDUX.WORKINGTOOLS.GET_WORKINGTOOLS, 
    data
});
