import * as request from 'request';
import { Header } from './model';

interface IHttpService {

    // get<T>(url: string, data: any, header: Header<string>): Promise<T>;

    // post<T>(url, data, header): Promise<T>;

    // put<T>(url, data, header): Promise<T>;

    // delete<T>(url, data, header): Promise<T>;

    http<T>(method, url, data: any, params: any, header: Header<string>): Promise<T>;
}

export class HttpService implements IHttpService {

    http<T>(method: any, url: any, data: any, params: any, headers: Header<string>): Promise<T> {
        const promise = (resolve, reject) => {
            request({
                method: method,
                url: url,
                headers: headers || {},
                qs: params,
                body: data,
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(body as T);
                } else {
                    reject(error);
                }
            });
        }
        return new Promise(promise);
    }

}