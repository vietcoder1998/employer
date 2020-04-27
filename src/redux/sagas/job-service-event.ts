import { EVENT_SCHOOLS } from '../../services/api/private.api';
import { IJobServiceEvent } from '../../models/job-service-event';
import { GET } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { EMPLOYER_HOST } from '../../environment/dev';

function* getJobServiceEventData(action: any) {
    let res = yield call(callEventJobServiceEvent, action);
    let data = null;

    if (res) {
        data = res
    };

    yield put({
        type: REDUX.EVENT_SCHOOLS.GET_EVENT_JOB_SERVICE,
        data
    });
}

const callEventJobServiceEvent = async (action: any) => {
    try {
        let data: IJobServiceEvent = {
            nomalQuantity: 0,
            homeInDayQuantity: 0,
            homeTopQuantiy: 0,
            highlightTitleQuantity: 0,
        }

        let res1 = await _requestToServer(
            GET,
            EVENT_SCHOOLS + `/${action.id}/services/jobs/limit/quantity`,
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        );

        let res2 = await _requestToServer(
            GET,
            EVENT_SCHOOLS + `/${action.id}/services/jobs/priority/home/IN_DAY/quantity`,
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        );

        let res3 = await _requestToServer(
            GET,
            EVENT_SCHOOLS + `/${action.id}/services/jobs/priority/home/TOP/quantity`,
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        );

        let res4 = await _requestToServer(
            GET,
            EVENT_SCHOOLS + `/${action.id}/services/jobs/title/highlight/quantity`,
            null,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            false
        );


        data.nomalQuantity = res1.data ? res1.data.quantity : 0;
        data.homeInDayQuantity = res2.data ? res2.data.quantity : 0;
        data.homeTopQuantiy = res3.data ? res3.data.quantity : 0;
        data.highlightTitleQuantity = res4.data ? res4.data.quantity : 0;

        return data;

    } catch (error) {
        throw error;
    }
}

export function* JobServiceEventWatcher() {
    yield takeEvery(
        REDUX_SAGA.EVENT_SCHOOLS.GET_EVENT_JOB_SERVICE,
        getJobServiceEventData
    )
}