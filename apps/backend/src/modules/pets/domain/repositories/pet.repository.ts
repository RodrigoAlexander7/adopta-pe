import { Pet } from '../entities/pet.entity';

export abstract class PetRepository {
  abstract create(pet: Pet): Promise<Pet>;
  abstract findAll(filters?: any): Promise<Pet[]>;
  abstract findById(id: string): Promise<Pet | null>;
  abstract update(id: string, pet: Partial<Pet>): Promise<Pet>;
  abstract delete(id: string): Promise<void>;
}
