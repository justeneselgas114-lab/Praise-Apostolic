export type Pastor = {
  id: string;
  name: string;
  role: string;
  image: string;
  shortBio: string;
};

export type Ministry = {
  id: string;
  name: string;
  description: string;
  schedule: string;
  leader?: string;
  contact?: string;
  icon?: string;
};

export type Sermon = {
  id: string;
  title: string;
  scripture: string;
  date: string;
  youtubeId?: string;
  audioUrl?: string;
  thumbnail?: string;
};

export type ChurchEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
};
