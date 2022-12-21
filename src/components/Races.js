import React, { useState, useContext, useCallback } from 'react';
import { useRaces } from '../api/fetchRaces';
import GenericTable from './Tables/GenericTable';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography } from '@mui/material';
import CollapsibleTable from './Tables/CollapseTable';
import DateCard from './Date/DateCard';
import { convertDate, convertTimeZone } from '../util/DateConverter';
import YearFilter from './YearSelect/YearFilter';
import YearContext from './context/YearContext';
import { Link } from 'react-router-dom';

const lookup = require('coordinate_to_country');

const RaceRow = ({ race, latest, passed }) => {
  const [open, setOpen] = useState(latest);

  const latestRaceRef = useCallback((node) => {
    if (node !== null) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  let sessions = [];

  if (race.FirstPractice) {
    sessions.push({
      name: 'First Practice',
      date: race.FirstPractice.date,
      time: race.FirstPractice.time,
    });
  }
  if (race.SecondPractice) {
    sessions.push({
      name: 'Second Practice',
      date: race.SecondPractice.date,
      time: race.SecondPractice.time,
    });
  }
  if (race.ThirdPractice) {
    sessions.push({
      name: 'Third Practice',
      date: race.ThirdPractice.date,
      time: race.ThirdPractice.time,
    });
  }
  if (race.Qualifying) {
    sessions.push({
      name: 'Qualifying',
      date: race.Qualifying.date,
      time: race.Qualifying.time,
    });
  }
  if (race.Sprint) {
    sessions.push({
      name: 'Sprint',
      date: race.Sprint.date,
      time: race.Sprint.time,
    });
  }
  if (race) {
    sessions.push({
      name: 'Race',
      date: race.date,
      time: race.time,
    });
  }

  sessions.sort((a, b) => {
    const first = a.date + a.time;
    const second = b.date + b.time;

    return first.localeCompare(second);
  });

  const sessionsRows = sessions.map((session, index) => (
    <TableRow key={index}>
      <TableCell>{session.name}</TableCell>
      <TableCell>
        {convertDate(session.date).toLocaleString('en-GB', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
        })}
      </TableCell>
      <TableCell>
        {convertTimeZone(session.time)[0] + '.' + convertTimeZone(session.time)[1]}
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <div className="md:flex relative" ref={latest ? latestRaceRef : undefined}>
            <img
              className="m-4 border border-solid"
              src={`https://countryflagsapi.com/png/${lookup(
                +race.Circuit.Location.lat,
                +race.Circuit.Location.long,
                true
              )}`}
              alt="Flag"
              height={40}
              width={60}
            />
            <div className="my-auto">
              <Typography>{race.raceName}</Typography>
              <Typography className="text-xs">{race.Circuit.circuitName}</Typography>
              {passed && (
                <Link to={`/results/${race.season}/${race.round}`}>
                  <Typography className="absolute right-4 md:top-6 top-12">Results</Typography>
                </Link>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>{<DateCard date={new Date(race.date)} />}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="pb-0 pt-0" colSpan={6}>
          <CollapsibleTable rows={sessionsRows} open={open} />
        </TableCell>
      </TableRow>
    </>
  );
};

const Races = () => {
  const { year } = useContext(YearContext);

  const racesQuery = useRaces(year);

  if (racesQuery.isSuccess) {
    const rows = racesQuery.data.data.MRData.RaceTable.Races;

    //User is viewing current seasons page.
    if (year === new Date().getFullYear()) {
      let latest = -1;

      for (let i = 0; i < rows.length; i++) {
        if (new Date() < new Date(rows[i].date)) {
          latest = i;
          break;
        }
        rows[i].passed = true;
      }
      if (latest !== -1) rows[latest].latest = true;
    } else if (year < new Date().getFullYear()) {
      for (let i = 0; i < rows.length; i++) {
        rows[i].passed = true;
      }
    }

    let columns = ['Grand Prix', 'Date'];
    let raceRows = (
      <>
        {rows.map((race) => {
          return (
            <RaceRow
              race={race}
              latest={race.latest}
              passed={race.passed}
              key={race.raceName}
            ></RaceRow>
          );
        })}
      </>
    );

    return (
      <>
        <div className='side-content'>
        <YearFilter />
        <Typography variant="h5" className="title">{`World champions year of ${year}`}</Typography>
        </div>
        <GenericTable rows={raceRows} columns={columns}></GenericTable>;
      </>
    );
  }
};

export default Races;
