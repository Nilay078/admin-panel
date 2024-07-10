export class AppUrlConstant {
    // Below all routing path is for the public module
    public static readonly HOME = '';
    public static readonly URL_SEPARATOR = '/';
    public static readonly PUBLIC = 'public';
    public static readonly PRIVATE = 'private';
    public static readonly LOGIN = 'login';
    public static readonly FORGOT_PASSWORD = 'forgot-password';
    public static readonly RESET_PASSWORD_VERIFICATION = 'reset-password/:token';
    public static readonly SET_PASSWORD = 'set-password/:token';
    public static readonly OTP_VERIFICATION = 'otp-verification';

    // Below all routing path is for the private module
    public static readonly DASHBOARD = 'dashboard';
    public static readonly NOTIFICATION = 'notification';

    //Module Operations Start
    static readonly VIEW_OPERATION = 'view';
    static readonly LIST_OPERATION = 'list';
    static readonly EDIT_OPERATION = 'edit/';
    static readonly ADD_OPERATION = 'add';

    // Routing path which are common to every module
    public static readonly ERROR = 'error';
    public static readonly INTERNAL_SERVER_ERROR = 'internal-server-error';
    public static readonly PAGE_NOT_FOUND = 'page-not-found';
    public static readonly SERVICE_UNAVAILABLE = 'service-unavailable';
    public static readonly UNAUTHORIZED = 'unauthorized';
    public static readonly FORBIDDEN = 'forbidden';
    public static readonly BAD_GATEWAY = 'bad-gateway';
    public static readonly BAD_REQUEST = 'bad-request';

    // Below are the constant words which are used related to the API calling
    public static readonly ALUMNLY_API = 'alumnly-api';
    public static readonly PUBLIC_API = 'public';
    public static readonly PRIVATE_API = 'private';
}
