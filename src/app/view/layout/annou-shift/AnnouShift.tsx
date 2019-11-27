import React from 'react';
import { InputTitle } from '../input-tittle/InputTitle';
import { InputNumber, Switch, Select, Row, Col, Checkbox, Button, TimePicker, Radio } from 'antd';
import { IptLetterP, IptLetter } from '../common/Common';
import randomID from '../../../../common/utils/randomID';
import { IShifts } from '../../../../redux/models/announcements';
import { TYPE } from '../../../../common/const/type';
const { Option } = Select;

interface IShiftContent {
    key?: any;
    id?: any;
    index?: number;
    type?: string;
    removeButton?: boolean;
    onChange?: Function;
    removeShift?: Function;
}

export function newShift(): IShifts {
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
        genderRequireds: [
            { gender: "MALE", quantity: 0 },
            { gender: "FEMALE", quantity: 0 }
        ]
    };
};

export function setTime(value: number, postition: "HOURS" | "MINUTES", defaultValue?: string) {
    let arrValue = ["00", "00"]
    if (defaultValue) {
        arrValue = defaultValue.split(":");
    }

    let newValue: string | number = value;

    if (value < 10) {
        newValue = "0" + newValue;
    } else {
        newValue = "" + newValue;
    }

    if (postition === "HOURS") {
        arrValue[0] = newValue;
    } else {
        arrValue[1] = newValue;
    }

    let result = arrValue[0] + ":" + arrValue[1];
    return result
}

