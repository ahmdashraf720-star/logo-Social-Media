import axios from "axios";
import { baseUrl } from "../../api/evn";

export async function getMyProfile(token: string) {
  return axios.get(`${baseUrl}/users/profile-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getMyPosts(
  token: string,
  userId: string
) {
  return axios.get(
    `${baseUrl}/users/${userId}/posts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


export interface IChangePassword {
  password: string;
  newPassword: string;
}

export async function changePassword(
  token: string,
  data: IChangePassword
) {
  return axios.patch(
    `${baseUrl}/users/change-password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}