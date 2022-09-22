import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UserCard from "../components/UserCard";
import FavouriteCard from "../components/FavouriteCard";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // page sets the apiURL paggination
  const [page, setPage] = useState(1);
  const [favourites, setFavourites] = useState([]);

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
        setData(res.data);
        setLoading(false);
      });
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const savedFavs = localStorage.getItem("favourites");
    if (favourites.length) {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } else {
      if (savedFavs) {
        const parseFavourites = JSON.parse(savedFavs);
        setFavourites(parseFavourites);
      }
    }
  }, [favourites]);

  function handleNextClick() {
    setPage(page + 1);
  }

  function handlePreviousClick() {
    setPage(page - 1);
  }

  function updateFavourites(user) {
    console.log(user.id.value);
    // if favourtes exist check for user => if user is fav remove || add
    if (favourites.length) {
      console.log("A");
      const favsIncludeUser = favourites.some(
        (fav) => fav.id.value === user.id.value
      );
      if (favsIncludeUser) {
        console.log("B");
        console.log(favsIncludeUser);
        // remove user from favs
        const newFavs = favourites.filter(
          (fav) => fav.id.value !== user.id.value
        );
        setFavourites(newFavs);
      } else {
        console.log("C");
        // add user
        setFavourites((current) => [user, ...current]);
      }
    } else {
      // if no favourites exist => add user
      console.log("D");
      setFavourites((current) => [user, ...current]);
      console.log(favourites);
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={{ xs: 2 }}>
        <Grid item xs={12} sm={8} md={9}>
          <h2>My users</h2>
          <Grid container spacing={{ xs: 2 }}>
            {data.results.map((user, i) => (
              <Grid item xs={12} md={6} lg={4} key={i}>
                <UserCard
                  updateFavourites={updateFavourites}
                  sx={{ flexGrow: 1 }}
                  user={user}
                  page={page}
                  favourites={favourites}
                />
              </Grid>
            ))}
          </Grid>
          <div className="buttons">
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
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <h2>Favourites</h2>

          {favourites.map((user, i) => (
            <FavouriteCard
              key={i}
              updateFavourites={updateFavourites}
              sx={{ flexGrow: 1 }}
              user={user}
              page={page}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
