import React from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import NewInfo from './NewInfo';
import Api from './Api';
import { routePath } from '../../../../const/break-cumb';
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
                <ErrorBoundaryRoute path={path + routePath.NEW_INFO} component={NewInfo} />
                <ErrorBoundaryRoute path={path + routePath.API} component={Api} />
            </Switch>
        </>
    )
}