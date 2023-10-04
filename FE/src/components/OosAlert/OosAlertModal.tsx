import { BASE_URL, OOS_TABLE_ACTION_STATUS } from "@/helper/Constants";
import { numberFormat } from "@/helper/helperFunc";
import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import {
  clearOosModalData,
  getModalData,
} from "@/reducers/oosTable/oosModalSlice";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Divider,
  Modal,
  Progress,
  Row,
  Space,
  Typography,
} from "antd";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PopupModal from "../common/PopupModal";
import CustomSelect from "../common/select";
import MultiselectTable from "./ModalTable";

const { Text, Title } = Typography;

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  modalData: any;
}

export default function OosAlertModal({
  isModalOpen,
  setIsModalOpen,
  modalData,
}: ModalProps) {
  // console.log({ isModalOpen, setIsModalOpen, modalData });
  const {
    entries: { availability, store },
    modalDataStatus,
  } = useAppSelector((store) => store.oosModal);
  // const availability = {};
  // const store = [];

  const [updatedData, setUpdatedData] = useState({
    availability: "",
    store: [],
  });
  const dispatch = useAppDispatch();

  const availableRecords = store.filter((x) => x.AvailabilityStatus === 1);
  const noOfAvail = availableRecords.length;
  const noOfUnavailable = store.length - availableRecords.length;

  const handleOk = () => {
    const confirmModal = Modal.confirm({
      content: (
        <h3 style={{ textAlign: "center" }}>Would you like to save changes?</h3>
      ),
      centered: true,
      closable: true,
      icon: null,
      className: "confirm-modal",
      width: "37%",
      footer: [
        <Row
          justify="center"
          key="buttons"
          style={{ marginTop: "1rem", gap: "1.5rem" }}
        >
          <Button
            size="large"
            key="Discard"
            onClick={() => {
              confirmModal.destroy();
              handleCancel();
            }}
          >
            Discard
          </Button>

          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#893ca9",
                colorText: "#fff",
              },
            }}
          >
            <Button type="primary" size="large" key="Save" onClick={updateData}>
              Save
            </Button>
          </ConfigProvider>
        </Row>,
      ],
      onCancel: () => confirmModal.destroy(),
    });

    function updateData() {
      axios
        .put(`${BASE_URL}action/oosAlert/store`, {
          Abbreviation: modalData.countryAbb,
          store: updatedData.store,
          availability: {
            AGG_PROD_ID: modalData.AGG_PROD_ID,
            ActionStatus: updatedData.availability,
          },
        })
        .then((data) => {
          // console.log(data.data);
          if (data.data.status) {
            toast.success("Data Saved successfully");
            confirmModal.destroy();
            handleCancel();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("failed to save the records!");
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdatedData({ availability: "", store: [] });
    dispatch(clearOosModalData());
  };

  const handleAvailabilityChange = (value: string) => {
    setUpdatedData((prev) => ({ ...prev, availability: value }));
  };

  useEffect(() => {
    modalData &&
      dispatch(
        getModalData({
          Abbreviation: modalData.countryAbb,
          end_week: modalData.end_week,
          params: {
            SalesRepID: modalData.SalesRepID,
            StoreID: modalData.StoreID,
            CategoryID: modalData.CategoryID,
          },
        })
      );
    return () => {
      dispatch(clearOosModalData());
    };
    // eslint-disable-next-line
  }, [modalData]);

  if (modalDataStatus === "failed") {
    toast.error("Failed to fetch Modal data", {
      toastId: "failed",
    });
    dispatch(clearOosModalData());

    return <>Failed to fetch Modal data</>;
  }

  return (
    <>
      <PopupModal
        open={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        loading={modalDataStatus === "pending"}
        title={modalData.StoreName}
        btnDisabled={
          updatedData.availability === "" && updatedData.store.length === 0
        }
      >
        <div className="oosModal">
          <Title level={5}>Increase OSA</Title>
          <Divider className="small" />
          <Row justify="space-between">
            <Space>
              <Text type="secondary">Assigned To:</Text>
              {modalData.avatarUrl ? (
                <Image
                  width={20}
                  height={20}
                  src={modalData.avatarUrl}
                  alt="user-icon"
                />
              ) : (
                <UserOutlined />
              )}
              <Text strong>{modalData.FieldRep || "NA"}</Text>
            </Space>
            <Space>
              <Image
                width={20}
                height={20}
                src="/icons/access_time.svg"
                alt="clock-icon"
              />
              <Text type="secondary">Due Date:</Text>
              <Text strong>{availability.Due_date}</Text>
            </Space>
            <Space>
              <Text type="secondary">Status:</Text>
              <div
                className="filters-dropdown"
                style={{ paddingBottom: 0, minWidth: "250px" }}
              >
                <CustomSelect
                  items={OOS_TABLE_ACTION_STATUS}
                  defaultVal={availability.ActionStatus}
                  handleChange={handleAvailabilityChange}
                />
              </div>
            </Space>
          </Row>

          <Divider className="small" />

          <Space.Compact block>
            <Space style={{ width: "20%", minWidth: 200 }}>
              <Text type="secondary">Total Core SKUs:</Text>
              <Text strong>{store.length}</Text>
            </Space>

            <Space style={{ width: "20%", minWidth: 200 }}>
              <Image
                width={20}
                height={20}
                src="/icons/green_checksvg.svg"
                alt="check-icon"
              />
              <Text type="secondary"># of Available:</Text>
              <Text strong>{noOfAvail}</Text>
            </Space>

            <Space style={{ width: "20%", minWidth: 200 }} align="center">
              <Image
                width={20}
                height={20}
                src="/icons/gray_close_circle.svg"
                alt="close-icon"
              />
              <Text type="secondary"># of Unavailable:</Text>
              <Text strong>{noOfUnavailable}</Text>
            </Space>

            <Space style={{ width: "40%" }} direction="vertical" size={0}>
              {modalDataStatus === "succeeded" ? (
                <>
                  <Space size={20}>
                    <Text type="secondary">Current OSA</Text>
                    {availability.OSAPercentage && (
                      <Text strong>
                        {numberFormat(availability.OSAPercentage)}%
                      </Text>
                    )}
                  </Space>
                  <Row style={{ width: "100%" }}>
                    {availability.OSAPercentage && (
                      <Progress
                        percent={+availability.OSAPercentage}
                        showInfo={false}
                        strokeColor="#8fcaeb"
                        strokeLinecap="butt"
                      />
                    )}
                  </Row>
                </>
              ) : (
                "NA"
              )}
            </Space>
          </Space.Compact>

          <MultiselectTable
            store={store}
            updatedData={updatedData}
            setUpdatedData={setUpdatedData}
          />
        </div>
      </PopupModal>
    </>
  );
}
