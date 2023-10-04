import Card, { BottomDetails } from "@/components/ColorCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { makeCamelCase } from "../../helper/helperFunc";

jest.mock("../../helper/helperFunc", () => ({
  makeCamelCase: jest.fn(),
}));

describe("Testign Footer", () => {
  it("Render Footer", () => {
    makeCamelCase.mockReturnValueOnce("mockedValue");
    render(<Card title="Card Title" />);
    // screen.debug();
    const textElement = screen.getByText("Card Title");
    expect(textElement).toBeInTheDocument();
  });
  it("renders Bottom Details", () => {
    render(<BottomDetails />);
    const textElement = screen.getByText("Click here to see Details");
    expect(textElement).toBeInTheDocument();
  });
});
