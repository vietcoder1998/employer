import { ANNOU_PUBLIC } from './../../services/api/public.api';
import { authHeaders, noInfoHeader } from './../../services/auth';
import { IAnnouncements } from '../models/announcements';
import { POST } from '../../common/const/method';
import { ANNOUNCEMENTS } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST, PUBLIC_HOST } from '../../environment/dev';

function* getListAnnouncementsData(action: any) {
    let res = yield call(callAnnouncements, action);

    let data: IAnnouncements = {
        items: [],
        pageIndex: 0,
        pageSize: 10,
        totalItems: 0,
    };

    if (res) {
        data = res.data
    };

    yield put({
        type: REDUX.ANNOUNCEMENTS.GET_ANNOUNCEMENTS,
        data
    });
}

function callAnnouncements(action: any) {

    let body = {
        adminID: null,
        hidden: null,
        createdDate: null,
        announcementTypeID: null
    }

    if (action.body) {
        body = action.body;
    }

    try {
        let token = localStorage.getItem("ecr");
        let res = _requestToServer(
            POST,
            token ? ANNOUNCEMENTS : ANNOU_PUBLIC,
            body,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 10
            },
            token ? authHeaders : noInfoHeader,
            token ? EMPLOYER_HOST : PUBLIC_HOST,
            false,
            false
        )

        return res
    } catch (e) {
        throw e
    }
}

export function* AnnouncementsWatcher() {
    yield takeEvery(
        REDUX_SAGA.ANNOUNCEMENTS.GET_ANNOUNCEMENTS,
        getListAnnouncementsData
    )
}