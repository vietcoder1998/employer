import { decriptTk } from "../config/tk-en-de";

// Create authozization header
export const createAuthozization = (username, password) => {
    let data = username + ":" + password;
    let buff = new Buffer(data);
    let base64data = buff.toString("base64");
    localStorage.setItem("cdcu", username);
    localStorage.setItem("wauthtk", base64data);
}

// Check invalid header
export const authHeaders = {
    "Access-Control-Allow-Headers": "*",
    "Authorization": `Bearer ${decriptTk(localStorage.getItem('erc'), 'TextMustBe16Byte')}`,
}

// Check Login User
export const loginHeaders = (client_id?: string, secret?: string) => ({
    "client_id": client_id ? client_id : "test",
    "secret": secret ? secret : "test",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
})
// No info header
export const noInfoHeader = {
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
}

// Delete state when logout
export const deleteLoginState = () => {
    localStorage.setItem("wauthtk", null);
}

// Set accesstoken and refreshtoken
export const sendStringHeader = {
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "text/plain",
    "Authorization": `Bearer ${decriptTk(localStorage.getItem('erc'), 'TextMustBe16Byte')}`,
}

export const sendFileHeader = {
    "Access-Control-Allow-Headers": "*",
    "Authorization": `Bearer ${decriptTk(localStorage.getItem('erc'), 'TextMustBe16Byte')}`,
}

//Set Authorization