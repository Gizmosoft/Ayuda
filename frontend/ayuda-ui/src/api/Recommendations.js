import getBaseUrl from "../utils/BaseUrl";
import axios from "axios";

const baseUrl = getBaseUrl();

export const getRecommendations = async () => {
    const courses = await axios.get(baseUrl + '/courses/recommendations');
    console.log(courses);
    return courses;
}