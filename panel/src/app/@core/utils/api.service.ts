import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SITE_URL } from '../core.constants';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ApiService {
    base_version = "api/v1/";
    where = {
        user : "admin/user",
        role : "admin/role",
        company : "admin/company",
        membership : "admin/membership",
    };

    apiUrl = SITE_URL;
    
    constructor(private http: HttpClient, private _sanitizer:DomSanitizer) { }

    serializeParams(obj): URLSearchParams{
        let params: URLSearchParams = new URLSearchParams();
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                params.set(key, obj[key]);
        }
        return params;
    }
    
    private getUrlWhere(where){
        let url = this.where[where];
        if (url == undefined)
            url = where;
        return url
    }

    public getAll(options, where) {
        let serializedForm = '';
        if (options && typeof options == 'object')
            serializedForm = '?' + this.serializeParams(options);

        const url = this.getUrlWhere(where);
        return this.http.get(SITE_URL + this.base_version + url + serializedForm);
    }

    public getById(id: number, where) {
        const url = this.getUrlWhere(where);
        return this.http.get(SITE_URL + this.base_version + url + '/' + id);
    }

    public get(where) {
        const url = this.getUrlWhere(where);
        return this.http.get(SITE_URL + this.base_version + url);
    }

    public create(obj: any, where) {
        const url = this.getUrlWhere(where);
        return this.http.post(SITE_URL + this.base_version + url, obj);
    }

    public update(obj: any, where) {
        const url = this.getUrlWhere(where);
        return this.http.put(SITE_URL + this.base_version + url + '/' + obj.id, obj);
    }

    public clone(id: number, where) {
        const url = this.getUrlWhere(where);
        return this.http.get(SITE_URL + this.base_version + url + '/' + id + '/clone');
    }

    public renew(id: number, where) {
        const url = this.getUrlWhere(where);
        return this.http.get(SITE_URL + this.base_version + url + '/' + id + '/renew');
    }


    public delete(id: number, where) {
        const url = this.getUrlWhere(where);
        return this.http.delete(SITE_URL + this.base_version + url + '/' + id);
    }

    public destroy(id: number, where) {
        const url = this.getUrlWhere(where);
        return this.http.delete(SITE_URL + this.base_version + url + '/' + id + '/destroy');
    }

    public uploadFiles(data: FormData, where) {
        const url = this.getUrlWhere(where);
        return this.http.post(SITE_URL + this.base_version + url , data, {
            reportProgress: true,
            observe: 'events',
        });
    }

    public downloadFile(url, name) {
        this.http.get(this.apiUrl + url,  {responseType: 'arraybuffer'} )
            .subscribe((response) => {
                const url = window.URL
                    .createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
            });
    }

    public getUser(): Observable<any> {
        const url = SITE_URL + this.base_version + 'me/data';
        return this.http.get(url);
    }

    // functions
    public getErrors(err) {
        let messageError = '<strong>Se encontraron los siguientes errores</strong>:</br><ul style="margin-top: 5px;">';
        const res = typeof err.json === 'function' ? err.error.json() : err.error;
        if (typeof res == 'object') {
            for (const v in res) {
                if (res[v] instanceof Array) {
                    for (const r in res[v]) {
                        messageError += '<li>' + res[v][r] + '</li>';
                    }
                } else {
                    messageError += '<li>' + res[v] + '</li>';
                }

            }
            messageError += '</ul>';
        } else if (typeof err.error == 'string') {
            messageError = '<strong>' + err.error + '</strong>';
        } else {
            messageError = '<strong>Ocurrio un error interno, comuniquese con el administador</strong>';
        }
        return this._sanitizer.bypassSecurityTrustHtml(messageError);
    }
}
