import { authHeaders, noInfoHeader } from './../../services/auth';
import { IAnnouTypes } from '../models/annou-types';
import { GET } from '../../common/const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { ANNOU_TYPES } from '../../services/api/private.api';
import { EMPLOYER_HOST, PUBLIC_HOST } from '../../environment/dev';

function* getListAnnouTypesData(action: any) {
    let res = yield call(callAnnouTypes, action);
    let data: IAnnouTypes = {
        items: [],
        pageSize: 0,
        pageIndex: 0,
        totalItems: 0
    };

    if (res) {
        data = res.data
    }

    yield put({
        type: REDUX.ANNOU_TYPES.GET_ANNOU_TYPES,
        data
    });
}

function callAnnouTypes(action: any) {
   

    try {
        let token = localStorage.getItem("token");
        let res = _requestToServer(
            GET, 
            ANNOU_TYPES,
            null,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 0,
            },
            token ? authHeaders : noInfoHeader,
            token ? EMPLOYER_HOST : PUBLIC_HOST,
            false,
            false
        )
        return res
    } catch (error) {
        throw error;
    }
}

export function* AnnouTypesWatcher() {
    yield takeEvery(
        REDUX_SAGA.ANNOU_TYPES.GET_ANNOU_TYPES,
        getListAnnouTypesData
    )
}