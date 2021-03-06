import React from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import AdminAccount from './admin-account/AdminAccount';
const Switch = require("react-router-dom").Switch;

interface IProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function Profile(props: IProps) {
    let { path } = props.match;
    return (
        < >
            <Switch>
                <ErrorBoundaryRoute path={`${path}/admin-account`} component={AdminAccount} />
            </Switch>
        </>
    )
}