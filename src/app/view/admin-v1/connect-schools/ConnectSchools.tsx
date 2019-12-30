import React, { PureComponent,  } from 'react'
import './ConnectSchools.scss';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import SchoolDetail from './school-detail/SchoolDetail';
import UnConnectSchoolList from './unconnect-school-list/UnConnectSchoolList';
import ConnectedSchoolList from './connected-school-list/ConnectedSchoolList';
import { routePath } from '../../../../const/break-cumb';
import PendingSchoolList from './pending-school-list/PendingSchoolList';
import RejectedSchoolList from './rejected-school-list/RejectedSchoolList';
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
                    <ErrorBoundaryRoute path={`${path}${routePath.REJECTED}/list`} component={RejectedSchoolList} />
                    <ErrorBoundaryRoute path={`${path}${routePath.PENDING}/list`} component={PendingSchoolList} />
                    <ErrorBoundaryRoute path={`${path}${routePath.UNCONNECT}/list`} component={UnConnectSchoolList} />
                    <ErrorBoundaryRoute path={`${path}${routePath.CONNECTED}/list`} component={ConnectedSchoolList} />

                </Switch>
            </>
        )
    }
}
