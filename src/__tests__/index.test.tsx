import * as React from "react";
import { mount, shallow } from "enzyme";
import {Index} from "../app/Index";
import SearchAppBar from '../components/searchAppBar';
import SearchList from '../components/searchList';
import * as Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import Pagination from 'material-ui-flat-pagination';
enzyme.configure({ adapter: new Adapter() });

describe("serach Page Screen", () => {
  let query;
  let searchBy;
  let indexScreen;
  let loading;
  let highlightedItemList;
  let pageNumber;
  const searchScreen = () => {
    if (!indexScreen) {
        indexScreen = mount(
        <Index  />
      );
    }
    return indexScreen;
  }

  it("always renders a div", () => {
    const divs = searchScreen().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = searchScreen().find("div");

      const wrappingDiv = divs.first();


      expect(wrappingDiv.children()).toEqual(searchScreen().children());
    });
  });

  it("always renders a `SearchAppBar`", () => {
    expect(searchScreen().find(SearchAppBar).length).toBe(1);
  });
  it("always renders a `SearchList`", () => {
    expect(searchScreen().find(SearchList).length).toBe(1);
  });

  it("always renders a `Pagination`", () => {
    expect(searchScreen().find(Pagination).length).toBe(1);
  });

  describe("rendered `SearchAppBar`", () => {
    it("receive six props", () => {
      const searchAppBar = searchScreen().find(SearchAppBar);
      expect(Object.keys(searchAppBar.props()).length).toBe(6);
    });
  });

  describe("rendered `SearchList`", () => {
    it("receive one props", () => {
      const searchList = searchScreen().find(SearchList);
      expect(Object.keys(searchList.props()).length).toBe(1);
    });
  });

  describe("rendered `Pagination`", () => {
    it("receive one props", () => {
      const pagination = searchScreen().find(Pagination);
      expect(Object.keys(pagination.props()).length).toBe(1);
    });
  });



  describe('when `query` is undefined', () => {
    beforeEach(() => {
        query = undefined;
    });

    it("sets the rendered `SearchAppBar`'s `searching` prop to undefined'", () => {
      const searchAppBar = searchScreen().find(SearchAppBar);
      expect(searchAppBar.props().searching).not.toBeDefined();
    });
  });

  describe("when `searchBy` with date is passed", () => {
    beforeEach(() => {
        searchBy = "Date";
    });

    it("sets the rendered `SearchAppBar`'s `searchBy` prop to the same value as `searchBy`", () => {
      const searchAppBar = searchScreen().find("SearchAppBar").first();
      expect(searchAppBar.props().searchBy).toBe(searchBy);
    });
  });

  describe("when `loading`  is passed", () => {
    beforeEach(() => {
        loading = false;
    });

    it("sets the rendered `SearchAppBar`'s `loading` prop to the same value as `loading`", () => {
      const searchAppBar = searchScreen().find("SearchAppBar").first();
      expect(searchAppBar.props().loading).toBe(loading);
    });
  });

  describe("when `highlightedItemList` is passed to SearchList", () => {
    beforeEach(() => {
        highlightedItemList = "Date";
    });

    it("sets the rendered `SearchList`'s `searchFor` prop to the same value as `searchFor`", () => {
      const SearchList = searchScreen().find("SearchList").first();
      expect(SearchList.props().highlightedItemList).toBe(highlightedItemList);
    });
  });

  describe("when `offset` is passed to 'Pagination'", () => {
    beforeEach(() => {
        pageNumber = 1;
    });

    it("sets the rendered `Pagination`'s `offset` prop to the same value as `pageNumber`", () => {
      const pagination = searchScreen().find("Pagination").first();
      expect(pagination.props().offset).toBe(pageNumber);
    });
  });


});