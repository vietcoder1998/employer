import { IRatings } from './../../models/ratings';
import { REDUX } from '../../const/actions';

export const getListRating = (data?: IRatings) => ({
    type: REDUX.RATING_USER.GET_RATING_USER, 
    data
});