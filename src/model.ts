/**
 * 通用模型类
 * 可索引的模型，索引的字段为T类型
 */
export interface Model<T> {
    [key: string]: T;
}

/**
 * 请求方法
 */
export type Method = 'get' | 'post' | 'put' | 'delete';

/**
 * 请求对象
 */
export interface RxRequest {

    /**
     * 请求url
     */
    url: string;

    /**
     * 请求方法
     */
    method: Method;

    /**
     * 请求体
     */
    data?:  Model<string>;

    /**
     * 请求url参数
     */
    params?: Model<string>;

    /**
     * 请求头
     */
    headers?: Model<string>;

}