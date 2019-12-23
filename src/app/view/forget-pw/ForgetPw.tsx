import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Tooltip, Icon, Button, Col, Row } from 'antd';
import './ForgetPw.scss';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import { _requestToServer } from '../../../services/exec';
import { POST } from '../../../const/method';
import { M_S } from '../../../services/api/public.api';
import { noInfoHeader } from '../../../services/auth';
import { OAUTH2_HOST } from '../../../environment/dev';

interface IFgpws {
    email?: string
    loading?: boolean;
}

interface IFgpwp {
    email?: string
}

class ForgotPw extends Component<IFgpwp, IFgpws>{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false,
        }
    }


    createRequest = () => {
        let { email } = this.state;
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
    }


    render() {
        let { email, loading } = this.state;
        return (
            <>
                <Header />
                <Row>
                    <Col xs={4} sm={0} md={6} xl={8} lg={7} ></Col>
                    <Col xs={16} sm={24} md={12} xl={8} lg={10} >
                        <div className="forget-pw">
                            <div className="forgot-content test">
                                <p className='title a_c'>Quên mật khẩu</p>
                                <p className='normal a_c'>
                                    Xác nhận mật khẩu qua email
                                </p>
                                <p className='normal'>
                                    <Input
                                        placeholder="Email"
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
                                        type='text'
                                    />
                                </p>
                                <p>
                                    <Button
                                        type='primary'
                                        onClick={
                                            () => this.createRequest()
                                        }
                                        block
                                    >
                                        {loading ? <Icon type={'loading'} /> : 'Gửi'}
                                    </Button>
                                </p>
                                <p className='a_c'>
                                    Quay trở lại? <a href='/register' style={{ color: 'red' }}>Đăng kí</a>
                                </p>
                                <p className='a_c'>
                                    <a href='/'>Trợ giúp</a>
                                </p>
                            </div>

                        </div>
                    </Col>
                    <Col xs={4} sm={0} md={6} xl={8} lg={7}></Col>
                </Row>
                <Footer />
            </>
        );
    }
}

export default connect(null, null)(ForgotPw);
