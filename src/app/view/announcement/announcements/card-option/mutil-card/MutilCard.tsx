import React from 'react';
import './MutilCard.scss';
import { Avatar } from 'antd';
import { Timer } from '../../../../layout/common/Common';
//@ts-ignore
import testImg from '../../../../../../assets/image/rodan.png';
import { IAnnouncement } from '../../../../../../redux/models/announcements';
import { Link } from 'react-router-dom';
import { routeLink } from '../../../../../../common/const/break-cumb';

interface IMutilCard {
    item?: IAnnouncement
}

export default function MutilCard(props?: IMutilCard) {
    return (
        <Link to={routeLink.ANNOUNCEMENT + `/detail/${props && props.item && props.item.id}`} >
            <div className='mutil-card test'  >
                <img className='img-card-background' src={props && props.item && props.item.imageUrl ? props.item.imageUrl : testImg} />
                <div className='mutil-card-content ' />
                <div className='info-card'>
                    <div> {props && props.item && props.item.title}</div>
                    <div className='info-writor' >
                        <div className='writor'>
                            <Avatar style={{ marginRight: 10 }} size={25} icon={"user"} />
                            <div>
                                <Timer value={props && props.item && props.item.createdDate} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Link>

    )
}