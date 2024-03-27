export interface AttachmentModel {
  id: string;
  title: string;
  name?: string;
  url: string;
  thumbnail: string;
  extension: string;
  size: number;
  type: string;
  isActive: boolean | null;
  createBy?: string | null;
  updateBy?: string | null;
  createDate?: Date | null;
  updateDate?: Date | null;
}

export interface AttachmentDtoModel {
  id: string;
  referenceId: string;
  moduleType: string;
  attachmentId: string;
  attachment: AttachmentModel;
}
