import { IListing } from "../data/initData";

export const sortListingsById = (listings: IListing[]) =>
  listings.sort((a, b) => (a.id > b.id ? 1 : -1));

export const removeFromListingFromArray = (
  listings: IListing[],
  listingId: string
) => listings.filter((listingToCompare) => listingId !== listingToCompare.id);

/**
 * To simulate fake api
 * @param time multiplier of how long to random delay for
 * @returns
 */
export const delay =
  (timeModifier: number) =>
  (time = timeModifier * (Math.random() * 1500)) =>
    new Promise((resolve) => setTimeout(resolve, time));
