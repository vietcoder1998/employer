import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import NotificationList from './notification-list/NotificationList';
const Switch = require("react-router-dom").Switch;

interface INotiticationProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function Notitication(props: INotiticationProps) {
    let { path } = props.match;
    return (
        <>
            <Switch>
                <ErrorBoundaryRoute path={`${path}/list`} component={NotificationList} />
            </Switch>
        </>
    )
}