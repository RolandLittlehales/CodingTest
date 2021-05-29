import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { IListing } from "../data/initData";

const useStyles = makeStyles({
  root: ({ color }: { color: string }) => ({
    maxWidth: 345,
    backgroundColor: color,
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
  const classes = useStyles({ color: listing.agency.brandingColors });

  return (
    <Card className={classes.root}>
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
            TITLE
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {listing.agency.logo}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container xs={12} className={classes.ctaSection}>
          <Button size="small" color="primary">
            {saved ? "remove" : "add"}
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ListingCard;
