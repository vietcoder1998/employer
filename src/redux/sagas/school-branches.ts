import { noInfoHeader } from '../../services/auth';
import { ISchoolBranches } from '../../models/school-branches';
import { GET } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { PUBLIC_HOST } from '../../environment/dev';
import {  SCHOOL } from '../../services/api/public.api';

function* getListSchoolBranchsData(action) {
    let res = yield call(callSchoolBranchs, action);
    let data: ISchoolBranches = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };

    if (res) {
        data = res.data;
    }

    yield put({
        type: REDUX.CONNECT_SCHOOL.GET_SCHOOL_BRANCHES,
        data
    });
}

function callSchoolBranchs(action) {
    try {
        let res = _requestToServer(
            GET,
            SCHOOL + `/${action.id}/education/branches/query`,
            undefined,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 0
            },
            noInfoHeader,
            PUBLIC_HOST,
            false,
            false
        )

        return res;
    } catch (error) {
        throw error;
    }
}

export function* SchoolBranchsWatcher() {
    yield takeEvery(
        REDUX_SAGA.CONNECT_SCHOOL.GET_SCHOOL_BRANCHES,
        getListSchoolBranchsData
    )
}