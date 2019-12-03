import React from 'react';
import './CardSchool.scss';
// @ts-ignore
import backGround from './../../../../assets/image/rodan.png';
// @ts-ignore
import avatar from '../../../../assets/image/test_avatar.jpg';
import { Avatar, Icon, Badge } from 'antd';
import { IConnectSchool } from '../../../../redux/models/connect-schools';
import { NotUpdate } from '../common/Common';
import { TYPE } from '../../../../common/const/type';

export default function CardSchool(props: IConnectSchool) {
    let color = "gray";
    switch (props.state) {
        case TYPE.PENDING:
            color = "#ff2828cc";
            break;
        case TYPE.ACCEPTED:
            color = "green";
            break;
        case TYPE.REJECTED:
            color = "orange";
            break;

        default:
            break;
    }

    let color_me = "gray";
    switch (props.owner) {
        case TYPE.EMPLOYER:
            color_me = "#168ECD";
            break;
        case TYPE.SCHOOL:
            color_me = "purple";
            break;
        default:
            break;
    }
    return (
        <div
            className='card-school'
            style={{
                border: `solid ${color} 1px`
            }}
        >
            <div className="three-dot">
                <Badge status={props && props.state ? "processing" : "default"} color={color} />
                <Badge status={props && props.state ? "processing" : "default"} color={color} />
                <Badge status={props && props.state ? "processing" : "default"} color={color} />
                <Badge status={"default"} color={color_me} style={{ marginLeft: 10 }} />
            </div>
            {
                props && props.region &&
                    props.region.name ?
                    <div className="placement-school">
                        <Icon type="environment" />
                        {props.region.name}
                    </div> : null
            }
            <img className="image-schools" src={props && props.coverUrl ? props.coverUrl : backGround} />
            <div
                className="school-action"
                style={{
                    border: `solid ${color} 1px`
                }}
            >
                <div style={{ position: "relative", padding: "0px 10px" }}>
                    <div className="school">
                        <Avatar
                            className="logo-school"
                            src={props && props.logoUrl ? props.logoUrl : avatar}
                            style={{
                                width: 60,
                                height: 60,
                                border: `solid ${color}  2px`,
                                marginTop: -30,
                            }}
                        />
                    </div>
                    <div className="info-school">
                        <h6>
                            {props && props.name ? props.name : <NotUpdate />}
                        </h6>
                        <p>
                            {props && props.shortName ? `(${props.shortName})` : <NotUpdate />}
                        </p>
                    </div>

                </div>
                <div
                    className="action-school"
                    style={{ textAlign: "center" }}
                >
                    <p>
                        <div className="view">
                            Xem chi tiết
                            <Icon type="search" />
                        </div>
                    </p>
                </div>
            </div>

        </div >
    )
}