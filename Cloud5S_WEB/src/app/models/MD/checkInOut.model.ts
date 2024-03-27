export interface CheckInOut {
  id: string;
  vehicle: string;
  vehicleCode: string;
  referenceId: string ;
  rfId: string ;
  checkInTime: Date;
  checkInConfirm: string;
  checkInNote: string;
  checkOutTime: Date;
  checkOutConfirm: string;
  checkOutNote: string;
  images: CheckInOutImages[];
}

export interface CheckInOutImages {
  id: string;
  checkInOutId: string;
  attachmentId: string;
  type: string;
  attachment: Attachment;
}

export interface Attachment {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  extension: string;
  size: number;
  type: string;
}
