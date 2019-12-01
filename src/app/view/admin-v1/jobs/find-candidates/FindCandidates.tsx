import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from './../../../../../routes/ErrorBoundaryRoute';
import { connect } from 'react-redux';
import FindCandidatesList from './find-candidates-list/FindCandidatesList';
import FindCandidatesDetail from './find-candidates-detail/FindCandidatesDetail';
const Switch = require("react-router-dom").Switch;

interface IFindCandidatesState {
    show_menu: boolean;
    to_logout: boolean;
}

interface IFindCandidatesProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

class FindCandidates extends PureComponent<IFindCandidatesProps, IFindCandidatesState> {
    render() {
        let  {path} = this.props.match
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/list`} component={FindCandidatesList} />
                    <ErrorBoundaryRoute path={`${path}/detail/:id`} component={FindCandidatesDetail} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FindCandidates)