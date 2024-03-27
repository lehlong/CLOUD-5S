import {Component, Input, forwardRef, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from '@angular/forms';
import {utils} from 'src/app/utils/utils';

type CustomNzStatus = 'error' | 'warning' | '';

@Component({
  selector: 'app-input-clear',
  templateUrl: './input-clear.component.html',
  styleUrls: ['./input-clear.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputClearComponent),
      multi: true,
    },
  ],
})
export class InputClearComponent implements ControlValueAccessor {
  @ViewChild('inputControl') inputControl!: ElementRef;
  @ViewChild('inputNoControl') inputNoControl!: ElementRef;

  @Input() focus: boolean = false;
  @Output() searchEvent = new EventEmitter<string>();
  @Output() input = new EventEmitter<string>();
  @Output() click = new EventEmitter<string>();
  @Output() blur = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();
  @Input() initFocus:boolean = false;
  @Input() nzAutosize: any = {minRows: 3, maxRows: 5};
  @Input() type: string = 'text';
  @Input() status: CustomNzStatus = '';
  @Input() control!: FormControl;
  @Input() value!: string;
  @Input() class: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() onlyNumber: boolean = false;
  @Input() disabled: boolean = false;
  @Input() textArea: boolean = false;
  @Input() placeholder: string = '';
  @Input() showErrors: any = null;
  @Input() errorsRequired: any = null;
  @Input() errorsWrongFormat: any = null;

  onValueChange(newValue: string): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
    if (this.input) {
      this.input.emit();
    }
  }

  constructor(private utils: utils) {}

  onChange!: (value: any) => void;
  onTouched!: () => void;

  onSearch(): void {
    this.searchEvent.emit();
  }

  onInput(e: any) {
    if (this.onlyNumber) {
      e.target.value = e.target.value.replace(/[^0-9,]/g, '');
      this.value = this.value.replace(/[^0-9,]/g, '');
    }
    if (this.input) {
      this.input.emit(e);
    }
  }

  onClick(e: any) {
    if (this.click) {
      this.click.emit();
    }
  }

  onBlur() {
    if (this.blur) {
      this.blur.emit();
    }
  }

  writeValue(): void {}

  ClearAll(value: string): void {
    this.control.setValue(value);
    if (this.input) {
      this.input.emit();
    }
  }

  ngOnInit() {
    if (this.control) {
      this.value = this.control.value;
      this.control.valueChanges.subscribe((value: any) => {
        this.value = value;
      });
    }
  }
  ngAfterViewInit() {
    if (this.initFocus && this.control) this.inputControl.nativeElement.focus();
    if (this.initFocus && !this.control) this.inputNoControl.nativeElement.focus();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
