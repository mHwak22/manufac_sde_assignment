import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

// props interface for the ProductionData component
interface ProductionDataProps {
  data: DataEntry[]; // Data entry interface array passed as props
}

// structure of a single data entry in the dataset
interface DataEntry {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
  "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
}

// React functional component to display production data by year
const ProductionData: React.FC<ProductionDataProps> = ({ data }) => {
  // State to store year-wise production data
  const [yearData, setYearData] = useState<any[]>([]);

  // useEffect hook to call findYearMaxMin function when data changes
  useEffect(() => {
    findYearMaxMin();
  }, [data]);

  // Function to find crop with maximum and minimum production for each year
  const findYearMaxMin = () => {
    // Object to store maximum and minimum production crops for each year
    const yearMap: {
      [year: string]: {
        maxProduction?: string | number;
        maxCrop?: string;
        minProduction?: string | number;
        minCrop?: string;
      };
    } = {};

    // Iterating through each data entry to populate the yearMap
    data.forEach((entry) => {
      const year = entry["Year"];
      const production = entry["Crop Production (UOM:t(Tonnes))"];

      // If the year entry doesn't exist in the yearMap, initialize it
      if (!yearMap[year]) {
        yearMap[year] = {};
      }

      // Update maximum production crop for the each year
      if (
        !yearMap[year].maxProduction ||
        production! > yearMap[year].maxProduction!
      ) {
        yearMap[year].maxProduction = production;
        yearMap[year].maxCrop = entry["Crop Name"];
      }

      // Update minimum production crop for the each year
      if (
        !yearMap[year].minProduction ||
        production! < yearMap[year].minProduction!
      ) {
        yearMap[year].minProduction = production;
        yearMap[year].minCrop = entry["Crop Name"];
      }
    });

    // Format year data into an array of objects and set the state
    const formattedYearData = Object.entries(yearMap).map(([year, value]) => ({
      Year: year,
      "Crop with Maximum Production": value.maxCrop || "N/A",
      "Crop with Minimum Production": value.minCrop || "N/A",
    }));
    setYearData(formattedYearData);
  };

  // Table rows for year data
  const yearRows = yearData.map((entry, index) => {
    // Extract year from the data, from "Financial Year (Apr - Mar), 1950" format to "1950"
    const year = entry.Year.split(", ")[1];
    return (
      <Table.Tr key={index}>
        <Table.Td>{year}</Table.Td>
        <Table.Td>{entry["Crop with Maximum Production"]}</Table.Td>
        <Table.Td>{entry["Crop with Minimum Production"]}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div>
      <h1>Max. and Min. Production of Crop</h1>
      <div className="wrapper">
        <Table.ScrollContainer className="year-table" minWidth={200}>
          <Table
            stickyHeader
            stickyHeaderOffset={0}
            withColumnBorders
            borderColor="black"
            striped
            stripedColor="burlywood"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Year</Table.Th>
                <Table.Th>Crop with Maximum Production</Table.Th>
                <Table.Th>Crop with Minimum Production</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{yearRows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </div>
  );
};

export default ProductionData;
