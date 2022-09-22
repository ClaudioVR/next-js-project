import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/Styles.module.css";

const FavouriteCard = ({ user, page }) => {
  const router = useRouter();

  function handleClick() {
    router.push(`/user/${user.id.value}?page=${page}`);
  }

  return (
    <Card
      className={styles.pointer}
      onClick={() => handleClick()}
      sx={{ border: "none", p: 0, mb: 2, height: 80 }}
    >
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
