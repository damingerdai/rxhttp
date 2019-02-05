import { Observable } from 'rxjs';
import { Model } from "./model";
import { RequestService } from './service';

interface IRxHttpService {

     /**
     * 发送http请求
     * @param method 请求方法
     * @param url 请求的连接
     * @param data 请求体数据
     * @param params 请求数据
     * @param header 请求体
     */
   // http<T>(method: Method, url: string, data: Model<string>, params: Model<string>, headers: Model<string>): Observable<T>;

    get<T>(url: string, params: Model<string>, headers: Model<string>): Observable<T>;

    post<T>(url: string, data: Model<string>, headers: Model<string>): Observable<T>;

    put<T>(url: string, data: Model<string>, headers: Model<string>): Observable<T>;

    delete<T>(url: string, headers: Model<string>): Observable<T>;

}


export class RxHttpService implements IRxHttpService {

    private requestService: RequestService

    get<T>(url: string, params: Model<string>, headers: Model<string>): Observable<T> {
        return this.requestService.http('get', url, {}, params, headers);
    }
    post<T>(url: string, data: Model<string>, headers: Model<string>): Observable<T> {
        return this.requestService.http('post', url, data, {}, headers);
    }
    put<T>(url: string, data: Model<string>, headers: Model<string>): Observable<T> {
        return this.requestService.http('put', url, data, {}, headers);
    }
    delete<T>(url: string, headers: Model<string>): Observable<T> {
        return this.requestService.http('delete', url, {}, {}, headers);
    }

    constructor() {
        this.requestService = new RequestService();
    }

}