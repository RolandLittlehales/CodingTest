import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { IListing } from "../data/initData";
import { ListingsContext } from "../providers/ListingsProvider";
import ListingCard from "./ListingCard";

const SearchResults = () => {
  const { availableListings = [] } = useContext(ListingsContext);
  return (
    <Grid container item xs={12} id="searchResults">
      <Grid item xs={12}>
        <Typography variant="h3">Results</Typography>
      </Grid>
      {availableListings.map((listing) => (
        <Grid item xs={12} key={listing.id}>
          <ListingCard listing={listing} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchResults;
