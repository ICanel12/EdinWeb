import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 
})
export class LoginComponent implements OnInit {  
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorEmail') private errorEmail: SwalComponent;
  @ViewChild('errorPassword') private errorPassword: SwalComponent;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private authenticationService:AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.adminValue) { 
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.email])],
      pass: ['',Validators.required]
    });  

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  goToRegister(){
    this.router.navigate(['register']);
  }

  login(){
    this.submitted = true

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.value).then((admin) => {
      if(admin.email && admin.password){
        this.submitted = false;
        this.loading = false;
        this.loginForm.reset();
        this.router.navigate(['home']);
        this.successSwal.fire();
      }else if (!admin.email){
        this.submitted = false;
        this.loading = false;
        this.loginForm.reset();
        this.errorEmail.fire();
      }else if(!admin.password){
        this.submitted = false;
        this.loading = false;
        this.errorPassword.fire();
      }
    }).catch((error) => {
      console.log(error);
      this.loading = false;
    });
  }
}
