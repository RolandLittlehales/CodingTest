import { configure, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import initData, { IListing } from "../data/initData";
import ListingsProvider, {
  IListingsContext,
  ListingsContext,
} from "../providers/ListingsProvider";
import SavedListings from "./SavedListings";
import Adapter from "enzyme-adapter-react-16";
import jsdom from "jsdom";

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
};

describe("SavedListings", () => {
  let component: ReactWrapper | ShallowWrapper;

  // Cleanup mock
  afterEach(() => {
    if (component && component.unmount && component.exists())
      component.unmount();
  });

  it("should render the default list of data", () => {
    component = mount(
      <ListingsContext.Provider value={{ ...testProvider }}>
        <SavedListings />
      </ListingsContext.Provider>
    );
    expect(component.find("#savedListings").exists()).toBe(true);
    expect(component.find("#listing_4").exists()).toBe(true);

    expect(component.find("#listing_1").exists()).toBe(false);
    expect(component.find("#listing_2").exists()).toBe(false);
    expect(component.find("#listing_3").exists()).toBe(false);
  });

  it("should render no cards when supplied with no listings", () => {
    component = mount(
      <ListingsContext.Provider value={{ ...testProvider, savedListings: [] }}>
        <SavedListings />
      </ListingsContext.Provider>
    );
    expect(component.find("#savedListings").exists()).toBe(true);
    expect(component.find("#savedListings_list").exists()).toBe(true);

    expect(
      component.find("#savedListings_list").hostNodes().children().length
    ).toBe(0);
  });
});
