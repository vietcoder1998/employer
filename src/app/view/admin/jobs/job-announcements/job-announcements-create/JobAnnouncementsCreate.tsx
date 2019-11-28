import React, { Component } from 'react'
import { Icon, Divider, Row, Col, Button, Input, DatePicker, Select, Tabs, message } from 'antd';
import { connect } from 'react-redux';
import './JobAnnouncementsCreate.scss';
import { InputTitle } from '../../../../layout/input-tittle/InputTitle';
import { REDUX_SAGA } from '../../../../../../common/const/actions';
import { TYPE } from '../../../../../../common/const/type';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IJobName } from '../../../../../../redux/models/job-names';
import { IAnnoucementBody, IShifts } from '../../../../../../redux/models/announcements';
import { ShiftContent, newShift } from '../../../../layout/annou-shift/AnnouShift';
import { IEmBranch } from '../../../../../../redux/models/em-branches';
import { findIdWithValue } from '../../../../../../common/utils/findIdWithValue';
import { _requestToServer } from '../../../../../../services/exec';
import { POST } from '../../../../../../common/const/method';
import { JOB_ANNOUNCEMENTS } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import moment from 'moment';
import { IJobAnnouncementDetail } from '../../../../../../redux/models/job-annoucement-detail';
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface IJobAnnouncementsCreateState {
    title: string;
    announcementTypeID: string;
    type_management: Array<any>;
    list_item: Array<{ label: string, value: string }>,
    loading: boolean;
    value_annou: string;
    announcement_detail: any;
    type_cpn: string;
    list_em_branches: Array<IEmBranch>;
    body: IAnnoucementBody;
    id?: string;
    jobName?: string;
    address?: string;
    skills?: Array<string>
};

interface IJobAnnouncementsCreateProps extends StateProps, DispatchProps {
    match: any;
    history: any;
    getJobAnnouncementDetail: Function;
    getListEmBranches: Function;
};

const getBody = () => {
    return {
        id: null,
        jobTitle: null,
        jobNameID: null,
        employerBranchID: null,
        description: null,
        requiredSkillIDs: [],
        jobType: TYPE.FULLTIME,
        expirationDate: null,
        shifts: []
    }
}

