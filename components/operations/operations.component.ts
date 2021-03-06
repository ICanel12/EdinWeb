import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OperationsService } from 'src/app/services/operations.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OperationsComponent implements OnInit {
  private sub: any;
  idModule:number; 

  Operations: any = [];
  Users: any = [];

  closeResult: string;
  gloveCode: number;
  number1:number;
  number2:number;
  operation: string;
  result: number;
  answer: number;
  option: string;
  type: string;
  topic:any;

  options = [
    {option: "Preguntar"},
    {option: "Enseñar"}
  ];

  operations = [
    {operation: "+"},
    {operation: "-"},
    {operation: "*"},
    {operation: "/"}
  ]

  types = [
    {type: "Todos"},
    {type: "Especifico"}
  ];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private modalService: NgbModal,
    private operationService: OperationsService
  ) { 
    this.sub = this.route.params.subscribe(params => {
      this.idModule = params['idModule'];
    });
  }

  ngOnInit() {
    this.getAllOperations();
    this.getAllUsers();
  }

  getAllUsers(){
    this.Users = [];
    this.operationService.getUsersByModule(this.idModule).then((results:any) => {
      if(results != null){
        this.Users = results;
      }
    });
  }

  getAllOperations(){
    this.Operations = [];
    this.operationService.getAllByModule(this.idModule).then((results:any) => {
      if(results != null){
        console.log(this.Operations);
        this.Operations = results;
      }
    });
  }

  createOperation(){
    if(this.type == 'Todos'){
      this.topic = "all";
    }else{
      this.topic = this.gloveCode;
    }

    if(this.operation == "*"){
      this.result = this.number1 * this.number2
    }else if (this.operation == "/"){
      this.result = this.number1 / this.number2
    }else if(this.operation == "-"){
      this.result = this.number1 - this.number2
    }else if(this.operation == "+"){
      this.result =  parseInt(this.number1.toString()) + parseInt(this.number2.toString())
    }

    if(this.option == "Preguntar"){
      this.answer = null;
    }else if(this.option == "Enseñar"){
      this.answer = this.result;
    }

    let newOperation = {
      idModule: this.idModule,
      gloveCode: this.gloveCode,
      number1: this.number1,
      operation: this.operation,
      number2: this.number2,
      result: this.result,
      answer: this.answer,
      action: this.option,
      topic: this.topic
    }

    this.operationService.postOperationDB(newOperation).then((results:any) => {
      if(results.status){
        console.log(results.operation);
        this.getAllOperations();
        this.operationService.postQuestionMQTT(results.operation).then((results:any) => {
          console.log(results);
        });
      }
      this.clearInputs();
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  goToDetails(operation: any){
    console.log(operation);
    this.router.navigate(['details',operation.idOperation])
  }

  clearInputs(){
    this.gloveCode = null;
    this.number1 = null;
    this.number2 = null;
    this.operation = undefined;
    this.result = null;
    this.option = undefined;
    this.type =  undefined;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
