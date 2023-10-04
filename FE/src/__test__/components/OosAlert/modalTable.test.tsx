import { render } from "@testing-library/react";
import MultiselectTable from "../../../components/OosAlert/ModalTable";

describe("Oos MultiselectTable", () => {
  const mockData = [
    {
      key: 1,
      ProductID: "1",
      core_sku_EAN: "EAN1",
      core_sku_description: "Description 1",
      AvailabilityStatus: 1,
      RootCause: "Root Cause 1",
    },
    {
      key: 2,
      ProductID: "2",
      core_sku_EAN: "EAN2",
      core_sku_description: "Description 2",
      AvailabilityStatus: 0,
      RootCause: "Root Cause 2",
    },
  ];

  const mockSetUpdatedData = jest.fn();

  it("renders the table with correct data", () => {
    const { getByText } = render(
      <MultiselectTable
        store={mockData}
        updatedData={[]}
        setUpdatedData={mockSetUpdatedData}
      />
    );

    expect(getByText("EAN1")).toBeInTheDocument();
    expect(getByText("EAN2")).toBeInTheDocument();
    expect(getByText("Description 1")).toBeInTheDocument();
    expect(getByText("Description 2")).toBeInTheDocument();
  });
});
