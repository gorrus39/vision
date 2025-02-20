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
