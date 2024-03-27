import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-otp-index',
  templateUrl: './otp-index.component.html',
  styleUrls: ['./otp-index.component.scss'],
})
export class OtpIndexComponent {
  @Input() control!: FormControl;
  minutes: number = 2;
  seconds: number = 30;
  otpValue: string = '';

  onInputChange(event: any): void {
    const input = event.target;
    const inputValue = input.value;

    if (/^[0-9]{0,6}$/.test(inputValue)) {
      this.otpValue = inputValue;
      this.control.setValue(this.otpValue);
    } else {
      input.value = '';
    }
  }

  ngOnInit(): void {
    const totalSeconds = this.minutes * 60 + this.seconds;
    let remainingSeconds = totalSeconds;

    const countdownInterval = setInterval(() => {
      if (remainingSeconds <= 0) {
        clearInterval(countdownInterval);
      } else {
        remainingSeconds--;
        this.minutes = Math.floor(remainingSeconds / 60);
        this.seconds = remainingSeconds % 60;
      }
    }, 1000);
  }
}
