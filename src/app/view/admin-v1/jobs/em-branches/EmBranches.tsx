import React, {  } from 'react'
import ErrorBoundaryRoute from './../../../../../routes/ErrorBoundaryRoute';
import EmBranchesList from './em-branches-list/EmBranchesList';
import EmBranchesCreate from './em-branches-create/EmBranchesCreate';
const Switch = require("react-router-dom").Switch;

interface IEmBranchesState {
}

interface IEmBranchesProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function EmBranches(props: IEmBranchesProps) {
    let { path } = props.match
    return (
        < >
            <Switch>
                <ErrorBoundaryRoute path={`${path}/list`} component={EmBranchesList} />
                <ErrorBoundaryRoute path={`${path}/create`} component={EmBranchesCreate} />
                <ErrorBoundaryRoute path={`${path}/fix/:id`} component={EmBranchesCreate} />
            </Switch>
        </>
    )
}
