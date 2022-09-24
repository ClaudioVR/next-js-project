import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CakeIcon from "@mui/icons-material/Cake";

const UserFullDetails = ({ user }) => {
  const [favourites, setFavourites] = useState([]);

  const userDOB = () => {
    const event = new Date(`${user.dob.date}`);
    return event.toLocaleDateString("no-No");
  };

  const userRegistered = () => {
    const event = new Date(`${user.registered.date}`);
    return event.toLocaleDateString("no-No");
  };

  const userIsFav = favourites.some((fav) => fav.id.value === user.id.value);

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

  function updateFavourites() {
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

  function downloadImage() {
    const url = `${user.picture.large}`;
    console.log(url);
    axios(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function timeSinceRegistration() {
    const registration = new Date(`${user.registered.date}`);
    const today = new Date();
    const difference = today.getTime() - registration.getTime();
    const differenceInDays = Math.floor(difference / (1000 * 3600 * 24));
    const remainingMonths = differenceInDays % 12;
    const differenceInYears = Math.floor(difference / (1000 * 3600 * 24 * 365));
    return `For ${differenceInYears} år og ${remainingMonths} måneder siden. `;
  }

  function handleSendEmail(e) {
    // Unverified as I do not have native email installed on desktop
    e.preventDefault();
    window.location.href = `mailto:${user.email}`;
  }

  return (
    <Card sx={{ border: "none", mt: 5, pb: 5 }}>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={updateFavourites} size="small">
          {userIsFav ? <StarIcon /> : <StarBorderIcon />}
        </Button>
      </CardActions>
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Avatar
                alt="User image"
                src={user.picture.large}
                sx={{ width: 200, height: 200, mx: "auto", mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 24, mb: 0 }}>
                    {user.name.first} {user.name.last} ({user.dob.age})
                  </Typography>
                  <Typography
                    sx={{ fontSize: 16, mt: -1, mb: 1, color: "#aaa" }}
                  >
                    {user.login.username}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: 10, fontWeight: "light" }}
                    color="text.secondary"
                  >
                    Registrert: {userRegistered()}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 10, fontWeight: "light" }}
                    color="text.secondary"
                  >
                    {timeSinceRegistration()}
                  </Typography>
                  <Typography
                    sx={{ mt: 1, fontSize: 10, fontWeight: "light" }}
                    color="text.secondary"
                  >
                    BrukerID: {user.id.value}
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{ fontSize: 12, mt: 0, fontWeight: "light" }}>
                {user.location.street.number} {user.location.street.name}
              </Typography>
              <Typography sx={{ fontSize: 12, mt: 0, fontWeight: "light" }}>
                {user.location.city} ({user.location.state})
              </Typography>
              <Typography sx={{ fontSize: 12, mt: 0, fontWeight: "light" }}>
                {user.location.postcode} {user.location.country}
              </Typography>

              <Typography sx={{ fontSize: "18px", mt: 2, fontWeight: "light" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CakeIcon sx={{ fontSize: "24px", mr: 1, mt: "-3px" }} />
                  {userDOB()}
                </Box>
              </Typography>

              <Typography sx={{ fontSize: 16, mt: 1, mb: 0 }}>
                <Box sx={{ display: "flex" }}>
                  <AlternateEmailIcon sx={{ mr: 1 }} />
                  {user.email}
                </Box>
              </Typography>

              <Button
                size="small"
                disableElevation
                variant="contained"
                sx={{ mt: 2, mr: 3 }}
                endIcon={<SendIcon />}
                onClick={handleSendEmail}
              >
                Send epost
              </Button>

              {/* Encountering CORS error on image download */}
              <Button
                size="small"
                disableElevation
                disabled
                variant="outlined"
                color="button"
                sx={{ mt: 2 }}
                endIcon={<DownloadIcon />}
                onClick={downloadImage}
              >
                Last ned bilde
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserFullDetails;
