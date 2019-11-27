import { ISkills } from './../models/skills';
import { REDUX } from '../../common/const/actions';

export const getRegions = (data: ISkills) => ({
    type: REDUX.SKILLS.GET_SKILLS, 
    data
});
