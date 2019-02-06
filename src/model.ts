export interface Model<T> {
    [key: string]: T;
}

export type Method = 'get' | 'post' | 'put' | 'delete';

export interface RxRequest {

    url: string;

    method: Method;

    data?:  Model<string>;

    params?: Model<string>;

    headers?: Model<string>;

}