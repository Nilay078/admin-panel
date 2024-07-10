import { Component } from '@angular/core';

@Component({
    selector: 'app-otp-verification',
    templateUrl: './otp-verification.component.html',
})
export class OtpVerificationComponent {
    clicked = false;
    config = {
        allowNumbersOnly: true,
        length: 6,
    };
    timeLeft: number = 60;
}
