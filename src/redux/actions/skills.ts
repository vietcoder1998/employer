import { ISkills } from './../models/skills';
import { REDUX } from '../../const/actions';

export const getRegions = (data?: ISkills) => ({
    type: REDUX.SKILLS.GET_SKILLS, 
    data
});
