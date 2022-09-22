import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <Container>
        <ul>
          <li className={navStyles.pointer}>
            <Link href="/">
              <Typography
                sx={{ fontSize: 24, my: 0, fontWeight: "bold" }}
                gutterBottom
              >
                Next.js Brukere
              </Typography>
            </Link>
          </li>
          <li className={navStyles.pointer}>
            <Link href="/">
              <Typography sx={{ fontSize: 18, my: 0 }} gutterBottom>
                Hjem
              </Typography>
            </Link>
          </li>
          <li className={navStyles.pointer}>
            <Link href="/">
              <Typography sx={{ fontSize: 18, my: 0 }} gutterBottom>
                Favoriter
              </Typography>
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Nav;
