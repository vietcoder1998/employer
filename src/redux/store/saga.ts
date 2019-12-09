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
import { SavedCandidateProfilesWatcher } from '../sagas/saved-candidate-profiles';
import { SkillsWatcher } from '../sagas/skills';
import { JobAnnouncementDetailWatcher } from '../sagas/job-announcement-detail';
import { JobServiceWatcher } from '../sagas/job-service';
import { LanguagesWatcher } from '../sagas/languages';
import { ConnectSchoolDetailWatcher } from '../sagas/connect-school-detail';
import { ConnectSchoolsWatcher } from '../sagas/connect-schools';
import { ApplyJobsWatcher } from '../sagas/apply-job';
import { AdminAccountWatcher } from '../sagas/admin-account';
import { PendingJobsWatcher } from '../sagas/pending-jobs';
import { PendingJobDetailWatcher } from '../sagas/pending-job-detail';

export default function* rootSaga() {
    try {
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
            FindCandidatesWatcher(),
            SavedCandidateProfilesWatcher(),
            SkillsWatcher(),
            JobAnnouncementDetailWatcher(),
            JobServiceWatcher(),
            LanguagesWatcher(),
            ConnectSchoolDetailWatcher(),
            ConnectSchoolsWatcher(),
            ApplyJobsWatcher(),
            AdminAccountWatcher(),
            PendingJobsWatcher(),
            PendingJobDetailWatcher()
        ])
    } catch (err) {
        throw err;
    }
} 