import {IRatingUser} from './../../models/rating-user';
import {REDUX} from '../../const/actions';

let initState: IRatingUser = {
    jobAccomplishmentRating: 0,
    attitudeRating: 0,
    skillRating: 0,
    createdDate: -1,
    lastModified: -1
};

export const RatingUser = (state: IRatingUser = initState, action: any): IRatingUser => {
    switch (action.type) {
        case REDUX.RATING_USER.GET_RATING_USER:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};