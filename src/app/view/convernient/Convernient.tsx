import React from 'react'
import { Promotion } from './promotion/Promotion';
import ErrorBoundaryRoute from '../../../routes/ErrorBoundaryRoute';
const Switch = require("react-router-dom").Switch;

interface IMoreInfoProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function MoreInfo(props?: IMoreInfoProps) {
    let { path } = props.match;
    return (
        < >
            <Switch>
                <ErrorBoundaryRoute path={`${path}/khuyen-mai`} component={Promotion} />
            </Switch>
        </>
    )
};