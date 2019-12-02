import { POST } from './../../common/const/method';
import { IConnectSchools } from './../models/connect-schools';
import { GET } from '../../common/const/method';
import { CONNECT_SCHOOL } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListConnectSchoolsData(action: any) {
    let res = yield call(callConnectSchools, action);
    let data: IConnectSchools = {
    }

    if (res.code === 200) {
        data = res.data;
        yield put({
            type: REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL,
            data
        });
    }
}

function callConnectSchools(action: any) {
    return _requestToServer(
        POST,
        CONNECT_SCHOOL + `/request/query`,
        action.body ? action.body : null,
        undefined,
        undefined,
        EMPLOYER_HOST,
        false,
        false,
    )
}

export function* ConnectSchoolsWatcher() {
    yield takeEvery(
        REDUX_SAGA.CONNECT_SCHOOL.GET_CONNECT_SCHOOL,
        getListConnectSchoolsData
    )
}