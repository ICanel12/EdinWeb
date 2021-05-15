import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { AdministratorService } from '../../services/administrator.service';
import { Admin } from 'src/app/models/administrator';
import { AuthenticationService } from '../../services/authentication.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorQR') private errorQR: SwalComponent;
  admin: Admin;
  selectedFile = null;

  constructor(
    private router:Router,
    private administratorService:AdministratorService,
    private authenticationService:AuthenticationService
  ) {
    this.admin = this.authenticationService.adminValue;
  }

  ngOnInit(): void {
  }

  capturedQr(codeModule: string) {
    let dataModule = {
      idAdministrator: this.admin.idAdministrator,
      module: codeModule
    }
    this.administratorService.addModule(dataModule).then((results:any) => {
      if(results.status){
        this.successSwal.fire();
      }else{
        this.errorQR.fire();
      }
    });
  }

  onError(error: string){
    console.log(error);
  }
}
