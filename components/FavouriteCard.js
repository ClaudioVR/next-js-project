import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/Styles.module.css";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";

const FavouriteCard = ({ user, page, updateFavourites }) => {
  const router = useRouter();

  function handleClick() {
    router.push(`/user/${user.id.value}?page=${user.page}`);
  }

  function toggleFavourtie() {
    updateFavourites(user);
  }

  return (
    <Card sx={{ border: "none", p: 0, mb: 2, height: 80 }}>
      <CardContent sx={{}}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar
            className={styles.pointer}
            onClick={() => handleClick()}
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
          <Box>
            <IconButton
              aria-label="Toggle favourite"
              onClick={() => toggleFavourtie()}
              size="small"
              sx={{ mt: -1 }}
              color="primary"
            >
              <StarIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FavouriteCard;
