import { IFindCandidateDetail } from './../models/find-candidates-detail';
import { GET } from '../../common/const/method';
import { FIND_CANDIDATE_DETAIL } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListFindCandidateDetailData(action: any) {
    let res = yield call(callFindCandidateDetail, action);
    let data: IFindCandidateDetail = {
        id: null,
        firstName: null,
        lastName: null,
        birthday: null,
        avatarUrl: null,
        email: null,
        phone: null,
        gender: null,
        region: null,
        address: null,
        coverUrl: null,
        description: null,
        lat: null,
        identityCard: null,
        lon: null,
        profileVerified: false,
        lookingForJob: false,
        completePercent: null,
        unlocked: false,
        identityCardFrontImageUrl: null,
        saved: false,
        identityCardBackImageUrl: null,
        rating: {
            attitudeRating: null,
            skillRating: null,
            jobAccomplishmentRating: null,
            ratingCount: null
        },
        applyState: null,
        offerState: null,
        skills: [],
        languageSkills: [],
        experiences: [],
        educations: [],
        desiredJobDto: {
            jobNames: [],
            region: null,
            address: null,
            distance: null,
            lat: null,
            lon: null,
            enableNotification: false,
            mode: null,
            selectedJobGroupID: null,
            jobType: null,
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false,
            morning: false,
            afternoon: false,
            evening: false
        }
    };

    if (res.code === 200) {
        data = res.data;
        yield put({
            type: REDUX.FIND_CANDIDATE_DETAIL.GET_FIND_CANDIDATE_DETAIL,
            data
        });
    }
}

function callFindCandidateDetail(action: any) {
    return _requestToServer(
        GET,
        FIND_CANDIDATE_DETAIL + `/${action.id}/profile`,
        action.body ? action.body : null,
        undefined,
        undefined,
        EMPLOYER_HOST,
        true,
        false,
    )
}

export function* FindCandidateDetailWatcher() {
    yield takeEvery(
        REDUX_SAGA.FIND_CANDIDATE_DETAIL.GET_FIND_CANDIDATE_DETAIL,
        getListFindCandidateDetailData
    )
}