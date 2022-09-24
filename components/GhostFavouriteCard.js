import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FaceIcon from "@mui/icons-material/Face";

const GhostFavouriteCard = () => {
  return (
    <Card
      sx={{ border: "none", p: 0, mb: 2, height: 80, background: "#D3D3D3" }}
    >
      <CardContent sx={{}}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar sx={{ background: "#808080" }}>
            <FaceIcon />
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: 16, color: "#808080", my: 0 }}>
              Favoriter vises her
            </Typography>
          </Box>
          <Box>
            <IconButton
              aria-label="Toggle favourite"
              size="small"
              sx={{ mt: -1 }}
            >
              <StarIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GhostFavouriteCard;
