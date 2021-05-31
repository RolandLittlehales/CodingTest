import initData, { IListing } from "../data/initData";
import { delay, removeFromListingFromArray, sortListingsById } from "./utils";

describe("UTILS", () => {
  it("should sort the listings list", () => {
    const listings: IListing[] = [];
    listings.push(initData.results[2]);
    listings.push(initData.results[0]);
    listings.push(initData.results[1]);

    const sortedListings = sortListingsById(listings);
    expect(sortedListings[0].id).toBe("1");
    expect(sortedListings[1].id).toBe("2");
    expect(sortedListings[2].id).toBe("3");
  });

  it("should remove the expected listing from the array", () => {
    const listings: IListing[] = initData.results;

    const newListings = removeFromListingFromArray(listings, "2");

    expect(newListings.length).toBe(listings.length - 1);
    expect(newListings[0].id).toBe("1");
    expect(newListings[1].id).toBe("3");
  });
});
