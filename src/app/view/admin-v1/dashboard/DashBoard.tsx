import React from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
const Switch = require("react-router-dom").Switch;

interface IMoreInfoProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function MoreInfo(props?: IMoreInfoProps) {
    let { path } = props.match;
    return (
        <div>
        
        </div>
    )
};