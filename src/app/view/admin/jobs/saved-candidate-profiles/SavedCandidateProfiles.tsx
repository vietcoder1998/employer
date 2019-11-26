import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from './../../../../../routes/ErrorBoundaryRoute';
import { connect } from 'react-redux';
import SavedCandidateProfilesList from './saved-candidate-profiles-list/SavedCandidateProfilesList';
import SavedCandidateProfileDetail from './saved-candidate-profiles-detail/SavedCandidateProfileDetail';
const Switch = require("react-router-dom").Switch;

interface SavedCandidateProfileState {
    show_menu: boolean;
    to_logout: boolean;
}

interface SavedCandidateProfileProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

class SavedCandidateProfile extends PureComponent<SavedCandidateProfileProps, SavedCandidateProfileState> {
    constructor(props) {
        super(props);
        this.state = {
            show_menu: true,
            to_logout: false,
        }
    }r

    render() {
        let {path} = this.props.match
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/list`} component={SavedCandidateProfilesList} />
                    <ErrorBoundaryRoute path={`${path}/create`} component={SavedCandidateProfileDetail} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedCandidateProfile)