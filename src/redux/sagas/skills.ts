import { SKILLS } from './../../services/api/private.api';
import { noInfoHeader } from './../../services/auth';
import { ISkills } from '../models/skills';
import { GET } from '../../common/const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../common/const/actions'
import { PUBLIC_HOST } from '../../environment/dev';

function* getListSkillsData(action) {
    let res = yield call(callSkills, action);

    if (res.code === 200) {
        let data: ISkills = res.data;
        yield put({
            type: REDUX.SKILLS.GET_SKILLS,
            data
        });
    }
}

function callSkills(action) {
    return _requestToServer(
        GET,
        SKILLS,
        undefined,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize:  action.pageSize ? action.pageSize : 0
        },
        noInfoHeader,
        PUBLIC_HOST,
        false,
        false
    )
}

export function* SkillsWatcher() {
    yield takeEvery(
        REDUX_SAGA.SKILLS.GET_SKILLS,
        getListSkillsData
    )
}