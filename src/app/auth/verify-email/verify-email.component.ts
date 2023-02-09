import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  verifyToken!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: ApiServiceService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.verifyToken = params.token;
      this.verifyAccount();
    });
  }

  verifyAccount() {
    this.http
      .postData(`/auth/verify-email?token=${this.verifyToken}`, '')
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/home/myprofile']);
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Something Wrong!');
          console.log(err);
        },
      });
  }
}
