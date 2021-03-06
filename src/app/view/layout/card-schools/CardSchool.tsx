import React from 'react';
import './CardSchool.scss';
// @ts-ignore
import backGround from './../../../../assets/image/base-image.jpg';
// @ts-ignore
import { Avatar, Icon } from 'antd';
import { IConnectSchool } from '../../../../models/connect-schools';
import { NotUpdate } from '../common/Common';
import { TYPE } from '../../../../const/type';
import { routeLink } from '../../../../const/break-cumb';


interface ICardSchoolProps {
    item?: IConnectSchool;
    openDrawer?: (id?: string) => any;
    open?: any
    state?: any
    createRequest?: any
    loading?: any
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

    // // let color_me = "gray";
    // switch (props.item.owner) {
    //     case TYPE.EMPLOYER:
    //         color_me = "#168ECD";
    //         break;
    //     case TYPE.SCHOOL:
    //         color_me = "#ffc107";
    //         break;
    //     default:
    //         break;
    // }

    return (
        <div
            className={props.state ? 'card-school' : 'card-school card-school-animation' }
            style={{
                border: `solid #e4e4e4 1px`
            }}
        >
            {/* <div className="three-dot">
                <Badge status={props && props.item && props.item.state ? "processing" : "default"} color={color} />
                <Badge status={props && props.item && props.item.state ? "processing" : "default"} color={color} />
                <Badge status={props && props.item && props.item.state ? "processing" : "default"} color={color} />
                <Badge status={"default"} color={color_me} style={{ marginLeft: 10 }} />
            </div> */}
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
                onClick={() => window.open(routeLink.CONNECT_SCHOOLS + `/school/${props.item.id}`) }
            />
            <div>{props.item.coverUrl}</div>
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
                    // onClick={() => window.open(routeLink.CONNECT_SCHOOLS + `/school/${props.item.id}`)}
                    // onClick={() => props.openDrawer(props.item.id)}
                    onClick={() =>  window.open(routeLink.CONNECT_SCHOOLS + `/school/${props.item.id}`)}

                >
                    <div className="school">
                        <Avatar
                            className="logo-school"
                            src={props && props.item && props.item.logoUrl ? props.item.logoUrl : backGround}
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
                {/* <Link to={routeLink.CONNECT_SCHOOLS + `/school/${props.item.id}`} target='_blank'> */}
                    <div
                        className="action-school"
                        style={{ textAlign: "center" }}
                        onClick={() => {props.createRequest(props.item.id)}}
                    >
                        <div>

                            <div className="view">
                                Gửi yêu cầu kết nối
                                {/* <Icon type="search" /> */}
                                {props.loading ? <Icon type="loading" /> : null}
                            </div>
                        </div>
                    </div>
                {/* </Link> */}
            </div>
        </div >
    )
}