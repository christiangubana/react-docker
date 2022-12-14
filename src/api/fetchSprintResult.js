import { useQuery } from '@tanstack/react-query';
import { ergastAxios } from '../lib/axios';

export const getSprintResult = (season, round) => {
  return ergastAxios.get(`${season}/${round}/sprint.json`);
};

export const useSprintResult = (season, round) => {
  return useQuery({
    queryKey: ['sprintResult', season, round],
    queryFn: () => getSprintResult(season, round),
    // ...config,
  });
};
