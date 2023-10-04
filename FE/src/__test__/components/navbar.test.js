import Navbar from "@/components/Navbar";
import store from "@/store/store";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

const renderWithRedux = (component) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    asPath: "/",
  }),
}));

describe("Navbar", () => {
  it("navigates to home page when logo is clicked", () => {
    // const pushMock = jest.fn();
    // const useRouterMock = jest.spyOn(require("next/router"), "useRouter");
    // useRouterMock.mockImplementation(() => ({
    //   push: pushMock,
    //   asPath: "/",
    // }));

    const { getByAltText } = renderWithRedux(<Navbar />);
    const logo = getByAltText("Eddgie");
    fireEvent.click(logo);

    expect(pushMock).toHaveBeenCalledWith("/");
    useRouterMock.mockRestore();
  });

  it("toggles mobile view on menu icon click", () => {
    const { getByAltText, getByTestId } = renderWithRedux(<Navbar />);
    const menuIcon = getByAltText("navbar icon");
    fireEvent.click(menuIcon);

    const mobileNavbar = getByTestId("mobile-navbar");
    expect(mobileNavbar).toBeInTheDocument();

    fireEvent.click(menuIcon);
    expect(mobileNavbar).not.toBeInTheDocument();
  });

  // Add more tests as needed...
});
