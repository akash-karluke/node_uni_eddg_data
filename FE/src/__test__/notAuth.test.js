import { clearUser } from "@/reducers/userSlice";
import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import NotAuthorized from "../pages/NotAuthorized";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("next/router", () => ({
  __esModule: true,
  Router: jest.fn(),
  default: {
    push: jest.fn(),
  },
}));

describe("NotAuthorized", () => {
  beforeEach(() => {
    useDispatch.mockClear();
    Router.mockClear();
  });

  test("renders the component", () => {
    render(<NotAuthorized />);

    expect(
      screen.getByText("You do not have access! Try reload by clicking")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please try with different account")
    ).toBeInTheDocument();
  });

  test('dispatches clearUser action and redirects to "/" on reset click', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(<NotAuthorized />);

    fireEvent.click(screen.getByText("reload"));

    expect(dispatch).toHaveBeenCalledWith(clearUser());
  });
});
