import { noInfoHeader } from './../../services/auth';
import { IRegions } from '../models/regions';
import { GET } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { PUBLIC_HOST } from '../../environment/dev';
import { REGIONS } from '../../services/api/public.api';

function* getListRegionsData(action) {
    let res = yield call(callRegions, action);
    let data: IRegions = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };


    if (res) {
        data = res.data;
    }

    yield put({
        type: REDUX.REGIONS.GET_REGIONS,
        data
    });
}

function callRegions(action) {
    try {
        let res = _requestToServer(
            GET,
            REGIONS,
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

export function* RegionsWatcher() {
    yield takeEvery(
        REDUX_SAGA.REGIONS.GET_REGIONS,
        getListRegionsData
    )
}