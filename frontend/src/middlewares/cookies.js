import { Cookies } from "react-cookie";

export function verifyCookie(type) {
    const cookie = new Cookies();
    if (cookie.get(type)) {
        return true;
    } else {
        return false;
    }
}

export function saveCookie(token, type, time) {
    const cookie = new Cookies();
    cookie.set(type, { token }, { path: '/', maxAge: time, secure: true }); //60 * 60 * 8 === 8 horas
}

export function getToken(type) {
    const cookie = new Cookies();
    if (cookie.get(type)?.token) {
        return cookie.get(type).token;
    }
}