import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";

const UserCard = ({ user, page, updateFavourites }) => {
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

  return (
    <Card sx={{ border: "none" }}>
      <CardActions sx={{ display: "flex", justifyContent: "space-Between" }}>
        <Button onClick={() => toggleFavourtie()} size="small">
          <StarBorderIcon />
          <StarIcon />
        </Button>
        <Button onClick={() => handleClick()} size="small">
          View info
        </Button>
      </CardActions>
      <CardContent>
        <Avatar
          alt="User image"
          src={user.picture.large}
          sx={{ width: 100, height: 100, mx: "auto", mb: 3 }}
        />
        <Typography sx={{ fontSize: 16, my: 0 }} gutterBottom>
          {user.name.first} {user.name.last}
        </Typography>
        <Typography sx={{ fontSize: 16, mb: 2 }} gutterBottom>
          ({user.dob.age})
        </Typography>
        <Typography
          sx={{ fontSize: 12, fontWeight: "light" }}
          color="text.secondary"
        >
          {user.location.city}, {user.location.country}
        </Typography>

        <Typography sx={{ fontSize: 12, fontWeight: "light" }}>
          {user.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
