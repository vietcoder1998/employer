import React from 'react';
import { InputTitle } from '../input-tittle/InputTitle';
import { InputNumber, Switch, Select, Row, Col, Checkbox, Button, TimePicker, Radio, Avatar } from 'antd';
import { IptLetterP, IptLetter, NotUpdate } from '../common/Common';
import randomID from '../../../../common/utils/randomID';
import { IShifts } from '../../../../redux/models/announcements';
import { TYPE } from '../../../../common/const/type';
import moment from 'moment';
import { IApplyJob } from '../../../../redux/models/apply-job';
const { Option } = Select;

interface IApplyJobItem {
    key?: any;
    id?: any;
    index?: number;
    type?: string;
    removeButton?: boolean;
    onChange?: Function;
    removeApplyJob?: Function;
    data?: IApplyJob;
}

// TODO : Get List Job Dto
export function newApplyJob(): IShifts {
    return {
        id: randomID(8),
        startTime: null,
        endTime: null,
        minSalary: null,
        maxSalary: null,
        unit: 'ca',
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
        genderRequireds: [],
    };
};

export function ApplyJobItem(props: IApplyJobItem) {
    const [id, setId] = React.useState(props.id);
    let { data } = props;
    return (
        <div
            style={{
                margin: "20px 0px",
                border: "solid gray 1px",
                borderRadius: "5px",
                padding: "10px 15px",
                position: "relative",
                height: "auto",
                minHeight: 120,
                display: "block"
            }}
        >
            <div style={{ display: "flex" }}>
                <Avatar size={60} shape="square" src={data.candidate.avatarUrl} alt="anh" icon="user" />
            </div>
            <h6>
                {props && props.data ? data.candidate.lastName + " " + data.candidate.lastName : <NotUpdate />}
            </h6>
            <div>
                <Button
                    type={"primary"}
                    icon="check"
                    style={{
                        borderRadius: "50%",
                        padding: "6px 8px",
                        margin: 5,
                        height: "auto",
                        float: "right"
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
                        float: "right"
                    }}
                    onClick={() => props.removeApplyJob ? props.removeApplyJob(props.id) : null}
                />
                {/* <Button type="dashed" icon="undo">Reset</Button> */}
            </div>
        </div >
    )
}