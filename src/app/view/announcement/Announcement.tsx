import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from '../../../routes/ErrorBoundaryRoute';
import AnnouncementsList from './announcements/announcement-list/AnnouncementsList';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import AnnouncementsDetail from './announcements/announcement-detail/AnnouncementsDetail';
const Switch = require("react-router-dom").Switch;

interface IAnnoucementsProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function Annoucements(props?: IAnnoucementsProps) {
    let { path } = props.match;
    return (
        < >
            <Header />
            <Switch>
                <ErrorBoundaryRoute path={`${path}/list`} component={AnnouncementsList} />
                <ErrorBoundaryRoute path={`${path}/detail/:id`} component={AnnouncementsDetail} />
            </Switch>
            <Footer />
        </>
    )
}