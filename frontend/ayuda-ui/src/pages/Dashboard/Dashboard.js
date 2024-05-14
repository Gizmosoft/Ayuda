import React, { useState } from "react";
import UserProfile from "../../components/User/UserProfile.js";
import { getRecommendations } from "../../api/Recommendations.js";
import "./Dashboard.css";

export const Dashboard = () => {
  const [recommendData, setRecommendData] = useState([]); // To store the API response
  const [loading, setLoading] = useState(false); // To show loading feedback

  // Function to fetch recommendations
  const fetchRecommendations = async () => {
    setLoading(true); // Start loading
    try {
      const response = await getRecommendations();
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const json = await response.json();
      console.log(response.data);
      setRecommendData(response.data); // Store the response data in state
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setRecommendData([]); // Reset the data on error
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };

  //   console.log(Object.keys(recommendData.course_id).length, 'recommendData');

  return (
    <div>
      <UserProfile />
      <input
        className="recommend-button"
        type="submit"
        name="recommend-button"
        value="See Recommendations"
        id="recommend-button"
        onClick={fetchRecommendations}
      />
      {loading && <p>Loading...</p>}
      {!loading && Object.keys(recommendData).length > 0 && (
        <ul>
          {Object.values(recommendData.course_id).map((id, index) => (
            <li key={index}>{id}</li>
          ))}
        </ul>
      )}
      {!loading && Object.keys(recommendData).length === 0 && (
        <p>Click the button above to see recommendations</p>
      )}
    </div>
  );
};
