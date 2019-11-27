import { Skills } from './../reducers/skills';
import { SavedCandidateProfiles } from './../reducers/saved-candidate-profiles';
import { FindCandidateDetail } from './../reducers/find-candidates-detail';
import { FindCandidates } from './../reducers/find-candidates';
import { Announcements } from './../reducers/announcements';
import { AnnouComments } from './../reducers/annou-comments';
import { AnnouTypes } from './../reducers/annou-types';
import { AnnouncementDetail } from './../reducers/announcement-detail';
import { JobNames } from './../reducers/job-names';
import { Regions } from './../reducers/regions';
import { EmBranches } from './../reducers/em-branches';
import { JobAnnouncements } from '../reducers/job-announcements';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    JobAnnouncements,
    EmBranches,
    Regions,
    AnnouncementDetail,
    AnnouTypes,
    Announcements,
    AnnouComments,
    JobNames,
    FindCandidates,
    FindCandidateDetail,
    SavedCandidateProfiles,
    Skills
});

export type IAppState = ReturnType<typeof rootReducer>;
export default rootReducer;