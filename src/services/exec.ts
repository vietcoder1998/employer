import { exceptionShowNoti } from './../config/exception';
import { notification, message } from 'antd';
import { GET, POST, PUT, DELETE } from '../const/method';
import { _delete, _get, _post, _put } from './base-api';
import { authHeaders } from "./auth";

export const _requestToServer = async (
    method: string,
    api: string,
    data?: any,
    params?: any,
    headers?: any,
    host?: string,
    show_noti?: boolean,
    show_alert?: boolean,
    not_err?: boolean,
) => {
    if (!host) {
        host = process.env.REACT_APP_API_HOST;
    }
    let response;
    try {
        if (!headers) {
            headers = authHeaders;
        }
        logRequest(method, host, api, data, params, headers);
        switch (method) {
            case GET:
                response = await _get(host, api, params, headers);
                break;
            case POST:
                response = await _post(host, api, data, params, headers);
                break;
            case PUT:
                response = await _put(host, api, data, params, headers);
                break;
            case DELETE:
                response = await _delete(host, api, data, params, headers);
                break;
            default:
                break;
        }
        logResponse(method, host, api, response, params, headers);
        if (response) {
            if (show_noti) {
                notification.success({
                    message: "Thành công",
                    description: response.msg,
                    duration: 2
                })
            }
            if (show_alert) {
                message.success(
                    response.msg,
                    3
                )
            }
        }
        return response;
    } catch (err) {
        let msg;
        if (err.response) {
            let data = err.response.data;
            if (data) {
                msg = data.msg;
            }
        } else {
            msg = err.message;
        }

        if (show_alert) {
            message.error(
                msg,
                3
            )

        } else
        if (!not_err) {
            exceptionShowNoti(err);
        }
        throw err;
    }
};

function logRequest(method: string, host: string | undefined, api: string, body?: any, params?: any, headers?: any) {
    // if (process.env.REACT_APP_ENABLE_LOGGING) {
    //     console.log('REQUEST ' + method + ' ' + host + api, {
    //         api: method + " " + host + api,
    //         body: body,
    //         params: params,
    //         headers: headers
    //     });
    // }
}

function logResponse(method: string, host: string | undefined, api: string, responseBody?: any, params?: any, headers?: any) {
    // if (process.env.REACT_APP_ENABLE_LOGGING) {
    //     console.log('RESPONSE ' + method + ' ' + host + api, {
    //         api: method + " " + host + api,
    //         body: responseBody,
    //         params: params,
    //         headers: headers
    //     });
    // }
}