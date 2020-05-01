import { JobServiceEvent } from './../reducers/job-service-event';
import { EventJobDetail } from './../reducers/event-job-detail';
import { EventJobs } from './../reducers/event-jobs';
import { EventDetail } from './../reducers/event-detail';
import { EventSchools } from './../reducers/event-schools';
import { SchoolsDetail } from './../reducers/school-detail';
import { AnnouCommentDetail } from './../reducers/annou-comment-detail';
import { RatingUser } from './../reducers/rating-user';
import { Ratings } from './../reducers/ratings';
import { Notis } from './../reducers/notis';
import { PendingJobDetail } from './../reducers/pending-job-detail';
import { PendingJobs } from './../reducers/pending-jobs';
import { AdminAccount } from './../reducers/admin-account';
import { ConnectSchoolsDetail } from './../reducers/connect-school-detail';
import { ConnectSchools } from './../reducers/connect-schools';
import { Languages } from './../reducers/languages';
import { JobService } from './../reducers/job-service';
import { MutilBox } from './../reducers/mutil-box';
import { JobAnnouncementDetail } from './../reducers/job-announcement-detail';
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
import { ApplyJobs } from './../reducers/apply-job';

import { combineReducers } from 'redux';
import { JobSuitableCandidates } from './../reducers/job-suitable-candidate';
import { SchoolBranches } from '../reducers/school-branches';

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
    Skills,
    JobAnnouncementDetail,
    MutilBox,
    JobService,
    Languages,
    ConnectSchools,
    ConnectSchoolsDetail,
    ApplyJobs,
    AdminAccount,
    PendingJobs,
    PendingJobDetail,
    Notis,
    Ratings,
    RatingUser,
    AnnouCommentDetail,
    SchoolsDetail,
    JobSuitableCandidates,
    EventSchools,
    EventDetail,
    EventJobs,
    EventJobDetail,
    JobServiceEvent,
    SchoolBranches
});

export type IAppState = ReturnType<typeof rootReducer>;
export default rootReducer;