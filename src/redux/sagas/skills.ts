import { SKILLS } from './../../services/api/private.api';
import { noInfoHeader } from './../../services/auth';
import { ISkills } from '../models/skills';
import { GET } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { PUBLIC_HOST } from '../../environment/dev';

function* getListSkillsData(action) {
    let res = yield call(callSkills, action);
    let data: ISkills = res.data;

    if (res) {
        data = res.data
    }

    yield put({
        type: REDUX.SKILLS.GET_SKILLS,
        data
    });
}

function callSkills(action) {
    try {
        let res = _requestToServer(
            GET,
            SKILLS,
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
        return res
    } catch (error) {
        throw error;
    }
}

export function* SkillsWatcher() {
    yield takeEvery(
        REDUX_SAGA.SKILLS.GET_SKILLS,
        getListSkillsData
    )
}