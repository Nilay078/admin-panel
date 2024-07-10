export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface CommonResponse extends AuthResponse {
    code: number;
    message: string;
}

export interface CommonViewResponse<Entity> extends CommonResponse {
    view: Entity;
}

export interface CommonListResponse<Entity> extends CommonResponse {
    list: Array<Entity>;
    records: number;
}
