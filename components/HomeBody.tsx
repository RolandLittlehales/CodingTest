import { Grid, Typography } from "@material-ui/core";
import React from "react";
import CompanyLogo from "../icons/CompanyLogo";
import styles from "../styles/Home.module.css";
import SavedListings from "./SavedListings";
import SearchResults from "./SearchResults";

const HomeBody = () => {
  return (
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
          <SearchResults />
        </Grid>
        <Grid item xs={12} md={4}>
          <SavedListings />
        </Grid>
      </Grid>
    </main>
  );
};

export default HomeBody;
