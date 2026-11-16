import { BuildingStatus } from '@/constants/building-status';

export interface BuildingResponse {
  id: number;
  buildingName: string;
  address: string;
  numberOfFloors: number;
  totalAvailableSlots: number;
  status: BuildingStatus;
}

export interface BuildingListResponse {
  data: BuildingResponse[];
  message: string;
}

export interface BuildingActionResponse {
  id: number;
  message: string;
}
