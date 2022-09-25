import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserCard from "../components/UserCard";
import FavouriteCard from "../components/FavouriteCard";
import SortBySelect from "../components/SortBySelect";
import LinearProgress from "@mui/material/LinearProgress";
import GhostFavouriteCard from "../components/GhostFavouriteCard";
import Pagination from "../components/Pagination";
import { NoEncryption } from "@mui/icons-material";
// import PreviousNextButtons from "../components/PreviousNextButtons";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // page sets the apiURL paggination
  const [page, setPage] = useState(1);
  const [favourites, setFavourites] = useState([]);
  // setValue for refreshing purposes
  const [value, setValue] = useState();

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
  }, [page, value]);

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

  // Used for the Previous and Next buttons
  // NB: unused - Pagination being used instead

  // function handleNextClick() {
  //   setPage(page + 1);
  // }

  // function handlePreviousClick() {
  //   setPage(page - 1);
  // }

  function handlePaginationClick(value) {
    setPage(value);
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
        const newFavUser = { ...user, page: page };
        setFavourites((current) => [newFavUser, ...current]);
      }
    } else {
      // if no favourites exist => add user
      const newFavUser = { ...user, page: page };
      setFavourites((current) => [newFavUser, ...current]);
    }
  }

  function resetSortBy() {
    // window.location.reload();
    setValue({});
  }

  function sortByName() {
    const shallowCopy = [...data.results];
    const sortedUsers = shallowCopy.sort((a, b) =>
      a.name.first.toLowerCase() < b.name.first.toLowerCase() ? -1 : 1
    );
    setData({
      results: sortedUsers,
    });
  }

  function sortByAge() {
    const shallowCopy = [...data.results];
    const sortedUsers = shallowCopy.sort((a, b) =>
      a.dob.age < b.dob.age ? -1 : 1
    );
    setData({
      results: sortedUsers,
    });
  }

  function sortByFavourite() {
    const shallowCopy = [...data.results];
    const sortedUsers = shallowCopy.sort(
      (a, b) =>
        Number(favourites.some((fav) => fav.id.value === b.id.value)) -
        Number(favourites.some((fav) => fav.id.value === a.id.value))
    );
    setData({
      results: sortedUsers,
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
            <h2>Brukere</h2>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Pagination
                page={page}
                handlePaginationClick={handlePaginationClick}
              />
            </Box>
            <SortBySelect
              resetSortBy={resetSortBy}
              sortByName={sortByName}
              sortByAge={sortByAge}
              sortByFavourite={sortByFavourite}
            />
          </Box>
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              mb: 2,
            }}
          >
            <Pagination
              page={page}
              handlePaginationClick={handlePaginationClick}
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
          {/* <PreviousNextButtons
            page={page}
            handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick}
          /> */}
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
              alignItems: "center",
            }}
          >
            <Pagination
              handlePaginationClick={handlePaginationClick}
              page={page}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <h2>Mine Favoriter</h2>
          {favourites.map((user, i) => (
            <FavouriteCard
              key={i}
              updateFavourites={updateFavourites}
              sx={{ flexGrow: 1 }}
              user={user}
              page={page}
            />
          ))}
          {!favourites.length ? <GhostFavouriteCard /> : null}
        </Grid>
      </Grid>
    </Box>
  );
}
