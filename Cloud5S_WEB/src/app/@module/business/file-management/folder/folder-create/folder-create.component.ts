import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FileManagementService} from 'src/app/services/Business/file-management.service';

@Component({
  selector: 'app-folder-create',
  templateUrl: './folder-create.component.html',
  styleUrls: ['./folder-create.component.scss'],
})
export class FolderCreateComponent {
  form: FormGroup;
  submitted: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<FolderCreateComponent>,
    private fb: FormBuilder,
    private _service: FileManagementService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    this.submitted = true;
    if (!this.form.valid) return;
    this._service
      .createFolder({
        ...this.form.value,
        parentId: this.data.parentId,
      })
      .subscribe((response: any) => {
        this.dialogRef.close(response.data);
      });
  }
}
