import { all } from 'redux-saga/effects';
import { JobAnnouncementsWatcher } from '../sagas/job-announcements';
import { EmBranchesWatcher } from '../sagas/em-branches';
import { RegionsWatcher } from '../sagas/regions';
import { JobNameWatcher } from '../sagas/job-names';
import { AnnouncementsWatcher } from '../sagas/announcements';
import { AnnouncementDetailWatcher } from '../sagas/announcement-detail';
import { AnnouCommentsWatcher } from '../sagas/annou-comments';
import { AnnouTypesWatcher } from '../sagas/annou-types';
import { FindCandidateDetailWatcher } from '../sagas/find-candidates-detail';
import { FindCandidatesWatcher } from '../sagas/find-candidates';


export default function* rootSaga() {
    yield all([
        JobAnnouncementsWatcher(),
        EmBranchesWatcher(),
        RegionsWatcher(),
        JobNameWatcher(),
        AnnouncementsWatcher(),
        AnnouncementDetailWatcher(),
        AnnouCommentsWatcher(),
        AnnouTypesWatcher(),
        FindCandidateDetailWatcher(),
        FindCandidatesWatcher()
    ])
} 