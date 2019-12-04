import React, { Fragment } from 'react'
import ErrorBoundaryRoute from './../../../../../routes/ErrorBoundaryRoute';
import FindCandidatesList from './find-candidates-list/FindCandidatesList';
import FindCandidatesDetail from './find-candidates-detail/FindCandidatesDetail';
const Switch = require("react-router-dom").Switch;

interface IFindCandidatesProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function FindCandidates(props: IFindCandidatesProps) {
    let { path } = props.match
    return (
        <Fragment >
            <Switch>
                <ErrorBoundaryRoute path={`${path}/list`} component={FindCandidatesList} />
                <ErrorBoundaryRoute path={`${path}/detail/:id`} component={FindCandidatesDetail} />
            </Switch>
        </Fragment>
    )
}