import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../lib/axios';

export const getRaces = (season) => {
  return ergastAxios.get(`${season}.json`);
};

export const useRaces = (season) => {
  return useQuery({
    queryKey: ['races', season],
    queryFn: () => getRaces(season),
    // ...config,
  });
};
