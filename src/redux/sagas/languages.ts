import { noInfoHeader } from '../../services/auth';
import { ILanguages } from '../models/languages';
import { GET } from '../../common/const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { PUBLIC_HOST } from '../../environment/dev';
import { LANGUAGES } from '../../services/api/public.api';

function* getListLanguagesData(action) {
    let res = yield call(callLanguages, action);

    if (res.code === 200) {
        let data: ILanguages = res.data;
        yield put({
            type: REDUX.LANGUAGES.GET_LANGUAGES,
            data
        });
    }
}

function callLanguages(action) {
    return _requestToServer(
        GET,
        LANGUAGES,
        undefined,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize:  action.pageSize ? action.pageSize : 0
        },
        noInfoHeader,
        PUBLIC_HOST,
        false,
        false
    )
}

export function* LanguagesWatcher() {
    yield takeEvery(
        REDUX_SAGA.LANGUAGES.GET_LANGUAGES,
        getListLanguagesData
    )
}