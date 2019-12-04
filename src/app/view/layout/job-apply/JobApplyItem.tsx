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
const { Option } = Select;

interface IApplyJobItem {
    key?: any;
    id?: any;
    index?: number;
    removeButton?: boolean;
    onChange?: Function;
    onClick?: Function;
    removeApplyJob?: Function;
    data?: IApplyJob;
    id_default?: boolean;
    type?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

// TODO : Get List Job Dto

export function ApplyJobItem(props: IApplyJobItem) {
    const [id, setId] = React.useState(props.id);
    let { data } = props;
    return (
        <div
            style={{
                margin: "10px 0px",
                border: `solid ${props.id_default ? "#34dcf3fi": "gray"} 1px`,
                borderRadius: "5px",
                padding: "10px 15px",
                position: "relative",
                height: "auto",
                minHeight: 120,
                width: "100%",
                display: "inline-block",
                cursor: "pointed"
            }}
        >
            <Link to={routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}`} target="_blank">
                <Tooltip title="Xem hồ sơ">
                    <Icon type="search" style={{ float: "right" }} />
                </Tooltip>
            </Link>
            <div
                style={{ display: "inline-flex" }}
                onClick={() => props.onClick ? props.onClick(id) : null}
            >
                <div style={{ width: 60, height: 60 }}>
                    <Avatar style={{ width: 60, height: 60 }} shape="square" src={data.candidate.avatarUrl} alt="anh" icon="user" />
                </div>
                <div style={{ padding: "0px 15px" }}>
                    <h6>
                        {data ? data.candidate.lastName + " " + data.candidate.lastName : <NotUpdate />}
                        {data && data.candidate.gender && data.candidate.gender === TYPE.MALE ? " (Nam)" : " (Nữ)"}
                    </h6>
                    <p style={{ fontStyle: "italic" }}>
                        {data ? data.message : <NotUpdate msg="Không có" />}
                    </p>
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
                    onClick={() => props.removeApplyJob ? props.removeApplyJob(props.id) : null}
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
                    onClick={() => props.removeApplyJob ? props.removeApplyJob(props.id) : null}
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
                    onClick={() => props.removeApplyJob ? props.removeApplyJob(props.id) : null}
                />
            </div>

        </div >
    )
}