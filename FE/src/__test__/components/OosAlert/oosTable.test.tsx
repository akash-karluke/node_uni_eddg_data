import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import OosAlertTable from "@/components/OosAlert/OosAlertTable";

// Create a mock reducer
const initialState = {
  filters: {
    selectedFilters: {
      countries: [{ Abbreviation: "XYZ" }],
      globalDivisions: [],
      categories: [],
      retailers: [],
      stores: [],
      salesReps: [],
      weeks: [],
    },
    allFilters: {
      countries: [],
      globalDivisions: [],
      categories: [],
      retailers: [],
      stores: [],
      salesReps: [],
      weeks: [],
    },
  },
  user: {
    user: {},
    status: "",
  },
  oosTable: {
    entries: {
      count: 0,
      rows: [
        {
          AGG_PROD_ID: "-1",
          Priority: "Medium",
          StoreID: "-2",
          StoreName: "StoreTest",
          City: "Belgium",
          CategoryID: "234",
          ProductCategory: "SCRATCH COOKING AID",
          OOS: 20,
          LostSalesValue: 648.59,
          "#ActionsRequired": 52,
          RC: "Increase OSA",
          SalesRepID: "2976774710290415075",
          FieldRep: "Francisca  Hernandez",
          LastVisit: null,
          ActionStatus: "In Progress",
        },
      ],
    },
    oosStatus: "",
    oosError: "",
  },
  oosModal: {
    entries: { availability: {}, store: [] },
    modalDataStatus: "",
  },
};

// jest.mock("react-redux", () => ({
//   useDispatch: jest.fn(),
// }));

// Mock useRouter hook
jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {},
    replace: jest.fn(),
  }),
}));

const mockReducer = (state = initialState) => {
  return state;
};

describe("OosAlertTable", () => {
  let store: any;

  beforeEach(() => {
    store = createStore(mockReducer);
  });

  test("renders the table header correctly", () => {
    render(
      <Provider store={store}>
        <OosAlertTable />
      </Provider>
    );

    const tableHeader = screen.getByText("OOS Alerts");
    expect(tableHeader).toBeInTheDocument();
  });

  // test("renders the table with empty data", () => {
  //   render(
  //     <Provider store={store}>
  //       <OosAlertTable />
  //     </Provider>
  //   );

  //   const emptyTableMessage = screen.getByText("No Data");
  //   expect(emptyTableMessage).toBeInTheDocument();
  // });

  // test('opens the modal on "Take Action" button click', () => {
  //   const dispatch = jest.fn();
  //   // useDispatch.mockReturnValue(dispatch);

  //   render(
  //     <Provider store={store}>
  //       <OosAlertTable />
  //     </Provider>
  //   );

  //   const takeActionButton = screen.getByRole("button", {
  //     name: "Take Action",
  //   });
  //   fireEvent.click(takeActionButton);

  //   const modalTitle = screen.getByText("OOS Alert Modal");
  //   expect(modalTitle).toBeInTheDocument();
  // });
});
