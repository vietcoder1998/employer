import { GET } from '../../common/const/method';
import { IRatings } from '../models/ratings';
import { LIST_RATE } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListRatingsData(action: any) {
    let res = yield call(callRatings, action);
    let data: IRatings = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0
    }

    if (res) {
        data = res.data;
    };

    yield put({
        type: REDUX.LIST_RATE.GET_LIST_RATE,
        data
    });
}

function callRatings(action: any) {
    try {
        let res = _requestToServer(
            GET,
            LIST_RATE,
            action.body ? action.body : null,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 0

            },
            undefined,
            EMPLOYER_HOST,
            false,
            false,
        );
        return res;
    } catch (error) {
        throw error
    }
}

export function* RatingsWatcher() {
    yield takeEvery(
        REDUX_SAGA.LIST_RATE.GET_LIST_RATE,
        getListRatingsData
    )
}