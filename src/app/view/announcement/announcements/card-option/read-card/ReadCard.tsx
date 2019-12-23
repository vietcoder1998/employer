import React from 'react';
import './ReadCard.scss';
import { Icon } from 'antd';
import { Timer, NotUpdate } from '../../../../layout/common/Common';
//@ts-ignore
import testImg from '../../../../../../assets/image/base-image.jpg';
import { IAnnouncement } from '../../../../../../redux/models/announcements';
import limitString from '../../../../../../utils/limitString';
import { Link } from 'react-router-dom';
import { routeLink } from '../../../../../../const/break-cumb';

interface IReadCard {
    item?: IAnnouncement
}

export default function ReadCard(props: IReadCard) {
    return (
        <Link to={routeLink.ANNOUNCEMENT + `/detail/${props && props.item && props.item.id}`} target='_blank' >
            <div className='read-card test'>
                <div className='read-card-content ' >
                    <div className='info-card-read'>
                        <div className='left-box' >
                            <img
                                className='image-left-box'
                                src={props && props.item && props.item.imageUrl ? props.item.imageUrl : testImg}
                                alt="info"
                            />
                        </div>
                        <div className="right-box">
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

                    </div>
                </div>
            </div>
        </Link>
    )
}