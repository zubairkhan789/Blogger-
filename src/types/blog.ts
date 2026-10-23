export type BlogCategory = 
  | 'All'
  | 'Artificial Intelligence' 
  | 'Technology & Coding' 
  | 'Business & Strategy' 
  | 'My Journey' 
  | 'Web Engineering';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Exclude<BlogCategory, 'All'>;
  coverImage: string;
  author: Author;
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
  claps: number;
  featured?: boolean;
  status: 'published' | 'draft';
}

export interface CategoryInfo {
  name: Exclude<BlogCategory, 'All'>;
  description: string;
  iconName: string;
}
