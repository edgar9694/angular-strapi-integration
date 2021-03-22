import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Job } from "src/models/jobs";

const JOBS_PER_PAGE = 10;

@Injectable()
export class JobsService {
    constructor(private http: HttpClient) { }

    list(page: number = 1, search: string = ''): Observable<Job[]> {
        const searchParameters = search ? `&title_contains=${encodeURIComponent(search)}`: '';

        return this.http.get<Job[]>(
            `${environment.api_base_url}jobs?_start=${(page-1) * JOBS_PER_PAGE}&_limit=${JOBS_PER_PAGE}` + searchParameters
        );
    }


    fetch(id: string): Observable<Job> {
        return this.http.get<Job>(`${environment.api_base_url}jobs/${id}`);
    }
}