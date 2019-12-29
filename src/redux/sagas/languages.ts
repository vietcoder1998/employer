import { noInfoHeader } from '../../services/auth';
import { ILanguages } from './../../models/languages';
import { GET } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { PUBLIC_HOST } from '../../environment/dev';
import { LANGUAGES } from '../../services/api/public.api';

function* getListLanguagesData(action) {
    let res = yield call(callLanguages, action);
    let data: ILanguages = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0
    };

    if (res) {
        data = res.data;
    }

    yield put({
        type: REDUX.LANGUAGES.GET_LANGUAGES,
        data
    });
}

function callLanguages(action) {
    try {
        let res = _requestToServer(
            GET,
            LANGUAGES,
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

export function* LanguagesWatcher() {
    yield takeEvery(
        REDUX_SAGA.LANGUAGES.GET_LANGUAGES,
        getListLanguagesData
    )
}