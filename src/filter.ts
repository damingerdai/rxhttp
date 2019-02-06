import { RxRequest } from "./model";

/**
 * 过滤器接口
 * @author arthur ming
 */
export interface Filter {

    /**
     * 过滤器执行过程
     * @param request rxhttp的请求请求对象 
     */
    doFilter(request: RxRequest): void;
}

/**
 * 基于责任链模式的过滤链，同时也实现了filter接口
 */
export class FilterChain implements Filter {

    /**
     * 内部存放的过滤器的数组
     */
    private filters: Filter[];

    /**
     * 按照顺序依次执行过滤器
     * @param request 
     */
    doFilter(request: RxRequest): void {
        if (this.filters && this.filters.length > 0) {
            this.filters.forEach(filter => filter.doFilter(request));
        }
    }

    /**
     * 添加过滤器
     * @param filters 过滤器数组
     */
    addFilter(...filters: Filter[]): FilterChain {
        if (filters && filters.length > 0) {
            filters.forEach((filter) => this.filters.push(filter));
        }
        return this;
    }

    /**
     * 默认的构造函数
     */
    constructor() {
        this.filters = [];
    }
}
