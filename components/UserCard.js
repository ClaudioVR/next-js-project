import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const UserCard = ({ user }) => {
  return (
    <Card variant="outlined" sx={{ border: "none" }}>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small">
          <StarBorderIcon />
          <StarIcon />
        </Button>
      </CardActions>
      <CardContent>
        <Avatar
          alt="Remy Sharp"
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
