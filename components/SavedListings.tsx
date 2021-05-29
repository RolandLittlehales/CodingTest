import { Typography, Grid } from "@material-ui/core";
import React from "react";
import { IListing } from "../data/initData";
import ListingCard from "./ListingCard";

const SavedListings = ({ listings }: { listings: IListing[] }) => {
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Typography variant="h3">Saved Properties</Typography>
      </Grid>
      {listings.map((listing) => (
        <Grid item xs={12} key={listing.id}>
          <ListingCard listing={listing} saved={true} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SavedListings;
