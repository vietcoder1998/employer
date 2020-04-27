import React, { PureComponent, } from 'react'
import { connect } from 'react-redux';
import './PendingJobsList.scss';

import { REDUX_SAGA, REDUX } from '../../../../../../const/actions';
import { Button, Table, Icon, Modal, Tooltip, Empty } from 'antd';
import { timeConverter } from '../../../../../../utils/convertTime';
import { _requestToServer } from '../../../../../../services/exec';
import { POST } from '../../../../../../const/method';
import { routeLink, routePath } from '../../../../../../const/break-cumb';

import { PENDING_JOBS } from '../../../../../../services/api/private.api';
import { TYPE } from '../../../../../../const/type';
// import { IptLetter } from '../../../../layout/common/Common';
import { IPendingJob } from '../../../../../../models/pending-jobs';
import { IAppState } from '../../../../../../redux/store/reducer';
import JobDetail from '../../../../layout/job-detail/JobDetail';
import { IModalState } from '../../../../../../models/mutil-box';
import { Link } from 'react-router-dom';
import { NotUpdate } from '../../../../layout/common/Common';

// let { Option } = Select;
const Label = (props: any) => {
    let value = "";
    switch (props.type) {
        case TYPE.PENDING:
            value = "Đang chờ";
            break;
        case TYPE.ACCEPTED:
            value = "Chấp nhận";
            break;
        case TYPE.REJECTED:
            value = "Đã từ chối";
            break;
        case TYPE.PARTTIME:
            value = "Bán thời gian";
            break;
        case TYPE.FULLTIME:
            value = "Toàn thời gian";
            break;
        case TYPE.INTERNSHIP:
            value = "Thực tập sinh";
            break;
    }
    return <label className={props.type.toLowerCase()}>{value}</label>
};

interface IPendingJobListProps extends StateProps, DispatchProps {
    match?: any,
    location?: any,
    getPendingJobDetail: (id?: string) => any;
    handleModal: (modalState?: IModalState) => any;
    getPendingJobs: Function,
}

interface IPendingJobListState {
    data_table?: Array<any>;
    pageIndex?: number;
    pageSize?: number;
    state?: string;
    employerID?: string;
    jobType?: string;
    jobNameID?: string;
    jobId?: string;
    show_job?: boolean;
    loading?: boolean;
    pendingJob?: any;
    message?: string;
    loading_table?: boolean;
    search?: string;
    list_jobs?: Array<IPendingJob>
    job_id?: string;
    body?: any;
}

