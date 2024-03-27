import {Component, ViewChild, ElementRef} from '@angular/core';
import {DrawerService} from 'src/app/services/Common/drawer.service';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import {AreaFilter, optionsGroup} from 'src/app/@filter/MD/area.filter';
import {Router, ActivatedRoute} from '@angular/router';
import {utils} from 'src/app/utils/utils';
import {faFileExcel} from '@fortawesome/free-regular-svg-icons';
import {GlobalService} from 'src/app/services/Common/global.service';
import {Observable} from 'rxjs';
import {FileManagementService} from 'src/app/services/Business/file-management.service';
import {MatDialog} from '@angular/material/dialog';
import {FolderCreateComponent} from '../folder/folder-create/folder-create.component';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import Swal from 'sweetalert2';
import {AttachmentService} from 'src/app/services/Business/attachment.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FILE_RIGHTS} from 'src/app/utils/constant/access-right';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss'],
})
export class FileManagementComponent {
  @ViewChild('inputField') inputField!: ElementRef;
  filesUploaded!: FileList;
  breadCrumb: {name: string; path: string};
  constructor(
    private _service: FileManagementService,
    private drawerService: DrawerService,
    private router: Router,
    private route: ActivatedRoute,
    private utils: utils,
    private http: HttpClient,
    private globalService: GlobalService,
    public dialog: MatDialog,
    private attachmentService: AttachmentService,
    private fb: FormBuilder,
  ) {
    this.breadCrumb = {
      name: 'Danh sách file',
      path: 'Home',
    };
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách file',
        path: 'business/file-management',
      },
    ]);

    this.route.queryParams.subscribe((params) => {
      this.filter = {
        ...this.filter,
        ...params,
      };
    });
  }

  //Khai báo biến
  displayedColumns: string[] = ['index', 'name', 'type', 'size', 'createDate', 'createdBy', 'actions'];
  paginationResult!: PaginationResult;
  currentDirectory: any;
  allCurrentDirectory: any;
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  files: File[] = [];
  filter = new AreaFilter();
  maxSizeInBytes: number = 1 * 1024 * 1024;
  optionsGroup: optionsGroup[] = [];
  faFileExcel = faFileExcel;
  FILE_RIGHTS = FILE_RIGHTS;
  optionsSate = [
    {name: 'Đã kích hoạt', value: true},
    {name: 'Chưa kích hoạt', value: false},
  ];
  loading = true;

  //Khai báo hàm
  ngOnInit(): void {
    this.getFolderDetails();
  }

  getFolderDetails(ParentId?: any) {
    this.loading = true;
    this._service.GetDetail({ParentId}).subscribe((response: any) => {
      this.allCurrentDirectory = {
        ...response.data,
      };
      this.customAllData();
      this.loading = false;
    });
  }
  customAllData() {
    this.currentDirectory = {
      folders: [...this.allCurrentDirectory?.childs],
      files: [...this.allCurrentDirectory?.moduleAttachments],
    };
  }

  ngOnDestroy() {
    this.globalService.setBreadcrumb([]);
  }

  openFolder(folder: any) {
    this.getFolderDetails(folder.id);
    this.breadCrumb = {
      ...this.breadCrumb,
      path: this.breadCrumb.path + `>${folder.name}`,
    };
  }

  goUp() {
    this.getFolderDetails(this.currentDirectory.parentId);
    const path = this.breadCrumb.path.split('>');
    path.pop();
    const newPath = path.join('>');
    this.breadCrumb.path = newPath;
    console.log(this.breadCrumb.path);
  }

  openCreate() {
    const dialogRef = this.dialog.open(FolderCreateComponent, {
      width: '400px',
      data: {
        parentId: this.currentDirectory.id || '00000000-0000-0000-0000-000000000000',
      },
    });
    dialogRef.afterClosed().subscribe((folder: any) => {
      if (!folder) return;
      this.currentDirectory.folders.push(folder);
    });
  }

  confirmDelete(file: any, type: String) {
    Swal.fire({
      showCloseButton: true,
      title: 'Bạn muốn xóa dữ liệu này?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        switch (type) {
          case 'folder':
            this._service.deleteFolder(file.id).subscribe({
              next: ({data}) => {
                this.currentDirectory.folders = this.currentDirectory.folders.filter((ele: any) => ele.id !== file.id);
              },
              error: (response) => {},
            });
            break;
          case 'file':
            this._service.deleteFile(file.attachment.id).subscribe({
              next: (data) => {
                this.currentDirectory.files = this.currentDirectory.files.filter(
                  (ele: any) => ele.attachment.id != file.attachment.id,
                );
              },
            });
            break;
        }
      }
    });
  }

  editingEvent = {
    id: '',
    type: '',
    submitted: false,
  };
  editForm!: FormGroup;

  openEdit(file: any, type: string) {
    this.editingEvent = {
      id: file.id,
      type,
      submitted: false,
    };
    this.editForm = this.fb.group({
      name: new FormControl(file.name, [Validators.required]),
    });
    this.editForm;
    setTimeout(() => {
      if (this.inputField) {
        this.inputField.nativeElement.select();
      }
    });
  }
  get editf() {
    return this.editForm.controls;
  }

  saveEdit() {
    switch (this.editingEvent.type) {
      case 'folder':
        this.editingEvent.submitted = true;
        if (!this.editForm.valid) return;
        this._service.updateFolder({...this.editForm.value, id: this.editingEvent.id}).subscribe((response) => {
          console.log(response);
          this.currentDirectory.folders = this.currentDirectory.folders.map((folder: any) => {
            if (folder.id === this.editingEvent.id) {
              folder.name = this.editForm.value.name;
            }
            return folder;
          });
          this.resetEdit();
        });
        break;
      case 'file':
        this.editingEvent.submitted = true;
        if (!this.editForm.valid) return;
        this._service.updateFile({...this.editForm.value, id: this.editingEvent.id}).subscribe((response) => {
          this.currentDirectory.files = this.currentDirectory.files.map((file: any) => {
            if (file.attachment.id === this.editingEvent.id) {
              // Update only the 'name' property of the file
              file.attachment.name =
                this.editForm.value.name + file.attachment.name.substring(file.attachment.name.lastIndexOf('.'));
            }
            return file;
          });
          this.resetEdit();
        });
        break;
    }
  }

  formatFileSize(bytes: any) {
    if (bytes == 0) return '0 KB';

    const sizes = ['KB', 'MB', 'GB', 'TB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  resetEdit() {
    this.editingEvent = {
      id: '',
      type: '',
      submitted: false,
    };
  }

  checkFileType(file: File) {
    const fileName = file.name;
    if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')) {
      return 'IMAGE';
    } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      return 'WORD';
    } else if (fileName.endsWith('.mp4') || fileName.endsWith('.avi')) {
      return 'VIDEO';
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
      return 'EXCEL';
    } else if (fileName.endsWith('.pdf')) {
      return 'PDF';
    } else {
      return 'OTHER';
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.filesUploaded = files;
    if (files.length == 0) return;
    let validSize = true;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > this.maxSizeInBytes) validSize = false;
    }

    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (validSize) {
        if (files.length === 1) {
          const fileType = this.checkFileType(files[0]);
          this._service
            .uploadFile(files[0], {fileType, moduleType: 'FOLDER', referenceId: this.currentDirectory.referenceId})
            .subscribe((response) => {
              this._service.getFile(response.data.referenceId).subscribe(({data}) => {
                console.log(data);
                this.currentDirectory.files.push(data[0]);
                Swal.fire({
                  showCloseButton: true,
                  icon: 'success',
                  color: '#1ab394',
                  title: 'Upload file thành công',
                  position: 'top-end',
                  width: 400,
                  showConfirmButton: false,
                  timer: 5000,
                  toast: true,
                });
              });
            });
          return;
        }
        this._service
          .uploadBatchFiles(files, {
            moduleType: 'FOLDER',
            referenceId: this.currentDirectory.referenceId,
          })
          .subscribe((response: any) => {
            this.currentDirectory.files = [];
            this._service.getFile(response.data.referenceId).subscribe(({data}) => {
              data.forEach((file: any) => {
                this.currentDirectory.files.push(file);
              });
            });
            Swal.fire({
              showCloseButton: true,
              icon: 'success',
              color: '#1ab394',
              title: 'Upload các files thành công',
              position: 'top-end',
              width: 400,
              showConfirmButton: false,
              timer: 5000,
              toast: true,
            });
          });
        Swal.fire({
          showCloseButton: true,
          icon: 'success',
          color: '#1ab394',
          title: 'Upload files thành công',
          position: 'top-end',
          width: 400,
          showConfirmButton: false,
          timer: 5000,
          toast: true,
        });
        return;
      }
      Swal.fire({
        showCloseButton: true,
        title: 'Dung lượng các file không quá 1MB',
        icon: 'error',
        color: '#1ab394',
        position: 'top-end',
        width: 400,
        showConfirmButton: false,
        timer: 5000,
        toast: true,
      });
    }
  }

  downloadFile(element: any) {
    console.log(element);
    this.attachmentService.Download(element.id).subscribe((blob: Blob) => {
      console.log(blob);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${element.name}`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  openUploadFile() {
    if (this.files.length) {
      const formData = new FormData();

      [...this.files].forEach((file) => {
        formData.append('file', file, file.name);
      });

      const upload$ = this.http.post('https://httpbin.com/post', formData);

      this.status = 'uploading';

      upload$.subscribe({
        next: () => {
          this.status = 'success';
        },
        error: (error: any) => {
          this.status = 'fail';
          return throwError(() => error);
        },
      });
    }
  }

  search(currentPage: number = 1, pageSize: number | undefined = undefined, refresh: boolean = false) {
    this.filter = {
      ...this.filter,
      keyWord: refresh ? '' : this.filter.keyWord,
      pageSize: pageSize || this.filter.pageSize,
      currentPage: currentPage,
      isActive: '',
    };
    this.customAllData();
    this.loading = true;
    let keyWord = this.normalizeString(this.filter.keyWord);
    this.loadDataByKeyWord(keyWord);
  }

  normalizeString(dirString: string) {
    return dirString
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  loadDataByKeyWord(keyWord: string) {
    if (keyWord.trim() == '') {
      this.customAllData();
    } else {
      this.currentDirectory.folders = this.currentDirectory.folders.filter((item: any) => {
        return this.normalizeString(item.name).includes(keyWord);
      });
      this.currentDirectory.files = this.currentDirectory.files.filter((item: any) => {
        return (
          this.normalizeString(item.attachment.name).includes(keyWord) ||
          this.normalizeString(item.attachment.extension).includes(keyWord)
        );
      });
    }
    this.loading = false;
  }

  onChangePage(pageNumber: number) {
    this.search(pageNumber);
  }
  reload() {
    this.search(1, undefined, true);
  }

  pageSizeChange(pageSize: number) {
    this.filter.pageSize = pageSize;
    this.search(1, pageSize);
  }
}
