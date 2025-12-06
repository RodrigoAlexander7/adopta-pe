export enum AdoptionStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export class AdoptionApplication {
  id: string;
  status: AdoptionStatus;
  message?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  petId: string;
  userId: string;
  adopterProfileId?: string | null;

  constructor(
    id: string,
    status: AdoptionStatus,
    petId: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
    message?: string | null,
    notes?: string | null,
    adopterProfileId?: string | null,
  ) {
    this.id = id;
    this.status = status;
    this.petId = petId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.message = message;
    this.notes = notes;
    this.adopterProfileId = adopterProfileId;
  }
}
