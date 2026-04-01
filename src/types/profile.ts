export interface ReadingResource {
  title: string;
  url: string;
  _id?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  portfolio?: string;
  medium?: string;
  leetcode?: string;
  blogSite?: string;
}

export interface CloudinaryMedia {
  public_id: string;
  url: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  user_name: string;
  email: string;
  profile_image?: CloudinaryMedia | string;
  banner_image?: CloudinaryMedia | string;
  resume?: CloudinaryMedia | string;
  social_media: SocialLinks;
  hobbies: string[];
  reading_resources: ReadingResource[];
  quote: string;
  blog_count: number;
}