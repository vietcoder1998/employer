import React from 'react';
import './CommentAnnou.scss';
//@ts-ignore
import testImg from '../../../../../../assets/image/rodan.png';
import { List, Skeleton, Checkbox, Avatar, Rate } from 'antd';
import { TYPE } from '../../../../../../common/const/type';
import { IAnnouComments, IAnnouComment } from '../../../../../../redux/models/annou-comments';
import TextArea from 'antd/lib/input/TextArea';

interface ICommentAnnou {
    list_annou_comment?: Array<IAnnouComment>
}

export default function CommentAnnou(props?: ICommentAnnou) {
    let { list_annou_comment } = props;
    return (
        <div className='comment-annou test'  >
            <TextArea placeholder={"Hãy viết nhận xét của bạn"} />
            <List
                itemLayout="vertical"
                className="demo-loadmore-list"
                dataSource={list_annou_comment}
                renderItem={(item: IAnnouComment) => {
                    let sub_title = "";
                    switch (item.userType) {
                        case TYPE.CANDIDATE:
                            sub_title = "Ứng viên"
                            break;
                        case TYPE.EMPLOYER:
                            sub_title = "Nhà tuyển dụng"
                            break;
                        case TYPE.STUDENT:
                            sub_title = "Sinh viên"
                            break;
                        case TYPE.SCHOOL:
                            sub_title = "Nhà trường"
                            break;
                        case TYPE.PUBLIC:
                            sub_title = "Khách"
                            break;
                        default:
                            break;
                    }

                    return (
                        <div>
                            
                        </div>
                    )
                }}
            />
        </div >
    )
}