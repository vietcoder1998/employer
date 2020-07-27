import { all, spawn } from 'redux-saga/effects';
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
import { SavedCandidateProfilesWatcher } from '../sagas/saved-candidate-profiles';
import { SkillsWatcher } from '../sagas/skills';
import { JobAnnouncementDetailWatcher } from '../sagas/job-announcement-detail';
import { JobServiceWatcher } from '../sagas/job-service';
import { LanguagesWatcher } from '../sagas/languages';
import { workingtoolsWatcher} from '../sagas/working-tools'
import { ConnectSchoolDetailWatcher } from '../sagas/connect-school-detail';
import { ConnectSchoolsWatcher } from '../sagas/connect-schools';
import { ApplyJobsWatcher } from '../sagas/apply-job';
import { AdminAccountWatcher } from '../sagas/admin-account';
import { PendingJobsWatcher } from '../sagas/pending-jobs';
import { PendingJobDetailWatcher } from '../sagas/pending-job-detail';
import { NotisWatcher } from '../sagas/notis';
import { RatingsWatcher } from '../sagas/ratings';
import { RatingUserWatcher } from '../sagas/rating-user';
import { AnnouCommentDetailWatcher } from '../sagas/annou-comment-detail';
import { SchoolDetailWatcher } from '../sagas/school-detail';
import { JobSuitableCandidatesWatcher } from '../sagas/job-suitable-candidate';
import { EventSchoolsWatcher } from '../sagas/event-schools';
import { EventDetailWatcher } from '../sagas/event-detail';
import { EventJobssWatcher } from '../sagas/event-jobs';
import { EventJobDetailWatcher } from '../sagas/event-job-detail';
import { JobServiceEventWatcher } from '../sagas/job-service-event';
import { SchoolBranchsWatcher } from '../sagas/school-branches';
import { from } from 'core-js/fn/array';

export default function* rootSaga() {
    const sagas = [
        JobAnnouncementsWatcher,
        EmBranchesWatcher,
        RegionsWatcher,
        JobNameWatcher,
        AnnouncementsWatcher,
        AnnouncementDetailWatcher,
        AnnouCommentsWatcher,
        AnnouTypesWatcher,
        FindCandidateDetailWatcher,
        FindCandidatesWatcher,
        SavedCandidateProfilesWatcher,
        SkillsWatcher,
        JobAnnouncementDetailWatcher,
        JobServiceWatcher,
        LanguagesWatcher,
        workingtoolsWatcher,
        ConnectSchoolDetailWatcher,
        ConnectSchoolsWatcher,
        ApplyJobsWatcher,
        AdminAccountWatcher,
        PendingJobsWatcher,
        PendingJobDetailWatcher,
        NotisWatcher,
        RatingsWatcher,
        RatingUserWatcher,
        AnnouCommentDetailWatcher,
        SchoolDetailWatcher,
        JobSuitableCandidatesWatcher,
        EventSchoolsWatcher,
        EventJobssWatcher,
        EventDetailWatcher,
        EventJobDetailWatcher,
        JobServiceEventWatcher,
        SchoolBranchsWatcher
    ];

    try {
        yield all(
            sagas.map(function* (saga) {yield spawn(saga) })
        )
    } catch (err) {
        
        throw err;
    }
} 