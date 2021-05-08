import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AccountService, AlertService } from '@app/_services';
import { toFormData } from '@app/_helpers/obj2fd';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  //assign const variable with parth value
  publicUrl = `${environment.rootUrl}`;
  editImageMode = false;
  form: FormGroup;
  loading = false;
  submitted = false;
  imageURL = null;
  id: string;
  isAddMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        mobile: ['', Validators.required],
        dob: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
            ),
          ],
        ],
        image_file: [null],
        password: this.isAddMode
          ? ['', [Validators.required, Validators.minLength(8)]]
          : '',
        confirmPassword: this.isAddMode ? ['', Validators.required] : '',
        filedelete: false,
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    if (!this.isAddMode) {
      this.accountService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.form.patchValue(x);
          this.form.patchValue({
            image_file: x.image,
          });
          this.imageURL = x.image;
        });
    }
  }

  onFileSelect(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image_file: file,
    });
    this.imageURL = null;
    this.form.patchValue({
      filedelete: false,
    });
  }

  deleteImage() {
    this.imageURL = null;
    this.form.patchValue({
      filedelete: true,
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    var object = toFormData(this.form.value);
    this.accountService
      .register(object)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User added successfully', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }

  private updateUser() {
    var object = toFormData(this.form.value);
    this.accountService
      .update(this.id, object)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
