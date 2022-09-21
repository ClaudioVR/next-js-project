import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UserCard from "../components/UserCard";

export default function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [users, setUsers] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // 'https://randomuser.me/api?seed=00000&page=1&results=10'

  // const apiUrl = `https://randomuser.me/api?seed=8a13afcabe1a8004&page=${page}&results=10`;
  // const apiUrl = "https://randomuser.me/api/?results=10";

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios(
        `https://randomuser.me/api?seed=8a13afcabe1a8004&page=${page}&results=10`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        const sortedAlphabetically = res.data.results.sort(
          (a, b) => a.name.first.toLowerCase() - b.name.first.toLowerCase()
        );
        setUsers(sortedAlphabetically);
        console.log(users);
        setLoading(false);
      });
    };

    fetchData();
  }, [page]);

  function handleNextClick() {
    setPage(page + 1);
  }

  function handlePreviousClick() {
    setPage(page - 1);
  }

  if (isLoading) return <p>Loading...</p>;
  if (!users) return <p>No profile data</p>;

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} sm={8} md={9}>
          <Item>
            <h1>My users</h1>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {users.map((user, i) => (
                <UserCard sx={{ flexGrow: 1 }} user={user} key={i} />
              ))}
            </Box>
            <div>
              <p>Page {page} </p>
              <Button
                sx={{ mr: 2 }}
                variant="outlined"
                onClick={() => handlePreviousClick()}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button variant="outlined" onClick={() => handleNextClick()}>
                Next
              </Button>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Item>xs=2</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
