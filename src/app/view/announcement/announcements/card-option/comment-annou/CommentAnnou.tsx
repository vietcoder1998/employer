import React from 'react';
import './CommentAnnou.scss';
//@ts-ignore
import testImg from '../../../../../../assets/image/rodan.png';
import { List, Skeleton, Avatar, Icon, Divider, Rate } from 'antd';
import { TYPE } from '../../../../../../common/const/type';
import { IAnnouComment } from '../../../../../../redux/models/annou-comments';
import TextArea from 'antd/lib/input/TextArea';
import { Timer } from '../../../../layout/common/Common';

interface ICommentAnnou {
    list_annou_comment?: Array<IAnnouComment>;
    loading?: boolean;
    totalCmt?: string;
    commentDetail?: IAnnouComment;
    onComment: Function;
    onRemoveComment: Function;
}

export default function CommentAnnou(props?: ICommentAnnou) {
    let { list_annou_comment, commentDetail } = props;
    let [comment, setComment] = React.useState(null);
    let [rating, setRating] = React.useState(0);
    let [id, setId] = React.useState(0);

    if (props && props.commentDetail.id !== id) {
        setId(commentDetail.id);
        setComment(commentDetail.comment);
        setRating(commentDetail.rating);
    }

    return (
        <div className='comment-annou'  >
            <h6>
                {`${props && props.totalCmt} Bình luận  `}
            </h6>
            <Skeleton active loading={props.loading} >
                <div className='rating-cmt'>
                    <div>Đánh giá</div>
                    <Rate value={rating} onChange={(event: number) => setRating(event)} />
                </div>
                <div className='cr-cmt'>

                    <div className='cmt-ct'>
                        <TextArea
                            id="text-msg"
                            className="text-comment"
                            placeholder={"Hãy viết nhận xét của bạn"}
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                    </div>
                    <button
                        className='btn-cmt'
                        onClick={() => props.onComment({ comment, rating })}
                        disabled={!comment && rating === 0}
                    >
                        GỬI
                    </button>
                </div>
                {
                    props && props.commentDetail.id ?
                        <div className='rm-cmt' onClick={()=>props.onRemoveComment()}>
                            <Icon type='delete' />  Xóa bình luận
                </div> : ""
                }

                <Divider />
                {
                    list_annou_comment.map((item: IAnnouComment, index: number) => {
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
                            <div className='comment' key={index}>
                                <Skeleton avatar paragraph={{ rows: 2 }} active loading={props.loading}  >
                                    <div className='img-cmt'>
                                        <Avatar
                                            src={item ? item.avatarUrl : testImg}
                                            style={{
                                                marginRight: 10,
                                                width: 40,
                                                height: 40,
                                            }}
                                            icon={"user"}
                                        />
                                    </div>

                                    <div>
                                        <div>
                                            {item.name}
                                        </div>
                                        <div>
                                            <Timer style={{ margin: 0, padding: 0 }} value={item.createdDate} />
                                        </div>
                                        <div className="comment-msg">
                                            {item.comment}
                                        </div>
                                    </div>
                                </Skeleton>
                            </div>
                        )
                    })
                }
            </Skeleton>
        </div >
    )
}