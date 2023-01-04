import { useQuery } from "@tanstack/react-query";
import { ergastAxios } from "../lib/axios";

export const getRaces = async (season) => {
  try {
    const response = await ergastAxios.get(`${season}.json`);
    return response;
  } catch (e) {
    console.error(`Cannot load data due to: ${e.message}`)
  }
};

export const useRaces = (season) => {
  return useQuery({
    queryKey: ["races", season],
    queryFn: () => getRaces(season),
  });
};
