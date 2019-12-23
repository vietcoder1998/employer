import { IConnectSchoolDetail } from '../models/connect-school-detail';
import { GET } from '../../const/method';
import { CONNECT_SCHOOL } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListConnectSchoolDetailData(action: any) {
    let res = yield call(callConnectSchoolDetail, action);
    let data: IConnectSchoolDetail = {}

    if (res) {
        data = res.data;
        yield put({
            type: REDUX.CONNECT_SCHOOL.GET_CONNECT_SCHOOL_DETAIL,
            data
        });
    }
}

function callConnectSchoolDetail(action: any) {

    if (action.id) {
        try {
            let res = _requestToServer(
                GET,
                CONNECT_SCHOOL + `/${action.id}/request`,
                action.body ? action.body : null,
                undefined,
                undefined,
                EMPLOYER_HOST,
                false,
                false,
            ) 

            return res;
        } catch (e) {
            throw e
        }
    }
}

export function* ConnectSchoolDetailWatcher() {
    yield takeEvery(
        REDUX_SAGA.CONNECT_SCHOOL.GET_CONNECT_SCHOOL_DETAIL,
        getListConnectSchoolDetailData
    )
}