import React, { ReactNode, useEffect, useState } from "react";
import initData, { IListing } from "../data/initData";
import {
  delay,
  removeFromListingFromArray,
  sortListingsById,
} from "../utils/utils";

export interface IListingsContext {
  savedListings: IListing[];
  availableListings: IListing[];
  listingSearchLoading: boolean;
  searchListings: () => void;
  saveListing: (listing: IListing) => void;
  removeFromSaved: (listing: IListing) => void;
  useFakeApiCall: boolean;
}

export const ListingsContext = React.createContext({} as IListingsContext);
/**
 * provider to used by tests only
 * @test only
 */
export let providerValue: IListingsContext = {
  savedListings: [],
  availableListings: [],
  listingSearchLoading: false,
  searchListings: () => null,
  saveListing: (listing: IListing) => null,
  removeFromSaved: (listing: IListing) => null,
  useFakeApiCall: true,
};

const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [savedListings, setSavedListings] = useState<IListing[]>(
    providerValue.savedListings
  );
  const [availableListings, setAvailableListings] = useState<IListing[]>(
    providerValue.availableListings
  );
  const [listingSearchLoading, setListingSearchLoading] = useState<boolean>(
    providerValue.listingSearchLoading
  );
  const [useFakeApiCall, setUseFakeApiCall] = useState<boolean>(
    providerValue.useFakeApiCall
  );

  const fakeApiCall = delay(1);

  const searchListings = async () => {
    setListingSearchLoading(true);

    if (useFakeApiCall) await fakeApiCall();
    setSavedListings(initData.saved);
    setAvailableListings(initData.results);
    setListingSearchLoading(false);
  };

  /**
   * Add the listing to save and remove it from available
   * @param listing
   */
  const saveListing = async (listing: IListing) => {
    setListingSearchLoading(true);
    if (useFakeApiCall) await fakeApiCall();

    const newAvailableListings = removeFromListingFromArray(
      availableListings,
      listing.id
    );
    savedListings.push(listing);

    setSavedListings(sortListingsById(savedListings));
    setAvailableListings(sortListingsById(newAvailableListings));

    setListingSearchLoading(false);
  };

  /**
   * Add the listing from saved and add it to available
   * @param listing
   */
  const removeFromSaved = async (listing: IListing) => {
    setListingSearchLoading(true);
    if (useFakeApiCall) await fakeApiCall();

    const newSavedListings = removeFromListingFromArray(
      savedListings,
      listing.id
    );

    availableListings.push(listing);

    setSavedListings(sortListingsById(newSavedListings));
    setAvailableListings(sortListingsById(availableListings));

    setListingSearchLoading(false);
  };

  //Update the provider values
  providerValue = {
    savedListings,
    availableListings,
    listingSearchLoading,
    searchListings,
    saveListing,
    removeFromSaved,
    useFakeApiCall,
  };

  /**
   * On load set listings
   */
  useEffect(() => {
    searchListings();
  }, []);

  return (
    <ListingsContext.Provider value={providerValue}>
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsProvider;
