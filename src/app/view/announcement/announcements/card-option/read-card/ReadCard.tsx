import React from 'react';
import './ReadCard.scss';
import { Avatar, Icon } from 'antd';
import { Timer, NotUpdate } from '../../../../layout/common/Common';
//@ts-ignore
import testImg from '../../../../../../assets/image/rodan.png';
import { IAnnouncement } from '../../../../../../redux/models/announcements';
import limitString from '../../../../../../common/utils/limitString';
import { Link } from 'react-router-dom';
import { routeLink } from '../../../../../../common/const/break-cumb';

interface IReadCard {
    item?: IAnnouncement
}

export default function ReadCard(props: IReadCard) {
    return (
        <Link to={routeLink.ANNOUNCEMENT + `/detail/${props && props.item && props.item.id}`} target='_blank' >
            <div className='read-card'  >
                <div className='read-card-content ' >
                    <div className='info-card'>
                        <div className="left-box">
                            <h5>
                                {limitString(props && props.item && props.item.title, 80)}
                            </h5>
                            <div className='descrtiption'>
                                {props && props.item ? props.item.description : ""}
                            </div>
                            <div className='info-author'>
                                <div>
                                    {props && props.item ? props.item.admin.lastName + " " + props.item.admin.firstName : <NotUpdate />}
                                </div>
                                <div>
                                    <Timer
                                        style={{ padding: 0, margin: 0 }}
                                        value={props && props.item && props.item.createdDate}
                                    />
                                </div>
                                <div>
                                    <Icon type={"eye"} /> {props && props.item && props.item.viewNumber}
                                </div>
                            </div>
                        </div>
                        <div className='right-box' >
                            <img
                                className='image-right-box'
                                src={props && props.item && props.item.imageUrl ? props.item.imageUrl : testImg}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}