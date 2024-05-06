import getBaseUrl from "../utils/BaseUrl";
import axios from "axios";

const baseUrl = getBaseUrl();

export const getUserByEmailId = async (emailId) => {
    const response = await axios.get(`${baseUrl}/users/get-user`, {
        params: {
          email: emailId,
        }
    });
    return response;
}