export class Shelter {
  id: string;
  name: string;
  description?: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  website?: string;
  logo?: string;
  isVerified: boolean;
  userId: string;
  createdAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    address: string,
    city: string,
    userId: string,
    createdAt: Date,
    description?: string,
    phone?: string,
    website?: string,
    logo?: string,
    isVerified: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.city = city;
    this.userId = userId;
    this.createdAt = createdAt;
    this.description = description;
    this.phone = phone;
    this.website = website;
    this.logo = logo;
    this.isVerified = isVerified;
  }
}
