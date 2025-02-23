export enum ProjectType {
  type,
}

export type Project = {
  id: number;
  title: string;
  type: ProjectType;
  text: string;
  starsAmount: number;
  avatar?: string;
};

export enum BlogItemCategory {
  categories,
}

export type BlogItem = {
  id: number;
  date: Date;
  category: BlogItemCategory;
  title: string;
  text: string;
};

export type FAQItem = {
  id: number;
  title: string;
  text: string;
};
