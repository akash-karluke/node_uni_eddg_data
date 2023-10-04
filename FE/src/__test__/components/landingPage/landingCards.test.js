import { render, screen } from "@testing-library/react";
import LandingCards from "../../../components/landingPage/LandingCards";

describe("Test Landing Cards Component", () => {
  test("renders the LandingCards component", () => {
    render(<LandingCards />);

    // Check if the color cards are rendered correctly
    expect(screen.getByText(/Actions/i)).toBeInTheDocument();
    expect(screen.getByText(/Average OSA Analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/Management View/i)).toBeInTheDocument();
    expect(screen.getByText(/Executive Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/OOS Deep Dive/i)).toBeInTheDocument();
    expect(screen.getByText(/OSA Deep Dive/i)).toBeInTheDocument();
    expect(screen.getByText(/Scorecard/i)).toBeInTheDocument();
  });

  test("renders the correct number of color cards", () => {
    render(<LandingCards />);
    // screen.debug();

    const ActionColorCards = screen.getAllByRole("heading", { level: 1 });
    const restOfColorCards = screen.getAllByRole("heading", { level: 3 });

    expect(ActionColorCards.length).toBe(1);
    expect(restOfColorCards.length).toBe(6);
  });
});
