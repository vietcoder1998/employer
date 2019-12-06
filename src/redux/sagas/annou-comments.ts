import { POST } from './../../common/const/method';
import { IAnnouComments } from '../models/annou-comments';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { ANNOU_COMMENTS } from '../../services/api/private.api';
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListAnnouCommentsData(action: any) {
    let res = yield call(callAnnouComments, action);
    let data: IAnnouComments = {};

    if (res) {
        data = res.data
    }

    yield put({
        type: REDUX.ANNOU_COMMENTS.GET_ANNOU_COMMENTS,
        data
    });
}

function callAnnouComments(action: any) {
    let body;
    let id = action.id;

    if (action.body) {
        body = action.body;
    }

    return _requestToServer(
        POST, ANNOU_COMMENTS + `/${id}/comments/query`,
        {
            rating: body.body ? body.rating : null,
            userID: body.userId ? body.userID : null,
            userType: body.userType ? body.userType : null,
            createdDate: body.createdDate ? body.createdDate : null,
            lastModified: body.lastModified ? body.lastModified : null,
        },
        {

            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 0,
        },
        undefined, EMPLOYER_HOST, false, false
    )
}

export function* AnnouCommentsWatcher() {
    yield takeEvery(
        REDUX_SAGA.ANNOU_COMMENTS.GET_ANNOU_COMMENTS,
        getListAnnouCommentsData
    )
}