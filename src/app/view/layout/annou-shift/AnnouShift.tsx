import React from 'react';
import { InputTitle } from '../input-tittle/InputTitle';
import { InputNumber } from 'antd';

interface IShifContent {
    id?: string | number;
    removeButton?: boolean;
}

export const ShifContent: React.FC<IShifContent> = (props: IShifContent) => {
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState("");

    return (
        <div>
            <InputTitle
                title="Thời gian"
                widthLabel="100px"
                style={{ width: "50%" }}
            >
                <InputNumber
                    style={{ width: "55px" }}
                    defaultValue={0}
                    min={0}
                    max={24}
                    onChange={event => console.log(event)}
                />
                <span style={{ margin: "10px 10px 0px" }}>
                    giờ
                </span>

                <InputNumber
                    style={{ width: "55px" }}
                    defaultValue={0}
                    min={0}
                    max={60}
                    onChange={(event: number) => {setStartTime(event); console.log(startTime)}}
                />
                <span style={{ margin: "10px 10px 0px" }}>
                    phút
                </span>
            </InputTitle>
        </div>)
}