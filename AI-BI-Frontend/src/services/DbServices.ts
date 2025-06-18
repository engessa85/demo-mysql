
import { toast } from "react-toastify";
import axios from "axios";


const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface DbDataTypSend {
  
  db_hostname: string;
  db_username: string;
  db_password: string;
  db_name: string;
  db_type: string;

}


export interface DbDataTypRes {
  id: number;
  db_hostname: string;
  db_username: string;
  db_password: string;
  db_name: string;
  db_type: string;
  db_schema: string;
}

export const GetDB = async (token: string | null) => {
  try {
    const response = await axios.get<DbDataTypRes[]>(
      `${BaseUrl}/api/connection/db-connection`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddDB = async (token: string | null, data: DbDataTypSend) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/api/connection/db-connection`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export interface chatWithDbType {
  question: string;
}

export const chatWithdB = async (token: string | null, question: string, id:number | null) => {
  try {
    const response = await axios.post(
      `${BaseUrl}/api/connection/db-chating/${id}`,
      { question: question },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch  {
    
    toast.error("Error during chating with db", { className: "custom-toast", autoClose: 2000 });
  }
};