class PendingJobsList extends PureComponent<IPendingJobListProps, IPendingJobListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data_table: [],
            pageSize: 10,
            state: TYPE.PENDING,
            employerID: undefined,
            jobType: undefined,
            jobNameID: undefined,
            pageIndex: 0,
            jobId: undefined,
            show_job: false,
            loading: false,
            loading_table: true,
            job_id: null,
            body: {}
        }
    }

    columns = [
        {
            title: '#',
            width: 20,
            dataIndex: 'index',
            key: 'index',
            className: 'action',
            fixed: 'left',
        },
        {
            title: 'Tiêu đề',
            width: 200,
            dataIndex: 'jobTitle',
            key: 'jobTitle',
            fixed: 'left'

        },
        {
            title: 'Nhà tuyển dụng',
            dataIndex: 'employerName',
            key: 'employerName',
            width: 200,
        },
        {
            title: 'Công việc',
            width: 100,
            dataIndex: 'jobName',
            className: 'action',
            key: 'jobName',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'state',
            className: 'action',
            key: 'state',
            width: 140,
        },
        {
            title: 'Loại công việc',
            dataIndex: 'jobType',
            className: 'action',
            key: 'jobType',
            width: 140,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            className: 'action',
            key: 'createdDate',
            width: 120,
        },
        {
            title: 'Tên chi nhánh',
            dataIndex: 'employerBranchName',
            key: 'employerBranchName',
            width: 200,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: 200,
            key: 'address'
        },
        {
            title: 'Hành động',
            key: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            className: 'action',
            width: 80
        },
    ];

    componentDidMount() {
        this.queryPendingJob()
    }

    queryPendingJob = () => {
        let { employerID, state, jobType, jobNameID, pageIndex, pageSize } = this.state;
        this.props.getPendingJobs({
            employerID,
            state,
            jobType,
            jobNameID,
            pageIndex,
            pageSize
        })
    };

    setPageIndex = async (event: any) => {
        await this.setState({ pageIndex: event.current - 1, loading_table: true, pageSize: event.pageSize });
        await this.queryPendingJob();
    };

    static getDerivedStateFromProps(nextProps: IPendingJobListProps, prevState: IPendingJobListState) {
        if (nextProps.list_jobs && nextProps.list_jobs !== prevState.list_jobs) {
            let data_table: any = [];
            let { pageIndex, pageSize } = prevState;

            nextProps.list_jobs.forEach((item: IPendingJob, index: any) => {
                data_table.push({
                    key: item.id,
                    index: (index + (pageIndex ? pageIndex : 0) * (pageSize ? pageSize : 10) + 1),
                    jobName: item.jobName.name,
                    state: <Label type={item.state} value={item.state} />,
                    address: item.address ? item.address : "",
                    employerName: item.employer.employerName ? item.employer.employerName : "",
                    title: item.jobTitle,
                    createdDate: timeConverter(item.createdDate, 1000),
                    jobTitle: item.jobTitle,
                    employerBranchName: item.employerBranchName ? item.employerBranchName : "",
                    jobType: <Label type={item.jobType} value={item.jobType} />,
                    operation:
                        <Tooltip title="Xem chi tiết">
                            <Icon type="search"
                                className={"test"}
                                style={{ padding: "5px" }}
                                onClick={
                                    async () => {
                                        nextProps.handleModal({ open_modal: true });
                                        nextProps.getPendingJobDetail(item.id);
                                    }
                                }
                            />
                        </Tooltip>
                });
            });
            return {
                list_jobs: nextProps.list_jobs,
                data_table,
                loading_table: false
            }
        }

        if (nextProps.location.search && nextProps.location.search !== prevState.search) {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            if (id) {
                nextProps.handleModal();
                setTimeout(() => {
                    nextProps.getPendingJobDetail(id);
                }, 700);

                return {
                    search: nextProps.location.search
                }
            }

            return null
        }

        return null;
    }


    onChangeState = (event: any) => {
        this.setState({ state: event })
    };

    onChangeJobType = (event: any) => {
        this.setState({ jobType: event })
    };

    onChangeEmployer = (event: any) => {
        this.setState({ employerID: event })
    };

    onChangeJobName = (event: any) => {
        this.setState({ jobNameID: event })
    };

    onToggleModal = () => {
        let { show_job, message } = this.state;
        if (show_job) {
            message = ""
        }
        this.setState({ show_job: !show_job, message, loading: false });
    };

    handlePendingJob = async (state?: string) => {
        let { job_id, message } = this.state;
        let body = state === "accepted" ? undefined : { message };
        await this.setState({ loading: true });
        await _requestToServer(
            POST, PENDING_JOBS + `/${job_id}/${state}`,
            body,
            null, null, undefined, true, false
        );
        await this.props.handleModal({ open_modal: false })
        await this.queryPendingJob();
    };

    render() {
        let { data_table, loading, loading_table, state, job_id } = this.state;
        let { totalItems, job_detail, open_modal } = this.props;

        return (
            <>
                <Modal
                    visible={open_modal}
                    title={
                        <div style={{ fontWeight: "bolder", textTransform: "capitalize" }}>{job_detail.jobTitle}</div>
                    }
                    onCancel={() => this.props.handleModal({ open_modal: false })}
                    destroyOnClose={true}
                    width="55vw"
                    style={{ top: "5vh", height: "80vh" }}
                    footer={[
                        <Button
                            type="danger"
                            loading={loading}
                            onClick={async () => this.props.handleModal({ open_modal: false })}
                        >
                            Đóng
                        </Button>,
                        <Link key="submit" to={routeLink.JOB_ANNOUNCEMENTS + routePath.PENDING + `/${job_id}`} target='_blank' >
                            <Button
                                key="submit"
                                type="primary"
                                icon="edit"
                                style={{ marginLeft: 20 }}
                                loading={loading}
                                onClick={async () => this.props.handleModal({ open_modal: false })}
                                disabled={state === TYPE.ACCEPTED}
                            >
                                Sửa
                            </Button>
                        </Link>
                    ]}
                >
                    {
                        job_detail ? <JobDetail
                            jobDetail={{
                                jobName: job_detail.jobName && job_detail.jobName.name,
                                jobTitle: job_detail.data.jobTitle,
                                employerName: job_detail.employer.employerName,
                                employerUrl: job_detail.employer.logoUrl,
                                employerBranch: job_detail.employerBranchName,
                                expriratedDate: job_detail.data.expirationDate,
                                jobType: job_detail.data.jobType,
                                shifts: job_detail.data.shifts,
                                description: job_detail.data.description,
                                requiredSkills: job_detail.requiredSkills,
                                createdDate: job_detail.createdDate,
                                repliedDate: job_detail.repliedDate
                            }}
                        /> : <Empty description={'Không có mô tả phù hợp'} />
                    }

                    {
                        job_detail && job_detail.message ?
                            <div
                                style={{
                                    padding: "10px 25px",
                                    color: "red",
                                    backgroundColor: "white",
                                    marginTop: 10
                                }}
                            >
                                LÝ DO TỪ CHỐI: <NotUpdate msg={job_detail.message} />
                            </div> : ''
                    }
                </Modal>
                <div className="common-content">
                    <h5>
                        Danh sách bài đăng đang chờ {`(${totalItems})`}
                    </h5>
                    <Table
                        // @ts-ignore
                        columns={this.columns}
                        loading={loading_table}
                        dataSource={data_table}
                        scroll={{ x: 1400 }}
                        bordered
                        pagination={{ total: totalItems, showSizeChanger: true }}
                        size="middle"
                        onChange={this.setPageIndex}
                        onRow={
                            (event: any) => ({
                                onClick: () => this.setState({ job_id: event.key })
                            })
                        }
                    />
                </div>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getPendingJobs: (body?: any) => dispatch({
        type: REDUX_SAGA.PENDING_JOBS.GET_PENDING_JOBS,
        body
    }),
    getPendingJobDetail: (id?: string) =>
        dispatch({
            type: REDUX_SAGA.PENDING_JOB_DETAIL.GET_PENDING_JOB_DETAIL,
            id
        }),

    handleModal: (modalState?: IModalState) =>
        dispatch({ type: REDUX.HANDLE_MODAL, modalState }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_jobs: state.PendingJobs.items,
    list_job_names: state.JobNames.items,
    list_job_skills: state.Skills.items,
    modalState: state.MutilBox.modalState,
    job_detail: state.PendingJobDetail,
    open_modal: state.MutilBox.modalState.open_modal,
    totalItems: state.PendingJobs.totalItems,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PendingJobsList);