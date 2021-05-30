import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { ListingsContext } from "../providers/ListingsProvider";
import ListingCard from "./ListingCard";

const SavedListings = () => {
  const { savedListings } = useContext(ListingsContext);
  return (
    <Grid container item xs={12} id="savedListings">
      <Grid item xs={12}>
        <Typography variant="h3">Saved Properties</Typography>
      </Grid>
      <Grid container item xs={12} id="savedListings_list">
        {savedListings.map((listing) => (
          <Grid container item xs={12} key={listing.id}>
            <ListingCard listing={listing} saved={true} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SavedListings;
