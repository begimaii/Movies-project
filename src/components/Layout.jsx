import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({
  input,
  handleReset,
  handleHover,
  setInput,
  handleSearch,
  handleClose,
  anchorEls,
  handleSelectMovie,
  categories,
  people,
}) {
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
      <Outlet />
    </>
  );
}
