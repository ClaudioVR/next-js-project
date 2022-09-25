import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationControlled({ page, handlePaginationClick }) {
  const count = 1000;
  const handleChange = (event, value) => {
    console.log(event);
    console.log(value);
    handlePaginationClick(value);
  };

  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}
