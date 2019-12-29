import { IAnnouComment } from '././../../models/annou-comments';
import {REDUX} from '../../const/actions';

export const getAnnouCommentDetail = (data?: IAnnouComment) => ({
    type: REDUX.ANNOU_COMMENTS.GET_ANNOU_COMMENT_DETAIL,
    data
});