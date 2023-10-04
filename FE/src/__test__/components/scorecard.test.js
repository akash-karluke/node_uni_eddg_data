import Scorecard from "@/pages/scorecard";
import { render, screen } from "@testing-library/react";

test("renders the Scorecard component", () => {
  render(<Scorecard />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Scorecard Page"
  );
});

// Other tests...
