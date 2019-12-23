import {IAdminAccount} from '../models/admin-account';
import {REDUX} from '../../const/actions';

export const getAdminAccount = (data?: IAdminAccount) => ({
    type: REDUX.ADMIN_ACCOUNT.GET_ADMIN_ACCOUNT,
    data
});