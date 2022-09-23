import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserCard from "../components/UserCard";
import FavouriteCard from "../components/FavouriteCard";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SortBySelect from "../components/SortBySelect";
import LinearProgress from "@mui/material/LinearProgress";
import PreviousNextButtons from "../components/PreviousNextButtons";

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
    // if favourtes exist check for user => if user is fav remove || add
    if (favourites.length) {
      const favsIncludeUser = favourites.some(
        (fav) => fav.id.value === user.id.value
      );
      if (favsIncludeUser) {
        // remove user from favs
        const newFavs = favourites.filter(
          (fav) => fav.id.value !== user.id.value
        );
        localStorage.clear();
        setFavourites(newFavs);
      } else {
        // add user
        setFavourites((current) => [user, ...current]);
      }
    } else {
      // if no favourites exist => add user
      setFavourites((current) => [user, ...current]);
    }
  }

  function sortByName() {
    const shallowCopy = [...data.results];
    const usersByName = shallowCopy.sort((a, b) =>
      a.name.first.toLowerCase() < b.name.first.toLowerCase() ? -1 : 1
    );
    setData({
      results: usersByName,
    });
  }

  function sortByAge() {
    const shallowCopy = [...data.results];
    const usersByAge = shallowCopy.sort((a, b) =>
      a.dob.age < b.dob.age ? -1 : 1
    );
    setData({
      results: usersByAge,
    });
  }

  if (isLoading)
    // whilst fetching data
    return (
      <Box sx={{ mt: 5, width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (!data) return <p>No profile data</p>;

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={{ xs: 2 }}>
        <Grid item xs={12} sm={8} md={9}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>Mine brukere</h2>
            <SortBySelect
              sortByName={sortByName}
              sortByAge={sortByAge}
              sortByFavourite={sortByFavourite}
            />
          </Box>
          <Grid container spacing={{ xs: 2 }}>
            {data.results.map((user, i) => (
              <Grid item xs={12} md={6} key={i}>
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
          <PreviousNextButtons
            page={page}
            handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <h2>Favoriter</h2>
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
