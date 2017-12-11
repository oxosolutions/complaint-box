import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http'; 
import {ToastController , LoadingController} from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	option:any;
  name : '';
  mobile : '';
  department : '';
  message : '';
  nameError : any;
  mobileError : any;
  departmentError : any;
  messageError : any;

  constructor(public navCtrl: NavController, public http : Http, public toastctrl:ToastController, public loaderctrl:LoadingController ) {
  	this.option=[
  		'Agriculture and Processed Food Products Export Development Authority',
  		'Apparel Export Promotion Council',
  		'Carpet Export Promotion Council',
  		'Cashew Export Promotion Council of India',
  		'Basic Chemicals, Pharmaceuticals and Cosmetics Export Promotion Council',
  		'Coffee Board of India',
  		'Cotton Textile Export Promotion Council',
  		'Electronics and Computer Software Export Promotion Council',
  		'EEPC India',
  		'Gem and Jewellery Export Promotion Council',
  		'Export Promotion Council for Handicrafts',
  		'Handloom Export Promotion Council',
  		'Council for Leather Exports',
  		'Pharmaceutical Export Promotion Council',
  		'Plastics Export Promotion Council',
  		'Powerloom Development & Export Promotion Council',
  		'Shellac and Forest Products Export Promotion Council',
  		'Indian Silk Export Promotion Councill',
  		'Spices Board of India',
  		'Sports Goods Export Promotion Council',
  		'Tea Board of India',
  		'Tobacco Board',
  		'Wool & Woollens Export Promotion Council',
  		'Wool Industry Export Promotion Council',
  		];

  }
  
  formSubmit(name,mobile,department,message,org_id){
  	let result;
    // let name;
    // let mobile;
    // let department;
    // let message;

    let headers = new Headers();
  	headers.append('Accept', 'application/json');
  	headers.append('Content-Type', 'application/json');
  	let request= new RequestOptions({headers:headers});
  	let data={name: name, mobile: mobile,department: department,message : message,org_id : 302,token:'0)9(8*7&6^5%'} ;
    let loader =this.loaderctrl.create({
      content:'<div class="custom-spinner-container"><div class="custom-spinner-box"></div>Submitting your Comlaint</div>',
    });
    loader.present();
    let toast=this.toastctrl.create({
      message:'Your Complaint is Submitted',
      duration:4000,
      position:'top',
    });

    this.http.post('http://admin.scolm.com/api/send_complaint',data,request)
    .subscribe((data)=>{
      result=  (data['_body']);
      loader.dismiss();
      toast.present();
      this.name='';this.mobile = '';this.department = '';this.message = '';
      this.nameError='';this.mobileError = '';this.departmentError = '';this.messageError = '';

  	}, error =>{
      loader.dismiss();
      if('name' in JSON.parse(error._body)){
        this.nameError = JSON.parse(error._body).name;
      }else{
        this.nameError = " ";
      }
      if('mobile' in JSON.parse(error._body)){
        this.mobileError = JSON.parse(error._body).mobile;
      }else{
        this.mobileError = " ";
      }
      if('department' in JSON.parse(error._body)){
        this.departmentError = JSON.parse(error._body).department;
      }else{
        this.departmentError = " ";
      }
      if('message' in JSON.parse(error._body)){
        this.messageError = JSON.parse(error._body).message;
      }else{
        this.messageError = " ";
      }
  	}
  	)
  }
  showalert(result){

  }

}
