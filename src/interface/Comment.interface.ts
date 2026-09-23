export interface ICommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface IComment {
  _id: string;
  content: string;
  commentCreator: ICommentCreator;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  repliesCount: number;
}