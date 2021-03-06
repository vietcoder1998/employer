import { TYPE } from './../../const/type';
import { SAVED_PROFILE } from './../../services/api/private.api';
import { GET } from './../../const/method';
import { ISavedCandidateProfiles } from '././../../models/saved-candidate-profiles';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListSavedCandidateProfilesData(action: any) {
    let res = yield call(callSavedCandidateProfiles, action);
    let data: ISavedCandidateProfiles = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
    };

    if (res.code === 200) {
        data = res.data;
    }

    yield put({
        type: REDUX.SAVED_CANDIDATE_PROFILES.GET_SAVED_CANDIDATE_PROFILES,
        data
    });
}

function callSavedCandidateProfiles(action: any) {
    try {
        let res = _requestToServer(
            GET,
            SAVED_PROFILE(
                action.profileType === TYPE.STUDENT
                    ? "students" : "candidates"
            ) + '/saved',
            null,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 10
            },
            undefined,
            EMPLOYER_HOST,
            false,
        );
        return res
    } catch (error) {
        throw error;
    }
}

export function* SavedCandidateProfilesWatcher() {
    yield takeEvery(
        REDUX_SAGA.SAVED_CANDIDATE_PROFILES.GET_SAVED_CANDIDATE_PROFILES,
        getListSavedCandidateProfilesData
    )
}