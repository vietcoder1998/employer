import { Input, Select, Form } from "antd";
import React from 'react';
import { TYPE } from "../../../../const/type";
import { Required } from "../common/Common";

let { Option } = Select;

interface IInputitleProps {
    title?: any;
    widthLabel?: string;
    widthComponent?: string;
    value?: string;
    listValue?: Array<{ label?: string, value?: any }>;
    type?: string;
    widthInput?: string;
    defaultValue?: string;
    placeholder?: string;
    children?: any;
    style?: React.CSSProperties;
    widthSelect?: string;
    disabled?: boolean;
    onChange?: Function;
    required?: boolean;
    showErrorSelected?: boolean
}

interface INewSelect {
    listValue?: Array<{ label?: string, value?: string }>;
    value?: string;
    placeholder?: string;
    defaultValue?: string;
    widthSelect?: string;
    disabled?: boolean;
    onChange?: Function;
    showErrorSelected?: boolean
}

interface INewInput {
    disabled?: boolean;
    value?: string;
    placeholder?: string;
    defaultValue?: string;
    widthInput?: string;
    onChange?: Function;
}
const strForSearch = str => {
    return str
        ? str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        : str;
};

export const NewInput = (props: INewInput) => {
    let { defaultValue, value, placeholder, onChange, widthInput, disabled } = props;

    return (
        <Input
            placeholder={placeholder}
            defaultValue={defaultValue}
            style={{ width: widthInput ? widthInput : "auto" }}
            onChange={(event: any) => onChange(event.target.value)}
            value={value}
            maxLength={220}
            disabled={disabled ? disabled : false}
        />)
}

export const NewSelect = (props: INewSelect) => {
    let { placeholder, listValue, onChange, widthSelect, disabled, value, showErrorSelected, } = props;

    return (
        <Form style={{ width: '100%' }}>
            <Form.Item validateStatus={showErrorSelected ? 'error' : null} help={showErrorSelected ? 'Bạn chưa chọn nội dung !' : ''}  >
                <Select
                    showSearch
                    placeholder={placeholder}
                    optionFilterProp="children"
                    style={{ width: widthSelect ? widthSelect : "200px" }}
                    value={value}
                    onChange={(event: any) => onChange(event)}
                    disabled={disabled ? disabled : false}
                    filterOption={(input, option) => {
                        if (option.props.value) {
                            // console.log(option.props.value)
                            return strForSearch(option.props.children).includes(
                                strForSearch(input)
                            );
                        } else {
                            return false;
                        }
                    }}
                >
                    {
                        listValue &&
                            listValue.length > 0 ?
                            listValue.map(
                                (item, index) => <Option key={index} value={item.value}>{item.label}</Option>
                            ) : null
                    }
                </Select>
            </Form.Item></Form>

    )
}

export const InputTitle = (props: IInputitleProps) => {
    let {
        defaultValue,
        value,
        listValue,
        placeholder,
        children,
        onChange,
        style,
        widthInput,
        widthSelect,
        required,
        showErrorSelected
    } = props;
    let ComponentReturn;
    const defaultStyle = {
        margin: "20px 0px",
    }

    switch (props.type) {
        case TYPE.INPUT:
            ComponentReturn = (
                <NewInput
                    widthInput={widthInput}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={onChange ? onChange : () => { }}
                />);
            break;

        case TYPE.SELECT:
            ComponentReturn = (
                <NewSelect
                    defaultValue={defaultValue}
                    listValue={listValue}
                    value={value}
                    placeholder={placeholder}
                    onChange={(event: any) => onChange ? onChange(event) : () => { }}
                    widthSelect={widthSelect}
                    showErrorSelected={showErrorSelected}
                />
            );
            break;
        default:
            ComponentReturn = null;
            break;
    }

    try {
        return (
            <div
                className="input-title"
                style={style ? style : defaultStyle}
            >
                <div
                    className="title-inside"
                    style={{
                        fontWeight: 500,
                        lineHeight: "30px",
                        minWidth: 116,
                        width: !props.widthLabel ? undefined : props.widthLabel
                    }}
                >
                    {props.title} {required ? <Required /> : ''}
                </div>
                {children ? children : ComponentReturn}
            </div>)
    } catch (err) {
        return (<span>bug</span>)
    }
}