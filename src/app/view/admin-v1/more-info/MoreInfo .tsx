import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import AdminAccount from './admin-account/AdminAccount';
import AnnouncementsList from './announcements/AnnouncementsList';
const Switch = require("react-router-dom").Switch;

interface IMoreInfoProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default class MoreInfo extends PureComponent<IMoreInfoProps> {
    render() {
        let  {path} = this.props.match;
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/admin-account`} component={AdminAccount} />
                    <ErrorBoundaryRoute path={`${path}/announcements`} component={AnnouncementsList} />
                </Switch>
            </Fragment>
        )
    }
}