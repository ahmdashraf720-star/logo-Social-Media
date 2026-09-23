export interface IPostUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface IPost {
  _id: string;
  body: string;
  image: string;
  privacy: string;

  user: IPostUser;

  likes: string[];
  likesCount: number;

  createdAt: string;

  commentsCount: number;
  topComment: unknown;

  sharesCount: number;
  isShare: boolean;

  bookmarked: boolean;

  liked?: boolean;
}

export interface IPostsResponse {
  success: boolean;
  message: string;

  data: {
    posts: IPost[];
  };
}