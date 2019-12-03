import React, { PureComponent, Fragment } from 'react'
import './ConnectSchools.scss';
import { connect } from 'react-redux';
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import ConnectSchoolList from './ConnectSchoolsList/connect-school-list/ConnectSchoolList';
const Switch = require("react-router-dom").Switch;

interface ConnectSchoolsState {
    show_menu: boolean;
    to_logout: boolean;
}

interface ConnectSchoolsProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

class ConnectSchools extends PureComponent<ConnectSchoolsProps, ConnectSchoolsState> {
    constructor(props) {
        super(props);
        this.state = {
            show_menu: true,
            to_logout: false,
        }
    }

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

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

})

const mapStateToProps = (state: any, ownProps: any) => ({
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConnectSchools)