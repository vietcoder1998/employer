import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from '../../../routes/ErrorBoundaryRoute';
import AnnouncementsList from './announcements/announcement-list/AnnouncementsList';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import AnnouncementsDetail from './announcements/announcement-detail/AnnouncementsDetail';
import { Tabs, Affix } from 'antd';
import { IAppState } from '../../../redux/store/reducer';
import { connect } from 'react-redux';
import './Announcement.scss';
import { IAnnouType } from '../../../redux/models/annou-types';
import { routeLink } from '../../../common/const/break-cumb';
import { TYPE } from '../../../common/const/type';
import { REDUX_SAGA } from '../../../common/const/actions';

const Switch = require("react-router-dom").Switch;
const { TabPane } = Tabs;

interface IAnnoucementsProps {
    match?: any;
    history?: any;
    list_annou_type?: Array<IAnnouType>
    getListAnnouType: () => any;
}

function Annoucements(props?: IAnnoucementsProps) {
    let { path } = props.match;
    React.useState(() => {
        props.getListAnnouType();
    })
    return (
        < div className="announcements-list">
            <Header />
            <Affix offsetTop={0} >
                <Tabs defaultActiveKey="ALL" onChange={(event: any) => {
                    props.history.push(routeLink.ANNOUNCEMENT + `/list?type=${event}`)
                }}  >
                    <TabPane key={TYPE.ALL} tab={`Tất cả`} />
                    {props && props.list_annou_type.map((item?: IAnnouType, index?: number) => (
                        // @ts-ignore
                        <TabPane key={item.id} tab={`${item.name}`} />
                    ))}
                </Tabs>
            </Affix>
            <Switch>
                <ErrorBoundaryRoute path={`${path}/list`} component={AnnouncementsList} />
                <ErrorBoundaryRoute path={`${path}/detail/:id`} component={AnnouncementsDetail} />
            </Switch>
            <Footer />
        </div >
    )
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getListAnnouType: () => dispatch({
        type: REDUX_SAGA.ANNOU_TYPES.GET_ANNOU_TYPES
    })
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_annou_type: state.AnnouTypes.items
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Annoucements)