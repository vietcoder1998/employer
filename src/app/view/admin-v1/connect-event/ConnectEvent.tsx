import React, { PureComponent,  } from 'react'
import './ConnectEvent.scss';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import ConnectedSchoolList from './connect-school-list/ConnectSchoolList';
import { routePath } from '../../../../const/break-cumb';
import EventSchool from './event-schools/EventSchools';
import SchoolDetail from './school-detail/SchoolDetail';
const Switch = require("react-router-dom").Switch;

interface ConnectEventState {
    show_menu: boolean;
    to_logout: boolean;
}

interface ConnectEventProps  {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default class ConnectEvent extends PureComponent<ConnectEventProps, ConnectEventState> {
    render() {
           let  {path} = this.props.match
        return (
            < >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/school/:id`} component={SchoolDetail} />
                    <ErrorBoundaryRoute path={`${path}${routePath.CONNECTED}/list`} component={ConnectedSchoolList} />
                    <ErrorBoundaryRoute path={`${path}${routePath.EVENT}`} component={EventSchool} />
                </Switch>
            </>
        )
    }
}