export function ShiftContent(props: IShiftContent) {
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
    let [valueGender] = React.useState([
        { gender: "MALE", quantity: 0 },
        { gender: "FEMALE", quantity: 0 }
    ]);
    const [valueBoth] = React.useState([
        { gender: "BOTH", quantity: 0 },
    ]);

    const timeSetup = (
        <div style={{ display: 'flex', }}
        >
            <IptLetterP value={"Thứ hai"} style={{ textAlign: "center", marginRight: "25px" }}  >
                <Checkbox onChange={(event: any) => setMon(event.target.checked)} />
            </IptLetterP>
            <IptLetterP value={"Thứ ba"} style={{ textAlign: "center", marginRight: "25px" }}  >
                <Checkbox onChange={(event: any) => setTue(event.target.checked)} />
            </IptLetterP>
            <IptLetterP value={"Thứ tư"} style={{ textAlign: "center", marginRight: "25px" }}  >
                <Checkbox onChange={(event: any) => setWed(event.target.checked)} />
            </IptLetterP>
            <IptLetterP value={"Thứ năm"} style={{ textAlign: "center", marginRight: "25px" }} >
                <Checkbox onChange={(event: any) => setThu(event.target.checked)} />
            </IptLetterP>
            <IptLetterP value={"Thứ sáu"} style={{ textAlign: "center", marginRight: "25px" }}  >
                <Checkbox onChange={(event: any) => setFri(event.target.checked)} />
            </IptLetterP>
            <IptLetterP value={"Thứ bảy"} style={{ textAlign: "center", marginRight: "25px" }}  >
                <Checkbox onChange={(event: any) => setSat(event.target.checked)} />
            </IptLetterP>
            <IptLetterP value={"Chủ nhật"} style={{ textAlign: "center", marginRight: "25px" }}>
                <Checkbox onChange={(event: any) => setSun(event.target.checked)} />
            </IptLetterP>
        </div>
    );

    const handleGender = (value?: number, gender?: 'MALE' | 'FEMALE' | 'BOTH') => {
        if (gender === 'BOTH') {
            let newValue = valueBoth.map((item: any, index: number) => {
                if (item.gender === gender) {
                    item.quantity = value;
                }

                return item
            });
            setGenderRequireds(newValue);
        } else {
            let newValue = valueGender.map((item: any, index: number) => {
                if (item.gender === gender) {
                    item.quantity = value;
                }

                return item
            });

            let arrVl = newValue.filter((item: any) => {
                return item.quantity !== 0
            })
            setGenderRequireds(arrVl)
        }
    }

    const target = (
        <div>
            <Radio.Group
                name="radiogroup"
                defaultValue={true}
                onChange={(event: any) => setTypeGender(event.target.value)}
            >
                <Radio value={true}>Theo giới tính</Radio>
                <Radio value={false}>Theo Số lượng</Radio>
            </Radio.Group>
            <Row style={{ marginTop: 5, display: typeGender ? 'block' : 'none' }}>
                <Col xs={12} sm={12} md={12} lg={10} xl={12}>
                    <IptLetterP value="Nam">
                        <InputNumber
                            min={0}
                            defaultValue={0}
                            onChange={(event: number) => handleGender(event, "MALE")} />
                    </IptLetterP>
                </Col>
                <Col xs={12} sm={12} md={12} lg={10} xl={12}>
                    <IptLetterP value="Nữ">
                        <InputNumber
                            min={0}
                            defaultValue={0}
                            onChange={(event: number) => handleGender(event, "FEMALE")}
                        />
                    </IptLetterP>
                </Col>
            </Row >
            <Row style={{ marginTop: 5, display: !typeGender ? 'block' : 'none' }}>
                <Col xs={12} sm={12} md={12} lg={10} xl={12}>
                    <IptLetterP value="Người" style>
                        <InputNumber
                            min={0}
                            defaultValue={0}
                            onChange={(event: number) => handleGender(event, "BOTH")}
                        />
                    </IptLetterP>
                </Col>
            </Row>
        </div>
    );

    React.useEffect(
        () => {
            props.onChange({
                startTime,
                endTime,
                minSalary: agreement ? minSalary : null,
                unit: agreement ? unit : null,
                maxSalary: agreement ? maxSalary : null,
                mon,
                tue,
                wed,
                thu,
                fri,
                sat,
                sun,
                genderRequireds
            });

            return () => { }
        },
        // eslint-disable-next-line 
        [
            startTime,
            endTime,
            minSalary,
            unit,
            maxSalary,
            mon,
            tue,
            wed,
            thu,
            fri,
            sat,
            sun,
            agreement,
            genderRequireds,
            typeGender
        ]
    );

    return (
        <div
            style={{
                margin: "20px 0px",
                border: "solid gray 1px",
                borderRadius: "5px",
                padding: "20px 40px",
                position: "relative"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    display: props.type === TYPE.PARTTIME ? 'block' : 'none'
                }}
            >
                <IptLetter value={`Ca số: ${props.index + 1} `} />
            </div>
            <div style={{ display: props.type === TYPE.INTERNSHIP ? 'none' : 'flex' }}>
                <InputTitle
                    title="Chọn thời gian:"
                    widthLabel="80px"
                    style={{ width: "50%", position: "relative" }}
                >
                    <TimePicker
                        placeholder="Bắt đầu"
                        format={"HH:mm"}
                        onChange={(time: any, timeString: string) => setStartTime(timeString)}
                    />
                </InputTitle>
                <InputTitle
                    widthLabel="80px"
                    style={{ width: "50%", position: "relative" }}
                >
                    <TimePicker
                        placeholder="Kết thúc"
                        format={"HH:mm"}
                        onChange={(time: any, timeString: string) => setEndTime(timeString)}
                    />
                </InputTitle>
            </div>
            <>
                <InputTitle title="Mức lương" >
                    <Switch
                        defaultChecked={true}
                        style={{ marginRight: " 10px" }}
                        onChange={
                            (event: boolean) => {
                                setAgreement(event);
                            }
                        }
                    />
                    {!agreement ? "Theo thỏa thuận" : "Theo định mức"}
                </InputTitle>
                <Row >
                    <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                        <IptLetterP value={"Tối thiểu(VND)"} >
                            <InputNumber
                                placeholder='ex: 5000000'
                                min={0}
                                step={1000}
                                onChange={(value: number) => setMinsalary(value)}
                                disabled={!agreement}
                            />
                        </IptLetterP>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                        <IptLetterP value={"Tối đa(VND)"}  >
                            <InputNumber
                                placeholder='ex: 5000000'
                                min={minSalary + 1000}
                                step={1000}
                                onChange={(value: number) => setMaxSalary(value)}
                                disabled={!agreement}
                            />
                        </IptLetterP>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                        <IptLetterP value={"Theo"} >
                            <Select
                                style={{ width: "90px" }}
                                defaultValue="ca"
                                placeholder="ex: giờ"
                                onChange={(value: string) => setUnit(value)}
                                disabled={!agreement}
                            >
                                <Option key={"1"} value={"ca"} >Ca</Option>
                                <Option key={"2"} value={"giờ"} >Giờ</Option>
                                <Option key={"3"} value={"ngày"} >Ngày</Option>
                                <Option key={"4"} value={"tháng"} >Tháng</Option>
                                <Option key={"5"} value={"sản phẩm"} >Sản phẩm</Option>
                            </Select>
                        </IptLetterP>
                    </Col>
                </Row>
            </>
            <div style={{ display: props.type === TYPE.INTERNSHIP ? 'none' : 'block' }}>
                <InputTitle title="Ngày làm" children={timeSetup} />
            </div>
            <>
                <InputTitle title="Đối tượng" children={target} />
            </>
            <>
                <Button
                    type={"danger"}
                    icon="delete"
                    style={{
                        marginRight: "10px",
                        display: props.removeButton ? "block" : "none"
                    }}
                    onClick={() => props.removeShift ? props.removeShift(props.id) : () => { }}
                >
                    Xóa ca
                </Button>
                {/* <Button type="dashed" icon="undo">Reset</Button> */}
            </>
        </div >
    )
}