import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Menu,
  MenuItem,
  CardMedia,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import GradeIcon from "@mui/icons-material/Grade";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { CheckCircle } from "@mui/icons-material";

export const MovieCard = ({ movie }) => {
  // const [value, setValue] = useState(movie.popularity);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const rating = movie.vote_average.toFixed(1);
  const getRatingClass = (rating) => {
    if (rating < 7) return "low-rating";
    return "high-rating";
  };
  return (
    <Card
      sx={{
        width: { md: "175px", xs: "100%" },

        paddingBottom: "10px",
        borderRadius: "5px",
        backgroundColor: "#1e1e1e",
        marginTop: "20px",
        position: "relative",
      }}
    >
      <MoreHorizIcon
        onClick={handleClick}
        style={{
          position: "absolute",
          fontSize: "20px",
          top: "10px",
          right: "10px",
          color: "black",
          cursor: "pointer",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: "50%",
        }}
      />

      <CardMedia
        component="img"
        position="relative"
        alt={movie.title}
        height="265px"
        image={`https://image.tmdb.org/t/p/w220_and_h330_face/${
          movie.poster_path ? movie.poster_path : movie.backdrop_path
        }`}
      />

      <div className={`movie-rating ${getRatingClass(rating)}`}>{rating}</div>
      <Link to={`/details/${movie.id}`} state={movie}>
        <CardContent
          sx={{
            backgroundColor: "#1e1e1e",
            height: "40px",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" color="#FFF">
            {movie.title || movie.name}
          </Typography>
          <Typography
            sx={{ fontFamily: "monospace", color: "lightgrey" }}
            gutterBottom
            variant="h7"
            color="#FFF"
            component="div"
          >
            {movie.release_date || movie.first_air_date}
          </Typography>

          {/* <Rating paddingBottom="15px" name="read-only" value={value} readOnly /> */}
        </CardContent>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            style={{
              borderBottom: "1px solid lightgray",
              gap: "6px",
              fontSize: "15px",
              alignSelf: "center",
            }}
            onClick={() => {
              handleClose(); /* Add favorite logic here */
            }}
          >
            <ListAltIcon fontSize="small" />
            Add to list
          </MenuItem>
          <MenuItem
            style={{
              borderBottom: "1px solid lightgray",
              gap: "6px",
              fontSize: "15px",
              alignSelf: "center",
            }}
            onClick={() => {
              handleClose(); /* Add to list logic here */
            }}
          >
            <FavoriteIcon fontSize="small" />
            Favorite
          </MenuItem>
          <MenuItem
            style={{
              borderBottom: "1px solid lightgray",
              gap: "6px",
              fontSize: "15px",
              alignSelf: "center",
            }}
            onClick={() => {
              handleClose(); /* Add to list logic here */
            }}
          >
            <BookmarkAddIcon fontSize="small" />
            Whatchlist
          </MenuItem>
          <MenuItem
            style={{
              gap: "6px",
              fontSize: "15px",
              alignSelf: "center",
            }}
            onClick={() => {
              handleClose(); /* Add to list logic here */
            }}
          >
            <GradeIcon fontSize="small" />
            Your Rating
          </MenuItem>
        </Menu>
      </Link>
    </Card>
  );
};
