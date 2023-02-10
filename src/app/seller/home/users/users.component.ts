import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  name1: string = '';
  role1: string = '';
  sortBy: string = '';
  limit: number = 5;
  page: number = 1;
  totalpages!: number;

  role!: any;
  editId?: string;
  url = `/users?limit=${this.limit}&page=${this.page}`;

  constructor(private http: ApiServiceService, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getUserData();
  }
  paginationData: any;
  editData: boolean = false;
  IdToEdit!: string;
  userList: any;
  usersData: any;
  register = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  getUserData() {
    this.http.getData(this.url).subscribe({
      next: (res: any) => {
        console.log(res);
        this.usersData = res;
        this.totalpages = res.totalPages;
        this.userList = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  collection() {
    this.http.postData('/users', this.register.value).subscribe({
      next: (res) => {
        this.toastr.success('Registered .', 'Successfully!');
        this.paginationData = res;
        this.register.reset();
        console.log(res);
        this.getUserData();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Something Wrong!');
      },
    });
  }

  editUserData() {
    delete this.register.value.role;
    console.log(this.register.value);
    this.http
      .patchData(`/users/${this.IdToEdit}`, this.register.value)
      .subscribe({
        next: (res) => {
          // this.toastr.success('Registered .', 'Successfully!');
          this.register.reset();
          this.getUserData();
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Somthing Wrong!');
        },
      });
  }

  get name() {
    return this.register.get('name');
  }
  get Role() {
    return this.register.get('role');
  }
  get email() {
    return this.register.get('email');
  }
  get Password() {
    return this.register.get('password');
  }

  togglemodalforEditUser(flag: boolean, data?: any) {
    this.editData = flag;
    if (flag) {
      this.register.controls['role'].setValidators([Validators.required]);
    } else {
      this.register.controls['role'].clearValidators();
    }
    if (data) {
      this.IdToEdit = data._id;
      console.log(this.IdToEdit);
      this.register.reset({
        name: data.name,
        email: data.email,
        password: '',
      });
    } else {
      this.register.reset();
    }
  }
  deleteUser(id: string) {
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
        this.http.deleteData(`/users/${id}`).subscribe({
          next: (res: any) => {
            console.log(res);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            this.getUserData();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
  getEditId(id: string) {
    this.editId = id;
  }
  editRole() {
    if (this.role) {
      this.http
        .patchData(`/users/role/${this.editId}`, { role: this.role })
        .subscribe({
          next: (res) => {
            // this.toastr.success('Registered .', 'Successfully!');
            this.register.reset();
            this.getUserData();
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Somthing Wrong!');
          },
        });
    } else {
      return;
    }
  }
  previousPage() {
    this.page--;
    this.url = `/users?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  nextPage() {
    this.page++;
    this.url = `/users?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }

  handleLimit(data: any) {
    this.limit = data;
    this.url = `/users?limit=${this.limit}&page=${this.page}`;
    this.getUserData();
  }
  roleSortby(data: any) {
    if (data === 'user' || data === 'admin') {
      this.role1 = data;
      this.url = `/users?limit=${this.limit}&page=${this.page}&role=${this.role1}`;
      this.getUserData();
    } else {
      this.url = `/users?limit=${this.limit}&page=${this.page}`;
      this.getUserData();
    }
  }
  sortByData(data: any) {
    console.log(data);
    this.sortBy = data;
    this.url = `/users?limit=${this.limit}&page=${this.page}&sortBy=${this.sortBy}`;
    this.getUserData();
  }
  serchValue(data: any) {
    if (data !== '') {
      console.log(data);
      this.name1 = data;
      this.url = `/users?limit=${this.limit}&page=${this.page}&name=${this.name1}`;
      this.getUserData();
    } else {
      this.url = `/users?limit=${this.limit}&page=${this.page}`;
      this.getUserData();
    }
  }
}
