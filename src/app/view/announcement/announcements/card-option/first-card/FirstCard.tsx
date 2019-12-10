import React from 'react';
import './FirstCard.scss';
//@ts-ignore
import testImg from '../../../../../../assets/image/rodan.png';
import { Avatar, Affix } from 'antd';
import { Timer, NotUpdate } from '../../../../layout/common/Common';
import { IAnnouncement } from '../../../../../../redux/models/announcements';
import { Link } from 'react-router-dom';
import { routeLink } from '../../../../../../common/const/break-cumb';


interface IFirstCard {
    item?: IAnnouncement
}

export default function FirstCard(props: IFirstCard) {

    return (
        <Link to={routeLink.ANNOUNCEMENT + `/detail/${props && props.item && props.item.id}`} >
            <div className='first-card test'  >
                <img className='img-card-background'
                    src={
                        props &&
                            props.item &&
                            props.item.imageUrl ? props.item.imageUrl : testImg
                    } />
                <div className='first-card-content ' />
                <div className='info-card'>
                    <h5>{props && props.item && props.item.title}</h5>
                    <div className='info-writor' >
                        <div className='writor'>
                            <Avatar
                                src={
                                    props &&
                                        props.item &&
                                        props.item.admin.avatarUrl ?
                                        props.item.admin.avatarUrl : undefined
                                }
                                style={{ marginRight: 10 }} size={40} icon={"user"}
                            />
                            <div>
                                <div>
                                    {props && props.item ? props.item.admin.lastName + " " + props.item.admin.lastName : <NotUpdate />}
                                </div>
                                <Timer value={props && props.item && props.item.createdDate} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}