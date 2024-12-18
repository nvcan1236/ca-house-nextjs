import { User } from "./auth";
import { ReactNode } from "react";
import { Image } from "./common";

export type PostType = "REVIEW" | "PASS_ROOM" | "FIND_ROOM" | "FIND_ROOMMATE";
export type ReactionType = "LIKE" | "LOVE" | "HAPPY" | "SAD" | "ANGRY"
export interface IPost {
  content: string;
  id: string;
  type: PostType;
  create_by: string;
  images: Image[];
  comment_count: number;
  react_count: number;
  liked: ReactionType;
  create_at: string;
  owner: User;
}

export interface IComment {
  id: string;
  create_at: string;
  post_id: string;
  user_id: string;
  content: string;
  reply_to: unknown;
  owner: User;
}

export interface ICommentCreate {
  content: string;
}

export interface IPostCreate {
  content: string;
  type: PostType;
}

export type Reaction = {
  type: ReactionType;
  icon: ReactNode;
};

export interface PostStat {
  byPeriod: ByPostPeriod[];
  byType: ByPostType[];
}

export interface ByPostPeriod {
  period: string;
  count: number;
}

export interface ByPostType {
  type: string;
  count: number;
}
export type SuggestContent = {
  location: string;
  area: number;
  budget: number;
  amenity: string;
  post_type: PostType;
};
