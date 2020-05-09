import React from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import Guide from './guide/Guide';
import AnnoDefault from './annou-default/AnnoDefault';
import Community from './community/Community';
import FeedBack from './feed-back/FeedBack';
import Privacy from './privacy/Privacy';
const Switch = require("react-router-dom").Switch;

interface IProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function MoreInfo(props?: IProps) {
    let { path } = props.match;
    return (
        < >
            <Switch>
                <ErrorBoundaryRoute path={`${path}/guide`} component={Guide} />
                <ErrorBoundaryRoute path={`${path}/community`} component={Community} />
                <ErrorBoundaryRoute path={`${path}/annou-default`} component={AnnoDefault} />
                <ErrorBoundaryRoute path={`${path}/feed-back`} component={FeedBack} />
                <ErrorBoundaryRoute path={`${path}/privacy`} component={Privacy} />
            </Switch>
        </>
    )
};