class JobAnnouncementsCreate extends Component<IJobAnnouncementsCreateProps, IJobAnnouncementsCreateState> {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            announcementTypeID: "",
            type_management: [],
            list_item: [],
            loading: false,
            value_annou: "",
            announcement_detail: {
                id: "",
                admin: {},
                viewNumber: 0,
                modifyAdmin: {},
                announcementType: { id: 0, name: "", priority: 0 },
                hidden: false,
                imageUrl: "",
                content: "",
                loading: false,
            },
            type_cpn: TYPE.CREATE,
            list_em_branches: [],
            body: {
                jobTitle: null,
                jobNameID: null,
                employerBranchID: null,
                description: null,
                requiredSkillIDs: [],
                jobType: TYPE.FULLTIME,
                expirationDate: null,
                shifts: [
                    {
                        startTime: "00:00",
                        endTime: "00:00",
                        minSalary: null,
                        maxSalary: null,
                        unit: 'ca',
                        mon: false,
                        tue: false,
                        wed: false,
                        thu: false,
                        fri: false,
                        sat: false,
                        sun: false,
                        genderRequireds: null
                    },
                ]
            },
            id: null
        };
    };

    async componentDidMount() {
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            await this.props.getJobAnnouncementDetail(id);
        };

        this.props.getListEmBranches();
    };

    static getDerivedStateFromProps(props: any, state: IJobAnnouncementsCreateState) {
        if (
            props.job_announcement_detail &&
            props.match.params.id &&
            props.match.params.id !== state.body.id
        ) {
            let job_announcement_detail: IJobAnnouncementDetail = props.job_announcement_detail;
            let body = getBody();
            body.id = job_announcement_detail.id
            body.description = job_announcement_detail.description;
            body.jobTitle = job_announcement_detail.jobTitle;
            body.jobNameID = job_announcement_detail.jobName.id;
            body.jobType = job_announcement_detail.jobType;
            body.employerBranchID = job_announcement_detail.employerBranchID;
            body.description = job_announcement_detail.description;
            body.expirationDate = job_announcement_detail.expirationDate;
            body.shifts = job_announcement_detail.shifts;
            return {
                body,
            }
        }
        return null
    }

    onChangeValue = (event: any, param: string) => {
        let { body } = this.state;
        let value: any = event;
        switch (param) {
            case value:

                break;
        };
        body[param] = value;
        this.setState({ body });
    };

    handleBodyShift = (event: any, index: number | string) => {
        let { body } = this.state;
        body.shifts[index] = event;
        this.setState({ body })
    };

    replaceShift = () => {
        let { body } = this.state;
        body.shifts = [];
        body.shifts.push(newShift());
        this.setState({ body })
    };

    addShift = () => {
        let { body } = this.state;
        body.shifts.push(newShift());
        this.setState({ body });
    };

    removeShift = (id: number | string) => {
        let { body } = this.state;
        if (body.shifts.length > 1) {
            body.shifts.forEach((item: IShifts, index: number) => {
                if (item.id === id) {
                    body.shifts.splice(index, 1);
                    message.info({ type: "info", message: `Đã xóa ca số :${index}` })
                }
            });
        };

        this.setState({ body });
    };

    createRequest = async () => {
        let { body } = this.state;
        await _requestToServer(
            POST,
            JOB_ANNOUNCEMENTS,
            body,
            null,
            undefined,
            EMPLOYER_HOST,
            true,
            false,
        )
    }

    render() {
        let {
            type_cpn,
            body,
            jobName,
            address,
            skills
        } = this.state;

        let {
            list_job_names,
            list_em_branches,
            list_skills,
            job_announcement_detail,
        } = this.props;

        let list_job_name_options = list_job_names.map((item: IJobName) => ({ label: item.name, value: item.id }));
        let list_em_branches_options = list_em_branches.map((item: any) => ({ label: item.branchName, value: item.id }));
        let list_skill_options = list_skills.map((item: IJobName, index: number) => (<Option key={index} value={item.name} children={item.name} />));
        return (
            <div className='common-content'>
                <h5>
                    Tạo bài viết mới
                </h5>
                <Row>
                    <Col xs={0} sm={1} md={2} lg={3} xl={3} xxl={4}></Col>
                    <Col xs={0} sm={22} md={20} lg={18} xl={18} xxl={16}>
                        <Divider orientation="left" >Nội dung bài viết</Divider>
                        <div className="announcements-create-content">
                            <InputTitle
                                type={TYPE.INPUT}
                                title="Tiêu đề"
                                widthLabel="200px"
                                children={
                                    <Input
                                        width={200}
                                        placeholder="ex: Tuyển nhân viên bán hàng"
                                        value={body.jobTitle}
                                        onChange={
                                            (event: any) => {
                                                body.jobTitle = event.target.value;
                                                this.setState({ body });
                                            }
                                        }
                                    />
                                }

                            />
                            <InputTitle
                                title="Nội dung bài đăng"
                                widthLabel="200px"
                                widthComponent="400px"
                            >
                                <TextArea
                                    rows={5}
                                    style={{ width: 600 }}
                                    placeholder="ex: Yêu cầu: giao tiếp tiếng Anh tốt"
                                    value={body.description}
                                    onChange={
                                        (event: any) => {
                                            body.description = event.target.value;
                                            this.setState({ body });
                                        }
                                    }
                                />
                            </InputTitle>
                            <InputTitle
                                title="Chọn thời gian hết hạn"
                                type="SWITCH"
                                widthLabel="200px"
                            >
                                <DatePicker
                                    format={"DD/MM/YYYY"}
                                    style={{ width: 600 }}
                                    placeholder="ex: 07/12/2019"
                                    value={body.expirationDate ? moment(body.expirationDate) : null}
                                    onChange={
                                        (event?: any) => {
                                            event ? body.expirationDate = event.unix() * 1000 : body.expirationDate = null;
                                            this.setState({ body });
                                        }
                                    }
                                />
                            </InputTitle>
                            <InputTitle
                                title="Chọn công việc"
                                type={TYPE.SELECT}
                                list_value={list_job_name_options}
                                value={findIdWithValue(list_job_names, body.jobNameID, "id", "name")}
                                onChange={
                                    (event: any) => {
                                        body.jobNameID = event;
                                        this.setState({ body });
                                    }
                                }
                                widthLabel="200px"
                                widthSelect="600px"
                                placeholder="ex: Nhân viên văn phòng"
                            />
                            <InputTitle
                                title="Chọn địa chỉ đăng tuyển"
                                type={TYPE.SELECT}
                                list_value={list_em_branches_options}
                                defaultValue={findIdWithValue(list_em_branches, job_announcement_detail.employerBranchID, "id", "branchName")}
                                onChange={
                                    (event: any) => {
                                        body.employerBranchID = event;
                                        this.setState({ body });
                                    }
                                }
                                widthLabel="200px"
                                widthSelect="600px"
                                placeholder="ex: Công ti abc"
                            />

                            <InputTitle
                                title="Chọn loại kĩ năng"
                                widthLabel="200px"
                            >
                                <Select
                                    mode="multiple"
                                    size="default"
                                    placeholder="ex: Giao tiếp, Tiếng Anh"
                                    onChange={
                                        (event: any) => {
                                            let list_data = findIdWithValue(list_skills, event, "name")
                                            body.requiredSkillIDs = list_data;
                                            this.setState({ body })
                                        }
                                    }
                                    style={{ width: 600 }}
                                >
                                    {list_skill_options}
                                </Select>
                            </InputTitle>
                        </div>
                        <Divider orientation="left" >Thời gian làm việc</Divider>
                        <div className="announcements-create-content">
                            <Tabs
                                defaultActiveKey={job_announcement_detail ? job_announcement_detail.jobType : TYPE.FULLTIME} style={{ width: "100%" }}
                                onChange={(event: string) => {
                                    body.jobType = event;
                                    this.setState({ body });
                                    this.replaceShift();
                                }}
                            >
                                <TabPane tab="Toàn thời gian" key={TYPE.FULLTIME}>
                                    {body.shifts &&
                                        body.shifts.length > 0 &&
                                        body.shifts.map((item: IShifts, index: number) => (
                                            <ShiftContent
                                                key={index}
                                                type={TYPE.FULLTIME}
                                                removeButton={false}
                                                id={item.id}
                                                onChange={(event) => this.handleBodyShift(event, index)} />
                                        ))
                                    }
                                </TabPane>
                                <TabPane tab="Bán thời gian" key={TYPE.PARTTIME}>
                                    {body.shifts &&
                                        body.shifts.length > 0 &&
                                        body.shifts.map((item: IShifts, index: number) => (
                                            <ShiftContent
                                                key={index}
                                                index={index}
                                                type={TYPE.PARTTIME}
                                                id={item.id}
                                                removeButton={true}
                                                removeShift={(id: number | string) => this.removeShift(id)}
                                                onChange={(event: IShifts) => this.handleBodyShift(event, index)} />))
                                    }
                                    <Button type="primary" icon="plus" onClick={() => this.addShift()} >Thêm ca</Button>
                                </TabPane>
                                <TabPane tab="Thực tập sinh" key={TYPE.INTERNSHIP} >
                                    {body.shifts &&
                                        body.shifts.length > 0 &&
                                        body.shifts.map((item: IShifts, index: number) => (
                                            <ShiftContent
                                                key={index}
                                                type={TYPE.INTERNSHIP}
                                                removeButton={false}
                                                id={item.id}
                                                onChange={(event) => this.handleBodyShift(event, index)} />
                                        ))
                                    }
                                </TabPane>
                            </Tabs>
                        </div>
                        <div className="Announcements-create-content">
                            <Button
                                type="primary"
                                prefix={"check"}
                                style={{
                                    margin: "10px 10px",
                                    float: "right"
                                }}
                                onClick={() => this.createRequest()}
                            >
                                {type_cpn === TYPE.CREATE ? "Tạo mới" : "Lưu lại"}
                                <Icon type="right" />
                            </Button>
                            <Button
                                type="danger"
                                prefix={"check"}
                                style={{
                                    margin: "10px 10px",
                                    float: "right"
                                }}
                                onClick={() => { this.props.history.push('/admin/jobs/job-announcements/list') }}
                            >
                                <Icon type="close" />
                                {type_cpn === TYPE.CREATE ? "Hủy bài" : "Hủy sửa"}
                            </Button>
                        </div>
                    </Col>
                    <Col xs={0} sm={1} md={2} lg={3} xl={3} xxl={4}></Col>
                </Row>
            </div >
        )
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getJobAnnouncementDetail: (id) => dispatch({ type: REDUX_SAGA.JOB_ANNOUNCEMENT_DETAIL.GET_JOB_ANNOUNCEMENT_DETAIL, id }),
    getListEmBranches: () => dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_job_names: state.JobNames.items,
    job_announcement_detail: state.JobAnnouncementDetail,
    list_skills: state.Skills.items,
    list_em_branches: state.EmBranches.items,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobAnnouncementsCreate)