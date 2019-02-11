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
	    private filters;
	    /**
	     * 按照顺序依次执行过滤器
	     * @param request
	     */
	    doFilter(request: RxRequest): void;
	    /**
	     * 添加过滤器
	     * @param filters 过滤器数组
	     */
	    addFilter(...filters: Filter[]): FilterChain;
	    /**
	     * 默认的构造函数
	     */
	    constructor();
	}

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
	    private requestService;
	    get<T>(url: string, params: Model<string>, headers?: Model<string>): Observable<T>;
	    post<T>(url: string, data: Model<string>, headers: Model<string>): Observable<T>;
	    put<T>(url: string, data: Model<string>, headers: Model<string>): Observable<T>;
	    delete<T>(url: string, headers: Model<string>): Observable<T>;
	    addFilter(filter: Filter): RxHttpService;
	    addFilters(...filters: Filter[]): RxHttpService;
	    private toReuqest;
	    constructor();
	}
	export {};

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
	    data?: Model<string>;
	    /**
	     * 请求url参数
	     */
	    params?: Model<string>;
	    /**
	     * 请求头
	     */
	    headers?: Model<string>;
	}

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
	    http<T>(r: RxRequest): Observable<T>;
	    /**
	     * 默认构造函数
	     * 该构造函数会判断当前nodejs环境下时候存在request对象
	     * 同时也会初始化过滤链
	     */
	    constructor();
	}
	export {};

