import React, { PureComponent,  } from 'react'
import ErrorBoundaryRoute from './../../../../../routes/ErrorBoundaryRoute';
import SavedCandidateProfilesList from './saved-candidate-profiles-list/SavedCandidateProfilesList';
const Switch = require("react-router-dom").Switch;

interface ISavedCandidateProfileState {
    show_menu: boolean;
    to_logout: boolean;
}

interface ISavedCandidateProfileProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default class SavedCandidateProfile extends PureComponent<ISavedCandidateProfileProps, ISavedCandidateProfileState> {
    constructor(props) {
        super(props);
        this.state = {
            show_menu: true,
            to_logout: false,
        }
    }r

    render() {
        let  {path} = this.props.match
        return (
            < >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/list`} component={SavedCandidateProfilesList} />
                </Switch>
            </>
        )
    }
}
