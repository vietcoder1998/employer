import { JobAnnouncements } from '../reducers/job-announcements';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    JobAnnouncements
});

export type IAppState = ReturnType<typeof rootReducer>;
export default rootReducer;