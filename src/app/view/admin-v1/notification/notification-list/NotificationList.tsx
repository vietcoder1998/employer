import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../common/const/actions';
import { Icon } from 'antd';
import { NotUpdate } from '../../../layout/common/Common';
import { IAppState } from '../../../../../redux/store/reducer';
import Loading from '../../../layout/loading/Loading';
import NotiItem from '../../../layout/notification-item/NotiItem';
import { INoti } from '../../../../../redux/models/notis';
import randomID from '../../../../../common/utils/randomID';

function containsObject(obj?: INoti, list?: Array<INoti>) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return true;
        }
    }

    return false;
}
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
    list_annou_types?: Array<any>;
    createdDate?: number;
    hidden?: boolean;
    list_noti?: Array<any>;
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
            list_noti: [],
            id: "",
            initLoading: false,
            loading: false,
            loadingMore: false,
            pageIndex: 0,
            pageSize: 1,
        }
    };

    static getDerivedStateFromProps(nextProps: INotiticationsListProps, prevState: INotiticationsListState) {
        if (
            nextProps.list_noti &&
            (nextProps.pageIndexNoti !== prevState.pageIndex || nextProps.pageSizeNoti !== prevState.pageSize)
        ) {
            let { list_noti } = prevState;
            nextProps.list_noti.forEach((item: INoti, index: number) => {
                if (!containsObject(item, list_noti)) {
                    list_noti.push(item)
                }
            })

            return {
                list_noti,
                loadingMore: false
            };
        }
        return null;
    };

    load_more = true;
    async componentDidMount() {
        window.addEventListener("scroll", (event: any) => {
            if (window.innerHeight + window.scrollY >= document.querySelector("main").clientHeight) {
                if (this.load_more) {
                    this.setState({ loadingMore: true });
                    let { pageSize, pageIndex } = this.state;
                    let { totalItems } = this.props;
                    pageSize = pageSize + 10;

                    if (pageSize > 51) {
                        pageIndex += 1;
                        pageSize = pageSize - 50;
                    }

                    if (pageSize < totalItems) {
                        this.props.getListNoti(pageIndex, pageSize);
                    }
                    else {
                        this.props.getListNoti(pageIndex, totalItems);
                        pageSize = totalItems;
                    };

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


    ListNoti = (props: any) => {
        let { list_noti } = props;
        let { pageSize } = this.state;

        let list_noti_view = list_noti && list_noti && list_noti.length > 0 ?
            list_noti.map((item: INoti) => <NotiItem key={randomID(16)} item={item} getListNoti={() => this.props.getListNoti(0, pageSize)} />) : <NotUpdate msg="Không có thông báo" />
        return <div className="list-noti-show">
            {list_noti_view}
        </div>
    };

    componentWillUnmount() {
        this.load_more = false;
        document.removeEventListener("scroll", () => {
            console.log("goout")
        })
    }

    render() {
        let {
            list_noti,
            loadingMore,
            loading,
        } = this.state;

        let { totalItems } = this.props;

        if (loading) {
            return <Loading />
        }

        return (
            <div draggable={true}>
                <h5>
                    Quản lí thông báo
                </h5>
                <div>
                    {
                        totalItems && totalItems > 0 ? this.ListNoti({ list_noti }) : <NotUpdate msg="Chưa có thông báo" />
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
    list_noti: state.Notis.items,
    totalItems: state.Notis.totalItems,
    pageIndexNoti: state.Notis.pageIndex,
    pageSizeNoti: state.Notis.pageSize,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NotiticationsList);