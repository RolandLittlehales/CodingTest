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

/**
 * Exposed to allow for testing
 * @testing only
 */
export const listingsProviderUpdateListing = async ({
  setListingSearchLoading,
  fakeApiCall,
  useFakeApiCall,
  savedListings,
  availableListings,
  listing,
  setSavedListings,
  setAvailableListings,
  save,
}: {
  fakeApiCall: () => void;
  useFakeApiCall: boolean;
  savedListings: IListing[];
  availableListings: IListing[];
  listing: IListing;
  save: boolean;
  setListingSearchLoading: (val: boolean) => void;
  setSavedListings: (val: IListing[]) => void;
  setAvailableListings: (val: IListing[]) => void;
}) => {
  setListingSearchLoading(true);
  if (useFakeApiCall) await fakeApiCall();

  let newAvailableListings: IListing[];
  let newSavedListings: IListing[];

  if (save) {
    newAvailableListings = removeFromListingFromArray(
      availableListings,
      listing.id
    );
    newSavedListings = savedListings;
    savedListings.push(listing);
  } else {
    newSavedListings = removeFromListingFromArray(savedListings, listing.id);
    newAvailableListings = availableListings;
    newAvailableListings.push(listing);
  }

  setSavedListings(sortListingsById(newSavedListings));
  setAvailableListings(sortListingsById(newAvailableListings));

  setListingSearchLoading(false);
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
  const saveListing = async (listing: IListing) =>
    listingsProviderUpdateListing({
      setListingSearchLoading,
      useFakeApiCall,
      fakeApiCall,
      availableListings,
      savedListings,
      setSavedListings,
      setAvailableListings,
      listing,
      save: true,
    });

  /**
   * Add the listing from saved and add it to available
   * @param listing
   */
  const removeFromSaved = async (listing: IListing) =>
    listingsProviderUpdateListing({
      setListingSearchLoading,
      useFakeApiCall,
      fakeApiCall,
      availableListings,
      savedListings,
      setSavedListings,
      setAvailableListings,
      listing,
      save: false,
    });

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
