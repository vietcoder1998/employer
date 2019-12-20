import { authHeaders, noInfoHeader } from './../../services/auth';
import { ANNOU_PUBLIC } from './../../services/api/public.api';
import { IAnnouncementDetail } from '../models/announcement_detail';
import { GET } from '../../common/const/method';
import { ANNOUNCEMENT_DETAIL } from '../../services/api/private.api';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { EMPLOYER_HOST, PUBLIC_HOST } from '../../environment/dev';

function* getListAnnouncementDetailData(action: any) {
    let res = yield call(callAnnouncementDetail, action);
    let data: IAnnouncementDetail = {
        admin: {},
        content: "",
        announcementType: {},
        hidden: false,
        id: undefined,
        imageUrl: undefined,
        lastModified: undefined,
        createdDate: 0
    };
    if (res) {
        data = res.data;
        yield put({
            type: REDUX.ANNOUNCEMENT_DETAIL.GET_ANNOUNCEMENT_DETAIL,
            data
        });
    }
}

function callAnnouncementDetail(action: any) {
    try {
        if (action.id) {
            let token = localStorage.getItem("ecr");

            let res = _requestToServer(
                GET,
                (token ? ANNOUNCEMENT_DETAIL : ANNOU_PUBLIC) + `/${action.id}`,
                undefined,
                undefined,
                token ? authHeaders : noInfoHeader,
                token ? EMPLOYER_HOST : PUBLIC_HOST,
                false,
            )

            return res
        }

    } catch (e) {
        throw e
    }
}

export function* AnnouncementDetailWatcher() {
    yield takeEvery(
        REDUX_SAGA.ANNOUNCEMENT_DETAIL.GET_ANNOUNCEMENT_DETAIL,
        getListAnnouncementDetailData
    )
}