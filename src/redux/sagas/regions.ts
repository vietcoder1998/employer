import { noInfoHeader } from './../../services/auth';
import { IRegions } from '../models/regions';
import { GET } from '../../common/const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { PUBLIC_HOST } from '../../environment/dev';
import { REGIONS } from '../../services/api/public.api';

function* getListRegionsData(action) {
    let res = yield call(callRegions, action);

    if (res.code === 200) {
        let data: IRegions = res.data;
        yield put({
            type: REDUX.REGIONS.GET_REGIONS,
            data
        });
    }
}

function callRegions(action) {
    return _requestToServer(
        GET,
        REGIONS,
        undefined,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize:  action.pageSize ? action.pageSize : 0
        },
        noInfoHeader,
        PUBLIC_HOST,
    )
}

export function* RegionsWatcher() {
    yield takeEvery(
        REDUX_SAGA.REGIONS.GET_REGIONS,
        getListRegionsData
    )
}