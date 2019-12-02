import React, { PureComponent } from 'react'
import { Col, Row, Icon, Form, Input, Button, Checkbox } from 'antd';
import { _requestToServer } from '../../../services/exec';
import './Login.scss';
import { POST } from '../../../common/const/method';
import { OAUTH2_HOST } from '../../../environment/dev';
import { OAUTH2_LOGIN } from '../../../services/api/public.api';
import { loginHeaders } from '../../../services/auth';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import Cookies from 'universal-cookie';

interface LoginState {
    email?: string;
    exactly?: boolean;
    is_loading?: boolean;
    err_msg?: string;
    password?: string;
    username?: string;
}

interface LoginProps {
    form?: any;
    history?: any;
}

class Login extends PureComponent<LoginProps, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            exactly: false,
            is_loading: true,
            err_msg: "",
            password: null,
            username: null,
        }
    }

    componentWillMount() {
        let is_authen = localStorage.getItem("token") ? true : false;
        if (is_authen) {
            window.location.href = "/v1/admin/jobs/announcements/list";
        }
    }

    createRequest = async () => {
        let { password, username } = this.state;
        let res = await _requestToServer(
            POST,
            OAUTH2_LOGIN,
            { username, password },
            undefined,
            loginHeaders("worksvn-employer-web", "worksvn-employer-web@works.vn"),
            OAUTH2_HOST,
            null,
            false,
        )

        if (res && res.code === 200) {
            let exp = new Date((new Date().getTime() + res.data.accessTokenExpSecstoDate) / 1000)
            let cookie = new Cookies()
            cookie.set("actk", res.data.accessToken, { expires: exp, path: "/" });
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("userID", res.data.userID);
            window.location.href = '/v1/admin/jobs/announcements/list'
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.createRequest()
            }
        });
    };

    render() {
        let { err_msg, password, username } = this.state;
        const { getFieldDecorator } = this.props.form;
        let icon = {
            color: "red",
            type: "close"
        }
        let exactly = false;

        if (username && password && username.length > 1 && password.length >= 6) {
            icon.color = "greenyellow";
            icon.type = "check";
            exactly = true;
        }

        return (

            <div className='all-content'>
                <Header />
                <div
                    className="login"
                >
                    <Row>
                        <Col xs={0} sm={4} md={7} lg={7} xl={8} xxl={8}  ></Col>
                        <Col xs={24} sm={16} md={10} lg={10} xl={8} >
                            <div className="r-p-content test">
                                <div className='msg-noti '>
                                    <h5 style={{ textAlign: "center" }}>Đăng nhập</h5>
                                    <Form onSubmit={this.handleSubmit} className="login-form">
                                        <p>Tên đăng nhập</p>
                                        <Form.Item>
                                            {getFieldDecorator('username', {
                                                rules: [{ required: true, message: 'Vui lòng điền tên đăng nhập' }],
                                            })(
                                                <Input
                                                    prefix={<Icon type="lock"
                                                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    maxLength={160}
                                                    size="large"
                                                    type="text"
                                                    placeholder="Tên đăng nhập"
                                                    onChange={
                                                        (event: any)=> this.setState({ username: event.target.value })
                                                    }
                                                    onPressEnter={
                                                        (event) => { if (exactly) { this.handleSubmit(event) } }
                                                    }
                                                />,
                                            )}
                                        </Form.Item>
                                        <p>Mật khẩu mới</p>
                                        <Form.Item>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: 'Vui lòng điền mật khẩu ' }],
                                            })(
                                                <Input
                                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    size="large"
                                                    placeholder="Mật khẩu"
                                                    type="password"
                                                    maxLength={160}
                                                    onChange={(event: any)=> this.setState({ password: event.target.value })}
                                                />,
                                            )}
                                        </Form.Item>
                                        <p>
                                            <Checkbox onChange={() => { }} >Tự động đăng nhập</Checkbox>
                                        </p>
                                    </Form>
                                    {exactly ? "" : <p>{err_msg}</p>}
                                </div>
                                <p className='a_c'>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        className="login-form-button"
                                        style={{ width: "100%" }}
                                        onClick={this.handleSubmit}
                                    >
                                        Xác nhận
                                    </Button>
                                </p>
                                <p className='a_c'>
                                    <a href='/'
                                        style={{ textDecoration: "underline" }}
                                    >
                                        Trợ giúp ?
                                    </a>
                                </p>
                            </div>
                        </Col>
                        <Col xs={0} sm={4} md={7} lg={7} xl={8}></Col>
                    </Row>
                </div>
                <Footer />
            </div>

        )
    }
}

export default Form.create()(Login)
