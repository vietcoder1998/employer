import React, { PureComponent } from 'react'
import { Col, Row, Icon, Form, Input, Button, Checkbox, Tabs, Drawer, message, notification } from 'antd';
import { _requestToServer } from '../../../services/exec';
import './Login.scss';
import { POST } from '../../../const/method';
import { OAUTH2_HOST, EMPLOYER_HOST } from '../../../environment/dev';
import { OAUTH2_LOGIN, EMPLOYER_REGISTER } from '../../../services/api/public.api';
import { loginHeaders, noInfoHeader } from '../../../services/auth';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import { routeLink, routePath } from '../../../const/break-cumb';
import MapContainer from '../layout/map/Map';
import { LinkTo } from '../layout/common/Common';
import setupLogin from '../../../config/setup-login';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
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
    state?: "LOGIN" | "REGISTER";
    confirm?: boolean;
    hp ?: boolean;
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
        }
    }

    UNSAFE_componentWillMount() {
        let is_authen = localStorage.getItem("ecr") ? true : false;
        if (is_authen) {
            window.location.assign(routeLink.JOB_ANNOUNCEMENTS + routePath.CREATE)
        } else {
            let state = this.props.match.path.replace("/", "");
            if (state) {
                state = state.toUpperCase();
                this.setState({ state })
            }
        }
    }

    createRequest = async (type?: "LOGIN" | "REGISTER") => {
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
                        process.env.REACT_APP_CLIENT_ID ,
                        process.env.REACT_APP_CLIENT_SECRET 
                    ),
                    OAUTH2_HOST,
                    null,
                ).then((res: any) => {
                    if (res) {
                        message.success("Đăng nhập thành công");
                        setupLogin(res.data);
                        window.location.assign(routeLink.JOB_ANNOUNCEMENTS + routePath.LIST)
                    }
                }).finally(() => this.setState({ loading: false }))
                break;
            case "REGISTER":
                await _requestToServer(
                    POST,
                    EMPLOYER_REGISTER,
                    { username, password, employerName, lat, lon, email , phone},
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
        let { errMsg, password, username, openDrawer, state, repassword, confirm, loading, hp } = this.state;
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

            <div className='all-content'>
                <Header />
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
                </Drawer>
                <div
                    className="login"
                >
                    <Row>
                        <Col xs={0} sm={4} md={7} lg={7} xl={8} xxl={9}  ></Col>
                        <Col xs={24} sm={16} md={10} lg={10} xl={8} xxl={6} >
                            <Tabs defaultActiveKey="LOGIN" activeKey={state} onChange={(event: "LOGIN" | "REGISTER") => this.setState({ state: event })}  >
                                <TabPane tab="Đăng nhập" key="LOGIN">
                                    <div className="r-p-content">
                                        <div className='msg-noti '>
                                            <h5 style={{ textAlign: "center" }}>Đăng nhập</h5>
                                            <Form onSubmit={this.handleSubmit} className="login-form">
                                                <p>Tên đăng nhập</p>
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
                                                <p>Mật khẩu </p>
                                                <Form.Item>
                                                    {getFieldDecorator('password', {
                                                        rules: [{ required: state === "LOGIN", message: 'Vui lòng điền mật khẩu ' }],
                                                    })(
                                                        <Input
                                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                            size="large"
                                                            placeholder="Mật khẩu"
                                                            type="password"
                                                            maxLength={160}
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
                                        <p className='a_c'>
                                            <Link className={'underline'} to={'/forget-pw'} >Quên mật khẩu ? </Link>
                                        </p>
                                        <p className='a_c'
                                        >
                                            <LinkTo
                                                target='_blank'
                                                href='https://works.vn'
                                            >
                                                Trợ giúp
                                            </LinkTo>
                                        </p>
                                    </div>
                                </TabPane>
                                <TabPane tab="Đăng kí" key="REGISTER">
                                    <div className="r-p-content ">
                                        <div className='msg-noti '>
                                            <h5 style={{ textAlign: "center" }}>Đăng kí</h5>
                                            <Form onSubmit={this.handleSubmit} className="login-form">
                                                <p>Tên công ty/ tổ chức</p>
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
                                                <p>Gmail đăng nhập</p>
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
                                                <p>Số điện thoại</p>
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
                                                <p>Địa chỉ trên bản đồ</p>
                                                <Input
                                                    prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    size="large"
                                                    placeholder="Định vị bản đồ"
                                                    type="text"
                                                    maxLength={240}
                                                    value={localStorage.getItem("location")}
                                                    onClick={() => { this.setState({ openDrawer: true }) }}
                                                />
                                                <p style={{paddingTop: 20}}>Mật khẩu</p>
                                                <Form.Item>
                                                    {getFieldDecorator('password', {
                                                        rules: [{ required: state === "REGISTER", message: 'Vui lòng điền mật khẩu' }],
                                                    })(
                                                        <Input
                                                            prefix={<Icon type="key"
                                                                style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                            maxLength={160}
                                                            size="large"
                                                            type={hp ? "password": "text"}
                                                            placeholder="Chứa ít nhất 6 kí tự"
                                                            suffix={<Icon type='eye' onClick={()=> this.setState({hp:!hp})} />}
                                                            onChange={
                                                                (event: any) => this.setState({ password: event.target.value })
                                                            }
                                                        />
                                                    )}
                                                </Form.Item>
                                                <p>Nhập lại mật khẩu</p>
                                                <Form.Item>
                                                    {getFieldDecorator('repassword', {
                                                        rules: [{ required: state === "REGISTER" && password !== repassword, message: 'Mật khẩu điền lại bị sai ' }],
                                                    })(
                                                        <Input
                                                            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                            size="large"
                                                            placeholder="Nhập lại mật khẩu"
                                                            type="password"
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
                                                {loading ? <Icon type={'loading'} /> : 'Đăng kí'}
                                            </Button>
                                        </p>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col xs={0} sm={4} md={7} lg={10} xl={8} xxl={9}></Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Form.create()(Login)
