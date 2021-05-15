import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../models/administrator';
import { AdministratorService } from '../../services/administrator.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

enum State {
  NotSupported = 'NotSupported',
  SelectCamera = 'SelectCamera',
  Scan = 'Scan',
}

export interface QrScannerTexts {
  NotSupportedHTML: string;
  DeviceDefaultPrefix: string;
  StopCameraText: string;
  OpenButtonText: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorQR') private errorQR: SwalComponent;
  admin: Admin;
  selectedFile = null;
  adminFromApi: Admin;
  
  modules = [];

  constructor(
    private router:Router,
    private administratorService: AdministratorService,
    private authenticationService: AuthenticationService
  ) {
    this.admin = this.authenticationService.adminValue;
  }

  ngOnInit(): void {
    this.getModules();
  }

  getModules(){
    this.administratorService.getModules(this.admin.idAdministrator).then((results:any) => {
      this.modules = results;
    });
  }

  goToQR(){
    this.router.navigate(['qr-code']);
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
