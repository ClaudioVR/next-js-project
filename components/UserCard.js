import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

const UserCard = ({ user, page, favourites, updateFavourites }) => {
  const router = useRouter();

  function handleClick() {
    if (user.id.value) router.push(`/user/${user.id.value}?page=${page}`);
    else
      alert(
        "No valid ID found for this user. Unable to correctly fetch more details."
      );
  }

  function toggleFavourtie() {
    if (user.id.value) updateFavourites(user);
    else alert("User does not have a valid ID. Cannot add to favourites.");
  }

  const userIsFav = favourites.some((fav) => fav.id.value === user.id.value);

  return (
    <Card sx={{ border: "none", maxHeight: "135px" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Avatar
              alt="User image"
              src={user.picture.large}
              sx={{ width: 100, height: 100, mx: "auto", mb: 3 }}
            />
          </Box>
          <Box sx={{ pl: 2, width: "100%", pt: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontSize: 16, mr: 1 }} gutterBottom>
                  {user.name.first} {user.name.last}
                </Typography>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  ({user.dob.age})
                </Typography>
              </Box>
              <IconButton
                aria-label="Toggle favourite"
                onClick={() => toggleFavourtie()}
                size="small"
                sx={{ mt: -1 }}
                color="primary"
              >
                {userIsFav ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Box>

            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{ fontSize: 12, fontWeight: "light" }}
                color="text.secondary"
              >
                {user.location.city}, {user.location.country}
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: "light" }}>
                {user.email}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Button color="button" onClick={() => handleClick()} size="small">
                Vis mer
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
