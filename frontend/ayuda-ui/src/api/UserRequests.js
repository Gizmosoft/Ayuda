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

export const updateUserById = async(emailId, skills, domains) => {
  try {
    console.log(emailId);
    console.log(skills);
    console.log(domains);
    const response = await axios.patch(`${baseUrl}/users/update-user`, {
      email: emailId,
      skills: skills,
      career_path: domains
    });
    return response.data;
  } catch(error) {
    console.error('Error updating user:', error);
    throw error; 
  }
}