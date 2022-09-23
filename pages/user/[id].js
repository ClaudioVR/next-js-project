import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import UserFullDetails from "../../components/UserFullDetails";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const { page } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios(
        `https://randomuser.me/api?seed=8a13afcabe1a8004&page=${page}&results=10`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          const selectedUser = res.data.results.find(
            (user) => user.id.value === id
          );
          setUser(selectedUser);
        })
        .catch((err) => console.log(err));
    };
    if (id) {
      // checking id is in place before calling method
      fetchData();
    }
  }, [id]);

  return (
    <div>
      <Button
        href="/"
        sx={{ mt: 3 }}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
      >
        Tilbake
      </Button>
      {user && <UserFullDetails user={user} />}
    </div>
  );
}
