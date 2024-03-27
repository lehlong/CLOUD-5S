import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-input-custom',
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.scss'],
})
export class InputCustomComponent implements OnInit {
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() title: string = '';
  @Input() place: string = '';
  @Input() options: any = [];
  @Input() prop: string = '';
  @Input() className: any = '';
  @Input() defaultValue: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() selectItem = new EventEmitter<any>();
  @Output() scrollDropdown = new EventEmitter<any>();
  @Output() focusInput = new EventEmitter<any>();
  @Output() resetDropdown = new EventEmitter<any>();
  @Input() inputValue: string = '';
  showOptions: boolean = false;

  ngOnInit(): void {
    this.inputValue = this.defaultValue;
  }

  onChange(e: any) {
    this.valueChange.emit(e);
  }

  handleClick(item: any) {
    this.selectItem.emit(item);
    this.inputValue = item[this.prop];
    this.showOptions = false;
  }

  onFocus() {
    this.focusInput.emit('Focus');
    this.showOptions = true;
  }

  onBlur() {
    setTimeout(() => {
      this.showOptions = false;
    }, 200);
  }

  onFocusDown() {
    this.resetDropdown.emit('Reset');
    this.inputValue = '';
    this.showOptions = true;
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.scrollDropdown.emit('End');
    }
  }
}
