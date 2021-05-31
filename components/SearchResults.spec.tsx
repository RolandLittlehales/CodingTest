import { configure, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import jsdom from "jsdom";
import React from "react";
import initData, { IListing } from "../data/initData";
import {
  IListingsContext,
  ListingsContext,
} from "../providers/ListingsProvider";
import SearchResults from "./SearchResults";

configure({ adapter: new Adapter() });

const doc = new jsdom.JSDOM("<!doctype html><html><body></body></html>");
/* quick hack to ignore ts errors */
global.document = doc as any;
global.window = (doc as any).defaultView;

const testProvider: IListingsContext = {
  savedListings: initData.saved,
  availableListings: initData.results,
  listingSearchLoading: false,
  searchListings: () => null,
  saveListing: (listing: IListing) => null,
  removeFromSaved: (listing: IListing) => null,
  useFakeApiCall: false,
};

describe("SearchResults", () => {
  let component: ReactWrapper | ShallowWrapper;

  // Cleanup mock
  afterEach(() => {
    if (component && component.unmount && component.exists())
      component.unmount();
  });

  it("should render the default list of data", () => {
    component = mount(
      <ListingsContext.Provider value={{ ...testProvider }}>
        <SearchResults />
      </ListingsContext.Provider>
    );
    expect(component.find("#searchResults").exists()).toBe(true);
    expect(component.find("#listing_1").exists()).toBe(true);
    expect(component.find("#listing_2").exists()).toBe(true);
    expect(component.find("#listing_3").exists()).toBe(true);

    expect(component.find("#listing_4").exists()).toBe(false);
  });

  it("should render no cards when supplied with no listings", () => {
    component = mount(
      <ListingsContext.Provider
        value={{ ...testProvider, availableListings: [] }}
      >
        <SearchResults />
      </ListingsContext.Provider>
    );
    expect(component.find("#searchResults").exists()).toBe(true);
    expect(component.find("#searchResults_list").exists()).toBe(true);
    expect(
      component.find("#searchResults_list").hostNodes().children().length
    ).toBe(0);
  });
});
