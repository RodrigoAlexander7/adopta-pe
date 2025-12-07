import { Shelter as PrismaShelter } from '@generated/prisma/client';
import { Shelter } from '../../domain/entities/shelter.entity';

export class ShelterMapper {
  static toDomain(prismaShelter: PrismaShelter): Shelter {
    return new Shelter(
      prismaShelter.id,
      prismaShelter.name,
      prismaShelter.email,
      prismaShelter.address,
      prismaShelter.city,
      prismaShelter.userId,
      prismaShelter.createdAt,
      prismaShelter.description ?? undefined,
      prismaShelter.phone ?? undefined,
      prismaShelter.website ?? undefined,
      prismaShelter.logo ?? undefined,
      prismaShelter.isVerified,
    );
  }

  static toPersistence(shelter: Shelter): PrismaShelter {
    return {
      id: shelter.id,
      name: shelter.name,
      email: shelter.email,
      address: shelter.address,
      city: shelter.city,
      userId: shelter.userId,
      createdAt: shelter.createdAt,
      description: shelter.description || null,
      phone: shelter.phone || null,
      website: shelter.website || null,
      logo: shelter.logo || null,
      isVerified: shelter.isVerified,
    };
  }
}
