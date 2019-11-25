import { IFindCandidates } from '../models/find-candidates';
import { POST } from '../../common/const/method';
import { FIND_CANDIDATE } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
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
        data.items = res.data.items;
        data.pageIndex = res.data.pageIndex;
        data.pageSize = res.data.pageSize;
        data.totalItems = res.data.totalItems;
        yield put({
            type: REDUX.FIND_CANDIDATES.GET_FIND_CANDIDATES,
            data
        });
    }
}

function callFindCandidates(action: any) {
    if (action.body) {
        return _requestToServer(
            POST, FIND_CANDIDATE,
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
    }
}

export function* FindCandidatesWatcher() {
    yield takeEvery(
        REDUX_SAGA.FIND_CANDIDATES.GET_FIND_CANDIDATES,
        getListFindCandidatesData
    )
}