import React from 'react';
import { InputTitle } from '../input-tittle/InputTitle';
import { InputNumber, Switch, Select, Row, Col, Checkbox, Button, TimePicker, Radio } from 'antd';
import { IptLetterP, IptLetter } from '../common/Common';
import randomID from '../../../../common/utils/randomID';
import { IShifts } from '../../../../redux/models/announcements';
import { TYPE } from '../../../../common/const/type';
import moment from 'moment';
const { Option } = Select;

interface IApplyJobItem {
    key?: any;
    id?: any;
    index?: number;
    type?: string;
    removeButton?: boolean;
    onChange?: Function;
    removeApplyJob?: Function;
    data?: any;
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
    const [id, setId] = React.useState(randomID(16));
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);
    const [minSalary, setMinsalary] = React.useState(null);
    const [maxSalary, setMaxSalary] = React.useState(null);
    const [agreement, setAgreement] = React.useState(true);
    const [mon, setMon] = React.useState(false);
    const [tue, setTue] = React.useState(false);
    const [wed, setWed] = React.useState(false);
    const [thu, setThu] = React.useState(false);
    const [fri, setFri] = React.useState(false);
    const [sat, setSat] = React.useState(false);
    const [unit, setUnit] = React.useState("ca");
    const [sun, setSun] = React.useState(false);
    const [typeGender, setTypeGender] = React.useState(true);
    const [genderRequireds, setGenderRequireds] = React.useState([]);

    if (props.data.shifts && props.data.shifts.id !== id) {
        if (
            props.data.shifts.minSalary === 0 &&
            props.data.shifts.maxSalary === 0) {
            setAgreement(false)
        }
        setMaxSalary(props.data.shifts.maxSalary);
        setMinsalary(props.data.shifts.minSalary);
        setStartTime(props.data.shifts.startTime);
        setEndTime(props.data.shifts.endTime);
        setId(props.data.shifts.id);
        setMon(props.data.shifts.mon);
        setTue(props.data.shifts.tue);
        setWed(props.data.shifts.wed);
        setThu(props.data.shifts.thu);
        setFri(props.data.shifts.fri);
        setSat(props.data.shifts.sat);
        setUnit(props.data.shifts.unit);
        setSun(props.data.shifts.sun);
        setGenderRequireds(props.data.shifts.genderRequireds)
    }

    return (
        <div
            style={{
                margin: "20px 0px",
                border: "solid gray 1px",
                borderRadius: "5px",
                padding: "10px 15px",
                position: "relative",
                minHeight: "60px"
            }}
        >

            <>
                <Button
                    type={"primary"}
                    icon="delete"
                    style={{
                        borderRadius: "50%",
                        padding: "6px 8px",
                        height: "auto",
                        float: "right"
                    }}
                    onClick={() => props.removeApplyJob(props.id)}
                />
                <Button
                    type={"danger"}
                    icon="delete"
                    style={{
                        borderRadius: "50%",
                        padding: "6px 8px",
                        height: "auto",
                        float: "right"
                    }}
                    onClick={() => props.removeApplyJob(props.id)}
                />
                {/* <Button type="dashed" icon="undo">Reset</Button> */}
            </>
        </div >
    )
}