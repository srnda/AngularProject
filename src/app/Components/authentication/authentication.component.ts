import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Auth } from 'src/app/ServiceDependencies/Auth.Service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  private error = false;
  private errorTitle:string;
  private errorMessage:string;

  private mode:string;
  private authForm;
  private cnfPwdArr;

  private disableForm = false;
  constructor(private activeRoute:ActivatedRoute, private router:Router, private authService:Auth)
  {
    this.authForm = new FormGroup(
      {
        'email':new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null,[Validators.required, Validators.minLength(6)]),
        'cnfPwdArray':new FormArray([])
      });
    this.activeRoute.params.subscribe(
      params =>
      {
        this.mode =  params['mode'];
        if(this.mode == 'SignUp' && (<FormArray>this.authForm.get('cnfPwdArray')).controls.length < 1 )
        {
          const cnfrmPassword = new FormControl(null,[Validators.required,this.Validator_ConfirmPassword.bind(this)]);
          this.authForm.get('cnfPwdArray').push(cnfrmPassword);
          this.cnfPwdArr = (<FormArray>this.authForm.get('cnfPwdArray')).controls;
        }
      });
  }

  ngOnInit() {
  }

  ShowError(errorTitle, errorMessage)
  {
    this.errorTitle = errorTitle;
    this.errorMessage = errorMessage;
    this.error = true;
    setTimeout(() => {
      this.error = false;
      this.errorTitle = null;
      this.errorMessage = null;
    }, 2000);
  }

  SubmitForm()
  {
    if(this.authForm.valid)
    {
      var authSubs = null;
      if(this.mode == 'SignUp')
      {
        authSubs = this.authService.SignUp(this.authForm.get('email').value,this.authForm.get('password').value);
      }
      else
      {
        authSubs = this.authService.LogIn(this.authForm.get('email').value,this.authForm.get('password').value);
      }
      this.disableForm = true;
      authSubs.subscribe
        (
          response =>
          {
            this.authForm.reset();
            this.disableForm = false;
          },
          errorDetails =>
          {
            this.disableForm = false;
            this.ShowError(errorDetails[0],errorDetails[1]);
          }
        );
    }
  }

  Validator_ConfirmPassword(control:FormControl){
    var pwd = (<FormControl>this.authForm.get('password')).value;
    if ( pwd == null || pwd == '')
    {
      return null;
    }
    if(control.value != (<FormControl>this.authForm.get('password')).value)
    {
      return {notMatching:true}
    }
    return null;
  }
}
