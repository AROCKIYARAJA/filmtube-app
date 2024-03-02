import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to dark
    primary: {
      main: "#7c7c7c", // Set primary color to white
    },
    background: {
      default: "#333333", // Set background color to a dark gray
    },
  },
});

function FilmtubePagination({ setPage, numOfPages = 500 }) {
  function HandlePageBehavior(page) {
    setPage(page);
    window.scroll(0, 0);
  }
  return (
    <div className=" my-10">
      <ThemeProvider theme={theme}>
        <Pagination
          className="mx-auto w-fit p-2"
          count={numOfPages}
          variant="outlined"
          shape="rounded"
          color="primary"
          onChange={(e) => HandlePageBehavior(e.target.textContent)}
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
}

export default FilmtubePagination;
