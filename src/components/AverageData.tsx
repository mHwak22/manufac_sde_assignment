import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

// structure(Name, Average yield and Average cultivation ) of data for each crop
interface CropData {
  cropName: string; 
  averageYield: string; 
  averageArea: string; 
  [key: string]: string; // Index signature to allow any other string keys
}

//props interface for the AverageData component
interface AverageDataProps {
  data: DataEntry[]; // Prop to pass the data to the component
}

//structure of a single data entry in the dataset
interface DataEntry {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
  "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
}

// React functional component to display average yield data by crop
const AverageData: React.FC<AverageDataProps> = ({ data }) => {
  // State to store data calculated by crop
  const [dataByCrop, setDataByCrop] = useState<CropData[]>([]);

  // useEffect hook to calculate averages when data changes
  useEffect(() => {
    calculateAverages();
  }, [data]);

  // Function to calculate average yield and area for each crop
  const calculateAverages = () => {
    // Object to store accumulated yield, area, and count for each crop
    const crops: {
      [key: string]: { yield: number; area: number; count: number };
    } = {};

    // Iterating through each data entry
    data.forEach((entry) => {
      // Destructure data entry
      const {
        "Crop Name": cropName,
        "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": yieldValue,
        "Area Under Cultivation (UOM:Ha(Hectares))": area,
      } = entry;

      // If crop is encountered for the first time, initialize its properties
      if (!crops[cropName]) {
        crops[cropName] = { yield: 0, area: 0, count: 0 };
      }

      // Accumulate yield, area, and count for the crop
      crops[cropName].yield += yieldValue ? Number(yieldValue) : 0;
      crops[cropName].area += area ? Number(area) : 0;
      crops[cropName].count++;
    });

    // Convert accumulated data to an array of CropData objects
    const dataByCrop: CropData[] = Object.entries(crops).map(
      ([cropName, { yield: yieldProp, area, count }]) => ({
        cropName,
        averageYield: (yieldProp / count).toFixed(3),
        averageArea: (area / count).toFixed(3),
      })
    );

    // Set the state with the calculated data by crop
    setDataByCrop(dataByCrop);
  };

  // Table column configuration
  const columns = [
    { title: "Crop", key: "cropName" },
    {
      title: "Average Yield of the Crop between 1950-2020",
      key: "averageYield",
    },
    {
      title: "Average Cultivation Area of the Crop between 1950-2020",
      key: "averageArea",
    },
  ];

  // Table rows
  const rows = dataByCrop.map((entry) => (
    <Table.Tr key={entry.cropName}>
      {columns.map((column) => (
        <Table.Td key={column.key}>{entry[column.key]}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <div>
      <h1>Average Yield Crop</h1>
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
                {/* Render table headers */}
                {columns.map((column) => (
                  <Table.Th key={column.key}>{column.title}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            {/* Render table body with rows */}
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </div>
  );
};

export default AverageData;
