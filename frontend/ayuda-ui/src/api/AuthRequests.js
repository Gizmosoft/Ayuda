import getBaseUrl from "../utils/BaseUrl";
import axios from "axios";

const baseUrl = getBaseUrl();

export const registerUser = async (userObject) => {
    const response = await axios.post(baseUrl + '/auth/register', userObject);
    return response;
}