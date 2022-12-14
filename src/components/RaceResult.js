import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRaceResult } from '../api/fetchRaceResults';
import { useQualiResult } from '../api/fetchQualifyingResult';
import { useSprintResult } from '../api/fetchSprintResult';
import GenericTable from './Tables/GenericTable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TableRow, TableCell, Typography } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
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
  const sprintResultQuery = useSprintResult(season, round);

  const raceColumns = ['Position', 'Driver', 'Time', 'Status', 'Points', 'Fastest Lap'];
  const sprintColumns = ['Grid Start', 'Position', 'Driver', 'Time', 'Status', 'Points'];
  const qualiColumns = ['Position', 'Driver', 'Time'];

  if (raceResultQuery.isSuccess && qualiResultQuery.isSuccess && sprintResultQuery.isSuccess) {
    const raceResult = raceResultQuery.data.data.MRData.RaceTable.Races[0].Results;
    const qualiResult = qualiResultQuery.data.data.MRData.RaceTable.Races[0].QualifyingResults;
    const sprintResult = sprintResultQuery.data.data.MRData.RaceTable.Races[0].SprintResults;

    console.log(sprintResult);
    console.log(`RaceResult ==> ${raceResult}`)

    if (!search)
      setSearch(
        `${raceResultQuery.data.data.MRData.RaceTable.season} ${raceResultQuery.data.data.MRData.RaceTable.Races[0].raceName} Race Highlights`
      );

    let raceRows = undefined;
    let qualiRows = undefined;
    let sprintRows = undefined;

    if (qualiResult) {
      qualiRows = qualiResult.map((row, index) => (
        <TableRow key={index}>
          <TableCell />
          <TableCell>{row.position}</TableCell>
          <TableCell>
            <Link to={`/drivers/${row.Driver.driverId}`} className="text-inherit">
              {`${row.Driver.givenName} ${row.Driver.familyName}`}
            </Link>
            <div className="text-xs">{row.Constructor.name}</div>
          </TableCell>
          <TableCell>{row.position <= 10 ? row.Q3 : row.position <= 15 ? 'Q2' : 'Q1'}</TableCell>
        </TableRow>
      ));
    }

    if (sprintResult) {
      sprintRows = sprintResult.map((row, index) => (
        <TableRow key={index}>
          <TableCell />
          <TableCell>{row.grid}</TableCell>
          <TableCell>{row.position}</TableCell>
          <TableCell>
            <Link to={`/drivers/${row.Driver.driverId}`} className="text-inherit">
              {`${row.Driver.givenName} ${row.Driver.familyName}`}
            </Link>
            <div className="text-xs">{row.Constructor.name}</div>
          </TableCell>
          <TableCell>
            {row.status === 'Finished' || row.status.includes('Lap')
              ? row.Time.time
                ? row.Time.time
                : 'No Time'
              : 'DNF'}
          </TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell>{row.points}</TableCell>
        </TableRow>
      ));
    }

    if (raceResult) {
      raceRows = raceResult.map((row, index) => (
        <TableRow key={index}>
          <TableCell />
          <TableCell>{row.position}</TableCell>
          <TableCell>
            <Link to={`/drivers/${row.Driver.driverId}`} className="text-inherit">
              {`${row.Driver.givenName} ${row.Driver.familyName}`}
            </Link>
            <div className="text-xs">{row.Constructor.name}</div>
          </TableCell>
          <TableCell>
            {row.status === 'Finished' || row.status.includes('Lap')
              ? row.Time.time
                ? row.Time.time
                : row.status
              : 'DNF'}
          </TableCell>
          <TableCell>{row.status.includes("Lap") ? "Finished" : row.status}</TableCell>
          <TableCell>{row.points}</TableCell>
          <TableCell>
            {row.FastestLap.rank === '1' ? <TimerIcon className="fill-purple-700 ml-5" /> : ''}
          </TableCell>
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
        ) : value === 1 && sprintResult ? (
          <GenericTable columns={sprintColumns} rows={sprintRows} />
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
