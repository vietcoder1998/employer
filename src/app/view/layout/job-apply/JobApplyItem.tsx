import React from 'react';
import { Row, Col, Button, Avatar, Tooltip, Rate } from 'antd';
import { NotUpdate } from '../common/Common';
import { TYPE } from '../../../../const/type';
import { IApplyJob } from '../../../../models/apply-job';
import { Link } from 'react-router-dom';
import { routeLink, routePath } from '../../../../const/break-cumb';
import { timeConverter } from '../../../../utils/convertTime';
import './JobApplyItem.scss';

interface IApplyJobItem {
    key?: any;
    id?: any;
    index?: number;
    removeButton?: boolean;
    data?: IApplyJob;
    id_default?: boolean;
    l_btn?: boolean;
    type?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    onChangeType?: Function;
    onClick?: Function;
    removeApplyJob?: Function;
}

export function ApplyJobItem(props: IApplyJobItem) {
    let { data } = props;
    return (
        <div
            className="job-apply-item"
            style={{
                margin: "10px 0px",
                border: `solid ${props.id_default ? "#5dabea" : "gray"} 1px`,
                borderRadius: "5px",
                padding: "0.2vw 0.5vw",
                position: "relative",
                height: "auto",
                minHeight: 120,
                width: "100%",
                display: "inline-block",
                cursor: "pointed",
            }}
        >

            <div
                style={{
                    border: "dashed gray 1px",
                    display: "inline-flex",
                    borderRadius: 5,
                    padding: 2,
                    width: "100%"
                }}
                onClick={() => props.onClick ? props.onClick(props.id) : null}
            >
                <Row>
                    <Col md={24} lg={24} xl={24}>
                        <div
                            style={{
                                display: "inline-flex",
                                width: "100%",
                                padding: "2px 5px",
                            }}
                        >
                            <div
                                style={{ width: "4.8vw", height: "4.8vw" }}>
                                <Avatar style={{ width: "4vw", height: "4vw", margin: "0.2vw" }} shape="square" src={data.candidate.avatarUrl} alt="anh" icon="user" />
                            </div>
                            <div style={{ margin: "0px 15px" }}>
                                <p style={{marginBottom: 5}}>
                                    {data ? data.candidate.lastName + " " + data.candidate.firstName : <NotUpdate />}
                                    {data && data.candidate.gender && data.candidate.gender === TYPE.MALE ? " (Nam)" : " (Nữ)"}
                                </p>
                                <span
                                    style={{
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    {data && timeConverter(data.appliedDate, 1000, "HH:mm DD-MM-YY")}
                                </span>
                                <p style={{marginBottom: 5}}>
                                    Lời nhắn: 
                                </p>
                                <div className="test" style={{ fontStyle: "italic", padding: '5px 10px', width: '100%' }}>
                                    {data ? data.message : <NotUpdate msg="Không có" />}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={24} lg={24} xl={24}>
                        
                    </Col>
                    <Col md={24} lg={24} xl={24}>
                        <ul >
                            <li>
                                <span>Thái độ</span>   <Rate disabled defaultValue={2} style={{ fontSize: 12, float: "right" }} />
                            </li>
                            <li>
                                <span>Kĩ năng</span>  <Rate disabled defaultValue={2} style={{ fontSize: 12, float: "right" }} />
                            </li>
                            <li>
                                <span>Hài lòng</span>  <Rate disabled defaultValue={2} style={{ fontSize: 12, float: "right" }} />
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
            <div>
                <Link to={routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${props.id}`} target="_blank">
                    <Tooltip title="Xem hồ sơ">
                        <Button
                            type={"primary"}
                            icon={'eye'}
                            style={{
                                float: "left",
                                padding: "6px 8px",
                                margin: "10px 10px",
                                height: "auto",
                                borderRadius: "50%",
                            }} />
                    </Tooltip>
                </Link>
                <Tooltip title='Chấp nhận'>
                    <Button
                        type={"primary"}
                        icon="check"
                        style={{
                            borderRadius: "50%",
                            padding: "6px 8px",
                            margin: "10px 10px",
                            height: "auto",
                            float: "right",
                            display: props.type !== TYPE.ACCEPTED ? "block" : "none"
                        }}
                        loading={props.l_btn}
                        onClick={() => props.onChangeType ? props.onChangeType(props.id, TYPE.ACCEPTED) : undefined}
                    />
                </Tooltip>
                <Tooltip title='Từ chối'>
                    <Button
                        type={"danger"}
                        icon="stop"
                        style={{
                            borderRadius: "50%",
                            padding: "6px 8px",
                            margin: "10px 10px",
                            height: "auto",
                            float: "right",
                            display: props.type !== TYPE.REJECTED ? "block" : "none"
                        }}
                        loading={props.l_btn}
                        onClick={() => props.onChangeType ? props.onChangeType(props.id, TYPE.REJECTED) : undefined}
                    />
                </Tooltip>
                <Tooltip title='Chuyển thành đang chờ'>
                    <Button
                        icon="clock-circle"
                        style={{
                            borderRadius: "50%",
                            padding: "6px 8px",
                            margin: "10px 10px",
                            height: "auto",
                            float: "right",
                            background: "orange",
                            color: "white",
                            boxShadow: "orange",
                            display: props.type !== TYPE.PENDING ? "block" : "none"
                        }}
                        loading={props.l_btn}
                        onClick={() => props.onChangeType ? props.onChangeType(props.id, TYPE.PENDING) : undefined}
                    />
                </Tooltip>

            </div>
        </div >
    )
}