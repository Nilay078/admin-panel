import { environment } from '../../environments/environment';
import { AppUrlConstant } from './app-url';

export class ApiUrl {
    private static readonly API_URL = `${environment.url}`;
    private static readonly PUBLIC_API_URL = `${this.API_URL}${AppUrlConstant.URL_SEPARATOR}${AppUrlConstant.PUBLIC}${AppUrlConstant.URL_SEPARATOR}`;
    private static readonly PRIVATE_API_URL = `${this.API_URL}${AppUrlConstant.URL_SEPARATOR}${AppUrlConstant.PRIVATE}${AppUrlConstant.URL_SEPARATOR}`;

    // Api related to the Public module
    public static readonly LOGIN_API = `${this.PUBLIC_API_URL}user/login`;
    public static readonly LOGOUT_API = `${this.PRIVATE_API_URL}user/logout`;

    // Api related to the Notification Module
    public static readonly NOTIFICATION_LIST = `${this.PRIVATE_API_URL}notification/search`;
    public static readonly ENABLE_DISABLE_NOTIFICATION = `${this.PRIVATE_API_URL}notification/enable-disable`;
    public static readonly EDIT_NOTIFICATION = `${this.PRIVATE_API_URL}notification/edit`;
    public static readonly DAYS_DROPDOWN = `${this.PUBLIC_API_URL}keyvalue/days`;
    public static readonly UPDATE_NOTIFICATION = `${this.PRIVATE_API_URL}notification/update`;

    // Api related to the authentication module
    public static readonly GENERATE_ACCESS_TOKEN = `${this.PRIVATE_API_URL}user/get-access-token`;
    public static readonly IS_USER_LOGGEDIN = `${this.PRIVATE_API_URL}user/is-loggedIn`;
}
