import React, { PureComponent, Fragment } from 'react'
// import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
const Switch = require("react-router-dom").Switch;

interface ConvernientServiceState {
    show_menu: boolean;
    to_logout: boolean;
}

interface ConvernientServiceProps  {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default class ConvernientService extends PureComponent<ConvernientServiceProps, ConvernientServiceState> {
    render() {
    //    let  {path} = this.props.match
        return (
            <Fragment >
                <Switch>
                </Switch>
            </Fragment>
        )
    }
}