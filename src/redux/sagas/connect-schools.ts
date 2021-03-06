import { POST } from './../../const/method';
import { IConnectSchools } from '././../../models/connect-schools';
import { CONNECT_SCHOOL } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'

function* getListConnectSchoolsData(action: any) {
    let res = yield call(callConnectSchools, action);
    let data: IConnectSchools = {
    }

    if (res.code === 200) {
        data = res.data;
    }

    yield put({
        type: REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL,
        data
    });
}

function callConnectSchools(action: any) {
    try {
        let res = _requestToServer(
            POST,
            CONNECT_SCHOOL + `/query`,
            action.body,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 6

            },
            undefined,
            undefined,
            false,
            false,
        )
        return res;
    } catch (err) {
        throw err;
    }
}

export function* ConnectSchoolsWatcher() {
    yield takeEvery(
        REDUX_SAGA.CONNECT_SCHOOL.GET_CONNECT_SCHOOL,
        getListConnectSchoolsData
    )
}