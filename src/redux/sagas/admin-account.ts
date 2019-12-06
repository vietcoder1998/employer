import { ADMIN_ACCOUNT } from './../../services/api/private.api';
import { IAdminAccount } from './../models/admin-account';
import { GET } from '../../common/const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListAdminAccountData(action: any) {
    let res = yield call(callAdminAccount, action);
    let data: IAdminAccount = {
    
    };

    if (res.code === 200) {
        data = res.data;
    }
    
    yield put({
        type: REDUX.ADMIN_ACCOUNT.GET_ADMIN_ACCOUNT,
        data
    });
}

function callAdminAccount(action: any) {
    return _requestToServer(
        GET,
        ADMIN_ACCOUNT + `/profile`,
        action.body ? action.body : null,
        undefined,
        undefined,
        EMPLOYER_HOST,
        false,
        false,
    )
}

export function* AdminAccountWatcher() {
    yield takeEvery(
        REDUX_SAGA.ADMIN_ACCOUNT.GET_ADMIN_ACCOUNT,
        getListAdminAccountData
    )
}