import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from 'src/models/jobs';
import { JobsService } from 'src/services/jobs.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.sass']
})
export class JobComponent implements OnInit {

  api_base_url: string = environment.api_base_url.slice(0, -1);
  is_loading: boolean = false;
  job: Job ;
  routeSubscription: Subscription = new Subscription();

  constructor(
            private jobsService: JobsService,
            private route: ActivatedRoute
              ) {
                this.job = {
                  id: 0,
                  title: '',
                  description: '',
                  company: {
                    id: 0,
                    name:'',
                    Size: 'small_1_to_50',
                    website_url: '',
                    contact_email: '',
                    logo: { 
                        url: '',
                    },
                    created_at: new Date(),
                    updated_at: new Date(),
                  },
                  created_at: new Date(),
                  updated_at: new Date(),
                }
               }

  ngOnInit(): void {
    // Load job on route change
    this.routeSubscription = this.route.paramMap.subscribe( paramMap => {
      this.is_loading = true;
      this.jobsService.fetch(
          (paramMap.get('jobId') as string)
          ).subscribe(
          (job) => {
            this.job = job;
            this.is_loading = false;
          }
        )
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
  }
}
