import React, { useRef } from 'react';
import { InputTitle } from '../input-tittle/InputTitle';
import { InputNumber, Switch, Select, Row, Col, Icon, Button, TimePicker, Radio, Input, Form } from 'antd';
import { IptLetterP, IptLetter, Required } from '../common/Common';
import randomID from '../../../../utils/randomID';
import { IShift } from '../../../../models/announcements';
import { TYPE } from '../../../../const/type';
import moment from 'moment';
const { Option } = Select;
const reg = /^-?[0-9]*(\.[0-9]*)?$/;

interface IShiftContent {
    key?: any;
    id?: any;
    index?: number;
    type?: string;
    removeButton?: boolean;
    disableChange?: boolean;
    onChange?: Function;
    removeShift?: Function;
    shift?: IShift;
    showErorrSelectTime?: boolean
    showErrorGenderRequireds?: boolean
    showErrorSalary?: boolean
}

export function newShift(): IShift {
    return {
        id: randomID(8),
        startTime: null,
        endTime: null,
        minSalary: 0,
        maxSalary: 0,
        unit: 'tháng',
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
        sun: false,
        genderRequireds: [
            { gender: 'BOTH', quantity: 1, id: null }
        ],

    };
};

export function ShiftContent(props: IShiftContent) {
    const [id, setId] = React.useState(randomID(16));
    const [startTime, setStartTime] = React.useState(null);
    // const [startTimeTemp, setStartTimeTemp] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);
    const [minSalary, setMinsalary] = React.useState(0);
    const [minSalaryText, setMinSalaryText] = React.useState('');
    const [maxSalary, setMaxSalary] = React.useState(0);
    const [maxSalaryText, setMaxSalaryText] = React.useState('');
    const [agreement, setAgreement] = React.useState(true);
    const [mon, setMon] = React.useState(false);
    const [tue, setTue] = React.useState(false);
    const [wed, setWed] = React.useState(false);
    const [thu, setThu] = React.useState(false);
    const [fri, setFri] = React.useState(false);
    const [sat, setSat] = React.useState(false);
    const [unit, setUnit] = React.useState("tháng");
    const [sun, setSun] = React.useState(false);
    const [typeGender, setTypeGender] = React.useState(true);
    const [genderRequireds, setGenderRequireds] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openTimeEnd, setOpenTimeEnd] = React.useState(false);

    const timeStartRef = useRef(null);

    let [valueGender, setValueGender] = React.useState([
        { gender: TYPE.MALE, quantity: 1, id: null },
        { gender: TYPE.FEMALE, quantity: 1, id: null }
    ]);
    let [valueBoth, setValueBoth] = React.useState([
        { gender: TYPE.BOTH, quantity: 1, id: null },
    ]);

    if (props.shift && props.shift.id !== id) {
        if (
            props.shift.minSalary === 0 &&
            props.shift.maxSalary === 0) {
            setAgreement(false)
        }

        setMaxSalary(props.shift.maxSalary);
        setMinsalary(props.shift.minSalary);
        let newMinSalaryText = `${props.shift.minSalary}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        let newMaxSalaryText = `${props.shift.maxSalary}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        setMinSalaryText(newMinSalaryText);
        setMaxSalaryText(newMaxSalaryText);
        // console.log(props.shift.startTime)
        setStartTime(props.shift.startTime);
        setEndTime(props.shift.endTime);
        setId(props.shift.id);
        setMon(props.shift.mon);
        setTue(props.shift.tue);
        setWed(props.shift.wed);
        setThu(props.shift.thu);
        setFri(props.shift.fri);
        setSat(props.shift.sat);
        // console.log(props.shift.unit)
        setUnit(props.shift.unit);
        setSun(props.shift.sun);
        setGenderRequireds(props.shift.genderRequireds)



        if (
            props.shift.genderRequireds &&
            props.shift.genderRequireds.length > 0
        ) {
            let newValueGender = valueGender;
            props.shift.genderRequireds.forEach((item: { id: string, quantity: number, gender: any }) => {
                if (item.gender === TYPE.BOTH) {
                    setTypeGender(false);
                    setValueBoth([item]);
                } else {
                    setTypeGender(true);
                    if (item.gender === TYPE.MALE) {
                        newValueGender[0] = item;
                    }

                    if (item.gender === TYPE.FEMALE) {
                        newValueGender[1] = item;
                    }

                    setValueGender(newValueGender);
                }
            });
        }
    }
    const target = () => {
        // if (props.shift.genderRequireds) {
        return (<div>
            <Radio.Group
                name="radiogroup"
                defaultValue={true}
                value={typeGender}
                onChange={
                    (event: any) => setTypeGender(event.target.value)
                }
            >
                <Radio value={false}>Theo Số lượng</Radio>
                <Radio value={true}>Theo giới tính</Radio>
            </Radio.Group>


            <div style={{ marginTop: 10, display: typeGender ? 'flex' : 'none' }}>
                {/* With Gender */}
                <div style={{ display: typeGender ? 'flex' : 'none' }}>
                    <Form >
                        <Form.Item validateStatus={valueGender[0].quantity == 0 && valueGender[1].quantity == 0 ? 'error' : ''} help={valueGender[0].quantity == 0 && valueGender[1].quantity == 0 ? 'Số lượng không được nhỏ hơn 1 !' : ''}>
                            <div style={{marginTop: '-5px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 25 }}>

                                <InputNumber
                                    min={0}
                                    max={10000}
                                    defaultValue={0}
                                    value={valueGender[0].quantity}
                                    onChange={
                                        (event: number) => {
                                            let newValueGender = valueGender;
                                            newValueGender[0].quantity = event;
                                            setValueGender([newValueGender[0], newValueGender[1]]);
                                            setGenderRequireds(valueGender)
                                        }
                                    }

                                />

                                <div style={{ margin: '0px 0px 0px 10px', }}>Nam</div>
                                <Icon type="man" />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginTop: '-10px' }}>
                                <Form>
                                    <Form.Item >
                                        <InputNumber
                                            min={0}
                                            max={10000}
                                            defaultValue={0}
                                            value={valueGender[1].quantity}
                                            onChange={
                                                (event: number) => {
                                                    let newValueGender = valueGender;
                                                    newValueGender[1].quantity = event;
                                                    setValueGender([newValueGender[0], newValueGender[1]]);
                                                    setGenderRequireds(valueGender)
                                                }
                                            }
                                        />
                                    </Form.Item>
                                </Form>
                                <div style={{ margin: '-22px 0px -22px 5px' }}>Nữ</div>
                                <Icon type="woman" />
                            </div>
                            {/* <Col xs={12} sm={12} md={12} lg={10} xl={24}>
                    
                </Col> */}
                        </Form.Item>
                    </Form>

                </div>
            </div >


            {/* With Both */}
            <div style={{ marginTop: 10, display: !typeGender ? 'block' : 'none' }}>
                {/* <Col xs={12} sm={12} md={12} lg={10} xl={12}> */}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Form>
                        <Form.Item validateStatus={valueBoth[0].quantity == 0 ? 'error' : ''} help={valueBoth[0].quantity == 0 ? 'Số lượng không được nhỏ hơn 1 !' : ''}>
                            <InputNumber
                                min={0}
                                max={10000}
                                defaultValue={0}
                                value={valueBoth[0].quantity}
                                onChange={
                                    (event: number) => {
                                        let newValueBoth = valueBoth[0];
                                        newValueBoth.quantity = event;
                                        setValueBoth([newValueBoth]);
                                        setGenderRequireds([newValueBoth]);

                                    }
                                }

                            />
                        </Form.Item>
                    </Form>
                    <div style={{ margin: '0px 0px 0px 5px' }}>Người</div>
                    <Icon type="user" />

                </div>
                {/* <IptLetterP value="Người" icon="team">
                            <InputNumber
                                min={0}
                                max={10000}
                                defaultValue={0}
                                value={valueBoth[0].quantity}
                                onChange={
                                    (event: number) => {
                                        let newValueBoth = valueBoth[0];
                                        newValueBoth.quantity = event;
                                        setValueBoth([newValueBoth]);
                                        setGenderRequireds([newValueBoth]);
                                    }
                                }
                            />
                        </IptLetterP> */}
                {/* </Col> */}
            </div>
        </div>)
        // }

        // return;
    };

    React.useEffect(
        () => {
            if (props.shift && props.onChange && !props.disableChange) {
                props.onChange({
                    startTime,
                    endTime,
                    minSalary: agreement ? minSalary : 0,
                    unit: agreement ? unit : null,
                    maxSalary: agreement ? maxSalary : 0,
                    mon,
                    tue,
                    wed,
                    thu,
                    fri,
                    sat,
                    sun,
                    genderRequireds

                });
            }

            return;
        },
        // eslint-disable-next-line
        [
            id,
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
            typeGender,
            valueGender,
            valueBoth,
        ]
    );

    if (!props.shift) {
        return
    }
    let temptTimeStart, temptTimeEnd
    return (
        <div
            // className='test'
            style={{
                margin: "10px 10px",
                borderRadius: "5px",
                padding: "2vh 2vw",
                position: "relative",
                border: 'solid 1px #d9d9d9'
            }}
        >
            <div
                style={{
                    // textAlign: "left",
                    display: props.type === TYPE.PARTTIME ? 'flex' : 'none',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottom: 'solid 1px #d9d9d9'
                }}

            >
                {/* <IptLetter value={`Ca số: ${props.index + 1} `} /> */}
                <div style={{ fontWeight: 'bold', fontSize: '1.1em' }} className="numberShift">{`Ca số: ${props.index + 1} `}</div>
                <Button
                    type={"danger"}
                    icon="delete"
                    style={{
                        marginRight: "10px",
                        display: props.removeButton ? "block" : "none",
                    }}
                    onClick={() => props.removeShift ? props.removeShift(props.index) : undefined}
                >
                    Xóa ca
                </Button>
            </div>

            <div style={{ display: props.type === TYPE.INTERNSHIP ? 'none' : 'block', paddingTop: 10 }}>
                <Row>
                    <Col sm={24} md={24} lg={4} xl={4} xxl={4}>
                        <p
                        >
                            Chọn thời gian<Required />
                        </p>
                    </Col>
                    <Form>
                        <Form.Item validateStatus={props.showErorrSelectTime ? 'error' : null} help={props.showErorrSelectTime ? 'Thời gian kết thúc phải lớn hơn thời gian ban đầu !' : ''} style={{ marginLeft: '200px' }}>
                            <Col sm={24} md={12} lg={5} xl={5} xxl={5}>

                                <TimePicker
                                    open={open}
                                    onOpenChange={() => {
                                        // console.log(startTime)
                                        setOpen(!open)
                                        if (temptTimeStart) {
                                            setStartTime(temptTimeStart)
                                        }
                                    }}
                                    key={128}
                                    placeholder="Bắt đầu"
                                    format={"HH:mm"}
                                    style={{ width: "100%" }}
                                    value={startTime ? moment(startTime, "HH:mm") : undefined}
                                    onChange={(time: any, timeString: string) => { temptTimeStart = timeString }}
                                    minuteStep={15}
                                    defaultOpenValue={moment('00:00', "HH:mm")}
                                    addon={() => (
                                        <Button size="small" type="primary" onClick={() => {
                                            setOpen(false)
                                            if (temptTimeStart) {
                                                setStartTime(temptTimeStart)
                                            }
                                        }}>
                                            Ok
                                        </Button>
                                    )}
                                />
                            </Col>
                            <Col sm={24} md={12} lg={5} xl={5} xxl={5}>
                                <TimePicker
                                    open={openTimeEnd}
                                    onOpenChange={() => {
                                        setOpenTimeEnd(!openTimeEnd)
                                        if (temptTimeEnd) {
                                            setEndTime(temptTimeEnd)
                                        }
                                    }}
                                    key={randomID(8)}
                                    placeholder="Kết thúc"
                                    format={"HH:mm"}
                                    style={{ width: "100%" }}
                                    value={endTime ? moment(endTime, "HH:mm") : undefined}
                                    defaultOpenValue={moment('00:00', "HH:mm")}
                                    onChange={(time: any, timeString: string) => { temptTimeEnd = timeString }}
                                    minuteStep={15}
                                    addon={() => (
                                        <Button size="small" type="primary" onClick={() => {
                                            setOpenTimeEnd(!openTimeEnd)
                                            if (temptTimeEnd) {
                                                setEndTime(temptTimeEnd)
                                            }
                                        }}>
                                            Ok
                                        </Button>
                                    )}

                                />
                            </Col>
                        </Form.Item>
                    </Form>
                </Row>
            </div>
            <>

                <Row style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} style={{marginTop: '20px'}}>
                        <InputTitle title="Mức lương" />
                        {/* </InputTitle> */}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={5} xl={5} xxl={5} style={{marginTop: '20px'}}>
                        <Switch
                            defaultChecked={true}
                            style={{ marginRight: " 10px" }}
                            checked={agreement}
                            onChange={
                                (event: boolean) => setAgreement(event)
                            }
                            disabled={props.disableChange}
                        />
                        {!agreement ? "Theo thỏa thuận" : "Theo định mức"}
                    </Col>
                    <Form>
                        <Form.Item validateStatus={props.shift.minSalary > props.shift.maxSalary ? 'error' : null} help={props.shift.minSalary > props.shift.maxSalary ? 'Lương tối đa phải lớn hơn lương tối thiểu !' : ''} >

                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} style={{width: '50%'}}>
                                <IptLetterP value={"Tối thiểu(VND)"} style={{ marginTop: '-10px' }}>

                                    <Input
                                        placeholder='ex: 5.000.000'
                                        value={minSalaryText}
                                        style={{ width: '100%', maxWidth: '200px' }}
                                        onChange={(event) => {
                                            let newMinSalary = event.target.value.replace(/\./g, '');
                                            if (reg.test(newMinSalary)) {
                                                setMinsalary(parseInt(newMinSalary));
                                                let newMinSalaryText = `${newMinSalary}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                                                setMinSalaryText(newMinSalaryText);
                                            }
                                        }}
                                        disabled={!agreement}
                                    />

                                </IptLetterP>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={5} xl={5} xxl={5} style={{width: '50%'}}>
                                <IptLetterP value={"Tối đa(VND)"} style={{ marginTop: '-10px' }}>
                                    <Input
                                        value={maxSalaryText}
                                        placeholder='ex: 5.000.000'
                                        min={minSalary}
                                        style={{ width: '100%', maxWidth: '200px' }}
                                        step={1000}
                                        onChange={(event) => {
                                            let newMaxSalary = event.target.value.replace(/\./g, '');
                                            if (reg.test(newMaxSalary)) {
                                                setMaxSalary(parseInt(newMaxSalary));
                                                let newMaxSalaryText = `${newMaxSalary}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                                                setMaxSalaryText(newMaxSalaryText);
                                            }
                                        }}
                                        disabled={!agreement}
                                    />
                                </IptLetterP>
                            </Col>
                        </Form.Item>
                    </Form>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4} style={{marginTop: '13px'}}>
                        <IptLetterP value={"Theo"} style={{ marginTop: '-15px' }}>
                            <Select
                                style={{ width: "90px" , marginTop: '12px'}}
                                value={unit ? unit : "tháng"}
                                placeholder="ex: giờ"
                                onChange={(value: string) => setUnit(value)}
                                disabled={!agreement}
                                
                            >
                                <Option key={"4"} value={"tháng"} >Tháng</Option>
                                <Option key={"1"} value={"ca"} >Ca</Option>
                                <Option key={"2"} value={"giờ"} >Giờ</Option>
                                <Option key={"3"} value={"ngày"} >Ngày</Option>
                                <Option key={"5"} value={"sản phẩm"} >Sản phẩm</Option>
                            </Select>
                        </IptLetterP>
                    </Col>
                </Row>
            </>
            <Row style={{ display: props.type === TYPE.INTERNSHIP ? 'none' : 'block' }}>
                <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} >
                    <InputTitle title="Ngày làm" required={true} style={{ marginTop: 10 }} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20} >
                    <label key={2} className={mon ? 'time-span' : 'time-span-unselected'} onClick={() => setMon(!mon)}>
                        T2
                    </label>
                    <label key={3} className={tue ? 'time-span' : 'time-span-unselected'} onClick={() => setTue(!tue)}>
                        T3
                    </label>
                    <label key={4} className={wed ? 'time-span' : 'time-span-unselected'} onClick={() => setWed(!wed)}>
                        T4
                    </label>
                    <label key={5} className={thu ? 'time-span' : 'time-span-unselected'} onClick={() => setThu(!thu)}>
                        T5
                    </label>
                    <label key={6} className={fri ? 'time-span' : 'time-span-unselected'} onClick={() => setFri(!fri)}>
                        T6
                    </label>
                    <label key={6} className={sat ? 'time-span' : 'time-span-unselected'} onClick={() => setSat(!sat)}>
                        T7
                    </label>
                    <label key={7} className={sun ? 'time-span' : 'time-span-unselected'} onClick={() => setSun(!sun)}>
                        CN
                    </label>
                </Col>
            </Row>
            <Row>
                <Form>
                    <Form.Item validateStatus={props.showErrorGenderRequireds ? 'error' : null} help={props.showErrorGenderRequireds ? 'Số lượng ít nhất là 1!!!' : ''}>
                        <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} >
                            <InputTitle title="Đối tượng" required={true} style={{ marginTop: 0, marginBottom: 0 }} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20} >
                            {target()}
                        </Col>
                    </Form.Item>
                </Form>
            </Row>
            <>

                {/* <Button type="dashed" icon="undo">Reset</Button> */}
            </>
        </div >
    )
}