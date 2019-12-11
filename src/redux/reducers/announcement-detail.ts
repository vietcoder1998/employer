import { REDUX } from '../../common/const/actions';
import { IAnnouncementDetail } from '../models/announcement_detail';

let initState: IAnnouncementDetail = {
    id: "",
    admin: {},
    viewNumber: 0,
    modifyAdmin: {},
    announcementType: { id: 0, name: "", priority: 0 },
    hidden: false,
    imageUrl: "",
    content: "",
    averageRating: 0,
};

export const AnnouncementDetail = (state: IAnnouncementDetail = initState, action: any): IAnnouncementDetail => {
    switch (action.type) {
        case REDUX.ANNOUNCEMENT_DETAIL.GET_ANNOUNCEMENT_DETAIL:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};