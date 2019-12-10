import { GET } from './../../common/const/method';
import { INotis } from '../models/notis';
import { NOTI } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListNotisData(action: any) {
    let res = yield call(callNotis, action);
    let data: INotis = {
    }

    if (res.code === 200) {
        data = res.data;
        yield put({
            type: REDUX.NOTI.GET_NOTI,
            data
        });
    }
}

function callNotis(action: any) {
    return _requestToServer(
        GET,
        NOTI,
        action.body ? action.body : null,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 10

        },
        undefined,
        EMPLOYER_HOST,
        false,
        false,
    )
}

export function* NotisWatcher() {
    yield takeEvery(
        REDUX_SAGA.NOTI.GET_NOTI,
        getListNotisData
    )
}