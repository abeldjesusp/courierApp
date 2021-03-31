import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';

// Libraries
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public userCredential = { username: '', password: '' };

  constructor(private router: Router,
              private auth: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }


  // METHOD TO BUILD THE FORM
  private buildForm() {
    this.form = this.formBuilder.group({
      username: [ '', [Validators.required, Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9]*')]],
      password: [ '', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    });
  }

  // TRIGGER METHOD LOGIN
  onSubmit() {
    this.userCredential = this.form.value;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.userCredential).subscribe((resp: any) => {
      Swal.close();
      if (resp.success) { // if true navigate to home view
        this.router.navigateByUrl('/panel/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: resp.exception
        });
      }
    }, (err: any) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: 'Verifique su conexión a internet'
      });
    });
  }
}
