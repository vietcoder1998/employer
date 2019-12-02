import { IConnectSchoolDetail } from '../models/connect-school-detail';
import { GET } from '../../common/const/method';
import { CONNECT_SCHOOL } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListConnectSchoolDetailData(action: any) {
    let res = yield call(callConnectSchoolDetail, action);
    let data: IConnectSchoolDetail = {

    }

    if (res.code === 200) {
        data = res.data;
        yield put({
            type: REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL_DETAIL,
            data
        });
    }
}

function callConnectSchoolDetail(action: any) {
    return _requestToServer(
        GET,
        CONNECT_SCHOOL + `/${action.id}/request`,
        action.body ? action.body : null,
        undefined,
        undefined,
        EMPLOYER_HOST,
        false,
        false,
    )
}

export function* ConnectSchoolDetailWatcher() {
    yield takeEvery(
        REDUX_SAGA.CONNECT_SCHOOL.GET_CONNECT_SCHOOL_DETAIL,
        getListConnectSchoolDetailData
    )
}