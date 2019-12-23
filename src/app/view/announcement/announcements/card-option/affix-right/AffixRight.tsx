import React from 'react';
import './AffixRight.scss';
import { IAnnouncement } from '../../../../../../redux/models/announcements';
import limitString from '../../../../../../utils/limitString';
import { Link } from 'react-router-dom';
import { routeLink } from '../../../../../../const/break-cumb';

interface IAffixRight {
    list_data?: Array<IAnnouncement>
}

export default function AffixRight(props?: IAffixRight) {

    return (
        <div className='affix-right-card hidden-mobile' >
            <div className='affix-right-card-content'>
                <h5>
                    Danh sách nổi bật
                </h5>
                <hr />
                <div className="list-data">
                    {
                        props.list_data && props.list_data.map((item: IAnnouncement, index: number) =>
                            <Link key={index} to={routeLink.ANNOUNCEMENT + `/detail/${item && item.id}`} target='_blank' >
                                <div className='data-item' >
                                    <h6>
                                        {(index + 1) < 10 ? `0${index + 1}` : index + 1}.
                                    </h6>
                                    <div className='label-item'>
                                        <div className='link-to'> {item.title ? limitString(item.title, 80) : ""}</div>
                                        <div className='name-item'>{item.admin.lastName + " " + item.admin.firstName}</div>
                                    </div>
                                </div>
                            </Link>)
                    }
                </div>
            </div>
        </div>

    )
}