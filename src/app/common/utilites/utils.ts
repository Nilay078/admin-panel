import { LocalStorageKey } from '../../constant/akita-store';
import { Login } from '../../public/login/login';

export default class CommonUtility {
    public static getAccessToken() {
        return JSON.parse(localStorage.getItem(LocalStorageKey.accessToken)!);
    }

    public static getRefreshToken() {
        return JSON.parse(localStorage.getItem(LocalStorageKey.refreshToken)!);
    }

    public static getCurrentUser() {
        return JSON.parse(localStorage.getItem(LocalStorageKey.CURRENT_USER)!);
    }

    public static setAccessToken(accessToken: string) {
        return localStorage.setItem(LocalStorageKey.accessToken, JSON.stringify(accessToken));
    }

    public static setUserView(user: Login) {
        return localStorage.setItem(LocalStorageKey.CURRENT_USER, JSON.stringify(user));
    }

    public static setRefreshToken(refreshToken: string) {
        return localStorage.setItem(LocalStorageKey.refreshToken, JSON.stringify(refreshToken));
    }

    public static checktokenExpired(token: string) {
        const expiry = JSON.parse(atob(token.split('.')[1])).exp;
        return Math.floor(new Date().getTime() / 1000) >= expiry;
    }

    public static removeStorage() {
        localStorage.removeItem(LocalStorageKey.accessToken);
        localStorage.removeItem(LocalStorageKey.refreshToken);
        localStorage.removeItem(LocalStorageKey.CURRENT_USER);
    }
}
