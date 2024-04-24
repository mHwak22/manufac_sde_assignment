import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

interface ProcductionDataProps {
  data: DataEntry[];
}

interface DataEntry {
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
  "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
}

const ProcductionData: React.FC<ProcductionDataProps> = ({ data }) => {
  const [yearData, setYearData] = useState<any[]>([]);

  useEffect(() => {
    findYearMaxMin();
  }, [data]);

  const findYearMaxMin = () => {
    const yearMap: {
      [year: string]: {
        maxProduction?: string | number;
        maxCrop?: string;
        minProduction?: string | number;
        minCrop?: string;
      };
    } = {};

    data.forEach((entry) => {
      const year = entry["Year"];
      const production = entry["Crop Production (UOM:t(Tonnes))"];

      if (!yearMap[year]) {
        yearMap[year] = {};
      }

      if (
        !yearMap[year].maxProduction ||
        production! > yearMap[year].maxProduction!
      ) {
        yearMap[year].maxProduction = production;
        yearMap[year].maxCrop = entry["Crop Name"];
      }

      if (
        !yearMap[year].minProduction ||
        production! < yearMap[year].minProduction!
      ) {
        yearMap[year].minProduction = production;
        yearMap[year].minCrop = entry["Crop Name"];
      }
    });

    const formattedYearData = Object.entries(yearMap).map(([year, value]) => ({
      Year: year,
      "Crop with Maximum Production": value.maxCrop || "N/A",
      "Crop with Minimum Production": value.minCrop || "N/A",
    }));
    setYearData(formattedYearData);
  };

  const yearRows = yearData.map((entry, index) => {
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

export default ProcductionData;
