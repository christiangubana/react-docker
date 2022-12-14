import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../lib/axios';

export const getQualifyingResult = (season, round) => {
  return ergastAxios.get(`${season}/${round}/qualifying.json`);
};

export const useQualiResult = (season, round) => {
  return useQuery({
    queryKey: ['qualiResult', season, round],
    queryFn: () => getQualifyingResult(season, round),
    // ...config,
  });
};
