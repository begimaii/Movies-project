import { Box, Stack } from "@mui/material";
import { MovieCard } from "./MovieCard";
const Movie = ({ filteredMovies, tvShows, handleReset, search }) => {
  return (
    <Box
      direction="row"
      display="flex"
      flexWrap="wrap"
      justifyContent="start"
      gap={4}
    >
      {/* {search && movies.length === 0 && (
        <Typography variant="h6">No movies found for "{search}"</Typography>
      )} */}
      {filteredMovies.map((movie) => (
        <Box key={movie.id}>
          {movie && <MovieCard movie={movie} handleReset={handleReset} />}
        </Box>
      ))}
    </Box>
  );
};
export default Movie;
