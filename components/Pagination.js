import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationControlled({ page, handlePaginationClick }) {
  const count = 1000;
  const handleChange = (event, value) => {
    handlePaginationClick(value);
  };

  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination
        size="small"
        color="primary"
        count={count}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
