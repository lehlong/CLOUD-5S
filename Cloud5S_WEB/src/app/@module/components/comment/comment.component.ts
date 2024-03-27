import {Component, Input, ViewChild, ElementRef} from '@angular/core';
import {formatDistance} from 'date-fns';
import {CommentService} from 'src/app/services/Common/comment.service';
import {AttachmentService} from 'src/app/services/Common/attachment.service';
import {GetAllByReferenceFilter} from 'src/app/@filter/Common/comment.filter';
import {PaginationResult} from 'src/app/models/Common/pagination.model';
import Swal from 'sweetalert2';
import {MODULE_TYPE, FILE_TYPE, TYPE_COMMENT} from 'src/app/utils/constant/index';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @ViewChild('scrollContent') scrollContent!: ElementRef;
  @Input() refId: string = '';
  disableText: boolean = false;
  imageUrl: string = '';
  imageUrlSub: string = '';
  loadImage: boolean = false;
  openPrevew: boolean = false;
  attachmentId: string | null = null;
  attachmentIdSub: string | null = null;
  messageChat: string = '';
  messageChatSub: string = '';
  filter = new GetAllByReferenceFilter();
  paginationResult!: PaginationResult;
  loadingContent: boolean = false;
  formatDistance = formatDistance;
  TYPE_COMMENT = TYPE_COMMENT;

  constructor(
    private translate: TranslateService,
    private _service: CommentService,
    private attachmentService: AttachmentService,
  ) {}

  ngOnInit(): void {}

  getTime(time: string) {
    return formatDistance(new Date(time), new Date());
  }

  ngOnChanges() {
    if (this.refId && this.refId != '') {
      this.filter.refId = this.refId;
      this.loadInit();
    }
  }

  onScrollContent() {
    const element = this.scrollContent.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

    if (atBottom && this.paginationResult.totalRecord > this.filter.pageSize) {
      this.filter.pageSize = this.filter.pageSize + 10;
      this.loadingContent = true;
      this.loadInit();
    }
  }

  deleteComment(comment: any) {
    return new Promise((resolve) => {
      this.translate.get('content.common.comment.delete_confirmation.title').subscribe((title) => {
        this.translate.get('content.common.comment.delete_confirmation.text').subscribe((text) => {
          this.translate.get('content.common.comment.delete_confirmation.confirmButtonText').subscribe((confirmButtonText) => {
            this.translate.get('content.common.comment.delete_confirmation.cancelButtonText').subscribe((cancelButtonText) => {
              Swal.fire({
        showCloseButton: true,
                title: title,
                text: text,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText,
              }).then((result) => {
                if (result.isConfirmed) {
                  this._service.Delete(comment.id).subscribe(
                    () => {
                      if (comment.pId) {
                        this.messageChatSub = '';
                        this.imageUrlSub = '';
                        this.attachmentIdSub = null;
                      } else {
                        this.messageChat = '';
                        this.imageUrl = '';
                        this.disableText = false;
                        this.loadImage = false;
                        this.openPrevew = false;
                        this.attachmentId = null;
                      }
                      this.loadInit();
                    },
                    (error) => {
                      console.log('error: ', error);
                    },
                  );
                }
              });
            });
          });
        });
      });
    });
  }

  loadInit() {
    this.getAllByReference();
  }

  replyTo(comment: any) {
    this.attachmentIdSub = null;
    this.messageChatSub = '';
    this.imageUrlSub = '';
    this.paginationResult = {
      ...this.paginationResult,
      data: this.paginationResult.data.map((element: any) => {
        return {
          ...element,
          openReply: comment.id === element.id,
          disableText: false,
          openPrevew: false,
          loadImage: false,
        };
      }),
    };

    setTimeout(() => {
      const inputReply = document.getElementById('input-reply') as HTMLInputElement;
      inputReply.focus();
    }, 50);
  }

  getAllByReference() {
    this._service.getAllByReference(this.filter).subscribe(
      ({data}) => {
        this.paginationResult = {
          ...data,
          data: data.data.map((item: any) => {
            return {
              ...item,
              openReply: false,
              openPrevew: false,
              loadImage: false,
              disableText: false,
            };
          }),
        };
        this.loadingContent = false;
      },
      (error) => {
        console.log('error: ', error);
      },
    );
  }

  editComment(newComment: any) {
    console.log(newComment);
  }

  handleImageUpload(event: Event, id: string | null = null, main: boolean = true): void {
    if (main) {
      this.loadImage = true;
      this.openPrevew = true;
      this.messageChat = '';
      this.disableText = true;
    } else {
      this.messageChatSub = '';
      this.paginationResult = {
        ...this.paginationResult,
        data: this.paginationResult.data.map((element: any) => {
          return {
            ...element,
            openPrevew: id === element.id,
            loadImage: id === element.id,
            disableText: true,
          };
        }),
      };
    }

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement?.files.length > 0) {
      const selectedImage = inputElement?.files[0];
      const formData = new FormData();
      formData.append('file', selectedImage, selectedImage.name);
      this.attachmentService
        .Upload(selectedImage, {
          moduleType: MODULE_TYPE.COMMENT,
          fileType: FILE_TYPE.IMAGE,
          referenceId: this.refId,
        })
        .subscribe(
          ({data}) => {
            if (main) {
              this.imageUrl = data?.url;
              this.attachmentId = data?.id;
              this.loadImage = false;
            } else {
              this.imageUrlSub = data?.url;
              this.attachmentIdSub = data?.id;
              this.paginationResult = {
                ...this.paginationResult,
                data: this.paginationResult.data.map((element: any) => {
                  return {
                    ...element,
                    loadImage: false,
                  };
                }),
              };
            }
            inputElement.value = '';
          },
          (error) => {
            console.log('error: ', error);
          },
        );
    }
  }

  sendMessage(event: any = null, pID: string | null = null) {
    if (!event || event?.key === 'Enter') {
      const attachmentId = pID ? this.attachmentIdSub : this.attachmentId;
      if (!attachmentId) {
        if ((pID && this.messageChatSub == '') || (!pID && this.messageChat == '')) {
          return;
        }
      }
      this._service
        .Insert({
          pId: pID,
          type: attachmentId ? TYPE_COMMENT.IMAGE : TYPE_COMMENT.TEXT,
          content: pID ? this.messageChatSub : this.messageChat,
          attachmentId: attachmentId,
          referenceId: this.refId,
        })
        .subscribe(
          ({data}) => {
            if (pID) {
              this.attachmentIdSub = null;
              this.messageChatSub = '';
            } else {
              this.disableText = false;
              this.imageUrl = '';
              this.openPrevew = false;
              this.loadImage = false;
              this.attachmentId = null;
              this.messageChat = '';
            }
            this.filter.pageSize = this.filter.pageSize + 1;
            this.loadInit();
          },
          (error) => {
            console.log('error: ', error);
          },
        );
    }
  }

  cleareFile(main: boolean = true) {
    if (main) {
      this.disableText = false;
      this.imageUrl = '';
      this.openPrevew = false;
      this.loadImage = false;
      this.attachmentId = null;
    } else {
      this.attachmentIdSub = null;
      this.paginationResult = {
        ...this.paginationResult,
        data: this.paginationResult.data.map((element: any) => {
          return {
            ...element,
            imageUrlSub: '',
            openPrevew: false,
            loadImage: false,
            disableText: false,
          };
        }),
      };
    }
  }
}
