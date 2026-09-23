import axios from "axios";
import { baseUrl } from "../../api/evn";
import type { IRegister } from "../../interface/Register.interface";


export async function sendData(data:IRegister) {
  const response = await axios.post(`${baseUrl}/users/signup`, data);
  return response
}
