import { Grid, Typography } from "@material-ui/core";
import Header from "../components/Header";
import SavedListings from "../components/savedListings";
import SearchResults from "../components/SearchResults";
import initData from "../data/initData";
import CompanyLogo from "../icons/CompanyLogo";
import styles from "../styles/Home.module.css";

export default function Home() {
  const results = initData.results;
  const savedListings = initData.saved;

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Grid container className={styles.title}>
          <Grid item xs={12}>
            <h1>View All Available Listings</h1>
          </Grid>
          <Grid item xs={12}>
            <CompanyLogo />
          </Grid>
        </Grid>

        <Typography className={styles.description}>
          Look below for a great selection of properties in your area
        </Typography>
        <Grid container>
          <Grid item xs={12} md={8}>
            <SearchResults listings={results} />
          </Grid>
          <Grid item xs={12} md={4}>
            <SavedListings listings={savedListings} />
          </Grid>
        </Grid>
      </main>

      <footer className={styles.footer}>
        <CompanyLogo />
      </footer>
    </div>
  );
}
