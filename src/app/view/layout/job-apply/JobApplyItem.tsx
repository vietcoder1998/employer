import React from 'react';
import { InputTitle } from '../input-tittle/InputTitle';
import { InputNumber, Switch, Select, Row, Col, Checkbox, Button, TimePicker, Radio, Avatar, Icon, Tooltip } from 'antd';
import { IptLetterP, IptLetter, NotUpdate } from '../common/Common';
import randomID from '../../../../common/utils/randomID';
import { IShifts } from '../../../../redux/models/announcements';
import { TYPE } from '../../../../common/const/type';
import moment from 'moment';
import { IApplyJob } from '../../../../redux/models/apply-job';
import { Link } from 'react-router-dom';
import { routeLink, routePath } from '../../../../common/const/break-cumb';
import { timeConverter } from '../../../../common/utils/convertTime';
const { Option } = Select;

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

// TODO : Get List Job Dto

export function ApplyJobItem(props: IApplyJobItem) {
    const [id, setId] = React.useState(props.id);
    let { data } = props;
    return (
        <div
            className="job-apply-item"
            style={{
                margin: "10px 0px",
                border: `solid ${props.id_default ? "#5dabea" : "gray"} 1px`,
                borderRadius: "5px",
                padding: "10px 15px",
                position: "relative",
                height: "auto",
                minHeight: 120,
                width: "100%",
                display: "inline-block",
                cursor: "pointed",
            }}
        >
            <Link to={routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}`} target="_blank">
                <Tooltip title="Xem hồ sơ">
                    <Icon type="search" style={{ float: "right" }} />
                </Tooltip>
            </Link>
            <div
                style={{ 
                    border: "dashed gray 1px",
                    display: "inline-flex" ,
                    borderRadius: 5,
                    padding: 2,
                    width: "100%"
                }}
                onClick={() => props.onClick ? props.onClick(id) : null}
            >
                <div style={{ width: 60, height: 60 }}>
                    <Avatar style={{ width: "4vw", height: "4vw" }} shape="square" src={data.candidate.avatarUrl} alt="anh" icon="user" />
                </div>
                <div style={{ padding: "0px 15px" }}>
                    <h6>
                        {data ? data.candidate.lastName + " " + data.candidate.lastName : <NotUpdate />}
                        {data && data.candidate.gender && data.candidate.gender === TYPE.MALE ? " (Nam)" : " (Nữ)"}
                    </h6>
                    <p style={{ fontStyle: "italic" }}>
                        {data ? data.message : <NotUpdate msg="Không có" />}
                    </p>
                    <span
                        style={{
                            fontSize: "0.7rem",
                            float: "right"
                        }}
                    >
                        {data && timeConverter(data.appliedDate, 1000, "HH:mm DD-MM-YY")}
                    </span>
                </div>
            </div>
            <div>
                <Button
                    type={"primary"}
                    icon="check"
                    style={{
                        borderRadius: "50%",
                        padding: "6px 8px",
                        margin: 5,
                        height: "auto",
                        float: "right",
                        display: props.type !== TYPE.ACCEPTED ? "block" : "none"
                    }}
                    loading={props.l_btn}
                    onClick={() => props.onChangeType ? props.onChangeType(props.id, TYPE.ACCEPTED) : undefined}
                />
                <Button
                    type={"danger"}
                    icon="stop"
                    style={{
                        borderRadius: "50%",
                        padding: "6px 8px",
                        margin: 5,
                        height: "auto",
                        float: "right",
                        display: props.type !== TYPE.REJECTED ? "block" : "none"
                    }}
                    loading={props.l_btn}
                    onClick={() => props.onChangeType ? props.onChangeType(props.id, TYPE.REJECTED) : undefined}
                />
                <Button
                    icon="pause"
                    style={{
                        borderRadius: "50%",
                        padding: "6px 8px",
                        margin: 5,
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
            </div>
        </div >
    )
}