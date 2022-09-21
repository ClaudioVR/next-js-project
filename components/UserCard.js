import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {user.name.first} {user.name.last} ({user.dob.age})
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.location.city}, {user.location.country}
        </Typography>
        <Typography variant="body2">{user.email}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Like</Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
