import React, { PureComponent, Fragment } from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import { connect } from 'react-redux';
const Switch = require("react-router-dom").Switch;

interface ConvernientServiceState {
    show_menu: boolean;
    to_logout: boolean;
}

interface ConvernientServiceProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getJobNames: Function;
    getTypeManagement: Function;
}

class ConvernientService extends PureComponent<ConvernientServiceProps, ConvernientServiceState> {
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

export default connect(mapStateToProps, mapDispatchToProps)(ConvernientService)