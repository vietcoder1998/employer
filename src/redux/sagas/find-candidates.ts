import { IFindCandidates } from './../../models/find-candidates';
import { POST } from '../../const/method';
import { FIND_CANDIDATES } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListFindCandidatesData(action: any) {
    let res = yield call(callFindCandidates, action);

    let data: IFindCandidates = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };

    if (res.code === 200) {
        data = res.data
    }

    yield put({
        type: REDUX.FIND_CANDIDATES.GET_FIND_CANDIDATES,
        data
    });
}

function callFindCandidates(action: any) {
    if (action.body) {
        try {
            let res = _requestToServer(
                POST,
                FIND_CANDIDATES,
                action.body ? action.body : null,
                {
                    pageIndex: action.pageIndex ? action.pageIndex : 0,
                    pageSize: action.pageSize ? action.pageSize : 10
                },
                undefined,
                EMPLOYER_HOST,
                false,
                false
            )
            return res

        } catch (error) {
            throw error;
        }
    }
}

export function* FindCandidatesWatcher() {
    yield takeEvery(
        REDUX_SAGA.FIND_CANDIDATES.GET_FIND_CANDIDATES,
        getListFindCandidatesData
    )
}