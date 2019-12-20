import React from 'react';
import './MutilCard.scss';
import { Avatar, Skeleton, Icon } from 'antd';
import { Timer } from '../../../../layout/common/Common';
//@ts-ignore
import testImg from '../../../../../../assets/image/base-image.jpg';
import { IAnnouncement } from '../../../../../../redux/models/announcements';
import { Link } from 'react-router-dom';
import { routeLink } from '../../../../../../common/const/break-cumb';

interface IMutilCard {
    item?: IAnnouncement
    loading?: boolean;
}

export default function MutilCard(props?: IMutilCard) {
    return (
        <Link to={routeLink.ANNOUNCEMENT + `/detail/${props && props.item && props.item.id}`} target='_blank' >
            <div className='mutil-card test'  >
                <img
                    className='img-card-background'
                    src={props && props.item && props.item.imageUrl ? props.item.imageUrl : testImg}
                    alt="cardimg"
                />
                <div className='mutil-card-content ' />
                <div className='info-card'>
                    <div> {props && props.item && props.item.title}</div>
                    <div className='info-writor' >
                        <div className='writor'>
                            <Skeleton avatar paragraph={{ rows: 2 }} active loading={props.loading}  >
                                <Avatar
                                    src={props && props.item && props.item.admin ? props.item.admin.avatarUrl : testImg}
                                    style={{ marginRight: 10 }}
                                    size={25} icon={"user"} />
                                <div>
                                    <div>
                                        {props && props.item && props.item.admin ? props.item.admin.firstName + " " + props.item.admin.lastName : ""}
                                    </div>
                                    <div>
                                        <Timer style={{ margin: 0, padding: 0 }} value={props && props.item && props.item.createdDate} />
                                    </div>
                                    <div>
                                        <Icon type={"eye"} />{props && props.item && props.item.viewNumber}
                                    </div>
                                </div>
                            </Skeleton>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}