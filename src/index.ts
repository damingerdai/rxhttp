import { HttpService } from './request';
import { Header } from "./model";
import { Observable } from 'rxjs';


export class RxHttpService {

    private httpService: HttpService | undefined;

    // http<T>(method: string, url: string, data: any, params: any, headers: Header<string>): Observable<T> {
    //     this.httpService.http(method, url, data, params, headers)
    //     return  null;
    // }
}