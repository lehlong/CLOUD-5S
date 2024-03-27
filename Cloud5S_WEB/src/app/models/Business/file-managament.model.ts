export interface FileManagementModel {
  id: string;
  title: string;
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

export interface FileManagementDtoModel {
  id: string;
  referenceId: string;
  moduleType: string;
  attachmentId: string;
  attachment: FileManagementModel;
}
