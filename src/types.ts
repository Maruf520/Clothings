import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface products{
items: Product[];
total: number;
page: number;
totalPages: number;
}

export interface Product{
    price: string;
    name: string;
    image: string;
    rating: number;
}

export interface PaginationParams{
//[key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
page: number;
perpage: number;
}