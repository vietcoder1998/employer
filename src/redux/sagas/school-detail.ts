import { SCHOOL } from './../../services/api/public.api';
import { noInfoHeader } from './../../services/auth';
import { ISchoolDetail } from './../../models/school-detail';
import { GET } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { PUBLIC_HOST } from '../../environment/dev';

function* getListSchoolDetailData(action: any) {
    let res = yield call(callSchoolDetail, action);
    let data: ISchoolDetail = {}

    if (res) {
        data = res.data;
        yield put({
            type: REDUX.CONNECT_SCHOOL.GET_SCHOOL_DETAIL,
            data
        });
    }
}

function callSchoolDetail(action: any) {

    if (action.id) {
        try {
            let res = _requestToServer(
                GET,
                SCHOOL + `/${action.id}`,
                undefined,
                undefined,
                noInfoHeader,
                PUBLIC_HOST,
                false,
                false,
            ) 

            return res;
        } catch (e) {
            throw e
        }
    }
}

export function* SchoolDetailWatcher() {
    yield takeEvery(
        REDUX_SAGA.CONNECT_SCHOOL.GET_SCHOOL_DETAIL,
        getListSchoolDetailData
    )
}