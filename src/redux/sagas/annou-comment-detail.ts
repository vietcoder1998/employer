import { noInfoHeader, authHeaders } from './../../services/auth';
import { GET } from './../../const/method';
import { IAnnouComment } from './../models/annou-comments';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { ANNOU_COMMENTS } from '../../services/api/private.api';
import { EMPLOYER_HOST, PUBLIC_HOST } from '../../environment/dev';

function* getListAnnouCommentDetailData(action: any) {
    let res = yield call(callAnnouCommentDetail, action);
    let data: IAnnouComment = {};

    if (res) {
        data = res.data
    }

    yield put({
        type: REDUX.ANNOU_COMMENTS.GET_ANNOU_COMMENT_DETAIL,
        data,
    });
}


function callAnnouCommentDetail(action: any) {
    if (action.id) {
        let token = localStorage.getItem("ecr");
        try {
            let res = _requestToServer(
                GET, ANNOU_COMMENTS + `/${action.id}/comments`,
                undefined,
                undefined,
                token ? authHeaders : noInfoHeader,
                token ? EMPLOYER_HOST : PUBLIC_HOST,
                false, false
            )
            return res
        } catch (e) {
            throw e;
        }
    }

}

export function* AnnouCommentDetailWatcher() {
    yield takeEvery(
        REDUX_SAGA.ANNOU_COMMENTS.GET_ANNOU_COMMENT_DETAIL,
        getListAnnouCommentDetailData
    );
}