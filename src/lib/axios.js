import Axios from 'axios';

export const ergastAxios = Axios.create({
  baseURL: 'https://ergast.com/api/f1',
});
