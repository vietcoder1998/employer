import React from 'react';
import './HeaderAnnou.scss';
//@ts-ignore
import testImg from '../../../../../../assets/image/base-image.jpg';
import { Avatar, Icon, Skeleton, Rate } from 'antd';
import { Timer } from '../../../../layout/common/Common';

interface IHeaderAnnou {
    name?: any;
    avatarUrl?: string;
    createdDate?: number;
    loading?: boolean;
    averageRating?: number;
    viewNumber?: number;
}

export default function HeaderAnnou(props?: IHeaderAnnou) {
    return (
        <div className='header-annou'  >
            <Skeleton avatar active loading={props.loading}>
                <div className='writor'>
                    <Avatar
                        src={
                            props.avatarUrl ?
                                props.avatarUrl : testImg
                        }
                        style={{ marginRight: 10 }} size={50} icon={"user"} />
                    <div>
                        <div>{props.name}</div>
                        <div>
                            <Icon type={"calendar"} />
                            <Timer style={{ margin: 0, padding: 0 }} value={props.createdDate} />
                        </div>
                    </div>
                </div>
                <Rate value={props.averageRating} style={{ fontSize: 12, position: "absolute", right: 10, top: 15 }} disabled />
            </Skeleton>
        </div >
    )
}