export class Story {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  createdAt: Date;
  userId: string;
  authorName?: string; // Optional for display purpose

  constructor(
    id: string,
    title: string,
    content: string,
    userId: string,
    createdAt: Date,
    image?: string | null,
    authorName?: string,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.createdAt = createdAt;
    this.image = image;
    this.authorName = authorName;
  }
}
