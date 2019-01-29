import { Observable } from 'rxjs';
import { Model } from "./model";
import { HttpService } from './request';


export class RxHttpService {

    private httpService: HttpService;

    http<T>(method: string, url: string, data: any, params: any, headers: Model<string>): Observable<T> {
        return Observable.create( (observer: { next: (value: T) => void; error: (value: any) => void; }) => {
            this.httpService.http<T>(method, url, data, params, headers)
            .then(res => observer.next(res)).catch(error => observer.error(error));
        })
    }
    constructor() {
        this.httpService = new HttpService();
    }

}