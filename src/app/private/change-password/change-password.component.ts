import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../../shared/validator/confirm-password.validator';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
    oldHide = true;
    hide = true;
    hideConfirmPass = true;
    changePasswordForm: FormGroup;
    clicked = false;

    constructor(
        private fb: FormBuilder,
        public activeModal: NgbActiveModal
    ) {
        this.changePasswordForm = this.fb.group(
            {
                oldPassword: new FormControl(null, [Validators.required]),
                password: new FormControl(null, [Validators.required]),
                confirmPassword: new FormControl(null, [Validators.required]),
            },
            {
                validator: ConfirmPasswordValidator('password', 'confirmPassword'),
            }
        );
    }

    onSubmit() {
        console.log('Success');
        // if (this.changePasswordForm.invalid) {
        //     return;
        // } else {
        //   this.clicked = true;
        //   this.changePasswordService
        //     .changePassword(this.changePasswordForm.value)
        //     .then((response: ViewResponse) => {
        //       this.closeModal();
        //       this.snackbarService.successSnackBar(response.message);
        //       this.router.navigate([Url.LOGIN]);
        //       localStorage.clear();
        //     })
        //     .finally(() => {
        //       this.clicked = false;
        //     });
        // }
    }

    closeModal() {
        this.activeModal.dismiss();
    }
}
