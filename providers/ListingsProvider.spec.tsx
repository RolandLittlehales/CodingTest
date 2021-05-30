import { configure, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import jsdom from "jsdom";
import React from "react";
import ListingsProvider from "./ListingsProvider";

configure({ adapter: new Adapter() });

const doc = new jsdom.JSDOM("<!doctype html><html><body></body></html>");
/* quick hack to ignore ts errors */
global.document = doc as any;
global.window = (doc as any).defaultView;
// const providerValue: IListingsContext = {
//   savedListings: [],
//   availableListings: [],
//   listingSearchLoading: false,
//   searchListings: () => null,
//   saveListing: () => null,
//   removeFromSaved: () => null,
// };

describe("ListingsProvider", () => {
  let component: ReactWrapper | ShallowWrapper;

  // Cleanup mock
  afterEach(() => {
    if (component && component.unmount && component.exists())
      component.unmount();
  });

  it("should init the children without issue", () => {
    component = shallow(
      <ListingsProvider>
        <div id="test" />
      </ListingsProvider>
    );

    expect(component.find("#test").exists()).toBe(true);
  });
});
