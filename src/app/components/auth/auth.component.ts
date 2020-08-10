import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { noteServices} from '../../services/notes.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  // selector: 'app-auth',
  templateUrl: './auth.component.html'
  // styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  submitted = false;


  constructor(private noteservice: noteServices, private toastr: ToastrService, private router: Router) {
  
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
    ]);
    this.password = new FormControl('', [Validators.required]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
 
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const data: any = {};
    data.email = this.loginForm.value.email;
    data.password = this.loginForm.value.password;
    // data.companyName = 'optisol';
    // data.is_admin = 1;
    

    this.noteservice.post('api/auth/login', data).subscribe(
      (user: any) =>{
       
        if (user.status === 200) {
          localStorage.setItem('user', JSON.stringify(user.userinfo));
          localStorage.setItem('token', user.token);
          this.toastr.success(user.message);
         
            this.router.navigate(['/add-notes']);
          } else {
                    this.router.navigate(['/login']);
                
                }
              });

}
}
