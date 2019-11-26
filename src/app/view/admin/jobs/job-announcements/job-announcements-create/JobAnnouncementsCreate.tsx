import React, { PureComponent } from 'react'
import { Icon, Divider, Switch, Row, Col, Button, Input, DatePicker, Select, Tabs, InputNumber } from 'antd';
import { connect } from 'react-redux';
import './JobAnnouncementsCreate.scss';
import { InputTitle } from '../../../../layout/input-tittle/InputTitle';
import { REDUX_SAGA } from '../../../../../../common/const/actions';
import { Link } from 'react-router-dom';
import { TYPE } from '../../../../../../common/const/type';
import { IAppState } from '../../../../../../redux/store/reducer';
import { IJobName } from '../../../../../../redux/models/job-names';
import { IAnnoucementBody } from '../../../../../../redux/models/announcements';
import { ShifContent } from '../../../../layout/annou-shift/AnnouShift';
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface JobAnnouncementsCreateState {
    title: string;
    announcementTypeID: string;
    type_management: Array<any>;
    list_item: Array<{ label: string, value: string }>,
    loading: boolean;
    previewImage: any;
    previewVisible: boolean;
    value_annou: string;
    announcement_detail: any;
    type_cpn: string;
    body: IAnnoucementBody;
}

interface JobAnnouncementsCreateProps extends StateProps, DispatchProps {
    getAnnouncementDetail: Function;
    match: any;
}

class JobAnnouncementsCreate extends PureComponent<JobAnnouncementsCreateProps, JobAnnouncementsCreateState> {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            announcementTypeID: "",
            type_management: [],
            list_item: [],
            loading: false,
            previewImage: null,
            previewVisible: false,
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
            body: {
                jobTitle: null,
                jobNameID: null,
                employerBranchID: null,
                description: null,
                requiredSkillIDs: [],
                jobType: null,
                expirationDate: null,
                shifts: []
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.type_management && nextProps.type_managemen !== prevState.type_management) {
            let list_item = [];
            for (let i = 0; i < nextProps.type_management.length; i++) {
                const element = nextProps.type_management[i];
                const list_target = element.targets;
                let target = "";

                if (list_target.length === 0) {
                    target = "Mọi đối tượng";
                } else {
                    list_target.forEach((element, index) => {
                        target += element + (index !== list_target.length - 1 ? ', ' : "")
                    });
                }
                list_item.push({ label: element.name + ` ( ${target} ) `, value: element.id });
            }

            return {
                list_item,
                type_management: nextProps.type_management
            }
        }

        if (
            nextProps.match.params.id !== "" &&
            nextProps.announcement_detail &&
            nextProps.announcement_detail.id !==
            prevState.announcement_detail.id
        ) {
            let { announcement_detail } = nextProps;
            let fileList = [];
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: announcement_detail.imageUrl,
            });

            return {
                title: announcement_detail.title,
                content: announcement_detail.content,
                fileList,
                hidden: announcement_detail.hidden,
                announcement_detail,
                announcementTypeID: announcement_detail.announcementType.id,
                value_annou: announcement_detail.announcementType.name,
                type_cpn: TYPE.EDIT
            }
        }

        if (prevState.announcementTypeID) {
            let { list_item, announcementTypeID } = prevState;
            let value_annou = "";
            list_item.forEach(item => {
                if (item.value === announcementTypeID) {
                    value_annou = item.label
                }
            })

            return {
                value_annou,
            }
        }

        return {
            type_cpn: TYPE.CREATE,
            value_annou: "Chọn loại bài viết",

        }
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            await this.props.getAnnouncementDetail(id);
        }
    };

    onChangeValue = (event: any, param: string) => {
        let { body } = this.state;
        let value: any = event;
        switch (param) {
            case value:

                break;

            default:
                break;
        }
        body[param] = value;
        this.setState({ body });
    }

    render() {
        let { title, list_item, previewImage, previewVisible, type_cpn } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        let {
            list_job_names
        } = this.props;
        let list_value = list_job_names.map((item: IJobName) => ({ label: item.name, value: item.id }));
        let children = list_job_names.map((item: IJobName, index: number) => (<Option key={index} value={item.name} children={item.name} />))

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
                                value={title}
                                title="Tiêu đề"
                                placeholder="ex: Tuyển nhân viên bán hàng"
                                widthLabel="200px"
                                widthInput="500px"
                                onChange={event => this.setState({ title: event })}
                            />
                            <InputTitle
                                title="Nội dung bài đăng"
                                widthLabel="200px"
                                widthComponent="400px"
                            >
                                <TextArea rows={5} style={{ width: 500 }} placeholder="ex: Yêu cầu: giao tiếp tiếng Anh tốt" />
                            </InputTitle>
                            <InputTitle
                                title="Chọn thời gian hết hạn"
                                type="SWITCH"
                                widthLabel="200px"
                            >
                                <DatePicker format={"DD/MM/YYYY"} style={{ width: 500 }} placeholder="ex: 07/12/2019" />
                            </InputTitle>
                            <InputTitle
                                title="Chọn công việc"
                                type={TYPE.SELECT}
                                list_value={list_value}
                                widthLabel="200px"
                                widthSelect="500px"
                                placeholder="ex: Nhân viên văn phòng"
                            />
                            <InputTitle
                                title="Chọn địa chỉ đăng tuyển"
                                type={TYPE.SELECT}
                                list_value={list_value}
                                widthLabel="200px"
                                widthSelect="500px"
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
                                    defaultValue={['a10', 'c12']}
                                    onChange={() => { }}
                                    style={{ width: 500 }}
                                >
                                    {children}
                                </Select>
                            </InputTitle>
                        </div>
                        <Divider orientation="left" >Thời gian làm việc</Divider>
                        <div className="announcements-create-content">
                            <Tabs defaultActiveKey="1" style={{ width: "100%" }} onChange={() => { }}>
                                <TabPane tab="Toàn thời gian" key="1">
                                    <div>
                                      <ShifContent
                                        id={1}
                                      />
                                    </div>
                                </TabPane>
                                <TabPane tab="Bán thời gian" key="2">
                                    Content of Tab Pane 2
                                 </TabPane>
                                <TabPane tab="Thực tập sinh" key="3" >
                                    Content of Tab Pane 3
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
                            >
                                <Link to='/admin/job-management/list'>
                                    <Icon type="close" />
                                    {type_cpn === TYPE.CREATE ? "Hủy bài" : "Hủy sửa"}
                                </Link>
                            </Button>
                        </div>
                    </Col>
                    <Col xs={0} sm={1} md={2} lg={3} xl={3} xxl={4}></Col>
                </Row>
            </div >
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getAnnouncementDetail: (id) => dispatch({ type: REDUX_SAGA.ANNOUNCEMENT_DETAIL.GET_ANNOUNCEMENT_DETAIL, id }),
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_job_names: state.JobNames.items
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobAnnouncementsCreate)