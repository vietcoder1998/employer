import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux';
import ErrorBoundaryRoute from '../../../../../routes/ErrorBoundaryRoute';
import CreateRegions from './create-regions/CreateRegions';
import ListRegions from './list-regions/ListRegions';

const Switch = require("react-router-dom").Switch;

interface RegionsState {
    show_menu: boolean;
    to_logout: boolean;
}

interface RegionsProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getJobNames: Function;
    getTypeManagement: Function;
}

class Regions extends PureComponent<RegionsProps, RegionsState> {
    constructor(props) {
        super(props);
        this.state = {
            show_menu: true,
            to_logout: false,
        }
    }

    render() {
        let {path} = this.props.match
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute exact path={`${path}/create`} component={CreateRegions} />
                    <ErrorBoundaryRoute exact path={`${path}/list`} component={ListRegions} />
                </Switch>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const mapStateToProps = (state, ownProps) => ({
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Regions)