import React from 'react';
import { IptLetter, Timer } from '../common/Common';
import { Icon, Avatar, Tooltip } from 'antd';
import { INoti } from '../../../../redux/models/notis';
import './NotiItem.scss';
import { TYPE } from '../../../../common/const/type';
import { routeLink, routePath } from '../../../../common/const/break-cumb';
import { Link } from 'react-router-dom';
import { _requestToServer } from '../../../../services/exec';
import { PUT } from '../../../../common/const/method';
import { NOTI } from '../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../environment/dev';

interface INotiItemProps {
    item?: INoti,
    getListNoti?: () => any;
}

export default function NotiItem(props: INotiItemProps) {
    let { item } = props;
    let avatar = null;
    let type_icon = "user";
    // let link_to = "/";
    let avatar_to = "/";
    let icon_state = "exclamation-circle";
    let color_icon_state = "#168ECD";
    // let state = item.data.state;

    switch (item.type) {
        case TYPE.NOTI.REPLY_JOB_APPLY_REQUEST:
            avatar = item.data.avatarUrl;
            type_icon = "user";
            // link_to = routeLink.JOB_ANNOUNCEMENTS + routePath.FIX + `/${state === TYPE.ACCEPTED ? item.data.jobID : item.data.pendingJobID}`;
            avatar_to = routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${item.data.userID}`;
            break;
        case TYPE.NOTI.REPLY_JOB_OFFER_REQUEST:
            avatar = item.data.avatarUrl
            type_icon = "user";
            // link_to = routeLink.JOB_ANNOUNCEMENTS + routePath.FIX + `/${state === TYPE.ACCEPTED ? item.data.jobID : item.data.pendingJobID}`;
            avatar_to = routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${item.data.userID}`
            break;
        case TYPE.NOTI.REPLY_CONNECT_REQUEST:
            avatar = item.data.logoUrl;
            type_icon = "schedule";
            // link_to = routeLink.CONNECT_SCHOOLS + routePath.LIST + `/${item.data.schoolID}`;
            avatar_to = routeLink.CONNECT_SCHOOLS + routePath.DETAIL + `/${item.data.userID}`;
            break;

        case TYPE.NOTI.REPLY_PENDING_JOB:
            avatar = item.data.logoUrl;
            type_icon = "shop";
            // link_to = routeLink.JOB_ANNOUNCEMENTS + routePath.FIX + `/${state === TYPE.ACCEPTED ? item.data.jobID : item.data.pendingJobID}`;
            avatar_to = routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${item.data.userID}`
            break;

        default:
            break;
    }

    switch (item.data.state) {
        case TYPE.PENDING:
            icon_state = "clock-circle";
            color_icon_state = "red";
            break;
        case TYPE.REJECTED:
            icon_state = "stop";
            color_icon_state = "red";
            break;
        case TYPE.ACCEPTED:
            icon_state = "check-circle";
            color_icon_state = "greenyellow";
            break;
        default:
            break;
    }

    async function createRequest() {
        await _requestToServer(
            PUT,
            NOTI + `/${item.id}/seen/${!item.seen}`,
            undefined,
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            true
        ).then(
            (res: any) => props.getListNoti ? props.getListNoti() : undefined
        )
    }

    return (
        <div className='noti-info test'>
            <div key={item.id}
                className='li-info '
                style={{ backgroundColor: item.seen ? 'white' : 'aliceblue' }}>
                <Link to={avatar_to} target="_blank">
                    <div className='img-logo-noti'>
                        <Avatar src={avatar} alt='type noti' style={{ width: "50px", height: "50px" }} icon={type_icon} />
                    </div>
                </Link>
                <div className='data-noti'>
                    <div><IptLetter value={item.title} style={{ padding: 0 }} /></div>
                    {/* <Link to={link_to} target="_blank" > */}
                        <div className="content_li-info">
                            {item.body}
                        </div>
                    {/* </Link> */}
                    <Icon type={icon_state} theme="filled" style={{ color: color_icon_state }} />
                    <Timer style={{ margin: 0, padding: 0 }} value={item.createdDate} />
                </div>
                <Tooltip
                    title={
                        !item.seen ? 'Đánh dấu là đã đọc' : 'Đánh dấu là chưa đọc'
                    }
                >
                    <Icon type={!item.seen ? 'eye' : 'eye-invisible'} onClick={() => createRequest()} />
                </Tooltip>
            </div>
        </div>
    )
}