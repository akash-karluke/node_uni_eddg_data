import store from "@/store/store";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Actions from "../pages/actions";

describe("Test Home", () => {
  it("Render Homepage", () => {
    <Provider store={store}>
      render(
      <Actions />
      );
    </Provider>;
    // screen.debug();
    // const textElement = screen.getByText("Glossary");
    // expect(textElement).toBeInTheDocument();
  });
});
