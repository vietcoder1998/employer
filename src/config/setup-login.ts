import Cookies from 'universal-cookie';
import { encriptTk } from './tk-en-de';
interface IOAuth2 {
    userID: string,
    tokenType: string,
    jti: string,
    target: string,
    userExists: boolean,
    accessToken: string,
    refreshToken: string,
    accessTokenExpSecs: number,
    refreshTokenExpSecs: number
}

export default function setupLogin(oauth2?: IOAuth2) {
    let accessTokenExpSecs = new Date(new Date().getTime() + oauth2.accessTokenExpSecs)
    let refreshTokenExpSecs = new Date(new Date().getTime() + oauth2.refreshTokenExpSecs)
    let cookie = new Cookies()

    cookie.set("actk", oauth2.accessToken, { expires: accessTokenExpSecs, path: "/" });
    cookie.set("rftk", oauth2.refreshToken, { expires: refreshTokenExpSecs, path: "/" });
    localStorage.setItem("userID", oauth2.userID);

    encriptTk(oauth2.accessToken, 'TextMustBe16Byte');
}