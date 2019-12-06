import React from 'react'
import { Icon, Button, Avatar, Tabs, Progress, Tooltip, Modal, Steps, Result } from 'antd';
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../common/const/actions';
import { TYPE } from '../../../../../common/const/type';
import { _requestToServer } from '../../../../../services/exec';
import { POST, PUT, DELETE } from '../../../../../common/const/method';
import { IAppState } from '../../../../../redux/store/reducer';
import { IMapState } from '../../../../../redux/models/mutil-box';
import { EMPLOYER_HOST } from '../../../../../environment/dev';
import { VerifiedProfile } from '../../../layout/verified-profile/VerifiedProfile';
// import './AdminAccount.scss';
import { routeLink, routePath } from '../../../../../common/const/break-cumb';
import Loading from '../../../layout/loading/Loading';
import { IAdminAccount } from '../../../../../redux/models/admin-account';
import AdminProfile from '../../../layout/admin-profile/AdminProfile';
const { TabPane } = Tabs;
const { Step } = Steps;

interface IAdminAccountState {
    title?: string;
    type_cpn?: string;
    id?: string;
    body?: IAdminAccount;
    visible?: boolean;
    process?: boolean;
    loading?: boolean;
    fail?: boolean;
    admin_account?: IAdminAccount
}

interface IAdminAccountProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getAccountAdmin: Function;
    getJobService: Function;
    handleModal: Function;
}

class AdminAccount extends React.Component<IAdminAccountProps, IAdminAccountState> {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            body: null,
            type_cpn: TYPE.CREATE,
            visible: false,
            process: false,
            loading: false,
            fail: false,
        }
    }

    async componentDidMount() {
        await this.props.getAccountAdmin();
    };

    static getDerivedStateFromProps(nextProps: IAdminAccountProps, prevState: IAdminAccountState) {
        if (nextProps.admin_account && nextProps.admin_account !== prevState.admin_account)
            return {
                admin_account: nextProps.admin_account,
                body: nextProps.admin_account
            }

        return null
    }

    createRequest = async (type: string) => {
        // let { id, body } = this.state;
        // await this.setState({ loading: true })
    }

    render() {
        let { body, loading, fail } = this.state;
        if (fail) {
            return <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        }

        if (loading && !fail) {
            return <Loading />
        }

        return (
            <>
                <div className='common-content'>
                    <h5>
                        Tình trạng hồ sơ
                    </h5>
                    <AdminProfile data={body} />
                </div >
            </>
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getAccountAdmin: () =>
        dispatch({ type: REDUX_SAGA.ADMIN_ACCOUNT.GET_ADMIN_ACCOUNT }),
    handleMap: (mapState: IMapState) =>
        dispatch({
            type: REDUX.MAP.SET_MAP_STATE,
            mapState
        }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    mapState: state.MutilBox.mapState,
    admin_account: state.AdminAccount,
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccount)