import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../lib/axios';

export const getRaces = async (season) => {
  return await ergastAxios.get(`${season}.json`);
};

export const useRaces = (season) => {
  return useQuery({
    queryKey: ['races', season],
    queryFn: () => getRaces(season),
  });
};
