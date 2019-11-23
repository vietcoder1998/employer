import { all } from 'redux-saga/effects';
import { JobAnnouncementsWatcher } from '../sagas/job-announcements';

export default function* rootSaga() {
    yield all([
        JobAnnouncementsWatcher()
    ])
} 