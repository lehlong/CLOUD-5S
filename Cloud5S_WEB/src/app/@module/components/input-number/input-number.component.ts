import {Component, Input, forwardRef, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from '@angular/forms';
import {utils} from 'src/app/utils/utils';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input() focus: boolean = false;
  @Input() notHandle: boolean = false;
  @Input() initFocus:boolean = false;
  @Output() input = new EventEmitter<string>();
  @Output() click = new EventEmitter<string>();
  @Input() control!: FormControl;
  @Input() class: string = '';
  @Input() label: string = '';
  @Input() requiredNotlabel: boolean = false;
  @Input() labelBold: boolean = false;
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() showErrors: any = null;
  @Input() errorsRequired: any = null;
  @Input() disabled: boolean = false;
  value: string = '';
  @Input() valueInput!: number;
  @Output() valueInputChange = new EventEmitter<number>();
  @Output() blurChange = new EventEmitter<number>();

  constructor(private utils: utils) {}

  onChange!: (value: any) => void;
  onTouched!: () => void;

  onBlur(): void {
    this?.blurChange?.emit();
  }

  onClick(e: any) {
    if (this.click) {
      this.click.emit();
    }
  }

  writeValue(): void {
    this.value = this.utils.formatNumber(this.value);
    if (this.control) {
      this.control.setValue(this.value != '' ? parseFloat(this.value.replace(/,/g, '')) : 0);
    } else {
      this.valueInput = this.value != '' ? parseFloat(this.value.replace(/,/g, '')) : 0;
      this.valueInputChange.emit(this.valueInput);
    }
    if (this.input) {
      this.input.emit(this.value.replace(/,/g, ''));
    }
  }

  clearZero() {
    if (this.value == '0') {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  ngOnChanges(changes: any): void {
    if(this.notHandle){
      this.value = this.utils.formatNumber(changes.valueInput.currentValue);
    }else{
      if (changes.valueInput && !changes.valueInput.firstChange) {
        this.value = this.utils.formatNumber(changes.valueInput.currentValue);
        this.valueInputChange.emit(changes.valueInput.currentValue);
      }
    }
  }

  ngOnInit() {
    if (this.control) {
      this.value = this.utils.formatNumber(this.control.value);
      this.control.valueChanges.subscribe((value: any) => {
        this.value = this.utils.formatNumber(value);
      });
    } else {
      this.value = this.utils.formatNumber(this.valueInput);
    }
  }
}
