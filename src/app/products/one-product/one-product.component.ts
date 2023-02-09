import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css'],
})
export class OneProductComponent implements OnInit {
  productId!: string;
  productData: any;
  URL: any;
  constructor(private router: Router, private http: ApiServiceService) {
    console.log(this.router.getCurrentNavigation()?.extras?.state?.['example']); // should log out 'bar'
    this.productId =
      this.router.getCurrentNavigation()?.extras?.state?.['example'];
    this.URL = this.productData?.images[0]?.url;
  }

  ngOnInit(): void {
    console.log(this.productId);

    this.http.getData(`/products/${this.productId}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.productData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  imageUrl(url: any) {
    console.log(url.target.currentSrc);
    this.URL = url.target.currentSrc;
  }
  deleteProduct() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.deleteData(`/products/${this.productId}`).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            this.router.navigate(['/products/product-list']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
