import React, { PureComponent } from 'react'
import { Upload, Modal, Icon, Divider, Row, Col, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { InputTitle } from '../../../../layout/input-tittle/InputTitle';
import { REDUX_SAGA } from '../../../../../../common/const/actions';
import { Link } from 'react-router-dom';
import { TYPE } from '../../../../../../common/const/type';
import Mapcontainer from '../../../../layout/map/Map';
import { IAppState } from '../../../../../../redux/store/reducer';
import { _requestToServer } from '../../../../../../services/exec';
import { EM_BRANCHES_API } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { POST } from '../../../../../../common/const/method';

interface EmBranchesCreateState {
    title?: string;
    announcementTypeID: string;
    type_management?: Array<any>;
    list_item?: Array<{ label?: string, value?: string }>,
    loading?: boolean;
    previewImage?: any;
    previewVisible?: boolean;
    fileList?: Array<any>;
    hidden?: boolean;
    content?: string;
    value_annou?: string;
    announcement_detail?: any;
    type_cpn?: string;
    body?: {
        branchName?: string,
        contactEmail?: string,
        contactPhone?: string,
        lat?: number,
        lon?: number
    }
}

interface EmBranchesCreateProps extends StateProps, DispatchProps {
    getTypeManagements: Function;
    getAnnouncementDetail: Function;
    match?: any;
    history?: any;
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class EmBranchesCreate extends PureComponent<EmBranchesCreateProps, EmBranchesCreateState> {
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
            fileList: [],
            hidden: false,
            value_annou: "",
            body: {
                branchName: null,
                contactEmail: null,
                contactPhone: null,
                lat: 0,
                lon: 0
            },
            type_cpn: TYPE.CREATE,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return null;
    }

    async componentDidMount() {
        await this.props.getTypeManagements()
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            await this.props.getAnnouncementDetail(id);
        }
    };


    onChangeValueBody = (value: any, param: string) => {
        let { body } = this.state;
        body[param] = value;
        this.setState({ body });
    }
    createRequest = async () => {
        let { body } = this.state;
        let { mapState } = this.props;
        body.lat = mapState.marker.lat;
        body.lon = mapState.marker.lng;

        await _requestToServer(
            POST,
            EM_BRANCHES_API,
            body,
            null,
            undefined,
            EMPLOYER_HOST,
            true,
            false,
        ).then((res: any) => {
            if (res) {
                this.props.history.push('/admin/jobs/employer-branches/list');
            }
        })
    }

    render() {
        let { mapState } = this.props;
        return (
            <div className='common-content'>
                <h5>
                    Thêm chi nhánh
                </h5>
                <Row>
                    <Col xs={0} sm={1} md={2} lg={3} xl={3} xxl={4}></Col>
                    <Col xs={0} sm={22} md={20} lg={18} xl={18} xxl={16}>
                        <Divider orientation="left" >Thông tin sơ lược</Divider>
                        <div className="announcements-create-content">
                            <InputTitle
                                type={TYPE.INPUT}
                                title="Tên chi nhánh"
                                widthLabel="200px"
                                children={
                                    <Input
                                        style={{ width: 550 }}
                                        prefix={<Icon type="shop" style={{ color: "gray", marginBottom: "-5px" }} />}
                                        placeholder="ex: Công ti cổ phần công nghệ Worksvn JSC"
                                        onChange={
                                            (event: any) => this.onChangeValueBody(event.target.value, "branchName")

                                        }
                                    />
                                }
                            />
                            <InputTitle
                                title="Địa chỉ email"
                                widthLabel="200px"
                                widthComponent="400px"
                            >
                                <Input
                                    style={{ width: 550 }}
                                    type="email"
                                    prefix={<Icon type="mail" style={{ color: "gray", marginBottom: "-5px" }} />}
                                    placeholder="e.x: worksvn@gmail.com"
                                    onChange={
                                        (event: any) => this.onChangeValueBody(event.target.value, "contactEmail")
                                    }
                                />
                            </InputTitle>
                            <InputTitle
                                title="Số điện thoại"
                                type="text"
                                widthLabel="200px"
                                children={
                                    <Input
                                        style={{ width: 550 }}
                                        prefix={<Icon type="phone" style={{ color: "gray", marginBottom: "-5px" }} />}
                                        placeholder="ex: 0982398465"
                                        onChange={
                                            (event: any) => this.onChangeValueBody(event.target.value, "contactPhone")
                                        }
                                    />
                                }
                            />
                            <InputTitle
                                title="Vị trí"
                                widthLabel="200px"
                                placeholder="ex: Nhân viên văn phòng"
                                children={
                                    <Input
                                        value={mapState.location}
                                        placeholder="Chọn vị trí trên bản đồ"
                                        style={{ width: 550 }}
                                        readOnly
                                    />
                                }
                            />
                            <InputTitle
                                title="Bản đồ"
                                widthLabel="200px"
                                placeholder="ex: Nhân viên văn phòng"
                                children={
                                    <Mapcontainer />
                                }
                            />
                            <Divider orientation="left" >Hoàn tất</Divider>
                            <div className="em-branches-create-content">
                                <Button
                                    type="primary"
                                    prefix={"check"}
                                    style={{
                                        margin: "10px 10px",
                                        float: "right"
                                    }}
                                    onClick={() => this.createRequest()}
                                >
                                    <Icon type="right" />
                                </Button>
                                <Button
                                    type="danger"
                                    prefix={"check"}
                                    style={{
                                        margin: "10px 10px",
                                        float: "right"
                                    }}
                                // onClick={() => { this.props.history.push('/admin/jobs/job-announcements/list') }}
                                >
                                    <Icon type="close" />
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={0} sm={1} md={2} lg={3} xl={3} xxl={4}></Col>
                </Row>
            </div >
        )
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getTypeManagements: () => dispatch({ type: REDUX_SAGA.TYPE_MANAGEMENT.GET_TYPE_MANAGEMENT }),
    getAnnouncementDetail: (id) => dispatch({ type: REDUX_SAGA.ANNOUNCEMENT_DETAIL.GET_ANNOUNCEMENT_DETAIL, id }),
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    mapState: state.MutilBox.mapState
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmBranchesCreate)