// import React, { useEffect, useState } from 'react';
// import { getDailySummaries } from '../api';
// import './DailySummary.css'; // Import the CSS file

// const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// const DailySummary = () => {
//   const [summaries, setSummaries] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSummaries = async () => {
//       try {
//         const summariesData = {};

//         // Fetch summaries for each city
//         for (const city of cities) {
//           const response = getDailySummaries(city);
//           console.log(response)
//           summariesData[city] = response.data[0].city;
//         }

//         setSummaries(summariesData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching daily summaries:', error);
//         setLoading(false);
//       }
//     };

//     fetchSummaries();
//   }, []);

//   return (
//     <div className="container">
//       <h2 className="header">Daily Weather Summaries</h2>
//       {loading ? (
//         <p className="loading">Loading...</p>
//       ) : (
//         Object.keys(summaries).map(city => (
//           <div key={city} className="city-container">
//             <h3>{city}</h3>
//             <ul className="summary-list">
//               {summaries[city].map((summary, index) => (
//                 <li key={index}>
//                   {`${summary.date}: Avg Temp ${summary.avg_temp}°C, Max Temp ${summary.max_temp}°C, Min Temp ${summary.min_temp}°C, Condition ${summary.dominant_condition}`}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default DailySummary;




import React, { useEffect, useState } from 'react';
import { getDailySummaries } from '../api';
import './DailySummary.css';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const DailySummary = () => {
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const summariesData = {};

        for (const city of cities) {
          const response = await getDailySummaries(city);
          summariesData[city] = response.data || [];
        }

        setSummaries(summariesData);
      } catch (error) {
        console.error('Error fetching daily summaries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  return (
    <div className="container">
      <h2 className="header">Daily Weather Summaries</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        Object.keys(summaries).map(city => (
          <div key={city} className="city-container">
            <h3>{city}</h3>
            <ul className="summary-list">
              {(summaries[city] || []).map((summary, index) => (
                <li key={index}>
                  {`${new Date(summary.date).toLocaleDateString()}: Avg Temp ${summary.avg_temp}°C, Max Temp ${summary.max_temp}°C, Min Temp ${summary.min_temp}°C, Condition ${summary.dominant_condition}`}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default DailySummary;
