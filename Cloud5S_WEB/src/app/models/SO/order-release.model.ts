export interface OrderReleaseModel {
  code: string;
  state: string;
  orderCode: string;
  mixNumber: number;
  sealNumber: string;
  weightIn: number;
  weightInTime: Date;
  weightOut: number;
  weightOutTime: Date;
  mixVehicleCode: string;
  mixerCode: string;
  pumpVehicleCode: string;
  mixDate: Date;
  releaseProcesses: ReleaseProcess;
  cement: number;
  stone: number;
  sand: number;
  admixture: number;
  water: number;
}

export interface ReleaseProcess {
  id: string;
  orderReleaseId: string;
  actionCode: string;
  prevState: string;
  state: string;
}

export interface UpdateStepModel {
  code: string;
  state: string;
}
