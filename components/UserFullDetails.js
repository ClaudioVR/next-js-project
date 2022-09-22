import React from "react";
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

const UserFullDetails = ({ user }) => {
  const userDOB = () => {
    const event = new Date(`${user.dob.date}`);
    return event.toLocaleDateString("no-No");
  };

  const userRegistered = () => {
    const event = new Date(`${user.registered.date}`);
    return event.toLocaleDateString("no-No");
  };

  return (
    <Card sx={{ border: "none", mt: 5 }}>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small">
          <StarBorderIcon />
          <StarIcon />
        </Button>
      </CardActions>
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Avatar
                alt="Remy Sharp"
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
                <div>
                  <Typography sx={{ fontSize: 24, mb: 0 }}>
                    {user.name.first} {user.name.last}
                  </Typography>
                  <Typography sx={{ fontSize: 16, mt: 0, mb: 0 }}>
                    {user.login.username}
                  </Typography>
                  <Typography sx={{ fontSize: 12, mt: 1, fontWeight: "light" }}>
                    Født: {userDOB()} ({user.dob.age})
                  </Typography>
                </div>
                <div>
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
                    ID: {user.id.value}
                  </Typography>
                </div>
              </Box>

              <Typography sx={{ fontSize: 12, mt: 2, fontWeight: "light" }}>
                {user.location.street.number} {user.location.street.name}
              </Typography>
              <Typography sx={{ fontSize: 12, mt: 0, fontWeight: "light" }}>
                {user.location.city} ({user.location.state})
              </Typography>
              <Typography sx={{ fontSize: 12, mt: 0, fontWeight: "light" }}>
                {user.location.postcode} {user.location.country}
              </Typography>

              <Button
                size="small"
                disableElevation
                variant="contained"
                sx={{ mt: 2 }}
                endIcon={<SendIcon />}
              >
                Send epost
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserFullDetails;
