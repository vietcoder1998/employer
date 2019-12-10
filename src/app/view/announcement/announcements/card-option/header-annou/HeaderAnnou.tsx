import React from 'react';
import './HeaderAnnou.scss';
//@ts-ignore
import testImg from '../../../../../../assets/image/rodan.png';
import { Avatar, Affix, Icon } from 'antd';
import { Timer } from '../../../../layout/common/Common';

interface IHeaderAnnou {
    name?: string;
    avatarUrl?: string;
    createdDate?: number
}

export default function HeaderAnnou(props?: IHeaderAnnou) {

    return (
        <div className='header-annou test'  >
            <div className='writor'>
                <Avatar src={props.avatarUrl ? props.avatarUrl : testImg} style={{ marginRight: 10 }} size={40} icon={"user"} />
                <div>
                    <div>{props.name}</div>
                    <div>
                        <Icon type={"calendar"} />
                        <Timer value={props.createdDate} />
                        </div>
                </div>
            </div>
        </div >
    )
}