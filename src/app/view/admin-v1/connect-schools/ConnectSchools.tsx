import React, { PureComponent, Fragment } from 'react'
import './ConnectSchools.scss';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import ConnectSchoolList from './ConnectSchoolsList/connect-school-list/ConnectSchoolList';
const Switch = require("react-router-dom").Switch;

interface ConnectSchoolsState {
    show_menu: boolean;
    to_logout: boolean;
}

interface ConnectSchoolsProps  {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default class ConnectSchools extends PureComponent<ConnectSchoolsProps, ConnectSchoolsState> {
   
    render() {
           let  {path} = this.props.match
        return (
            <Fragment >
                <Switch>
                    {/* <ErrorBoundaryRoute path={`${path}/jobs`} component={Jobs} /> */}
                    <ErrorBoundaryRoute path={`${path}/list`} component={ConnectSchoolList} />
                </Switch>
            </Fragment>
        )
    }
}
