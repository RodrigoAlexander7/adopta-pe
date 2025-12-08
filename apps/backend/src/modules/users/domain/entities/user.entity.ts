export class User {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  role: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    phone?: string | null,
    image?: string | null,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.phone = phone;
    this.image = image;
  }
}
