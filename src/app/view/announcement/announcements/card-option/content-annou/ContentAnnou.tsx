import React from 'react';
import './ContentAnnou.scss';
//@ts-ignore
import testImg from '../../../../../../assets/image/rodan.png';

interface IContentAnnou {
    title?: string;
    content?: string;
}

export default function ContentAnnou(props: IContentAnnou) {

    return (
        <div className='content-annou'  >
            <h5>
                {props.title}
            </h5>
            <div dangerouslySetInnerHTML={{ __html: props.content }} />
        </div >
    )
}