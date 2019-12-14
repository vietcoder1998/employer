import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import Guide from './guide/Guide';
import AnnoDefault from './annou-default/AnnoDefault';
import Community from './community/Community';
import FeedBack from './feed-back/FeedBack';
import Privacy from './privacy/Privacy';
// import AdminAccount from '../profile/admin-account/AdminAccount';
// import AnnouncementsList from './announcements/AnnouncementsList';
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
                    <ErrorBoundaryRoute path={`${path}/guide`} component={Guide} />
                    <ErrorBoundaryRoute path={`${path}/community`} component={Community} />
                    <ErrorBoundaryRoute path={`${path}/annou-default`} component={AnnoDefault} />
                    <ErrorBoundaryRoute path={`${path}/feed-back`} component={FeedBack} />
                    <ErrorBoundaryRoute path={`${path}/privacy`} component={Privacy} />
                </Switch>
            </Fragment>
        )
    }
}