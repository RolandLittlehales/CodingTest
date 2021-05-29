import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { IListing } from "../data/initData";
import { ListingsContext } from "../providers/ListingsProvider";

const useStyles = makeStyles({
  root: ({ backgroundColor }: { backgroundColor: string }) => ({
    maxWidth: 345,
    backgroundColor: backgroundColor,
    margin: "10px",
    "&:hover": {
      "& $ctaSection": {
        display: "block",
      },
    },
  }),
  ctaSection: () => ({
    display: "none",
  }),
});

const ListingCard = ({
  listing,
  saved = false,
}: {
  listing: IListing;
  saved?: boolean;
}) => {
  const classes = useStyles({
    color: listing.agency.brandingColors.primary,
  });

  const { saveListing, removeFromSaved, listingSearchLoading } =
    useContext(ListingsContext);

  /**
   * handle add/removing listing from the saved list
   */
  const onClick = () =>
    saved ? removeFromSaved(listing) : saveListing(listing);

  const buttonWording = () => {
    if (listingSearchLoading) saved ? "Removing Listing" : "Adding Listing";
    return saved ? "Remove" : "Add";
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<img src={listing.agency.logo} />}
        title=""
        subheader=""
      />
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={listing.mainImage}
          title={"Image of property from the agent"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {listing.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container xs={12} className={classes.ctaSection}>
          <Button
            size="small"
            color="primary"
            onClick={onClick}
            disabled={listingSearchLoading}
          >
            {buttonWording()}
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ListingCard;
