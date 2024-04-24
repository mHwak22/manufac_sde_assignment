import React, { useState } from "react";
import ProcductionData from "./components/ProcductionData";
import AverageData from "./components/AverageData";
import AllData from "./components/AllData";
import { Switch } from "@mantine/core";
import jsonData from "./data/Manufac _ India Agro Dataset.json";
import "./App.css";

const App = () => {
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <div className="app-container">
      <div className="left-column">
        <AllData data={jsonData} />
      </div>
      <div className="right-column">
        <div className="data-container">
          <div className="toggle-button">
            <Switch
              color="burlywood"
              size="xl"
              onLabel="Average Table"
              offLabel="Production Table"
              checked={flag}
              onChange={(event) => setFlag(event.currentTarget.checked)}
            />
          </div>
          {flag ?  <AverageData  data={jsonData} /> : <ProcductionData data={jsonData}/>}
        </div>
      </div>
    </div>
  );
};

export default App;
