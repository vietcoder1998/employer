import React from 'react';
import './CardSchool.scss';
// @ts-ignore
import backGround from './../../../../assets/image/rodan.png';
// @ts-ignore
import avatar from '../../../../assets/image/test_avatar.jpg';
import { Avatar } from 'antd';
import { IConnectSchool } from '../../../../redux/models/connect-schools';

export default function CardSchool(props: IConnectSchool) {
    return (
        <div className='card-school test'>
            <img className="image-schools" src={props && props.coverUrl ? props.coverUrl : backGround} />
            <div className="school-action b_t">
                <div className="school">
                    <Avatar
                        className="logo-school"
                        src={ props && props.logoUrl ?props.logoUrl : avatar}
                        style={{
                            width: 60,
                            height: 60,
                            border: "solid gray 1px",
                            marginTop: -30,
                        }}
                    />
                </div>
                <div className="info-school">

                </div>
                <div  className="action-school">

                </div>
            </div>
        </div>
    )
}