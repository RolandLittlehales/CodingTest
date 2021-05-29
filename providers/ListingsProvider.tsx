import React, { ReactNode, useEffect, useState } from "react";
import initData, { IListing } from "../data/initData";

export interface IListingsContext {
  savedListings: IListing[];
  availableListings: IListing[];
  listingSearchLoading: boolean;
  searchListings: () => void;
  saveListing: (listing: IListing) => void;
  removeFromSaved: (listing: IListing) => void;
}

export const ListingsContext = React.createContext({} as IListingsContext);

/**
 * To simulate fake api
 * @param time multiplier of how long to random delay for
 * @returns
 */
const delay =
  (time: number) =>
  (time = Math.random() * 1500) =>
    new Promise((resolve) => setTimeout(resolve, time));

const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [savedListings, setSavedListings] = useState<IListing[]>([]);
  const [availableListings, setAvailableListings] = useState<IListing[]>([]);
  const [listingSearchLoading, setListingSearchLoading] =
    useState<boolean>(true);

  const fakeApiCall = delay(2);

  const searchListings = async () => {
    setListingSearchLoading(true);

    await fakeApiCall();
    setSavedListings(initData.saved);
    setAvailableListings(initData.results);
    setListingSearchLoading(false);
  };

  const sortListings = (listings: IListing[]) =>
    listings.sort((a, b) => (a.id > b.id ? 1 : -1));

  /**
   * Add the listing to save and remove it from available
   * @param listing
   */
  const saveListing = async (listing: IListing) => {
    setListingSearchLoading(true);
    await fakeApiCall();

    const newAvailableListings = availableListings.filter(
      (listingToCompare) => listing.id !== listingToCompare.id
    );
    savedListings.push(listing);

    setSavedListings(sortListings(savedListings));
    setAvailableListings(sortListings(newAvailableListings));

    setListingSearchLoading(false);
  };

  /**
   * Add the listing from saved and add it to available
   * @param listing
   */
  const removeFromSaved = async (listing: IListing) => {
    setListingSearchLoading(true);
    await fakeApiCall();

    const newSavedListings = savedListings.filter(
      (listingToCompare) => listing.id !== listingToCompare.id
    );
    availableListings.push(listing);

    setSavedListings(sortListings(newSavedListings));
    setAvailableListings(sortListings(availableListings));

    setListingSearchLoading(false);
  };

  const providerValue: IListingsContext = {
    savedListings,
    availableListings,
    listingSearchLoading,
    searchListings,
    saveListing,
    removeFromSaved,
  };

  /**
   * On load set listings
   */
  useEffect(() => {
    console.log("search for all list automatically");
    searchListings();
  }, []);

  return (
    <ListingsContext.Provider value={providerValue}>
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsProvider;
