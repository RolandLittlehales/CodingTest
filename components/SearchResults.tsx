import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { IListing } from "../data/initData";
import ListingCard from "./ListingCard";

const SearchResults = ({ listings }: { listings: IListing[] }) => {
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Typography>Results</Typography>
      </Grid>
      {listings.map((listing) => (
        <Grid item xs={12}>
          <ListingCard listing={listing} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchResults;
