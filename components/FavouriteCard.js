import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const FavouriteCard = ({ user }) => {
  function handleClick() {
    router.push(`/user/${user.id.value}?page=${page}`);
  }

  return (
    <Card sx={{ border: "none", p: 0, mb: 2, height: 80 }}>
      {/* <CardActions sx={{ display: "flex", justifyContent: "space-Between" }}>
        <Button onClick={() => toggleFavourtie()} size="small">
          <StarIcon />
        </Button>
        <Button onClick={() => handleClick()} size="small">
          View info
        </Button>
      </CardActions> */}
      <CardContent sx={{}}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar
            alt="User image"
            src={user.picture.large}
            sx={{ width: 50, height: 50, mb: 3 }}
          />
          <Box sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: 16, my: 0 }} gutterBottom>
              {user.name.first} {user.name.last}
            </Typography>
            <Typography sx={{ fontSize: 12, my: 0 }} gutterBottom>
              {user.login.username}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FavouriteCard;
