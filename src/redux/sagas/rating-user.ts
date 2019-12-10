import { FIND_CANDIDATE_DETAIL } from './../../services/api/private.api';
import { GET } from '../../common/const/method';
import { IRatingUser } from '../models/rating-user';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListRatingUserData(action: any) {
    let res = yield call(callRatingUser, action);
    let data: IRatingUser = {
        jobAccomplishmentRating: 0,
        attitudeRating: 0,
        skillRating: 0,
        createdDate: -1,
        lastModified: -1
    }

    if (res && res.data) {
        data = res.data;
    };

    yield put({
        type: REDUX.RATING_USER.GET_RATING_USER,
        data
    });
}

function callRatingUser(action: any) {

    if (action.id) {
        return _requestToServer(
            GET,
            FIND_CANDIDATE_DETAIL + `/${action.id}/rating`,
            undefined,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false,
        )
    }

    return
}

export function* RatingUserWatcher() {
    yield takeEvery(
        REDUX_SAGA.RATING_USER.GET_RATING_USER,
        getListRatingUserData
    )
}