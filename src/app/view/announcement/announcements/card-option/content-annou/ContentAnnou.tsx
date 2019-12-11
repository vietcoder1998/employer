import React from 'react';
import './ContentAnnou.scss';
import { Skeleton } from 'antd';
//@ts-ignore

interface IContentAnnou {
    title?: string;
    content?: string;
    loading?: boolean;
}

export default function ContentAnnou(props: IContentAnnou) {

    return (
        <div className='content-annou'  >
            <Skeleton loading={props.loading} paragraph={{ rows: 4 }} >
                <h5>
                    {props.title}
                </h5>
                <div dangerouslySetInnerHTML={{ __html: props.content }} />
            </Skeleton>
        </div >
    )
}