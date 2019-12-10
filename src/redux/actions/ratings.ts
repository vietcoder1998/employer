import { IRatings } from '../models/ratings';
import { REDUX } from '../../common/const/actions';

export const getListRating = (data?: IRatings) => ({
    type: REDUX.LIST_RATE.GET_LIST_RATE, 
    data
});