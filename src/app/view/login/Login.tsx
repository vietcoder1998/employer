import React, { PureComponent } from 'react'
import { Col, Row, Icon, Form, Input, Button, Checkbox, Tabs, Drawer, message, notification, Avatar, Tooltip, Carousel } from 'antd';
import { _requestToServer } from '../../../services/exec';
import './Login.scss';
import { POST } from '../../../const/method';
import { OAUTH2_HOST, EMPLOYER_HOST } from '../../../environment/dev';
import { OAUTH2_LOGIN, EMPLOYER_REGISTER, M_S } from '../../../services/api/public.api';
import { loginHeaders, noInfoHeader } from '../../../services/auth';
import { routeLink, routePath } from '../../../const/break-cumb';
import MapContainer from '../layout/map/Map';
import setupLogin from '../../../config/setup-login';
import Cookies from 'universal-cookie';
//@ts-ignore
import BGIM from './../../../assets/image/bsn.jpg';
//@ts-ignore
import BGIM2 from './../../../assets/image/bsn2.jpg';
//@ts-ignore
import LG from './../../../logo-01.png';
import Loading from '../layout/loading/Loading';
import ButtonDynamic from './ButtonDynamic';
const { TabPane } = Tabs;
const cookies = new Cookies();

interface LoginState {
    email?: string;
    exactly?: boolean;
    loading?: boolean;
    errMsg?: string;
    password?: string;
    repassword?: string;
    username?: string;
    employerName?: string;
    phone?: number;
    location?: string;
    openDrawer?: boolean;
    state?: "LOGIN" | "REGISTER" | "FORGOT";
    confirm?: boolean;
    hp?: boolean;
    showPw?: boolean;
    loadingCpn?: boolean;
    linkWantToDirect?: string;
    invite?: string
}

interface LoginProps {
    form?: any;
    history?: any;
    match?: any;
}

