import React from 'react'
import { Icon, Divider, Row, Col, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { InputTitle } from '../../../../layout/input-tittle/InputTitle';
import { REDUX_SAGA, REDUX } from '../../../../../../const/actions';
import { TYPE } from '../../../../../../const/type';
import Mapcontainer from '../../../../layout/map/Map';
import { IAppState } from '../../../../../../redux/store/reducer';
import { _requestToServer } from '../../../../../../services/exec';
import { EM_BRANCHES_API } from '../../../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../../../environment/dev';
import { POST, PUT } from '../../../../../../const/method';
import { IEmBranch } from '../../../../../../models/em-branches';
import { IMapState } from '../../../../../../models/mutil-box';
import { routeLink, routePath } from '../../../../../../const/break-cumb';

interface IEmBranchesCreateState {
    title?: string;
    announcementTypeID: string;
    typeMng?: Array<any>;
    listItem?: Array<{ label?: string, value?: string }>,
    loading?: boolean;
    previewImage?: any;
    previewVisible?: boolean;
    fileList?: Array<any>;
    hidden?: boolean;
    content?: string;
    valueAnnou?: string;
    annouDetail?: any;
    typeCpn?: string;
    body?: {
        branchName?: string,
        contactEmail?: string,
        contactPhone?: string,
        lat?: number,
        lon?: number
    }
    id?: string;
}

interface EmBranchesCreateProps extends StateProps, DispatchProps {
    match?: any;
    history?: any;
    getListEmBranches?: Function;
    handleMap?: Function;
}

class EmBranchesCreate extends React.Component<EmBranchesCreateProps, IEmBranchesCreateState> {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            announcementTypeID: "",
            typeMng: [],
            listItem: [],
            loading: false,
            previewImage: null,
            previewVisible: false,
            fileList: [],
            hidden: false,
            valueAnnou: "",
            body: {
                branchName: null,
                contactEmail: null,
                contactPhone: null,
                lat: 0,
                lon: 0
            },
            typeCpn: TYPE.CREATE,
            id: null,
        }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: IEmBranchesCreateState) {
        if (
            (nextProps.match.params.id &&
            nextProps.match.params.id !== prevState.id) || !prevState.body
        ) {
            let typeCpn = TYPE.CREATE;
            if (nextProps.match.url.includes("fix")) {
                typeCpn = TYPE.EDIT;
            };

            let { body } = prevState;
            nextProps.listEmBranches.forEach((element: IEmBranch) => {
                if (element.id === nextProps.match.params.id) {
                    nextProps.handleMap({ marker: { lat: element.lat, lng: element.lon }, location: element.address });
                    body.branchName = element.branchName;
                    body.lon = element.lon;
                    body.lat = element.lat;
                    body.contactEmail = element.contactEmail;
                    body.contactPhone = element.contactPhone;
                }
            });

            return {
                body,
                typeCpn,
                id: nextProps.match.params.id
            }
        }
        return null
    }

    async componentDidMount() {
        await this.props.getListEmBranches()
    };

    createRequest = async () => {
        let { body, typeCpn, id } = this.state;
        let { mapState } = this.props;
        body.lat = mapState.marker.lat;
        body.lon = mapState.marker.lng;
        await this.setState({ loading: true });
        switch (typeCpn) {
            case TYPE.CREATE:
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
                        this.props.history.push(routeLink.EM_BRANCHES + routePath.LIST);
                    }
                }).finally(() => this.setState({ loading: false }))
                break;
            case TYPE.EDIT:
                await _requestToServer(
                    PUT,
                    EM_BRANCHES_API + `/${id}`,
                    body,
                    null,
                    undefined,
                    EMPLOYER_HOST,
                    true,
                    false,
                ).then((res: any) => {
                    if (res) {
                        this.props.history.push(routeLink.EM_BRANCHES + routePath.LIST);
                    }
                }).finally(() => this.setState({ loading: false }))
                break;

            default:
                break;
        }
    }

    render() {
        let { body, typeCpn, loading } = this.state;

        let btcc = "Hủy";
        let btnx = "Tạo mới"

        if (typeCpn === TYPE.EDIT) {
            btnx = "Lưu lại"
        }
        return (
            <div className='common-content'>
                <h5>
                    {typeCpn === TYPE.EDIT ? "Thêm chi nhánh" : "Sửa chi nhánh"}
                </h5>
                <Row>
                    <Col xs={0} sm={1} md={2} lg={3} xl={3} xxl={4}></Col>
                    <Col xs={0} sm={22} md={20} lg={18} xl={18} xxl={16}>
                        <Divider orientation="left" >Thông tin chi nhánh</Divider>
                        <div className="announcements-create-content">
                            <InputTitle style={{color: 'black',fontSize: 15}}
                                type={TYPE.INPUT}
                                title="Tên chi nhánh"
                                widthLabel="200px"
                                children={
                                   
                                    <Input
                                        value={body.branchName}
                                        style={{ width: 550 }}
                                        type="text"
                                        maxLength={260}
                                        prefix={<Icon type="shop" style={{ color: "gray", marginBottom: "-5px" }} />}
                                        placeholder="ex: Công ty cổ phần công nghệ Worksvn JSC"
                                        onChange={
                                            (event: any) => {
                                                body["branchName"] = event.target.value;
                                                this.setState({ body });
                                            }
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
                                    maxLength={260}
                                    type="email"
                                    prefix={<Icon type="mail" style={{ color: "gray", marginBottom: "-5px" }} />}
                                    placeholder="e.x: worksvn@gmail.com"
                                    value={body.contactEmail}
                                    onChange={
                                        (event: any) => {
                                            body["contactEmail"] = event.target.value;
                                            this.setState({ body });
                                        }
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
                                        type="text"
                                        maxLength={260}
                                        prefix={<Icon type="phone" style={{ color: "gray", marginBottom: "-5px" }} />}
                                        placeholder="ex: 0982398465"
                                        value={body.contactPhone}
                                        onChange={
                                            (event: any) => {
                                                body["contactPhone"] = event.target.value;
                                                this.setState({ body });
                                            }
                                        }
                                    />
                                }
                            />
                            <InputTitle
                                title="Bản đồ"
                                widthLabel="200px"
                                placeholder="ex: Nhân viên văn phòng"
                                children={
                                    <Mapcontainer opensearch={true} />
                                }
                            />
                            
                            <div className="em-branches-create-content">
                                <Button
                                    type="primary"
                                    icon={loading ? "loading" : "check"}
                                    style={{
                                        margin: "10px 10px",
                                        float: "right"
                                    }}
                                    onClick={() => this.createRequest()}
                                    children={btnx}
                                />
                                <Button
                                    type="danger"
                                    style={{
                                        margin: "10px 10px",
                                        float: "right"
                                    }}
                                    icon="close"
                                    onClick={() => { this.props.history.push(routeLink.EM_BRANCHES + routePath.LIST) }}
                                    children={btcc}
                                />
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
    getListEmBranches: (pageIndex: number = 0, pageSize: number = 0) =>
        dispatch({ type: REDUX_SAGA.EM_BRANCHES.GET_EM_BRANCHES, pageIndex, pageSize }),
    handleMap: (mapState: IMapState) =>
        dispatch({
            type: REDUX.MAP.SET_MAP_STATE,
            mapState
        })
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    mapState: state.MutilBox.mapState,
    listEmBranches: state.EmBranches.items
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmBranchesCreate)