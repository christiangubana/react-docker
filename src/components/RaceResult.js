import React from 'react';
import { useParams } from 'react-router-dom';
import { useRaceResult } from '../api/fetchRaceResults';
import { useQualiResult } from '../api/fetchQualifyingResult';
import GenericTable from './Tables/GenericTable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TableRow, TableCell, Typography } from '@mui/material';
import { useState } from 'react';

function RaceResult() {
  const { season, round } = useParams();
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const raceResultQuery = useRaceResult(season, round);
  const qualiResultQuery = useQualiResult(season, round);

  const raceColumns = ['Position', 'Driver', 'Status', 'Points'];
  const qualiColumns = ['Position', 'Driver', 'Time'];

  if (raceResultQuery.isSuccess && qualiResultQuery.isSuccess) {
    const raceResult = raceResultQuery.data.data.MRData.RaceTable.Races[0].Results;
    const qualiResult = qualiResultQuery.data.data.MRData.RaceTable.Races[0].QualifyingResults;

    if (!search)
      setSearch(
        `${raceResultQuery.data.data.MRData.RaceTable.season} ${raceResultQuery.data.data.MRData.RaceTable.Races[0].raceName} Race Highlights`
      );

    let raceRows = undefined;
    let qualiRows = undefined;

    if (qualiResult) {
      qualiRows = qualiResult.map((row, index) => (
        <TableRow key={index}>
          <TableCell />
          <TableCell>{row.position}</TableCell>
          <TableCell className='text-inherit'>
          {`${row.Driver.givenName} ${row.Driver.familyName}`}
            <div className="text-xs">{row.Constructor.name}</div>
          </TableCell>
          <TableCell>{row.position <= 10 ? row.Q3 : row.position <= 15 ? 'Q2' : 'Q1'}</TableCell>
        </TableRow>
      ));
    }

    if (raceResult) {
      raceRows = raceResult.map((row, index) => (
        <TableRow key={index}>
          <TableCell />
          <TableCell>{row.position}</TableCell>
          <TableCell className='text-inherit'>
          {`${row.Driver.givenName} ${row.Driver.familyName}`}
            <div className="text-xs">{row.Constructor.name}</div>
          </TableCell>
          <TableCell>{row.status.includes("Lap") ? "Finished" : row.status}</TableCell>
          <TableCell>{row.points}</TableCell>
        </TableRow>
      ));
    }

    return (
      <div className="mt-32">
        <Typography
          variant="h5"
          className="text-center mb-8"
        >{`${raceResultQuery.data.data.MRData.RaceTable.season} ${raceResultQuery.data.data.MRData.RaceTable.Races[0].raceName} Results`}</Typography>
        <Tabs value={value} onChange={handleChange} centered className="my-6">
          <Tab label="Qualifying" />
          <Tab label="Sprint" />
          <Tab label="Race" />
        </Tabs>
        {value === 0 && qualiResult ? (
          <GenericTable columns={qualiColumns} rows={qualiRows} />
        ) : value === 2 && raceResult ? (
          <GenericTable columns={raceColumns} rows={raceRows} />
        ) : (
          <h2 className="text-center">No results.</h2>
        )}
      </div>
    );
  }
}

export default RaceResult;
