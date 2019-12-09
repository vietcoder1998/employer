import { REDUX } from '../../common/const/actions';
import { INotis } from '../models/notis';

export const geListtNotis = (data?: INotis) => ({
    type: REDUX.LIST_RATE.GET_LIST_RATE, 
    data
});