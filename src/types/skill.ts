export interface Skill {
  _id: string;
  title: string;
  icon?: string; // The backend sends a direct string URL
  tags: string[]; // The backend sends an array of tags instead of a single category
  __v?: number;
}