import {ISavedCandidateProfiles} from '../models/saved-candidate-profiles';
import {REDUX} from '../../common/const/actions';

let initState: ISavedCandidateProfiles = {
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
};

export const SavedCandidateProfiles = (state: ISavedCandidateProfiles = initState, action: any): ISavedCandidateProfiles => {
    switch (action.type) {
        case REDUX.SAVED_CANDIDATE_PROFILES.GET_SAVED_CANDIDATE_PROFILES:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};