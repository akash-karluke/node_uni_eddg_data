import LandingIntro from "@/components/landingPage/LandingIntro";
import store from "@/store/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

test("renders the LandingIntro component with user name", () => {
  const user = {
    displayName: "John Doe",
  };

  render(
    <Provider store={store}>
      <LandingIntro user={user} />
    </Provider>
  );

  // Check if the user name is rendered correctly
  expect(screen.getByText(/Welcome, John!/i)).toBeInTheDocument();
});

test("renders the LandingIntro component without user name", () => {
  render(
    <Provider store={store}>
      <LandingIntro user={null} />
    </Provider>
  );

  // Check if the default welcome message is rendered correctly
  expect(screen.getByText(/Welcome, !/i)).toBeInTheDocument();
});

test("renders the LandingFilter component", () => {
  render(
    <Provider store={store}>
      <LandingIntro user={null} />
    </Provider>
  );

  // Check if the LandingFilter component is rendered
  expect(
    screen.getByRole("heading", { name: /settings/i })
  ).toBeInTheDocument();
});
