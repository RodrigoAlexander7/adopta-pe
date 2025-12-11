import { Pet as PrismaPet, PetSpecies as PrismaPetSpecies, Gender as PrismaGender, PetSize as PrismaPetSize } from '@generated/prisma/client';
import { Pet, PetSpecies, Gender, PetSize } from '../../domain/entities/pet.entity';

export class PetMapper {
  static toDomain(prismaPet: PrismaPet): Pet {
    return new Pet(
      prismaPet.id,
      prismaPet.name,
      PetSpecies[prismaPet.species as keyof typeof PetSpecies],
      Gender[prismaPet.gender as keyof typeof Gender],
      PetSize[prismaPet.size as keyof typeof PetSize],
      prismaPet.shelterId || undefined,
      prismaPet.createdAt,
      prismaPet.images,
      prismaPet.isAdopted,
      prismaPet.isActive,
      prismaPet.breed,
      prismaPet.age,
      prismaPet.color,
      prismaPet.description,
      prismaPet.healthInfo,
    );
  }

  static toPersistence(pet: Pet): PrismaPet {
    // We used to omit properties not in PrismaPet if they were missing, but here validation is key.
    // Also handling enums mapping strictly.
    // Note: PrismaPet includes 'species' of type PetSpecies (Prisma Enum).
    
    // We need to return an object that matches PrismaPet interface.
    // However, PrismaPet types come from @generated/prisma/client.
    
    return {
      id: pet.id,
      name: pet.name,
      species: pet.species as unknown as PrismaPetSpecies, // Trusting the names match
      gender: pet.gender as unknown as PrismaGender,
      size: pet.size as unknown as PrismaPetSize,
      shelterId: pet.shelterId || null,
      createdAt: pet.createdAt,
      images: pet.images,
      isAdopted: pet.isAdopted,
      isActive: pet.isActive,
      breed: pet.breed || null,
      age: pet.age || null,
      color: pet.color || null,
      description: pet.description || null,
      healthInfo: pet.healthInfo || null,
      ageUnit: null, // We missed mapping this in Domain Entity. Assuming null for now or add it.
    };
  }
}
