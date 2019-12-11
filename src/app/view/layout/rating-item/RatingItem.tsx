import React from 'react';
import { IptLetter, Timer, NotUpdate } from '../common/Common';
import { Avatar, Rate } from 'antd';
import { IRating } from '../../../../redux/models/ratings';
import './RatingItem.scss';
import { TYPE } from '../../../../common/const/type';
import { routeLink } from '../../../../common/const/break-cumb';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';

interface IRatingItemProps {
    item?: IRating
}

export default function RatingItem(props: IRatingItemProps) {
    let { item } = props;
    let type_icon = null;

    switch (item.userType) {
        case TYPE.CANDIDATE:
            type_icon = "user";
            break;
        case TYPE.EMPLOYER:
            type_icon = "store";
            break;
        case TYPE.SCHOOL:
            type_icon = "schedule";
            break;
        default:
            break;
    }

    return (
        <div className='rating-info test'>
            <div key={item.userID}
                className='li-info'
            >
                <Link to={routeLink.FIND_CANDIDATES + `/detail/${item.userID}`} target="_blank">
                    <div className='img-logo-rating'>
                        <Avatar src={item.avatarUrl} alt='type rating' style={{ width: "50px", height: "50px" }} icon={type_icon} />
                        <div style={{ minWidth: 80, padding: 5 }}>
                            {item.name}
                        </div>
                    </div>
                </Link>
                <div className='data-rating'>
                    <div className="content_li-info">
                        <IptLetter value="Môi trường làm việc" />
                        <Rate disabled value={item.workingEnvironmentRating} style={{ fontSize: 12, float: "right" }} />
                    </div>
                    <div className="content_li-info">
                        <IptLetter value="Lương thưởng" />  <Rate disabled value={item.salaryRating} style={{ fontSize: 12, float: "right" }} />
                    </div>
                    <div> {item.comment ? <TextArea value={item.comment} disabled={true} rows={2} /> : <NotUpdate msg="Chưa có đánh giá" />}</div>
                   <Timer style={{margin: 0, padding: 0}}  value={item.createdDate} />
                </div>
            </div>
        </div>
    )
}