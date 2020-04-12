import { loginHeaders } from './../services/auth';
import { RFGTK } from './../services/api/public.api';
import { POST } from './../const/method';
import { _requestToServer } from './../services/exec';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { notification } from 'antd';
import { OAUTH2_HOST } from '../environment/dev';
import setupLogin from './setup-login';

export const exceptionShowNoti = async (err: any) => {
    if (err && err && err.response && err.response.data) {
        let res = err.response.data;
        if (res.code && res.code !== 4011) {
            notification.error({ description: `${res.msg} (code=${res.code})`, message: "Có lỗi xảy ra" })
        }
        
        if  (res.code && res.code === 4011) {
            // @ts-ignore
            let cookies = new Cookies();

            if (cookies.get('atlg') === 'true') {
                let rftk = cookies.get('rftk');
                _requestToServer(
                    POST,
                    RFGTK,
                    {
                        refreshToken: rftk
                    },
                    undefined,
                    loginHeaders(
                        process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID : 'worksvn-employer-web',
                        process.env.REACT_APP_CLIENT_SECRET ? process.env.REACT_APP_CLIENT_SECRET : 'worksvn-employer-web@works.vn'
                    ),
                    OAUTH2_HOST,
                    false,
                    false,
                ).then(
                    (res: any) => {
                        setupLogin(res.data);
                        window.location.reload(true);
                    }
                )
            } else
                Swal.fire({
                    titleText: 'Phiên đăng nhập đã hết hạn',
                    icon: 'warning',
                    onClose: () => {
                        localStorage.clear();
                        window.location.assign('/');
                    },
                    timer: 5000
                })
        }

    } else {
        if (err) {
            notification.error({ description: `${"máy chủ gặp vấn đề hoặc kiểm tra lại kết nối của bạn"} (code=${500})`, message: "Worksvn thông báo" })
        }
    }

}