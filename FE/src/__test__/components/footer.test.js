import Footer from "@/components/Footer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Testign Footer", () => {
  it("Render Footer", () => {
    render(<Footer />);
    const textElement = screen.getByText("Glossary");
    expect(textElement).toBeInTheDocument();
  });
});
