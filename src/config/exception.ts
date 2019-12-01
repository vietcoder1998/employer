import { notification } from 'antd';

export const exceptionShowNoti = async (err: any, show_noti: boolean) => {
    if (err && err && err.response && err.response.data) {
        let res = err.response.data;
        if (res.code) {
            if (show_noti) {
                notification.error({ description: `${res.msg} (code=${res.code})`, message: "Có lỗi xảy ra" })
            }
        }

    } else {
        if (err) {
            notification.error({ description: `${"máy chủ gặp vấn đề hoặc kiểm tra lại kết nối của bạn"} (code=${500})`, message: "Worksvn thông báo" })
        }
    }

}