class Login extends PureComponent<LoginProps, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            exactly: false,
            loading: false,
            errMsg: "",
            password: null,
            repassword: null,
            username: null,
            employerName: null,
            openDrawer: false,
            location: null,
            state: "LOGIN",
            confirm: false,
            hp: true,
            showPw: false,
            loadingCpn: false,
            linkWantToDirect: null,
            invite: 'Tham gia ngay'
        }
        this.interval = null
    }

    componentDidMount() {
        let is_authen = localStorage.getItem("ecr") ? true : false;

        if (is_authen) {
            this.props.history.push(routeLink.JOB_ANNOUNCEMENTS + routePath.CREATE)
        } else {

            let state = this.props.match.path.replace("/", "")
            if (state === 'forgot' || state === 'register') {
                state = state.toUpperCase();
                this.setState({ state })
            } else if(state === 'login' || state === '') {
                // console.log('state' + state)
                this.setState({ state: 'LOGIN' })
            } else {
                this.setState({ state: 'LOGIN' })
                this.setState({ linkWantToDirect: window.location.href })
            }
        }
        // this.interval = setInterval(() => {
        //     // alert("Chào mừng bạn đến với freetuts.net");
        //     if(this.state.invite === null) {
        //         this.setState({invite: 'Tham gia ngay'})
        //     } else {
        //         this.setState({invite: null})
        //     }
        // }, 500);
    }
    componentWillUnmount() {
        // clearInterval(this.interval)
    }
    createRequest = async (type?: "LOGIN" | "REGISTER" | "FORGOT") => {
        let { password, username, employerName, email, phone } = this.state;
        let lat = localStorage.getItem("lat");
        let lon = localStorage.getItem("lon");
        this.setState({ loading: true })
        switch (type) {
            case "LOGIN":
                await _requestToServer(
                    POST,
                    OAUTH2_LOGIN,
                    { username, password },
                    undefined,
                    loginHeaders(
                        process.env.REACT_APP_CLIENT_ID,
                        process.env.REACT_APP_CLIENT_SECRET
                    ),
                    OAUTH2_HOST,
                    null,
                ).then((res: any) => {
                    if (res) {
                        message.success("Đăng nhập thành công");
                        setupLogin(res.data);
                        if (this.state.linkWantToDirect) {
                            console.log('vao linkWantToDirect')
                            window.location.assign(this.state.linkWantToDirect)
                        } else {
                            console.log('vao day')
                            window.location.assign(routeLink.EVENT + '/jobs/list')
                        }
                    }
                }).finally(() => this.setState({ loading: false }))
                break;

            case "REGISTER":
                await _requestToServer(
                    POST,
                    EMPLOYER_REGISTER,
                    { username, password, employerName, lat, lon, email, phone },
                    undefined,
                    noInfoHeader,
                    EMPLOYER_HOST,
                    false,
                    false
                ).then((res: any) => {
                    if (res) {
                        notification.success({
                            message: "Tạo tài khoản thành công",
                            duration: 60,
                            description: <div>Vui lòng xác thực qua <a className='link_to' href='https://mail.google.com/mail/u/0/#inbox' >{email}</a></div>
                        });
                    }
                }).finally(() => this.setState({ loading: false }))
                break;
            default:
                this.setState({ loading: true });
                _requestToServer(
                    POST,
                    M_S,
                    {
                        email
                    },
                    undefined,
                    noInfoHeader,
                    OAUTH2_HOST,
                    true
                ).finally(() => {
                    this.setState({ loading: false })
                })
                break;
        };
    };

    handleSubmit = (e: any, type?: "LOGIN" | "REGISTER") => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.createRequest(type)
            }
        });
    };

    render() {
        let { errMsg, password, username, openDrawer, state, repassword, confirm, loading, hp, email, showPw, loadingCpn } = this.state;
        const { getFieldDecorator } = this.props.form;
        let icon = {
            color: "red",
            type: "close"
        };

        let exactly = false;

        if (username && password && username.length > 1 && password.length >= 6) {
            icon.color = "greenyellow";
            icon.type = "check";
            exactly = true;
        };

        return (
            <>
                <Drawer
                    visible={openDrawer}
                    onClose={() => { this.setState({ openDrawer: false }) }}
                    destroyOnClose={true}
                    width={"450px"}
                    title={"Chọn vị trí trên bản đồ"}
                >
                    <MapContainer
                        style={{
                            width: 400,
                            height: 500,
                            textAlign: "center"
                        }}
                        opensearch={true}
                        disableMarker={true}
                    />
                    <div style={{ margin: 10 }}>
                        <Button
                            onClick={() =>
                                this.setState({ openDrawer: false })}
                            type={"primary"}
                            style={{ float: "right" }}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </Drawer>
                <div
                    className="login"
                >
                    <Row>
                        <Col xs={24} sm={16} md={10} lg={10} xl={9} xxl={8} >
                            {
                                !loadingCpn ?
                                    <Tabs
                                        defaultActiveKey="LOGIN"
                                        activeKey={state}
                                        onChange={(event: "LOGIN" | "REGISTER") => this.setState({ state: event })}
                                    >
                                        <TabPane tab="Đăng nhập" key="LOGIN">
                                            <div className="r-p-content">
                                                <div className='msg-noti '>
                                                    <div className="a_c">
                                                        <Avatar src={LG} style={{ width: 240, height: 80 }} />
                                                    </div>
                                                    <h5 style={{ textAlign: "center" }}>ĐĂNG NHẬP</h5>
                                                    <Form onSubmit={this.handleSubmit} className="login-form">
                                                        <p className='p-t'>Tên đăng nhập</p>
                                                        <Form.Item>
                                                            {getFieldDecorator('username', {
                                                                rules: [{ required: state === "LOGIN", message: 'Vui lòng điền tên đăng nhập' }],
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="user"
                                                                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                    maxLength={160}
                                                                    size="large"
                                                                    type="text"
                                                                    placeholder="Tên đăng nhập"
                                                                    onChange={
                                                                        (event: any) => this.setState({ username: event.target.value })
                                                                    }

                                                                />
                                                            )}
                                                        </Form.Item>
                                                        <p className='p-t'>Mật khẩu </p>
                                                        <Form.Item>
                                                            {getFieldDecorator('password', {
                                                                rules: [{ required: state === "LOGIN", message: 'Vui lòng điền mật khẩu ' }],
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                    size="large"
                                                                    placeholder="Mật khẩu"
                                                                    type={showPw ? "text" : "password"}
                                                                    maxLength={160}
                                                                    suffix={
                                                                        <div
                                                                            className="c-btn"
                                                                            onClick={() => this.setState({ showPw: !showPw })}
                                                                        >
                                                                            <Icon type={showPw ? "eye" : "eye-invisible"} />
                                                                        </div>
                                                                    }
                                                                    onChange={(event: any) => this.setState({ password: event.target.value })}
                                                                    onPressEnter={
                                                                        (event) => { if (exactly) { this.handleSubmit(event, "LOGIN") } }
                                                                    }
                                                                />
                                                            )}
                                                        </Form.Item>
                                                        <p style={{ margin: "20px 0px" }}>
                                                            <Checkbox
                                                                defaultChecked={cookies.get('atlg') === 'true'}
                                                                onChange={
                                                                    (e: any) => cookies.set('atlg', e.target.checked)
                                                                }
                                                            >
                                                                Tự động đăng nhập
                                                        </Checkbox>
                                                        </p>

                                                    </Form>
                                                    {exactly ? "" : <p>{errMsg}</p>}
                                                </div>
                                                <p className='a_c'
                                                >
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        size="large"
                                                        className="login-form-button"
                                                        style={{ width: "100%" }}
                                                        onClick={(event: any) => this.handleSubmit(event, "LOGIN")}
                                                        onKeyDown={(event) => {
                                                            if (event.keyCode === 13) {
                                                                this.createRequest("LOGIN")
                                                            }
                                                        }}
                                                    >
                                                        {loading ? <Icon type={'loading'} /> : 'Đăng nhập'}
                                                    </Button>
                                                </p>
                                                <p className='p-t'>
                                                    <li
                                                        className={'underline a_l asl'}
                                                        style={{ float: "left" }}
                                                        onClick={() => this.props.history.push("/forgot")}
                                                    >
                                                        Quên mật khẩu ?
                                                </li>
                                                    <li
                                                        className={'underline a_r asl'}
                                                        style={{ right: 0 }}
                                                        onClick={() => this.props.history.push("/register")}
                                                    >
                                                        Đăng ký <Icon type={"right"} />
                                                    </li>
                                                </p>

                                            </div>
                                        </TabPane>
                                        <TabPane tab="Đăng ký" key="REGISTER">
                                            <div className="r-p-content ">
                                                <div className='msg-noti '>
                                                    <div className="a_c">
                                                        <Avatar src={LG} style={{ width: 240, height: 80 }} />
                                                    </div>
                                                    <h5 style={{ textAlign: "center" }}>ĐĂNG KÝ</h5>
                                                    <Form onSubmit={this.handleSubmit} className="login-form">
                                                        <p className='p-t'>Tên công ty/ tổ chức</p>
                                                        <Form.Item>
                                                            {getFieldDecorator('employerName', {
                                                                rules: [{ required: state === "REGISTER", message: 'Vui lòng điền Tên công ty/ tổ chức' }],
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                    size="large"
                                                                    placeholder="Tên viết có dấu, không có kí tự đặc biệt"
                                                                    type="text"
                                                                    maxLength={160}
                                                                    onChange={(event: any) => this.setState({ employerName: event.target.value })}
                                                                />
                                                            )}
                                                        </Form.Item>
                                                        <p className='p-t'>Email</p>
                                                        <Form.Item>
                                                            {getFieldDecorator('gmail', {
                                                                rules: [{ required: state === "REGISTER", message: 'Vui lòng điền gmail' }],
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                    size="large"
                                                                    placeholder="ex: worksvn@gmail.com"
                                                                    type="text"
                                                                    maxLength={160}
                                                                    onChange={(event: any) => this.setState({ email: event.target.value })}
                                                                />
                                                            )}
                                                        </Form.Item>
                                                        <p className='p-t'>Số điện thoại</p>
                                                        <Form.Item>
                                                            {getFieldDecorator('phone', {
                                                                rules: [{ required: state === "REGISTER", message: 'Vui lòng điền số điện thoại ' }],
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                    size="large"
                                                                    placeholder="ex: 0123456789"
                                                                    type="text"
                                                                    maxLength={160}

                                                                    onChange={(event: any) => this.setState({ phone: event.target.value })}
                                                                />
                                                            )}
                                                        </Form.Item>
                                                        <p className='p-t'>Địa chỉ trên bản đồ</p>
                                                        <Input
                                                            prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                            size="large"
                                                            placeholder="Định vị bản đồ"
                                                            type="text"
                                                            maxLength={240}
                                                            value={localStorage.getItem("location")}
                                                            onClick={() => { this.setState({ openDrawer: true }) }}
                                                        />
                                                        <p className='p-t'>Mật khẩu</p>
                                                        <Form.Item>
                                                            {getFieldDecorator('password', {
                                                                rules: [{ required: state === "REGISTER", message: 'Vui lòng điền mật khẩu' }],
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="key"
                                                                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                    maxLength={160}
                                                                    size="large"
                                                                    type={hp ? "password" : "text"}
                                                                    placeholder="Chứa ít nhất 6 kí tự"

                                                                    onChange={
                                                                        (event: any) => this.setState({ password: event.target.value })
                                                                    }
                                                                />
                                                            )}
                                                        </Form.Item>
                                                        <p className='p-t'>Nhập lại mật khẩu</p>
                                                        <Form.Item>
                                                            {getFieldDecorator('repassword', {
                                                                rules: [{ required: state === "REGISTER" && password !== repassword, message: 'Mật khẩu điền lại bị sai ' }],
                                                            })(
                                                                <Input
                                                                    prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                    size="large"
                                                                    placeholder="Nhập lại mật khẩu"
                                                                    type="password"
                                                                    suffix={<Icon type="eye" onClick={() => this.setState({ hp: !hp })} />}
                                                                    maxLength={160}
                                                                    onChange={(event: any) => this.setState({ repassword: event.target.value })}
                                                                    onKeyDown={(event) => {
                                                                        if (event.keyCode === 13) {
                                                                            this.createRequest("REGISTER")
                                                                        }
                                                                    }}
                                                                />
                                                            )}
                                                        </Form.Item>
                                                        <p style={{ margin: "20px 0px" }}>
                                                            <Checkbox
                                                                onChange={
                                                                    (event: any) => this.setState({ confirm: event.target.checked })
                                                                }
                                                            >
                                                                Đồng ý với
                                                        <a
                                                                    className='underline'
                                                                    href='https://works.vn/privacy'
                                                                    target='_blank'
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    điều khoản
                                                        </a>
                                                                của chúng tôi
                                                    </Checkbox>
                                                        </p>
                                                    </Form>
                                                    {exactly ? "" : <p>{errMsg}</p>}
                                                </div>
                                                <p className='a_c'
                                                >
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        size="large"
                                                        className="login-form-button"
                                                        style={{ width: "100%" }}
                                                        onClick={(event: any) => this.handleSubmit(event, "REGISTER")}
                                                        disabled={!confirm}
                                                    >
                                                        {loading ? <Icon type={'loading'} /> : 'Đăng ký'}
                                                    </Button>
                                                </p>
                                                <p className='p-t'>
                                                    <li
                                                        className={'underline asl'}
                                                        style={{ float: "left" }}
                                                        onClick={() => this.props.history.push("/login")}
                                                    >
                                                        <Icon type={"left"} /> Đăng nhập
                                            </li>
                                                </p>
                                            </div>
                                        </TabPane>
                                        <TabPane tab="QUÊN MẬT KHẨU" key="FORGOT">
                                            <div className="r-p-content">
                                                <div className='msg-noti '>
                                                    <div className="a_c">
                                                        <Avatar src={LG} style={{ width: 240, height: 80 }} />
                                                    </div>
                                                    <h5 style={{ textAlign: "center" }}>QUÊN MẬT KHẨU</h5>
                                                    <div className="forget-pw">
                                                        <div className="forgot-content">
                                                            <p className='normal a_c'>
                                                                Xác nhận mật khẩu qua email
                                                     </p>
                                                            <p className='normal'>
                                                                <Input
                                                                    placeholder="Email"
                                                                    size="large"
                                                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                    suffix={
                                                                        <Tooltip title="Email của bạn">
                                                                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                                                        </Tooltip>
                                                                    }
                                                                    value={email}
                                                                    onChange={(event) => {
                                                                        this.setState({ email: event.target.value })
                                                                    }
                                                                    }
                                                                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                                                        if (event.keyCode === 13) {
                                                                            this.createRequest()
                                                                        }
                                                                    }}
                                                                    type="text"
                                                                />
                                                            </p>
                                                            <p>
                                                                <Button
                                                                    type="primary"
                                                                    size={"large"}
                                                                    onClick={
                                                                        () => this.createRequest()
                                                                    }
                                                                    block
                                                                >
                                                                    {loading ? <Icon type={'loading'} /> : 'Gửi'}
                                                                </Button>
                                                            </p>

                                                        </div>
                                                    </div>
                                                    {exactly ? "" : <p>{errMsg}</p>}
                                                    <p className='p-t'>
                                                        <li
                                                            className={'underline a_l asl'}
                                                            style={{ left: 0 }}
                                                            onClick={() => this.props.history.push("/login")}
                                                        >
                                                            <Icon type={"left"} /> Đăng nhập
                                                    </li>
                                                        <li
                                                            className={'underline a_r asl'}
                                                            style={{ right: 0 }}
                                                            onClick={() => this.props.history.push("/register")}
                                                        >
                                                            Đăng ký <Icon type={"right"} />
                                                        </li>
                                                    </p>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </Tabs>
                                    : <Loading />}
                        </Col>
                        <Col xs={0} sm={8} md={14} lg={14} xl={15} xxl={16}>
                            <Carousel autoplay effect="fade">
                                <div onClick={() => { window.open('https://forms.gle/9ihSrQ9bVztRHBjs9') }} >
                                    <img src={BGIM} style={{ width: '100%', height: '100vh', overflow: 'hidden', opacity: 0.8, cursor: 'pointer'  }} alt="img4"  />
                                </div>
                                <div onClick={() => { window.open('https://forms.gle/9ihSrQ9bVztRHBjs9') }}>
                                    <img src={BGIM2} style={{ width: '100%', height: '100vh', overflow: 'hidden', opacity: 0.8 }} alt="img1" />
                                </div>
                            </Carousel>
                            <ButtonDynamic />
                            {/* <Button 
                            type="danger" 
                            style={{position: 'absolute', top: 105, right: 25, backgroundColor: '#ff6912', fontWeight: 'bold', minWidth: 122}} 
                            onClick={() => {
                                window.open('https://forms.gle/9ihSrQ9bVztRHBjs9')
                            }}
                            >{this.state.invite}</Button> */}
                            {/* <img src={BGIM} style={{ width: '100%', height: '100vh', overflow: 'hidden', opacity: 0.8 }} alt={"bg"} /> */}
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default Form.create()(Login)
