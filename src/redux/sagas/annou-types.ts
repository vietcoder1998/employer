import {IAnnouTypes} from '../models/annou-types';
import {GET} from '../../common/const/method';
import {takeEvery, put, call,} from 'redux-saga/effects';
import {_requestToServer} from '../../services/exec';
import {REDUX_SAGA, REDUX} from '../../common/const/actions'
import {ANNOU_TYPES} from '../../services/api/private.api';
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListAnnouTypesData(action: any) {
    let res = yield call(callAnnouTypes, action);
    if (res) {
        let data: IAnnouTypes = res.data;
        yield put({
            type: REDUX.ANNOU_TYPES.GET_ANNOU_TYPES,
            data
        });
    }
}

function callAnnouTypes(action: any) {
    let target;
    if (action.data) {
        target = action.data.target;
    }

    return _requestToServer(
        GET, ANNOU_TYPES,
        null,
        {
            pageIndex: action.pageIndex? action.pageIndex : 0,
            pageSize: action.pageSize? action.pageSize : 0,
            target
        },
        undefined, EMPLOYER_HOST, false, false
    )
}

export function* AnnouTypesWatcher() {
    yield takeEvery(
        REDUX_SAGA.ANNOU_TYPES.GET_ANNOU_TYPES,
        getListAnnouTypesData
    )
}