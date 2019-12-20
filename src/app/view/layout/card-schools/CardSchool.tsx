import React from 'react';
import './CardSchool.scss';
// @ts-ignore
import backGround from './../../../../assets/image/base-image.jpg';
// @ts-ignore
import avatar from '../../../../assets/image/test_avatar.jpg';
import { Avatar, Icon, Badge } from 'antd';
import { IConnectSchool } from '../../../../redux/models/connect-schools';
import { NotUpdate } from '../common/Common';
import { TYPE } from '../../../../common/const/type';
import { Link } from 'react-router-dom';

interface ICardSchoolProps {
    item?: IConnectSchool;
    openDrawer?: (id?: string) => any;
}

export default function CardSchool(props?: ICardSchoolProps) {
    let color = "gray";
    switch (props.item.state) {
        case TYPE.PENDING:
            color = "orange";
            break;
        case TYPE.ACCEPTED:
            color = "green";
            break;
        case TYPE.REJECTED:
            color = "#ff2828cc";
            break;

        default:
            break;
    }

    let color_me = "gray";
    switch (props.item.owner) {
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
                <Badge status={props && props.item && props.item.state ? "processing" : "default"} color={color} />
                <Badge status={props && props.item && props.item.state ? "processing" : "default"} color={color} />
                <Badge status={props && props.item && props.item.state ? "processing" : "default"} color={color} />
                <Badge status={"default"} color={color_me} style={{ marginLeft: 10 }} />
            </div>
            {
                props && props.item && props.item.region &&
                    props.item.region.name ?
                    <div className="placement-school">
                        <Icon type="environment" />
                        {props.item.region.name}
                    </div> : null
            }
            <img
                className="image-schools"
                src={
                    props &&
                        props.item &&
                        props.item.coverUrl ?
                        props.item.coverUrl : backGround
                }
                alt="background"
                onClick={() => props.openDrawer(props.item.id)}
            />
            <div
                className="school-action"
                style={{
                    border: `solid ${color} 1px`
                }}
            >
                <div
                    style={{
                        position: "relative",
                        padding: "0px 10px"
                    }}
                    onClick={() => props.openDrawer(props.item.id)}

                >
                    <div className="school">
                        <Avatar
                            className="logo-school"
                            src={props && props.item && props.item.logoUrl ? props.item.logoUrl : avatar}
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
                            {props && props.item && props.item.name ? props.item.name : <NotUpdate />}
                        </h6>
                        <p>
                            {props && props.item && props.item.shortName ? `(${props.item.shortName})` : <NotUpdate />}
                        </p>
                    </div>

                </div>
                <Link to={`/v1/admin/connect-schools/school/${props.item.id}`} target='_blank'>
                    <div
                        className="action-school"
                        style={{ textAlign: "center" }}
                    >
                        <div>
                            <div className="view">
                                Xem chi tiết
                            <Icon type="search" />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div >
    )
}