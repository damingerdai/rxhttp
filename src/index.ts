import { Observable } from 'rxjs';
import { Model, RxRequest, Method } from "./model";
import { RequestService } from './service';
import { Filter } from './filter';

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

    get<T>(url: string, params: Model<string>, headers?: Model<string>): Observable<T>;

    post<T>(url: string, data: Model<string>, headers?: Model<string>): Observable<T>;

    put<T>(url: string, data: Model<string>, headers?: Model<string>): Observable<T>;

    delete<T>(url: string, headers?: Model<string>): Observable<T>;

    addFilter(filter: Filter): IRxHttpService;

    addFilters(...filters: Filter[]): IRxHttpService;

}


export class RxHttpService implements IRxHttpService {

    private requestService: RequestService

    get<T>(url: string, params: Model<string>, headers?: Model<string>): Observable<T> {
        const reqest = this.toReuqest('get', url, {}, params, headers || {});
        return this.requestService.http(reqest);
    }

    post<T>(url: string, data: Model<string>, headers: Model<string>): Observable<T> {
        const reqest = this.toReuqest('post', url, data, {}, headers || {});
        return this.requestService.http(reqest);
    }

    put<T>(url: string, data: Model<string>, headers: Model<string>): Observable<T> {
        const reqest = this.toReuqest('put', url, data, {}, headers || {});
        return this.requestService.http(reqest);
    }

    delete<T>(url: string, headers: Model<string>): Observable<T> {
        const reqest = this.toReuqest('delete', url, {}, {}, headers || {});
        return this.requestService.http(reqest);
    }

    addFilter(filter: Filter): RxHttpService {
        if (filter) {
            this.requestService.filterChain.addFilter(filter);
        }   
        return this;
    }

    addFilters(...filters: Filter[]): RxHttpService {
        if (filters && filters.length > 0) {
            filters.forEach(fitler => this.requestService.filterChain.addFilter(fitler));
        }
        return this;
    }

    private toReuqest(method: Method, url: string, data: Model<string>, params: Model<string>, headers: Model<string>): RxRequest {
        return {
            method: method,
            url:url,
            data:data || {},
            params:params || {},
            headers: headers || {},
        }
    }



    constructor() {
        this.requestService = new RequestService();
    }
}