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
import { IListing } from "../../data/initData";
import { ListingsContext } from "../../providers/ListingsProvider";

const useStyles = makeStyles({
  root: () => ({
    maxWidth: 345,
    margin: "10px",
    "&:hover": {
      "& $ctaSection": {
        display: "block",
      },
    },
  }),
  header: ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor: backgroundColor,
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
    backgroundColor: listing.agency.brandingColors.primary,
  });

  const [changingState, setChangingState] = useState<boolean>(false);
  const { saveListing, removeFromSaved, listingSearchLoading } =
    useContext(ListingsContext);
  const canChangeState = changingState && listingSearchLoading;

  /**
   * handle add/removing listing from the saved list
   */
  const onClick = async () => {
    setChangingState(true);
    saved ? await removeFromSaved(listing) : await saveListing(listing);
    setChangingState(false);
  };

  const buttonWording = () => {
    if (canChangeState) return saved ? "Removing Property" : "Adding Property";
    return saved ? "Remove Property" : "Add Property";
  };

  return (
    <Card
      className={classes.root}
      id={`listing_${listing.id}`}
      data-name="listingCard"
    >
      <CardHeader
        avatar={<img src={listing.agency.logo} />}
        className={classes.header}
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
        <Grid item xs={12} className={classes.ctaSection}>
          <Button
            size="small"
            color="primary"
            onClick={onClick}
            disabled={canChangeState}
            id={`listing_${listing.id}_button`}
          >
            {buttonWording()}
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ListingCard;
