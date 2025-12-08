import { Shelter } from '../entities/shelter.entity';

export abstract class ShelterRepository {
  abstract create(shelter: Shelter): Promise<void>;
  abstract findAll(): Promise<Shelter[]>;
  abstract findById(id: string): Promise<Shelter | null>;
  abstract findByUserId(userId: string): Promise<Shelter | null>;
}
