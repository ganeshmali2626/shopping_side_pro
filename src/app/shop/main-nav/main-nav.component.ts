import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service.service';
import Swal from 'sweetalert2';

const SWEETALERT_CONFIG_TOKEN = 'SweetAlertConfigToken';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  providers: [
    {
      provide: SWEETALERT_CONFIG_TOKEN,
      useValue: {
        title: 'Are you sure?',
        text: "You won't be Logout!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      },
    },
  ],
})
export class MainNavComponent {
  navData!:boolean;
  showdetails: boolean = false;
  constructor(
    private rout: Router,
    private logoutUser: LocalStorageServiceService,
    @Inject(SWEETALERT_CONFIG_TOKEN) private swalConfig: any
  ) {
    this.navData=this.logoutUser.customerGetData() === null
  }
  alertfun() {
    Swal.fire(this.swalConfig).then((result: any) => {
      if (result.isConfirmed) {
        this.logout();
        Swal.fire('Logout!', 'Your are successfully loged out.', 'success');
      }
    });
  }
  logout() {
    this.logoutUser.customerremoveData();
    this.rout.navigate(['/shop/products']);
    this.navData=true;
  }
}

