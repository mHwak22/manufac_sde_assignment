import React, { useState } from "react";
// Import dataset from the local directory
import jsonData from "./data/Manufac _ India Agro Dataset.json";
// Import all the Components from Components
import AllData from "./components/AllData";
import ProductionData from "./components/ProductionData";
import AverageData from "./components/AverageData";

import { Switch } from "@mantine/core";

const App = () => {
  // State variable to toggle between production and average tables
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <div className="app-container">
      <div className="left-column">
        {/* Send the jsonData to the AllData component to display it in a table */}
        <AllData data={jsonData} />
      </div>
      <div className="right-column">
        <div className="data-container">
          <div className="toggle-button">
            {/* Toggle button to switch between average and production tables */}
            <Switch
              color="burlywood"
              size="xl"
              onLabel="Average Table"
              offLabel="Production Table"
              checked={flag}
              onChange={(event) => setFlag(event.currentTarget.checked)}
            />
          </div>
          {/* Conditional rendering based on the flag state */}
          {flag ? (
            // Display the AverageData component if flag is true
            <AverageData  data={jsonData} />
          ) : (
            // Display the ProductionData component if flag is false
            <ProductionData data={jsonData}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
