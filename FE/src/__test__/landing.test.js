import Page from "@/pages/index";
import store from "@/store/store";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

describe("Test Home", () => {
  it("Render Homepage", () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
  });
});
