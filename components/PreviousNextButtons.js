import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

export default function PreviousNext({
  page,
  handlePreviousClick,
  handleNextClick,
}) {
  return (
    <div>
      <Box
        sx={{
          mt: 3,
          width: "100%",
          height: "60px",
          padding: "10px",
          background: "white",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <p>Page {page} </p> */}
        <Button
          sx={{ mr: 2, width: "120px" }}
          variant="outlined"
          onClick={() => handlePreviousClick()}
          disabled={page === 1}
        >
          <ArrowLeftIcon />
          Previous
        </Button>
        <Button
          sx={{ width: "120px" }}
          variant="outlined"
          onClick={() => handleNextClick()}
        >
          Next
          <ArrowRightIcon />
        </Button>
      </Box>
    </div>
  );
}
