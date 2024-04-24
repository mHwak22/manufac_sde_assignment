import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

// Define the structure of data for each crop
interface CropData {
  cropName: string; // Name of the crop
  averageYield: string; // Average yield of the crop between 1950-2020
  averageArea: string; // Average cultivation area of the crop between 1950-2020
  [key: string]: string; // Index signature to allow any other string keys
}

interface AverageDataProps {
  data: DataEntry[]; // Prop to pass the data to the component
}

interface DataEntry {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
  "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
}

const AverageData: React.FC<AverageDataProps> = ({ data }) => {
  const [dataByCrop, setDataByCrop] = useState<CropData[]>([]);

  useEffect(() => {
    calculateAverages();
  }, [data]);

  const calculateAverages = () => {
    const crops: {
      [key: string]: { yield: number; area: number; count: number };
    } = {};

    data.forEach((entry) => {
      const {
        "Crop Name": cropName,
        "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": yieldValue,
        "Area Under Cultivation (UOM:Ha(Hectares))": area,
      } = entry;

      if (!crops[cropName]) {
        crops[cropName] = { yield: 0, area: 0, count: 0 };
      }

      crops[cropName].yield += yieldValue ? Number(yieldValue) : 0;
      crops[cropName].area += area ? Number(area) : 0;
      crops[cropName].count++;
    });

    const dataByCrop: CropData[] = Object.entries(crops).map(
      ([cropName, { yield: yieldProp, area, count }]) => ({
        cropName,
        averageYield: (yieldProp / count).toFixed(3),
        averageArea: (area / count).toFixed(3),
      })
    );

    setDataByCrop(dataByCrop);
  };

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
                {columns.map((column) => (
                  <Table.Th key={column.key}>{column.title}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </div>
  );
};

export default AverageData;
