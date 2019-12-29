import { IAdminAccount } from '././../../models/admin-account';
import { REDUX } from '../../const/actions';

let initState: IAdminAccount = {
   
};

export const AdminAccount = (state: IAdminAccount = initState, action: any): IAdminAccount => {
    switch (action.type) {
        case REDUX.ADMIN_ACCOUNT.GET_ADMIN_ACCOUNT:
            return {
                ...action.data
            };

        default:
            return state;
    };
};