import { configure, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import jsdom from "jsdom";
import React from "react";
import initData, { IListing } from "../../data/initData";
import {
  IListingsContext,
  ListingsContext,
} from "../../providers/ListingsProvider";
import ListingCard from "./ListingCard";

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

/**
 * Todo test button wording change
 */
describe("SavedListings", () => {
  let component: ReactWrapper | ShallowWrapper;
  const savedListing = testProvider.savedListings[0];
  const availableListing = testProvider.availableListings[0];

  // Cleanup mock
  afterEach(() => {
    if (component && component.unmount && component.exists())
      component.unmount();
  });

  // Flow for saved listings

  it("should render a saved version of the listing card", () => {
    component = mount(
      <ListingsContext.Provider value={{ ...testProvider }}>
        <ListingCard listing={savedListing} />
      </ListingsContext.Provider>
    );

    expect(component.exists()).toBe(true);
    expect(component.find(`#listing_${savedListing.id}`).exists()).toBe(true);
  });

  it("should call the remove function on button click", async () => {
    const saveMockFn = jest.fn();
    const removeMockFn = jest.fn();

    component = mount(
      <ListingsContext.Provider
        value={{
          ...testProvider,
          removeFromSaved: removeMockFn,
          saveListing: saveMockFn,
        }}
      >
        <ListingCard listing={savedListing} saved={true} />
      </ListingsContext.Provider>
    );

    expect(component.exists()).toBe(true);
    expect(component.find(`#listing_${savedListing.id}`).exists()).toBe(true);

    const button = component
      .find(`#listing_${savedListing.id}_button`)
      .hostNodes();
    expect(button.exists()).toBe(true);
    button.simulate("click");
    expect(removeMockFn.mock.calls.length).toEqual(1);
    expect(saveMockFn.mock.calls.length).toEqual(0);
  });

  // Same as above but for available listings flow

  it("should render an available version of the listing card", () => {
    component = mount(
      <ListingsContext.Provider value={{ ...testProvider }}>
        <ListingCard listing={availableListing} />
      </ListingsContext.Provider>
    );

    expect(component.exists()).toBe(true);
    expect(component.find(`#listing_${availableListing.id}`).exists()).toBe(
      true
    );
  });

  it("should call the save function on button click", async () => {
    const saveMockFn = jest.fn();
    const removeMockFn = jest.fn();

    component = mount(
      <ListingsContext.Provider
        value={{
          ...testProvider,
          removeFromSaved: removeMockFn,
          saveListing: saveMockFn,
        }}
      >
        <ListingCard listing={availableListing} />
      </ListingsContext.Provider>
    );

    expect(component.exists()).toBe(true);
    expect(component.find(`#listing_${availableListing.id}`).exists()).toBe(
      true
    );

    const button = component
      .find(`#listing_${availableListing.id}_button`)
      .hostNodes();
    expect(button.exists()).toBe(true);

    button.simulate("click");
    expect(removeMockFn.mock.calls.length).toEqual(0);
    expect(saveMockFn.mock.calls.length).toEqual(1);
  });
});
