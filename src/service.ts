import request from 'request';
import { Observable } from 'rxjs';
import { RxRequest } from './model';
import { FilterChain } from './filter';

/**
 * 使用操作http请求的服务接口
 * @author arthur ming
 */
interface IRequestService {

    /**
     * 过滤链
     */
    filterChain: FilterChain;

    /**
     * 操作http请求
     * @param request 请求对象
     */
    http<T>(request: RxRequest): Observable<T>;
}

/**
 * IRequestService默认实现
 * @author arthur ming
 */
export class RequestService implements IRequestService {

    filterChain: FilterChain;

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

    /**
     * 默认构造函数
     * 该构造函数会判断当前nodejs环境下时候存在request对象
     * 同时也会初始化过滤链
     */
    constructor() {
        if (!request) {
            throw Error('fail to find request');
        }
        this.filterChain = new FilterChain();
    }

}