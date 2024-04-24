import React from "react";
import { Table } from "@mantine/core";

// props interface for the AllData component
interface AllDataProps {
  data: {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": string | number;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
    "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
  }[];
}

// React functional component to display all data in a table
const AllData: React.FC<AllDataProps> = ({ data }) => {
  // Map each data entry to a table row
  const allRows = data.map((entry, index) => {
    // Extract year from the data from "Financial Year (Apr - Mar), 1950" format to "1950"
    const year = entry.Year.split(", ")[1];
    return (
      <Table.Tr key={index}>
        <Table.Td>{entry.Country}</Table.Td>
        <Table.Td>{year}</Table.Td>
        <Table.Td>{entry["Crop Name"]}</Table.Td>
        {/* Render "0" if data is empty in any row*/}
        <Table.Td>
          {entry["Crop Production (UOM:t(Tonnes))"] === "" ? "0" : entry["Crop Production (UOM:t(Tonnes))"]}
        </Table.Td>
        <Table.Td>
          {entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] === "" ? "0" : entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]}
        </Table.Td>
        <Table.Td>
          {entry["Area Under Cultivation (UOM:Ha(Hectares))"] === "" ? "0" : entry["Area Under Cultivation (UOM:Ha(Hectares))"]}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div className="all-data-wrapper">
      <h1>All Data</h1>
      <div className="wrapper">
        <Table.ScrollContainer className="all-data-table" minWidth={200}>
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
                <Table.Th>Country</Table.Th>
                <Table.Th>Year</Table.Th>
                <Table.Th>Crop Name</Table.Th>
                <Table.Th>Crop Production</Table.Th>
                <Table.Th>Yield Of Crops</Table.Th>
                <Table.Th>Area Under Cultivation</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{allRows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </div>
  );
};

export default AllData;
