import { IAnnouComment } from './../models/annou-comments';
import {REDUX} from '../../const/actions';

let initState: IAnnouComment = {
   
};

export const AnnouCommentDetail = (state = initState, action: any) => {
    switch (action.type) {
        case REDUX.ANNOU_COMMENTS.GET_ANNOU_COMMENT_DETAIL:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};