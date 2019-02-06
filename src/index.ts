import { Observable } from 'rxjs';
import { Model, RxRequest, Method } from "./model";
import { RequestService } from './service';
import { Filter } from './filter';

/**
 * 基于rxjs的http请求接口
 * @author arthur ming
 */
interface IRxHttpService {

    /**
     * 发送get请求
     * @param url 请求网址
     * @param params 请求url的参数
     * @param headers 请求头
     */
    get<T>(url: string, params: Model<string>, headers?: Model<string>): Observable<T>;

    /**
     * 发送post请求
     * @param url 请求网址
     * @param data 请求体
     * @param headers 请求头
     */
    post<T>(url: string, data: Model<string>, headers?: Model<string>): Observable<T>;

    /**
     * 发送put请求
     * @param url 请求网址
     * @param data 请求体
     * @param headers 请求头
     */
    put<T>(url: string, data: Model<string>, headers?: Model<string>): Observable<T>;

    /**
     * 发送delete请求
     * @param url 请求网址
     * @param headers 请求体
     */
    delete<T>(url: string, headers?: Model<string>): Observable<T>;

    /**
     * 添加过滤器
     * @param filter 过滤器
     */
    addFilter(filter: Filter): IRxHttpService;

    /**
     * 批量添加过滤器
     * @param filters 过滤器数组
     */
    addFilters(...filters: Filter[]): IRxHttpService;

}

/**
 * IRxHttpService的默认实现
 * 基于rxjs和request框架
 * @author arthur ming
 */
export class RxHttpService implements IRxHttpService {

    /**
     * 实际操作http请求的服务对象
     */
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