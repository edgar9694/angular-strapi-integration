import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/services/jobs.service';
import { Job } from 'src/models/jobs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'jobs-front';

  page: number = 1;
  searchString: string = '';
  loading: boolean = false;
  jobs: Job[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
   this.page = 1;
   this.fetchJobs();
  }

  /**
   * Navigate to the previoues page
   */
  previousPage(){
    this.page--;
    if (this.page < 1) this.page = 1;
    this.fetchJobs();
  }

  /**
   * Navigate to the next page
   */
  nextPage() {
    this.page++;
    this.fetchJobs();
  }

  /**
   * Submit search by title
   */
  submitSearch() {
    this.page = 1;
    this.fetchJobs();
  }

  /**
   * Fetch jobs according to page and searchString
   */
  fetchJobs() {
    this.loading = true;
    this.jobsService.list(this.page, this.searchString).subscribe(
      (jobs) => {        
        this.jobs = jobs;
        console.log(this.jobs);
        
        this.loading = false;
      }
    )
  }
}
