import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from './../../../../../routes/ErrorBoundaryRoute';
import { connect } from 'react-redux';
import EmBranchesList from './em-branches-list/EmBranchesList';
import EmBranchesCreate from './em-branches-create/EmBranchesCreate';
const Switch = require("react-router-dom").Switch;

interface IEmBranchesState {
}

interface IEmBranchesProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

class EmBranches extends PureComponent<IEmBranchesProps, IEmBranchesState> {
    render() {
        let  {path} = this.props.match
        return (
            <Fragment >
                <Switch>
                    <ErrorBoundaryRoute path={`${path}/list`} component={EmBranchesList} />
                    <ErrorBoundaryRoute path={`${path}/create`} component={EmBranchesCreate} />
                    <ErrorBoundaryRoute path={`${path}/fix/:id`} component={EmBranchesCreate} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EmBranches)