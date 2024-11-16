import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import { Feed } from "./components/Feed";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // import { Sidebar } from "./components/Sidebar";
import PopularPeople from "./components/PopularPeople";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  return (
    // <BrowserRouter>
    <Router>
      <Box className="app">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/popular" element={<PopularPeople />} />
          <Route path="/details/:id" element={<MovieDetails />} />

          {/* <Sidebar /> */}
        </Routes>
      </Box>
    </Router>
    // </BrowserRouter>
  );
};

export default App;
