// utils/index.ts

import { setCookie, getCookie, deleteCookie } from "cookies-next";

const tokenName = "mokhtabary_token";

export const setToken = (token: string) => setCookie(tokenName, token);

export const getToken = () => getCookie(tokenName);

export const removeToken = () => deleteCookie(tokenName);

export const checkToken = () => (getCookie(tokenName) ? true : false);
