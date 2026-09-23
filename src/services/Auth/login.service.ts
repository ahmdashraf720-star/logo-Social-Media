import axios from "axios";
import { baseUrl } from "../../api/evn";
import type { ILogin } from "../../interface/Login.interface";

export async function loginUser(data: ILogin) {
  const response = await axios.post(
    `${baseUrl}/users/signin`,
    data
  );

  return response;
}