import React, { Component } from 'react'
import { Divider, Button, Input, DatePicker, Select, Tabs, message, Result, Card, Row, Col, Form } from 'antd';
import { connect } from 'react-redux';
import './JobAnnouncementsCreate.scss';
import { InputTitle } from '../../../../layout/input-tittle/InputTitle';
import { REDUX_SAGA } from '../../../../../../const/actions';
import { TYPE } from '../../../../../../const/type';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IJobName } from '../../../../../../models/job-names';
import { IAnnoucementBody, IShift } from '../../../../../../models/announcements';
import { ShiftContent, newShift } from '../../../../layout/annou-shift/AnnouShift';
import { IEmBranch } from '../../../../../../models/em-branches';
import findIdWithValue from '../../../../../../utils/findIdWithValue';
import { _requestToServer } from '../../../../../../services/exec';
import { POST, PUT } from '../../../../../../const/method';
import { JOB_ANNOUNCEMENTS, PENDING_JOBS } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import moment from 'moment';
import { NotUpdate, Required } from '../../../../layout/common/Common';
import { routeLink, routePath } from '../../../../../../const/break-cumb';
import { Link } from 'react-router-dom';
// import { iterator } from 'core-js/fn/symbol';
import { ILanguage } from '../../../../../../models/languages';
import { IWorkingTool } from '../../../../../../models/working-tools';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface IJobAnnouncementsCreateState {
    title: string;
    announcementTypeID: string;
    typeMng: Array<any>;
    listItem: Array<{ label: string, value: string }>,
    loading: boolean;
    valueAnnou: string;
    typeCpn: string;
    // listEmBranches: Array<IEmBranch>;
    body: IAnnoucementBody;
    id?: string;
    jobName?: string;
    address?: string;
    skills?: Array<string>
    notComplete?: boolean;
    jobAnnouncementDetail?: any;
    isCreate?: boolean;
};

