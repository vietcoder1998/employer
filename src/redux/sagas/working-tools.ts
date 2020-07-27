import { noInfoHeader } from '../../services/auth';
import { IWorkingTools } from '../../models/working-tools';
import { GET } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { PUBLIC_HOST } from '../../environment/dev';
import { WORKINGTOOLS } from '../../services/api/public.api';

function* getListWorkingToolsData(action) {
    let res = yield call(callWorkingTools, action);
    let data: IWorkingTools = {
        items: [],
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0
    };

    if (res) {
        data = res.data;
    }
    console.log('data')
    console.log(data);
    
    yield put({
        type: REDUX.WORKINGTOOLS.GET_WORKINGTOOLS,
        data
    });
}

function callWorkingTools(action) {
    try {
        let res = _requestToServer(
            GET,
            WORKINGTOOLS,
            undefined,
            {
                pageIndex: action.pageIndex ? action.pageIndex : 0,
                pageSize: action.pageSize ? action.pageSize : 0
            },
            noInfoHeader,
            PUBLIC_HOST,
            false,
            false
        )

        return res;
       
    } catch (error) {
        throw error;
    }
}

export function* workingtoolsWatcher() {
    yield takeEvery(
        REDUX_SAGA.WORKINGTOOLS.GET_WORKINGTOOLS,
        getListWorkingToolsData
    )
}