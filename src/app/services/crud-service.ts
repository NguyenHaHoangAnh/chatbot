import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getBackendApiUrl } from '../app-constants';

export abstract class AbstractCrudService implements CurdService {
    static httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    static options = { headers: AbstractCrudService.httpHeaders }

    protected constructor(protected httpClient: HttpClient) { }
    
    abstract getApiName(): string;

    // get<T>(id: any, url: string) {
    //     return {url: url + '/' + id, http: this.httpClient.get<T>(url + '/' + id + '', AbstractCrudService.options)};
    // }

    get<T>(id: any, url: string) {
        return this.httpClient.get<T>(url + '/' + id, AbstractCrudService.options);
    }

    put<T>(id: any, data: any, url: string) {
        return this.httpClient.put<T>(url + '/' + id, JSON.stringify(data), AbstractCrudService.options);
    }

    del<T>(id: any, url: string) {
        return this.httpClient.delete<T>(url + '/' + id, AbstractCrudService.options);
    }

    post<T>(data: any, url: string) {
        return this.httpClient.post<T>(url, JSON.stringify(data), AbstractCrudService.options);
    }

    getBaseUrl(): string {
        return getBackendApiUrl(this.getApiName()) + '/' + this.getApiName();
    }

    view<T>(id: any) {
        return this.get<T>(id, this.getBaseUrl());
    }

    create<T>(data: any) {
        return this.post<T>(data, this.getBaseUrl());
    }

    update<T>(id: any, data: any) {
        return this.put<T>(id, data, this.getBaseUrl());
    }

    delete<T>(data: any) {
        return this.del<T>(data, this.getBaseUrl());
    }
}

export interface CurdService {
    getApiName(): string;

    view<T>(id: any): any;

    create<T>(data: any): any;

    update<T>(id: any, data: any): any;

    delete<T>(id: any): any;

    get<T>(id: any, url: string): any;

    put<T>(condition: any, data: any, url: string): any;

    del<T>(data: any, url: string): any;

    post<T>(data: any, url: string): any;
}