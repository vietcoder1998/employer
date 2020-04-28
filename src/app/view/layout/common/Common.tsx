import React, { CSSProperties } from 'react';
import moment from 'moment';
import { Icon } from 'antd';

interface IIptLetterProps {
    style?: CSSProperties,
    value?: any,
    children?: any,
}

interface ITimer {
    value?: number;
    style?: CSSProperties;
    msg?: string;
}

export const Titlelabel = (props?: IIptLetterProps) => {
    return <label className="title-label">{" " + props.value + " "}</label>
};

export const LinkTo = (props?: any) => {
    return <a className='underline' {...props} rel="noopener noreferrer" children={props.children} />
}

export const CBtn = (props?: any) => {
    return (<div className="c-btn" onClick={() => props.onClick ? props.onClick() : undefined}><Icon type={props.type} style={{ fontSize: props.size }} /></div>)
}

export const IptLetter = (props?: any) => {
    return <label style={props.style ? props.style : { padding: "2px 5px" }} > <span className="important-letter">{" " + props.value + "  "}</span>{props.children ? props.children : ""}</label>
};

export const Required = () => <span style={{ color: "red", marginBottom: 5, marginLeft: 2 }}>*</span>

export const IptLetterP = (props?: any) => {
    return (
        <div style={props.style ? { ...props.style } : null}>
            <div style={{ marginTop: 10 }}>
                <span className="important-letter">{props.icon ? <Icon type={props.icon} /> : " "}{" " + (props.value ? props.value : " ") + " "}</span>
                {props.required ? <Required /> : ''}
            </div>
            {props.children ? props.children : null}
        </div>
    )
};

export const FirstLetter = (props: any) => {
    return <span className="first-letter">{" " + props.value + " "}</span>
};

export const IconLabel = (props: any) => {
    return <div className="icon_label">{props.icon}</div>
};

export function Timer(props?: ITimer) {
    return (
        <label className='timer' style={props.style ? props.style : undefined}>
            {props.msg ? props.msg : ''}
            {props.value && moment(props.value).format('DD/MM/YYYY')}
        </label>
    )
};

export const NotUpdate = (props?: { msg?: any, children?: any, warning?: boolean }) => (
    <label style={{ fontStyle: "italic", color: props.warning ? "red" : undefined }}>
        {props.children ? props.children : (props.msg ? props.msg : "Chưa cập nhật")}
    </label>
);