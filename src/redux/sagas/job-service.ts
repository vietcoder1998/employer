import { NORMAL_SERVICE, HOME_INDAY_SERVICE, HOME_TOP_SERVICE, UN_LOCK_PROFILE_SERVICE, SEARCH_HIGHT_LIGHT_SERVICE } from './../../services/api/private.api';
import { IJobService } from '././../../models/job-service';
import { GET } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getListJobServiceData(action: any) {
    let res = yield call(callJobService, action);
    let data = null;
    if (res) {
        data = res
    }
    yield put({
        type: REDUX.JOB_SERVICE.GET_JOB_SERVICE,
        data
    });
}

const callJobService = async (action: any) => {
    try {
        let data: IJobService = {
            nomalQuantity: 0,
            homeInDayQuantity: 0,
            homeTopQuantiy: 0,
            searchHighLightQuantity: 0,
            unlockProfileQuantity: 0,
            highLightQuantity: 0,
        }

        let res1 = await _requestToServer(
            GET,
            NORMAL_SERVICE,
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        )

        let res2 = await _requestToServer(
            GET,
            HOME_INDAY_SERVICE,
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        )

        let res3 = await _requestToServer(
            GET,
            HOME_TOP_SERVICE,
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        )

        let res4 = await _requestToServer(
            GET,
            SEARCH_HIGHT_LIGHT_SERVICE,
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        )

        let res5 = await _requestToServer(
            GET,
            UN_LOCK_PROFILE_SERVICE,
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        )
        let res6 = await _requestToServer(
            GET,
            '/api/employers/services/jobs/highlight/TITLE_HIGHLIGHT/quantity',
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        )

        data.nomalQuantity = res1.data ? res1.data.quantity : 0;
        data.homeInDayQuantity = res2.data ? res2.data.quantity : 0;
        data.homeTopQuantiy = res3.data ? res3.data.quantity : 0;
        data.searchHighLightQuantity = res4.data ? res4.data.quantity : 0;
        data.unlockProfileQuantity = res5.data ? res5.data.quantity : 0;
        data.highLightQuantity = res6.data ? res6.data.quantity : 0
        return data;

    } catch (error) {
        throw error;
    }
}

export function* JobServiceWatcher() {
    yield takeEvery(
        REDUX_SAGA.JOB_SERVICE.GET_JOB_SERVICE,
        getListJobServiceData
    )
}