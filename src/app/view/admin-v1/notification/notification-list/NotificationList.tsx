import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../const/actions';
import { Icon } from 'antd';
import { NotUpdate } from '../../../layout/common/Common';
import { IAppState } from '../../../../../redux/store/reducer';
import Loading from '../../../layout/loading/Loading';
import NotiItem from '../../../layout/notification-item/NotiItem';
import { INoti } from '../../../../../models/notis';
import randomID from '../../../../../utils/randomID';

interface INotiticationsListProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getListNoti: (pageIndex?: number, pageSize?: number) => any;
}

interface INotiticationsListState {
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    employerID?: string;
    jobNameID?: string;
    jobId?: string;
    listAnnouTypes?: Array<any>;
    createdDate?: number;
    hidden?: boolean;
    listNoti?: Array<any>;
    id?: string;
    initLoading?: boolean;
    loadingMore?: boolean;
    count?: number;
    loading?: boolean
};

class NotiticationsList extends PureComponent<INotiticationsListProps, INotiticationsListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            createdDate: undefined,
            hidden: undefined,
            listNoti: [],
            id: "",
            initLoading: false,
            loading: false,
            loadingMore: false,
            pageIndex: 0,
            pageSize: 10,
        }
    };

    static getDerivedStateFromProps(nextProps: INotiticationsListProps, prevState: INotiticationsListState) {
        if (
            nextProps.listNoti &&
            (nextProps.pageIndexNoti === 0 ||
                nextProps.pageIndexNoti !== prevState.pageIndex)
        ) {
            let { listNoti } = prevState;
            listNoti = listNoti.concat(nextProps.listNoti);

            return {
                listNoti,
            };
        }
        return {
            loadingMore: false
        };
    };

    load_more = true;
    async componentDidMount() {
        window.addEventListener("scroll", (event: any) => {
            if (window.innerHeight + window.scrollY >= document.querySelector("main").clientHeight) {
                if (this.load_more) {
                    this.setState({ loadingMore: true });
                    let { pageSize, pageIndex } = this.state;
                    pageIndex = pageIndex + 1;

                    this.props.getListNoti(pageIndex, pageSize);
                    this.setState({ pageSize, pageIndex });
                }
            }
        })
    };

    onLoadMore = async () => {
        await this.setState({
            loadingMore: true,
        });
    };

    setSeen = (id?: string) => {
        let { listNoti } = this.state;
        console.log(id);
        listNoti.forEach((item?: INoti) => {
            if (id === item.id) {
                console.log(item.seen);
                item.seen = !item.seen;
            }
        });

        this.setState({ listNoti })
    }

    ListNoti = () => {
        let { pageSize, listNoti } = this.state;

        let listNoti_view = listNoti && listNoti && listNoti.length > 0 ?
            listNoti.map(
                (item: INoti) =>
                    <NotiItem
                        key={randomID(16)}
                        item={item}
                        getListNoti={
                            () => this.props.getListNoti(0, pageSize)
                        }
                        setSeen={this.setSeen}
                    />) : <NotUpdate msg="Không có thông báo" />
        return <div className="list-noti-show">
            {listNoti_view}
        </div>
    };

    componentWillUnmount() {
        this.load_more = false;
        document.removeEventListener("scroll", () => {
        })
    }

    render() {
        let {
            loadingMore,
            loading,
        } = this.state;

        let { totalItems } = this.props;

        if (loading) {
            return <Loading />
        }

        return (
            <div className={"notification-list"}>
                <h5>
                    Danh sách thông báo
                </h5>
                <div>
                    {
                        totalItems && totalItems > 0 ? this.ListNoti() : <NotUpdate msg="Chưa có thông báo" />
                    }
                </div>
                <div className="a_c" style={{ height: 25 }}>
                    {loadingMore ? <Icon type="loading" style={{ fontSize: 25, color: "blue" }} /> : ""}
                </div>
            </div>
        )
    };
}


const mapDispatchToProps = (dispatch: any, ownProps: INotiticationsListProps) => ({
    getListNoti: (pageIndex?: number, pageSize?: number) => dispatch({
        type: REDUX_SAGA.NOTI.GET_NOTI,
        pageIndex,
        pageSize,
    }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listNoti: state.Notis.items,
    totalItems: state.Notis.totalItems,
    pageIndexNoti: state.Notis.pageIndex,
    pageSizeNoti: state.Notis.pageSize,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NotiticationsList);