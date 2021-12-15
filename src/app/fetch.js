import { get_token } from "./helpers";
const own_fetch = async ({ url, body, method }) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${get_token()}`,
    }
    if (!method || method.match(/GET|get|DELETE|delete/g))
        return fetch(url, { method, headers });
    return fetch(url, {
        method,
        body,
        headers
    });
};

export default own_fetch;