export class ErrorMessage {
    public static readonly 400 = {
        shortDescription: 'Bad Request',
        longDescription: "Please make sure you've filled out all necessary fields correctly and try again",
    };
    public static readonly 401 = {
        shortDescription: 'UNAUTHORIZED',
        longDescription: "You don't have permission to access a requested resource",
    };
    public static readonly 403 = {
        shortDescription: 'Forbidden',
        longDescription: "You don't have enough rights to access a requested page.",
    };
    public static readonly 404 = {
        shortDescription: 'Page Not Found',
        longDescription: 'We are unable to locate a requested page',
    };
    public static readonly 500 = {
        shortDescription: 'Internal Server Error',
        longDescription: 'Oops Something went wrong',
    };
    public static readonly 502 = {
        shortDescription: 'Bad Gateway',
        longDescription: "There's a temporary hiccup in our system. Our team is already on it Please try again later",
    };
    public static readonly 503 = {
        shortDescription: 'Service Unavailable',
        longDescription: "We're sorry, but we couldn't process your request at the moment. Please try again later",
    };
}
