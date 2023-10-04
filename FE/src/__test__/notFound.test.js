import { render, screen } from "@testing-library/react";
import NotFound from "../pages/404";

test("renders the NotFound component", () => {
  render(<NotFound />);

  expect(screen.getByText(/404/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Sorry, the page you visited does not exist./i)
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /back to home/i })
  ).toBeInTheDocument();
});

test("renders a link to home page", () => {
  render(<NotFound />);

  // Check if the link to home page is rendered correctly
  const linkElement = screen.getByRole("link", { name: /back to home/i });
  expect(linkElement.getAttribute("href")).toBe("/");
});
