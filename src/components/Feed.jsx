import { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { debounce } from "lodash";
import LinearProgress from "@mui/material/LinearProgress";

import Movie from "./Movie";
import Navbar from "./Navbar";
import PopularPeople from "./PopularPeople";
import { fetchFromApi } from "../utils/fetchFromApi";
import { Sidebar } from "./Sidebar";

const sortByOptions = [
  "Popularity Ascending",
  "Popularity Descending",
  "Rating Ascending",
  "Rating Descending",
  "Release Date Ascending",
  "Release Date Descending",
  "Title A-Z",
  "Title Z-A",
];
const categories = [
  {
    type: "Movies",
    name: "movie",
    options: ["popular", "now_playing", "upcoming", "top_rated"],
  },
  {
    type: "Tv Shows",
    name: "tv",
    options: ["popular", "airing_today", "on_the_air", "top_rated"],
  },
  {
    type: "People",
    name: "person",
    options: ["popular"],
    link: "/people",
  },

  {
    type: "More",
    name: "more",
    options: ["discussion", "leaderboard", "support", "API"],
  },
];
export const Feed = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movieGenres, setMovieGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [section, setSection] = useState("movie");
  const [anchorEls, setAnchorEl] = useState({});
  const [loading, setLoading] = useState(false);
  const [sectionChanged, setSectionChanged] = useState(false);
  const [sortOptions, setSortOptions] = useState("");
  const navigate = useNavigate();

  const handleSortedMovies = filteredMovies.sort((a, b) => {
    switch (sortOptions) {
      case "Popularity Ascending":
        return a.popularity - b.popularity;
      case "Popularity Descending":
        return b.popularity - a.popularity;
      case "Rating Ascending":
        return a.vote_average - b.vote_average;
      case "Rating Descending":
        return b.vote_average - a.vote_average;
      case "Release Date Ascending":
        return new Date(a.release_date) - new Date(b.release_date);
      case "Release Date Descending":
        return new Date(b.release_date) - new Date(a.release_date);
      case "Title A-Z":
        return a.title.localeCompare(b.title);
      case "Title Z-A":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const handleHover = (e, category) => {
    setAnchorEl((prev) => ({ ...prev, [category]: e.currentTarget }));
  };

  const handleClose = (category) => {
    setAnchorEl((prev) => ({ ...prev, [category]: null }));
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);

    if (section && selectedCategory) {
      fetchFromApi(`${section}/${selectedCategory}?language=en-US&page=${page}`)
        .then((res) => {
          if (section === "movie") {
            setMovies(res.results);
            setFilteredMovies(res.results);
          } else if (section === "tv") {
            setTvShows(res.results);
            setFilteredMovies(res.results);
          } else if (section === "person") {
            setPeople(res.results);
            setFilteredMovies(res.results);
          }

          setTotalPages(res.total_pages);
          setTimeout(() => {
            setLoading(false);
          }, 700);
          setSectionChanged(false);
        })

        .catch((err) => {
          console.log(err);
          setLoading(false);
          setSectionChanged(false);
        });
    }
  }, [section, page, selectedCategory]);

  const handleSelectMovie = (newSection, category) => {
    if (newSection === "person") {
      navigate("popular");
    } else {
      setSection(newSection);
      setSelectedCategory(category);
      navigate("/");
    }
    setPage(1);
    setSearch(false);
    // if (newSection !== section) {
    //   setSectionChanged(true);
    // } else {
    //   setLoading(false);
    // }
    // setSection(newSection);
    // setSelectedCategory(category);

    // setPage(1);
    // setSearch(false);
  };

  const searchMovie = (title) => {
    fetchFromApi(
      `search/movie?query=${title}&include_adult=false&language=en-US`
    )
      .then((res) => {
        setMovies(res.results);
        setFilteredMovies(res.results);
        setTotalPages(res.total_pages);
        setSearch(true);
        // console.log(search);
      })
      .catch((err) => console.error(err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovie(input);
  };
  const handleReset = () => {
    fetchFromApi("movie/top_rated?language=en-US&page=1")
      .then((res) => {
        setMovies(res.results); // Reset movies back to top-rated
        setFilteredMovies(res.results);
        setSearch(false); // Reset search flag
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchFromApi("genre/movie/list?language=en").then((data) => {
      setMovieGenres(data.genres);
    });
  }, []);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);

    if (genreId) {
      const filtered = movies.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  };

  return (
    <>
      <Navbar
        input={input}
        handleReset={handleReset}
        handleHover={handleHover}
        setInput={setInput}
        handleSearch={handleSearch}
        handleClose={handleClose}
        anchorEls={anchorEls}
        handleSelectMovie={handleSelectMovie}
        categories={categories}
        people={people}
      />
      {/* <PopularPeople /> */}
      <Stack sx={{ height: "100vh", width: "95vw" }}>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              width: "200px", // Set a fixed width
              height: "100%",
              borderRight: "1px solid #3d3d3d",
              overflowY: "auto",
            }}
          >
            <Sidebar
              movieGenres={movieGenres}
              anchorEls={anchorEls}
              selectedCategory={selectedCategory}
              selectedGenre={selectedGenre}
              handleGenreClick={handleGenreClick}
              sortOptions={sortOptions}
              handleSortedMovies={handleSortedMovies}
              setSortOptions={setSortOptions}
              sortByOptions={sortByOptions}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: "1rem",
              overflowY: "auto",
            }}
          >
            {loading && !sectionChanged ? (
              <LinearProgress color="error" sx={{ marginTop: "200px" }} />
            ) : (
              <Movie
                filteredMovies={filteredMovies}
                tvShows={tvShows}
                search={search}
              />
            )}

            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 4 }}
            >
              {!loading && (
                <div
                  style={{
                    display: "flex",
                    color: "white",
                    fontSize: "20px",
                    alignItems: "center",
                  }}
                >
                  Page: {page}
                  {totalPages > 1 &&
                  totalPages &&
                  filteredMovies.length >= 20 ? (
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handleChange}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "white",
                          fontSize: "17px",
                          marginLeft: "15px",
                        },
                        "& .Mui-selected": {
                          color: "white",
                          backgroundColor: "red",
                        },
                        "& .MuiPaginationItem-root:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                      }}
                    />
                  ) : null}
                </div>
              )}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
