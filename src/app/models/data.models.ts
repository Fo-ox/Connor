export type DataResponse<T> = {
    data: T;
    error: ResponseError;
}

export type ResponseError = {
    message: string;
}

export type Token = {
    access_token: string;
}
