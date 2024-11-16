import React, { useEffect, useState } from "react";

import { Stack, Typography, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchFromApi } from "../utils/fetchFromApi";

export const Sidebar = ({
  movieGenres,
  handleGenreClick,
  selectedGenre,
  selectedCategory,
  // anchorEls,
  sortByOptions,
  sortOptions,
  handleSortedMovies,
  setSortOptions,
}) => {
  // const [certif, setSertif] = useState([]);
  const [sortedList, setSortedList] = useState("");
  const [provider, setProvider] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetchFromApi("watch/providers/movie?language=en-US");
      setProvider(res.results);
    };
    fetchApi();
  }, []);

  return (
    <Stack sx={{ paddingTop: "28px" }}>
      {/* <Typography>{anchorEl.name}</Typography> */}
      <Typography
        sx={{
          color: "rgb(205, 72, 72)",
          textTransform: "capitalize",
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {selectedCategory.split("_").join(" ")}
      </Typography>

      <FormControl sx={{ m: 1, minWidth: 120, color: "red" }}>
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ color: "rgb(205, 72, 72)" }}
        >
          Sort
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sortOptions}
          label="Sort"
          onChange={(e) => setSortOptions(e.target.value)}
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          {sortByOptions.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120, color: "red" }}>
        <InputLabel
          id="demo-simple-select-helper-label1"
          sx={{ color: "rgb(205, 72, 72)" }}
        >
          Where To Watch
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label1"
          id="demo-simple-select-helper1"
          value=""
          label="Sort"
          onChange={(e) => setProvider(e)}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "160px",
              gap: "10px",
              maxHeight: "200px",
              // overflow: "scroll",
              // background: "rgba(27, 26, 26, 0.861)",
            }}
          >
            {provider.map((item) => (
              <div
                key={item.provider_id}
                style={{ minWidth: "35px", minHeight: "35px" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w45${item.logo_path}`}
                  alt={item.provider_name}
                  style={{
                    minWidth: "35px",
                    minHeight: "35px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </div>
        </Select>
      </FormControl>
      <span className="genre">Genres</span>
      <Stack
        sx={{
          marginTop: "6px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "5px",
        }}
        // direction="row"
        spacing={2}
      >
        {" "}
        {movieGenres.map((genre) => (
          <Button
            key={genre.id}
            sx={{
              fontSize: "12px",
              padding: "5px",
              borderRadius: "25px",
              marginTop: "5px",
            }}
            onClick={() => handleGenreClick(genre.id)}
            variant={selectedGenre === genre.id ? "contained" : "outlined"}
            color="error"
          >
            {genre.name}
          </Button>
        ))}
      </Stack>
      <span className="genre">Certification</span>
      <Stack
        sx={{
          marginTop: "6px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "5px",
        }}
        // direction="row"
        spacing={2}
      >
        {" "}
        {["NR", "G", "PG", "PG-13", "R", "NC-17"].map((item) => (
          <Button
            key={item}
            sx={{
              fontSize: "12px",
              padding: "5px",
              borderRadius: "25px",
              marginTop: "5px",
            }}
            // onClick={() => handleGenreClick(genre.id)}
            variant={selectedGenre === item ? "contained" : "outlined"}
            color="error"
          >
            {item}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