interface IJobAnnouncementsCreateProps extends StateProps, DispatchProps {
    match: any;
    history: any;
    getJobAnnouncementDetail: Function;
    getListEmBranches: Function;
    getPendingJobDetail: (id?: string) => any;
    form?: any;
};
const strForSearch = str => {
    return str
        ? str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        : str;
};
class JobAnnouncementsCreate extends Component<IJobAnnouncementsCreateProps, IJobAnnouncementsCreateState> {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            announcementTypeID: "",
            typeMng: [],
            listItem: [],
            loading: false,
            valueAnnou: "",
            typeCpn: TYPE.CREATE,
            // listEmBranches: [],
            isCreate: false,
            body: {
                jobTitle: null,
                jobNameID: null,
                employerBranchID: null,
                description: null,
                requiredSkillIDs: [],
                jobType: 'FULLTIME',
                expirationDate: null,
                shifts: [
                    {
                        startTime: null,
                        endTime: null,
                        minSalary: 0,
                        maxSalary: 0,
                        unit: 'tháng',
                        mon: true,
                        tue: true,
                        wed: true,
                        thu: true,
                        fri: true,
                        sat: true,
                        sun: false,
                        genderRequireds: [{ gender: 'BOTH', quantity: 1, id: null }]
                    },
                ]
            },
            id: null,
        };
    };

    async componentDidMount() {
        if (this.props.match.params.id) {
            console.log()
        };

        this.props.getListEmBranches();
    };

    static getDerivedStateFromProps(props?: IJobAnnouncementsCreateProps, state?: IJobAnnouncementsCreateState) {
        if (props.match.params.id && props.match.params.id !== state.id) {
            let id = props.match.params.id;
            if (
                props.match.url.includes("fix") ||
                props.match.url.includes("copy")

            ) {
                props.getJobAnnouncementDetail(id);
            }

            if (
                props.match.url.includes("pending")
            ) {
                props.getPendingJobDetail(id);
            }

            return {
                id
            }
        }


        if (
            (props.jobAnnouncementDetail ||
                props.pendingJobDetail) && props.match.params.id !== state.body.id
        ) {
            let typeCpn = TYPE.CREATE;
            let jobAnnouncementDetail = null;
            let jobID = null;
            let body = state.body;
            let id = state.body.id;
            let requiredSkillIDs = [];
            let requiredWorkingToolIDs = [];

            if (props.match.url.includes("pending")) {
                typeCpn = TYPE.PENDING;
                id = props.pendingJobDetail.id;
                jobAnnouncementDetail = props.pendingJobDetail.data;
                jobID = jobAnnouncementDetail.jobNameID;
                requiredSkillIDs = jobAnnouncementDetail.requiredSkillIDs;
                requiredWorkingToolIDs = jobAnnouncementDetail.requiredWorkingToolIDs;
            };

            if (props.match.url.includes("fix")) {
                typeCpn = TYPE.FIX;
                id = props.jobAnnouncementDetail.id;
                jobAnnouncementDetail = props.jobAnnouncementDetail;
                jobID = jobAnnouncementDetail.jobName && jobAnnouncementDetail.jobName.id;
                requiredSkillIDs = jobAnnouncementDetail.requiredSkills && jobAnnouncementDetail.requiredSkills.length &&
                    jobAnnouncementDetail.requiredSkills.map((item: any) => item.id);
                requiredWorkingToolIDs = jobAnnouncementDetail.requiredWorkingTools && jobAnnouncementDetail.requiredWorkingTools.length &&
                    jobAnnouncementDetail.requiredWorkingTools.map((item: any) => item.id);
            };

            if (props.match.url.includes("copy")) {
                typeCpn = TYPE.COPY;
                id = props.jobAnnouncementDetail.id;
                jobAnnouncementDetail = props.jobAnnouncementDetail;
                jobID = jobAnnouncementDetail.jobName && jobAnnouncementDetail.jobName.id;
                requiredSkillIDs = jobAnnouncementDetail.requiredSkills && jobAnnouncementDetail.requiredSkills.length &&
                    jobAnnouncementDetail.requiredSkills.map((item: any) => item.id);
                requiredWorkingToolIDs = jobAnnouncementDetail.requiredWorkingTools && jobAnnouncementDetail.requiredWorkingTools.length &&
                    jobAnnouncementDetail.requiredWorkingTools.map((item: any) => item.id);
            };

            console.log(jobAnnouncementDetail);

            if (typeCpn !== TYPE.CREATE) {
                if (jobAnnouncementDetail) {
                    body.id = id;
                    body.description = jobAnnouncementDetail.description;
                    body.jobTitle = jobAnnouncementDetail.jobTitle;
                    body.jobNameID = jobID;
                    body.jobType = jobAnnouncementDetail.jobType;
                    body.employerBranchID = jobAnnouncementDetail.employerBranchID;
                    body.description = jobAnnouncementDetail.description;
                    body.expirationDate = jobAnnouncementDetail.expirationDate;
                    body.shifts = jobAnnouncementDetail.shifts;
                    body.requiredSkillIDs = requiredSkillIDs;
                    body.requiredWorkingToolIDs = requiredWorkingToolIDs;
                };
            };

            return {
                body,
                typeCpn,
                jobAnnouncementDetail
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

    removeShift = (index: number) => {
        let { body } = this.state;
        body.shifts.splice(index, 1);
        message.info({ type: "info", message: `Đã xóa ca số :${index}` });
        this.setState({ body });
    };

    createRequest = async (valid) => {
        let { body, typeCpn, id } = this.state;
        let newBody = await this.pretreatmentBody(body, typeCpn);
        let matching = (typeCpn === TYPE.CREATE || typeCpn === TYPE.COPY) ? `` : `/${id}`;
        let METHOD = typeCpn === TYPE.CREATE || typeCpn === TYPE.COPY ? POST : PUT;
        let API = typeCpn === TYPE.PENDING ? PENDING_JOBS : JOB_ANNOUNCEMENTS;
        await this.setState({ loading: true })
        this.setState({ isCreate: true })
        console.log(valid)
        if (valid) {
            await _requestToServer(
                METHOD,
                API + matching,
                newBody,
                null,
                undefined,
                EMPLOYER_HOST,
                true,
                false,
            ).then((res: any) => {
                if (res) {
                    setTimeout(() => {
                        this.props.history.push(routeLink.PENDING_JOBS + routePath.LIST);
                    }, 500);
                }
            }).finally(() => {
                this.setState({ loading: false })
            })
            // console.log(this.state.body)
        } else{
            console.log("invalid")
            this.setState({ loading: false })
        }
    }

    pretreatmentBody = (body: IAnnoucementBody, typeCpn: string) => {
        let newBody = body;
        this.setState({ notComplete: false });
        newBody.shifts.forEach((element: any, index: number) => {
            console.log(element.genderRequireds)
            if (!element.genderRequireds || element.genderRequireds.length === 0) {

                message.warning(`Ca cần thêm số lượng tuyển`);
                this.setState({ notComplete: true })
            }

            element.genderRequireds = element.genderRequireds.map((item: any, index: number) => {
                if (item.id && typeCpn !== TYPE.CREATE) {
                    return {
                        id: item.id,
                        quantity: item.quantity,
                        gender: item.gender,
                    }
                } else {
                    return {
                        quantity: item.quantity,
                        gender: item.gender,
                    }
                }
            });

            element.genderRequireds = element.genderRequireds.filter(
                (item: any, index: number) => item.quantity && item.quantity !== 0
            );
        });

        if (typeCpn !== TYPE.FIX || typeCpn !== TYPE.PENDING) {
            newBody.shifts.forEach((element: IShift, index: number) => {
                if (element.id) {
                    delete element["id"]
                }

                if (element.minSalary === null) {
                    element.minSalary = 0;
                }

                if (element.maxSalary === null) {
                    element.maxSalary = 0;
                }
            })
        }


        return { ...newBody, id: undefined };
    }

    ApplyCan = () => {
        let { jobAnnouncementDetail } = this.props;

        return (
            <>
                <Card title="Số lượng ứng tuyển">
                    <Row>
                        <Col span={8}>
                            <Card
                                type="inner"
                                title="Ứng viên được chấp nhận"

                                extra={
                                    <Link
                                        to={routeLink.JOB_ANNOUNCEMENTS + routePath.APPLY + `/${jobAnnouncementDetail.id}?state=${TYPE.ACCEPTED}`}
                                        style={{ display: jobAnnouncementDetail.appliedCount === 0 ? "none" : "" }}
                                    >
                                        Xem
                                </Link>}
                            >
                                {jobAnnouncementDetail.appliedCount}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title="Ứng viên đang chờ"
                                type="inner"
                                extra={
                                    <Link
                                        to={routeLink.JOB_ANNOUNCEMENTS + routePath.APPLY + `/${jobAnnouncementDetail.id}?state=${TYPE.PENDING}`}
                                        style={{ display: jobAnnouncementDetail.pendingApplied === 0 ? "none" : "" }}
                                    >
                                        Xem
                            </Link>
                                }
                            >
                                {jobAnnouncementDetail.pendingApplied}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title="Ứng viên bị từ chối"
                                type="inner"
                                extra={
                                    <Link
                                        to={routeLink.JOB_ANNOUNCEMENTS + routePath.APPLY + `/${jobAnnouncementDetail.id}?state=${TYPE.REJECTED}`}
                                        style={{ display: jobAnnouncementDetail.rejectedApplied === 0 ? "none" : "" }}
                                    >
                                        Xem
                                </Link>
                                }
                            >
                                {jobAnnouncementDetail.rejectedApplied}
                            </Card>
                        </Col>
                    </Row>


                </Card>
                {/* <div style={{
                    display:
                        jobAnnouncementDetail.pendingApplied !== 0 ||
                            jobAnnouncementDetail.pendingApplied !== 0 ||
                            jobAnnouncementDetail.pendingApplied !== 0 ? "" : "none"
                }}
                >
                    <NotUpdate warning={true} msg={`(Lưu ý: Bài đăng đã có ứng viên ứng tuyển, từ chối , đang chờ, hoặc đã hết hạn sẽ không thể sửa lại.)`} />
                </div> */}
            </>
        );
    }

    render() {
        let {
            typeCpn,
            body,
            loading
        } = this.state;

        let {
            listJobNames,
            listEmBranches,
            listSkills,
            jobAnnouncementDetail,
            normalQuantity,
            listLanguages,
            listWorkingTools
        } = this.props;

        // let ct_btn_ex = "Huỷ";
        let ct_btn_nt = "Lưu lại";

        switch (typeCpn) {
            case TYPE.COPY:
                // ct_btn_ex = "Huỷ tạo";
                ct_btn_nt = "Tạo mới(bản sao)";
                break;

            case TYPE.FIX:
                // ct_btn_ex = "Huỷ";
                ct_btn_nt = "Lưu lại";
                break;
            case TYPE.CREATE:
                // ct_btn_ex = "Huỷ tạo";
                ct_btn_nt = "Đăng bài";
                break;
            default:
                break;
        };

        let list_job_name_options = listJobNames.map((item: IJobName) => ({ label: item.name, value: item.id }));
        let listEmBranches_options = listEmBranches.map((item: any) => ({ label: item.branchName, value: item.id }));
        let list_skill_options = listSkills.map((item: IJobName, index: number) => (<Option key={index} value={item.name} children={item.name} />));
        let list_Languages_options = listLanguages.map((item: ILanguage, index: number) => (<option key={index} value={item.name} children={item.name} />))
        let list_WorkingTools_options = listWorkingTools.map((item: IWorkingTool, index: number) => (<option key={index} value={item.name} children={item.name} />))

        if (
            !jobAnnouncementDetail && jobAnnouncementDetail.id
        ) {
            return <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        }

        let color = "black";
        if (!body.description) {
            color = "black";
        } else {
            if (body.description.length < 4000) {
                color = "#168ECD"
            }

            if (4000 < body.description.length && body.description.length < 6000) {
                color = "orange"
            }

            if (6000 < body.description.length && body.description.length < 10000) {
                color = "red"
            }
        }
        let showErrorTitle
        if (this.state.isCreate) {
            if (body.jobTitle) {
                showErrorTitle = false
            } else {
                showErrorTitle = true
            }
        } else {
            showErrorTitle = false
        }

        let showErrordescription
        if (this.state.isCreate) {
            if (body.description) {
                showErrordescription = false
            } else {
                showErrordescription = true
            }
        } else {
            showErrordescription = false
        }

        let showErrorjobNameID
        if (this.state.isCreate) {
            if (body.jobNameID) {
                showErrorjobNameID = false
            } else {
                showErrorjobNameID = true
            }
        } else {
            showErrorjobNameID = false
        }

        let showErorremployerBranchID
        if (this.state.isCreate) {
            if (body.employerBranchID) {
                showErorremployerBranchID = false
            } else {
                showErorremployerBranchID = true
            }
        } else {
            showErorremployerBranchID = false
        }
        
        let showErorrSelectTime
        if (this.state.isCreate) {
            if ((body.shifts.map((a) => a.startTime)) < (body.shifts.map((a) => a.endTime))) {
                showErorrSelectTime = false
            } else {
                showErorrSelectTime = true
                
            }
        } else {
            showErorrSelectTime = false
        }


        let showErrorSalaryFulltime
        if (this.state.isCreate) {
            if ((body.shifts.map((a) => a.minSalary)) < (body.shifts.map((a) => a.maxSalary))) {
                showErrorSalaryFulltime = false
            } else {
                showErrorSalaryFulltime = true
            }
        } else {
            showErrorSalaryFulltime = false
        }
        let showErrorSalaryPartTtime
        if (this.state.isCreate) {
            if ((body.shifts.map((a) => a.minSalary)) < (body.shifts.map((a) => a.maxSalary))) {
                showErrorSalaryPartTtime = false
            } else {
                showErrorSalaryPartTtime = true
            }
        } else {
            showErrorSalaryPartTtime = false
        }

        return (
            <div className='common-content'>
                <div style={{ alignItems: 'center', marginBottom: '2em' }}>
                    <h5>
                        {typeCpn === TYPE.FIX || typeCpn === TYPE.PENDING ? "Thông tin bài đăng(sửa)" : `Đăng bài`}
                    </h5>
                    {!(typeCpn === TYPE.FIX || typeCpn === TYPE.PENDING) ?
                        <span >(Số lượt đăng bài còn lại: <b>{normalQuantity ? normalQuantity : 0}</b>)</span> : null}
                </div>

                {
                    typeCpn === TYPE.FIX ? this.ApplyCan() : ""
                }
                <Divider orientation="left" >Nội dung bài đăng</Divider>
                <div className="announcements-create-content">
                    <InputTitle
                        type={TYPE.INPUT}
                        title={"Tiêu đề"}
                        required={true}
                        widthLabel="150px"
                    >
                        {/* <TextArea
                            style={{ width: '100%' }}
                            maxLength={400}
                            placeholder="ex: Tuyển nhân viên bán hàng (tối đa 400 kí tự)"
                            value={body.jobTitle}
                            onChange={
                                (event: any) => {
                                    body.jobTitle = event.target.value;
                                    this.setState({ body });
                                }
                            }
                        /> */}
                        <Form style={{ width: '100%' }}>
                            <Form.Item validateStatus={showErrorTitle ? 'error' : null} help={showErrorTitle ? 'Bạn chưa điền tiêu đề !' : ''}  >
                                <TextArea
                                    style={{ width: '100%' }}
                                    maxLength={400}
                                    placeholder="ex: Tuyển nhân viên bán hàng (tối đa 400 kí tự)"
                                    value={body.jobTitle}
                                    onChange={
                                        (event: any) => {
                                            body.jobTitle = event.target.value;
                                            this.setState({ body });
                                        }
                                    }

                                />
                            </Form.Item>
                        </Form>
                    </InputTitle>
                    <InputTitle
                        title="Nội dung bài đăng"
                        widthLabel="150px"
                        required={true}
                        widthComponent="400px"
                    >
                        {/* <TextArea
                            rows={15}
                            style={{ width: '100%' }}
                            maxLength={10000}
                            placeholder="ex: Yêu cầu: giao tiếp tiếng Anh tốt (tối đa 10000 kí tự)"
                            value={body.description}
                            onChange={
                                (event: any) => {
                                    body.description = event.target.value;
                                    this.setState({ body });
                                }
                            }
                        /> */}
                        <Form style={{ width: '100%' }}>
                            <Form.Item validateStatus={showErrordescription ? 'error' : null} help={showErrordescription ? 'Bạn chưa điền nội dung !' : ''}  >
                                <TextArea
                                    rows={15}
                                    style={{ width: '100%' }}
                                    maxLength={10000}
                                    placeholder="ex: Yêu cầu: giao tiếp tiếng Anh tốt (tối đa 10000 kí tự)"
                                    value={body.description}
                                    onChange={
                                        (event: any) => {
                                            body.description = event.target.value;
                                            this.setState({ body });
                                        }
                                    }
                                />
                            </Form.Item>
                        </Form>
                    </InputTitle>
                    <p className='a_c'>
                        <NotUpdate children={
                            <label> Hiện tại: <span style={{ color }}> {body.description ? body.description.length : 0}</span> kí tự</label>}
                        />
                    </p>

                    <InputTitle
                        title="Thời gian hết hạn"
                        required={true}
                        type="SWITCH"
                        widthLabel="150px"
                    >
                        <Form style={{ width: '100%' }}>
                            <Form.Item validateStatus={moment(body.expirationDate).isAfter(moment().add(90, 'days')) ? 'error' : null} help={moment(body.expirationDate).isAfter(moment().add(90, 'days')) ? 'Thời gian hết hạn quá dài, vui lòng chọn thời gian hết hạn trong vòng 90 ngày!' : ''}  >
                                <DatePicker
                                    format={"DD/MM/YYYY"}
                                    style={{ width: '100%' }}
                                    placeholder={'ex: ' + moment().format("DD/MM/YYYY")}
                                    defaultPickerValue={null}
                                    value={body.expirationDate ? moment(body.expirationDate) : null}
                                    onChange={
                                        (event?: any) => {
                                            event ?
                                                body.expirationDate = event.unix() * 1000 :
                                                body.expirationDate = null;
                                            this.setState({ body });
                                        }
                                    }
                                    disabledDate={d => !d || d.isAfter(moment().add(90, 'days')) || d.isSameOrBefore(moment())}
                                />

                            </Form.Item>
                        </Form>

                    </InputTitle>
                    <InputTitle
                        title="Chọn công việc"
                        required={true}
                        type={TYPE.SELECT}
                        listValue={list_job_name_options}
                        value={findIdWithValue(listJobNames, body.jobNameID, "id", "name")}

                        onChange={
                            (event: any) => {
                                body.jobNameID = event;
                                this.setState({ body });
                            }
                        }
                        widthLabel="150px"
                        widthSelect="100%"
                        placeholder="ex: Nhân viên văn phòng"
                        showErrorSelected={showErrorjobNameID}

                    >
                    </InputTitle>

                    <InputTitle
                        title="Chọn chi nhánh "
                        required={true}
                        type={TYPE.SELECT}
                        listValue={listEmBranches_options}
                        value={findIdWithValue(listEmBranches, body.employerBranchID, "id", "branchName")}
                        onChange={
                            (event: any) => {
                                body.employerBranchID = event;
                                this.setState({ body });
                            }
                        }
                        widthLabel="150px"
                        widthSelect="100%"
                        placeholder="ex: Công ty abc"
                        showErrorSelected={showErorremployerBranchID}
                    />
                    {/* 
                    <InputTitle
                        title="Chọn ngôn ngữ "
                        required={true}
                        type={TYPE.SELECT}
                        listValue={listLanguages_options}
                        value={findIdWithValue(listLanguages, body.requiredLanguageIDs, "id", "name")}
                        onChange={
                            (event: any) => {
                                body.requiredLanguageIDs = event;
                                this.setState({ body });
                            }
                        }
                        widthLabel="150px"
                        widthSelect="100%"
                        placeholder="ex: English"
                        showErrorSelected={showErorremployerBranchID}
                    /> */}
                    <InputTitle
                        title="Chọn ngôn ngữ"
                        widthLabel="155px"
                    >
                        <Select
                            mode="multiple"
                            size="default"
                            placeholder="ex: English, Vietnamese"
                            filterOption={(input, option) => {
                                if (option.props.value) {
                                    // console.log(option.props.value)
                                    return strForSearch(option.props.children).includes(
                                        strForSearch(input)
                                    );
                                } else {
                                    return false;
                                }
                            }}
                            value={findIdWithValue(listLanguages, body.requiredLanguageIDs, "id", "name")}
                            onChange={
                                (event: any) => {
                                    let listData = findIdWithValue(listLanguages, event, "name", "id")
                                    body.requiredLanguageIDs = listData;
                                    this.setState({ body })
                                }
                            }
                            style={{ width: '100%' }}
                        >
                            {list_Languages_options}
                        </Select>
                    </InputTitle>

                    <InputTitle
                        title="Chọn công cụ "
                        widthLabel="155px"
                    >
                        <Select
                            mode="multiple"
                            size="default"
                            placeholder="ex: Unity, Microsoft Excel"
                            filterOption={(input, option) => {
                                if (option.props.value) {
                                    // console.log(option.props.value)
                                    return strForSearch(option.props.children).includes(
                                        strForSearch(input)
                                    );
                                } else {
                                    return false;
                                }
                            }}
                            value={findIdWithValue(listWorkingTools, body.requiredWorkingToolIDs, "id", "name")}
                            onChange={
                                (event: any) => {
                                    let listData = findIdWithValue(listWorkingTools, event, "name", "id")
                                    body.requiredWorkingToolIDs = listData;
                                    this.setState({ body })
                                }
                            }
                            style={{ width: '100%' }}
                        >
                            {list_WorkingTools_options}
                        </Select>
                    </InputTitle>

                    <InputTitle
                        title="Yêu cầu khác"
                        widthLabel="155px"
                    >
                        <Select
                            mode="multiple"
                            size="default"
                            placeholder="ex: Giao tiếp, Tiếng Anh"
                            filterOption={(input, option) => {
                                if (option.props.value) {
                                    // console.log(option.props.value)
                                    return strForSearch(option.props.children).includes(
                                        strForSearch(input)
                                    );
                                } else {
                                    return false;
                                }
                            }}
                            value={findIdWithValue(listSkills, body.requiredSkillIDs, "id", "name")}
                            onChange={
                                (event: any) => {
                                    let listData = findIdWithValue(listSkills, event, "name", "id")
                                    body.requiredSkillIDs = listData;
                                    this.setState({ body })
                                }
                            }
                            style={{ width: '100%' }}
                        >
                            {list_skill_options}
                        </Select>
                    </InputTitle>
                </div>
                <Divider orientation="left" >Chọn loại công việc<Required /></Divider>
                <div className="announcements-create-content">
                    <Tabs
                        activeKey={body.jobType ? body.jobType : TYPE.FULLTIME}
                        style={{ width: "100%" }}
                        onChange={(event: string) => {
                            body.jobType = event;
                            this.setState({ body });
                            typeCpn === TYPE.CREATE && this.replaceShift();
                        }}
                    >
                        <TabPane tab="Toàn thời gian" key={TYPE.FULLTIME} >
                            {body.shifts &&
                                body.shifts.length > 0 &&
                                body.shifts.map((item: any, index: number) => (
                                    <div key={index} >
                                        <ShiftContent
                                            shift={item}
                                            type={TYPE.FULLTIME}
                                            removeButton={false}
                                            id={item.id}
                                            onChange={(event) => this.handleBodyShift(event, index)}
                                            showErorrSelectTime={showErorrSelectTime}
                                            showErrorSalary={showErrorSalaryFulltime}
                                        />
                                    </div>

                                ))
                            }

                        </TabPane>
                        <TabPane tab="Bán thời gian" key={TYPE.PARTTIME}>
                            {body.shifts &&
                                body.shifts.length > 0 &&
                                body.shifts.map((item: any, index: number) => (
                                    <div key={index}>
                                        <ShiftContent
                                            shift={item}
                                            index={index}
                                            type={TYPE.PARTTIME}
                                            id={item.id}
                                            removeButton={true}
                                            removeShift={(index: number) => this.removeShift(index)}
                                            onChange={(event: IShift) => this.handleBodyShift(event, index)}
                                            showErorrSelectTime={showErorrSelectTime}
                                            showErrorSalary={showErrorSalaryPartTtime}
                                        />
                                    </div>
                                ))
                            }
                            <Button type="primary" icon="plus" style={{ marginLeft: 10 }} onClick={() => this.addShift()} >Thêm ca</Button>
                        </TabPane>
                        <TabPane tab="Thực tập sinh" key={TYPE.INTERNSHIP} >
                            {body.shifts &&
                                body.shifts.length > 0 &&
                                body.shifts.map((item: any, index: number) => (
                                    <div
                                        key={index}
                                    >
                                        < ShiftContent
                                            shift={item}
                                            type={TYPE.INTERNSHIP}
                                            removeButton={false}
                                            id={item.id}
                                            onChange={(event) => this.handleBodyShift(event, index)}
                                        />
                                    </div>

                                ))
                            }
                        </TabPane>
                    </Tabs>
                    {/* <div>
                        <NotUpdate warning={true} msg={`(Lưu ý: Ngày thời gian bắt đầu phải lớn hơn thời gian kết thúc, số nhân viên ứng tuyển tối thiểu là 1)`} />
                    </div> */}
                </div>
                {

                    (jobAnnouncementDetail.acceptedApplied === 0 &&
                        jobAnnouncementDetail.pendingApplied === 0 &&
                        jobAnnouncementDetail.rejectedApplied === 0) ||
                        (typeCpn !== TYPE.FIX) ?
                        <div className="Announcements-create-content">
                            <Button
                                type="primary"
                                icon={loading ? 'loading' : "check"}
                                style={{
                                    margin: "10px 10px",
                                    float: "right",
                                    fontSize: '1.1em',
                                    paddingTop: 3
                                }}

                                onClick={() => this.createRequest(showErorrSelectTime)}
                                value="large"
                            >
                                {ct_btn_nt}
                            </Button>

                        </div> : ""
                }
            </div >
        )
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getJobAnnouncementDetail: (id) => dispatch({ type: REDUX_SAGA.JOB_ANNOUNCEMENT_DETAIL.GET_JOB_ANNOUNCEMENT_DETAIL, id }),
    getPendingJobDetail: (id) => dispatch({ type: REDUX_SAGA.PENDING_JOB_DETAIL.GET_PENDING_JOB_DETAIL, id }),
    getListEmBranches: () => dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES }),
});

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listJobNames: state.JobNames.items,
    jobAnnouncementDetail: state.JobAnnouncementDetail,
    pendingJobDetail: state.PendingJobDetail,
    listSkills: state.Skills.items,
    listEmBranches: state.EmBranches.items,
    normalQuantity: state.JobService.nomalQuantity,
    listLanguages: state.Languages.items,
    listWorkingTools: state.WorkingTools.items
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobAnnouncementsCreate)