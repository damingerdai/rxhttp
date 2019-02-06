import request from 'request';
import { Observable } from 'rxjs';
import { RxRequest } from './model';
import { FilterChain } from './filter';

interface IRequestService {

    filterChain: FilterChain;

    /**
    * 发送http请求
    * @param method 请求方法
    * @param url 请求的连接
    * @param data 请求体数据
    * @param params 请求数据
    * @param header 请求体
    */
    // http<T>(method: Method, url: string, data: Model<string>, params: Model<string>, headers: Model<string>): Observable<T>;

    http<T>(request: RxRequest): Observable<T>;
}

export class RequestService implements IRequestService {

    filterChain: FilterChain;

    // http<T>(method: Method, url: string, data: Model<string>, params: Model<string>, headers: Model<string>): Observable<T> {
    //     return Observable.create( (observer: { next: (value: T) => void; error: (value: any) => void; }) => {
    //         request({
    //             method: method,
    //             url: url,
    //             headers: headers || {},
    //             qs: params || {},
    //             body: data || {},
    //             json: true
    //         }, (error, response, body) => {
    //             if (!error && response.statusCode == 200) {
    //                 observer.next(body as T);
    //             } else {
    //                 observer.error(error || 'http error');
    //             }
    //         });
    //     });
    // }
    http<T>(r: RxRequest): Observable<T> {
        this.filterChain.doFilter(r);
        const o = (observer: { next: (value: T) => void; error: (value: any) => void; }) => {
            request({
                method: r.method,
                url: r.url,
                headers: r.headers || {},
                qs: r.params || {},
                body: r.data || {},
                json: true,
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    observer.next(body as T);
                } else {
                    observer.error(error || 'http error');
                }
            })
        }
        return Observable.create(o);
    }

    constructor() {
        if (!request) {
            throw Error('fail to find request');
        }
        this.filterChain = new FilterChain();
    }

}