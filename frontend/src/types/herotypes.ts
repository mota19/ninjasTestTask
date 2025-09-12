export interface IHero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

export interface PostHero {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
}
