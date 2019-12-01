import { ISavedCandidateProfiles } from './../models/saved-candidate';
import { REDUX } from '../../common/const/actions';

export const getAnnouncementDetail = (data: ISavedCandidateProfiles) => ({
    type: REDUX.SAVED_CANDIDATE_PROFILES.GET_SAVED_CANDIDATE_PROFILES, 
    data
});