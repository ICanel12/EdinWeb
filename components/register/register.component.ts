import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdministratorService } from '../../services/administrator.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;

  submitted = false;
  loading = false;
  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router, private administratorService:AdministratorService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      username: ['',Validators.required],
      email: ['',Validators.compose([
        Validators.required,
        Validators.email
      ])],
      pass: ['',Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  register(){
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.administratorService.register(this.registerForm.value).then((results:any) => {
      this.submitted = false;
      this.loading = false;
      if(results.status){
        this.registerForm.reset();
        this.successSwal.fire();
      }else{
        this.errorSwal.fire();
      }
    });
  }

}
