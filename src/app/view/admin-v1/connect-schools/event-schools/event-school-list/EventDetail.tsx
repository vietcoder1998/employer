import React from 'react';

import IEventDetail from "../../../../../../models/event-detail";
import { timeConverter } from '../../../../../../utils/convertTime';
import { Icon, Avatar } from 'antd';

export default function EventDetail(props?: IEventDetail) {
    return (
        <div>
            <img src={props.bannerUrl} style={{ width: '100%', height: 'auto' }} alt='Ảnh sự kiện' />
            <p>{timeConverter(props.startedDate, 1000)}</p>
            <h6>
                {props.school ? props.school.address : ""}
            </h6>
            <h5>{props.name}</h5>
            <p>
                <Avatar src={props.school ? props.school.logoUrl : ""} />
                Từ {props.school ? props.school.name : ""}
            </p>
            <p>
                <Icon type={'calendar'} />  {timeConverter(props.createdDate, 1000) + " - " + timeConverter(props.finishedDate, 1000)}
            </p>
            <div>
                {props.description}
            </div>
        </div>
    )
};