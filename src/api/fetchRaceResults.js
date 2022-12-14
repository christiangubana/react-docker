import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../lib/axios';

export const getRaceResult = (season, round) => {
  return ergastAxios.get(`${season}/${round}/results.json`);
};

export const useRaceResult = (season, round) => {
  return useQuery({
    queryKey: ['raceResult', season, round],
    queryFn: () => getRaceResult(season, round),
    // ...config,
  });
};
