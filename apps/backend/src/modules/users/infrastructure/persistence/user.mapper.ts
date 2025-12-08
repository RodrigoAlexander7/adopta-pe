import { User as PrismaUser } from '@generated/prisma/client';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.role,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.phone,
      prismaUser.image,
    );
  }

  static toPersistence(user: User): PrismaUser {
    // Note: Role string to enum conversion might be needed if using TS Enums
    // But since Prisma generates types, we can cast or ensure compatibility.
    // For MVP, we might treat it loosely or add validation.
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone || null,
      role: user.role as any, // Cast to any to avoid Enum complexity for now or import Enum
      image: user.image || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
