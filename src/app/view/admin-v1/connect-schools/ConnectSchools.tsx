import React, { PureComponent,  } from 'react'
import './ConnectSchools.scss';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import ConnectSchoolList from './connect-school-list/ConnectSchoolList';
import SchoolDetail from './school-detail/SchoolDetail';
// import UnConnectSchoolList from './unconnect-school-list/UnConnectSchoolList';
// import PendingSchoolsList from './pending-school-list/PendingSchoolList';
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
            < >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/school/:id`} component={SchoolDetail} />
                    <ErrorBoundaryRoute path={`${path}/list`} component={ConnectSchoolList} />
                </Switch>
            </>
        )
    }
}
