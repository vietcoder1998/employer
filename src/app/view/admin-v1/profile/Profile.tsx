import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import AdminAccount from './admin-account/AdminAccount';
const Switch = require("react-router-dom").Switch;

interface IMoreInfoProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function Profile(props: IMoreInfoProps) {
    let { path } = props.match;

    console.log(props)
    return (
        <Fragment >
            <Switch>
                <ErrorBoundaryRoute path={`${path}/admin-account`} component={AdminAccount} />
            </Switch>
        </Fragment>
    )
}