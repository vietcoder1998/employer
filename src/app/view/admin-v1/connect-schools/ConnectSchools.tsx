import React, { PureComponent, Fragment } from 'react'
import './ConnectSchools.scss';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import ConnectSchoolList from './connect-school-list/ConnectSchoolList';
import SchoolDetail from './school-detail/SchoolDetail';
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
                    <ErrorBoundaryRoute path={`${path}/school/:id`} component={SchoolDetail} />
                    <ErrorBoundaryRoute path={`${path}/list`} component={ConnectSchoolList} />
                </Switch>
            </Fragment>
        )
    }
}
