import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
// import line and bar graph

import styles from "./Chart.module.css";

export const Chart = ({
  data: { activeCases, deceased, recovered },
  state,
}) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const lineChart = dailyData[0] ? (
    // if '0' will be false
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ activeCases }) => activeCases),
            label: "Infected",
            borderColor: "#000080",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = activeCases ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
            "rgba(98,  182, 239,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(255, 134,159,0.4)",
            ],
            data: [activeCases, recovered, deceased],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${state}` },
      }}
    />
  ) : null;

  return <div className={styles.container}>{state ? barChart : null}</div>;
};
