import React, { useState } from "react";
import { Padding, Search } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Button,
} from "@mui/material";

import images from "../utils/constants";
import { UncontrolledCarousel } from "reactstrap";

function Navbar({
  people,
  input,
  setInput,
  handleReset,
  categories,
  handleSearch,
  handleSelectMovie,
  handleHover,
  handleClose,
  anchorEls,
}) {
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClear = () => {
    setInput(""); // Clear input field
    handleReset(); // Trigger reset action
  };
  console.log(categories, "categories");
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        position: "sticky",
        pt: 2,
        justifyContent: "space-between",
        zIndex: 1000,
      }}
    >
      <div className="menu-bar">
        <Link to={"/"}>
          {" "}
          <img src={images.logo} alt="logo" height={60} />
        </Link>

        <Box style={{ display: "flex", alignItems: "center" }}>
          {categories?.map((category) => (
            <div key={category.name}>
              <Button
                // color="error"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => handleHover(event, category.name)}
              >
                <h3 style={{ margin: "0" }}>{category.type}</h3>
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEls[category.name]}
                open={Boolean(anchorEls[category.name])}
                onClose={() => handleClose(category.name)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {category.options.map((el) => (
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    key={el}
                    onClick={() => {
                      handleSelectMovie(category.name.toLowerCase(), el);
                      handleClose(category.name);
                    }}
                  >
                    {el.replace(/_/g, " ") + " people"}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          ))}
        </Box>
      </div>
      <div className="menu-bar">
        {" "}
        <Paper
          onSubmit={handleSearch}
          component="form"
          sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            pl: 2,
            display: "flex",
            justifyContent: "space-between",
            ml: 3,
            mr: 2,
          }}
        >
          <input
            style={{ borderRadius: "20px" }}
            type="text"
            className="search-bar"
            value={input}
            onChange={() => {
              handleChange;

              const searchType =
                currentPage === "popularPeople" ? "person" : "movie";
              handleSearch(input, searchType);
            }}
            placeholder="Search..."
          />
          <IconButton
            onClick={handleSearch}
            type="submit"
            sx={{ p: "10px", color: "red" }}
          >
            {input ? <ClearIcon onClick={handleReset} /> : <Search />}
          </IconButton>
          {/* <button onClick={handleSearch}>Search</button> */}
        </Paper>
        <Typography color="white" sx={{ cursor: "pointer" }}>
          Login/Sign Up
        </Typography>
      </div>
    </Stack>
  );
}

export default Navbar;
