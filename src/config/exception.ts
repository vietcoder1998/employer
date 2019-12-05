import { notification } from 'antd';

export const exceptionShowNoti = async (err: any) => {
    if (err && err && err.response && err.response.data) {
        let res = err.response.data;
        if (res.code) {
            notification.error({ description: `${res.msg} (code=${res.code})`, message: "Có lỗi xảy ra" })
        }

    } else {
        if (err) {
            notification.error({ description: `${"máy chủ gặp vấn đề hoặc kiểm tra lại kết nối của bạn"} (code=${500})`, message: "Worksvn thông báo" })
        }
    }

}