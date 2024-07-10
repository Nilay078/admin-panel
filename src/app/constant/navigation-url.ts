import { AppUrlConstant } from './app-url';

export class NavigationUrl {
    public static readonly PAGE_NOT_FOUND_URL = `${AppUrlConstant.ERROR}${AppUrlConstant.URL_SEPARATOR}${AppUrlConstant.PAGE_NOT_FOUND}`;
    public static readonly NO_AUTHORISATION = `${AppUrlConstant.ERROR}${AppUrlConstant.URL_SEPARATOR}${AppUrlConstant.UNAUTHORIZED}`;

    // User Module Urls
    private static readonly PUBLIC = `${AppUrlConstant.URL_SEPARATOR}${AppUrlConstant.PUBLIC}${AppUrlConstant.URL_SEPARATOR}`;
    public static readonly HOME = `${NavigationUrl.PUBLIC}${AppUrlConstant.HOME}`;
    public static readonly FORGOT_PASSWORD = `${NavigationUrl.PUBLIC}${AppUrlConstant.FORGOT_PASSWORD}`;
    public static readonly LOGIN = `${NavigationUrl.PUBLIC}${AppUrlConstant.LOGIN}`;

    //Dashboard Module Urls
    public static readonly DASHBOARD = `${AppUrlConstant.DASHBOARD}`;

    //Notification Module Urls
    public static readonly NOTIFICATION = `${AppUrlConstant.NOTIFICATION}`;
    public static readonly NOTIFICATION_MANAGE = `${NavigationUrl.NOTIFICATION}${AppUrlConstant.URL_SEPARATOR}${AppUrlConstant.EDIT_OPERATION}`;
}
