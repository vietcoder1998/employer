import React from 'react';
import './FirstCard.scss';
//@ts-ignore
import testImg from '../../../../../../assets/image/base-image.jpg';
import { Avatar, Skeleton, Icon } from 'antd';
import { Timer, NotUpdate } from '../../../../layout/common/Common';
import { IAnnouncement } from '../../../../../../redux/models/announcements';
import { Link } from 'react-router-dom';
import { routeLink } from '../../../../../../const/break-cumb';


interface IFirstCard {
    item?: IAnnouncement
    loading?: boolean;
}

export default function FirstCard(props: IFirstCard) {

    return (
        <Link to={routeLink.ANNOUNCEMENT + `/detail/${props && props.item && props.item.id}`} target='_blank'>
            <div className='first-card test'  >
                <img className='img-card-background'
                    src={
                        props &&
                            props.item &&
                            props.item.imageUrl ? props.item.imageUrl : testImg
                    }
                    alt='info '
                />
                <div className='first-card-content ' />
                <div className='info-card'>
                    <h5>{props && props.item && props.item.title}</h5>
                    <div className='info-writor' >
                        <div className='writor'>
                            <Skeleton avatar paragraph={{ rows: 2 }} active loading={props.loading}  >
                                <Avatar
                                    src={props && props.item && props.item.admin ? props.item.admin.avatarUrl : testImg}
                                    style={{ marginRight: 10 }} size={40} icon={"user"}
                                />
                                <div>
                                    <div>
                                        {props && props.item ? props.item.admin.lastName + " " + props.item.admin.firstName : <NotUpdate />}
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