import React from 'react';
import moment from 'moment';

export const Titlelabel = (props: any) => {
    return <label className="title-label">{" " + props.value + " "}</label>
};

export const IptLetter = (props: any) => {
    return <span className="important-letter">{" " + props.value + " "}</span>
};

export const IptLetterP = (props: any) => {
    return (
        <div style={props.style ? {...props.style} : null}>
            <p>
                <span className="important-letter">{" " + props.value + " "}</span>
            </p>
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

export function Loading() {
    return (
        <div className='loading'>
            Loadding...
        </div>
    )
};

export function Timer(props: any) {
    return (
        <label className='timer'>
            {props.value && moment(props.value).format('DD/MM/YYYY')}
        </label>
    )
};