import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWFiZjcyMzJlODBiMDk2NTEwNGFlMDBhYWUxMzlmYSIsIm5iZiI6MTcyOTY1MDE3OS40NzE0OTksInN1YiI6IjY3MTg0ZTZhNzY5MTA3ZDc3YjQ3NGJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UQREpIm3HeCbI7342E9AJJzjyhQOsfcFkjPmycaDnJM",
  },
};
export const fetchFromApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}${url}`, options);
  return data;
};
