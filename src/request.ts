import request from 'request';
import { Model, Method } from './model';

interface IHttpService {

    get<T>(url: string, data: Model<string>, header: Model<string>): Promise<T>;

    post<T>(url: string, data: Model<string>, header: Model<string>): Promise<T>;

    put<T>(url: string, data: Model<string>, header: Model<string>): Promise<T>;

    delete<T>(url: string, header: Model<string>): Promise<T>;

    http<T>(method: string, url: string, data: Model<string>, params: Model<string>, header: Model<string>): Promise<T>;
}

export class HttpService implements IHttpService {

    get<T>(url: string, data: Model<string>, header: Model<string>): Promise<T> {
        return this.http('get', url, {}, data, header);
    }

    post<T>(url: string, data: Model<string>, header: Model<string>): Promise<T> {
        return this.http('post', url, data, {}, header);
    }

    put<T>(url: string, data: Model<string>, header: Model<string>): Promise<T> {
        return this.http('put', url, data, {}, header);
    }

    delete<T>(url: string, header: Model<string>): Promise<T> {
        return this.http('delete', url, {}, {}, header);
    }

    http<T>(method: Method, url: string, data: Model<string>, params: Model<string>, headers: Model<string>): Promise<T> {
        const promise = (resolve: (value: T) => void, reject: (error: any) => void) => {
            request({
                method: method,
                url: url,
                headers: headers || {},
                qs: params || {},
                body: data || {},
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(body as T);
                } else {
                    reject(error || 'http error');
                }
            });
        }
        return new Promise(promise);
    }

}