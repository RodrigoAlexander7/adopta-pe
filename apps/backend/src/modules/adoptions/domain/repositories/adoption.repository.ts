import { AdoptionApplication, AdoptionStatus } from '../entities/adoption-application.entity';

export abstract class AdoptionRepository {
  abstract create(application: AdoptionApplication): Promise<AdoptionApplication>;
  abstract findById(id: string): Promise<AdoptionApplication | null>;
  abstract findByUserId(userId: string): Promise<AdoptionApplication[]>;
  abstract findByShelterId(shelterId: string): Promise<AdoptionApplication[]>; // Needs join with Pet
  abstract updateStatus(id: string, status: AdoptionStatus): Promise<AdoptionApplication>;
}
