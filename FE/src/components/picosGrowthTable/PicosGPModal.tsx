import { BASE_URL, PICOS_TABLE_ACTION_STATUS } from "@/helper/Constants";
import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import {
  clearPicosModalData,
  getModalData,
} from "@/reducers/picosTable/picosModalSlice";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Divider,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApiBase from "../api/Apibase";
import PopupModal from "../common/PopupModal";
import CustomSelect from "../common/select";
import MultiselectTable from "./ModalTable";

const { Text, Title } = Typography;

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  modalData: any;
}

export default function PicosGPModal({
  isModalOpen,
  setIsModalOpen,
  modalData,
}: ModalProps) {
  const {
    entries: { availability, store, count, banners },
    modalDataStatus,
  } = useAppSelector((store) => store.picosModal);

  const [updatedData, setUpdatedData] = useState({
    availabilityStatus: "",
  });
  const dispatch = useAppDispatch();

  // console.log({ modalData });

  const Country = modalData && modalData.country,
    Sales_Rep = modalData && modalData["Sales Representative"],
    Store_Name = modalData && modalData["StoreName"],
    StoreID = modalData && modalData["StoreID"],
    Store_Code = modalData && modalData["StoreCode"]?.toString(),
    Category = modalData && modalData.Category,
    kpiName = modalData && modalData["TopKPI"],
    captureDate = modalData && modalData.VisitDate,
    end_week = modalData && modalData.end_week,
    Visit_Date = modalData && modalData["VisitDate_ID"],
    SalesRepID = modalData && modalData.SalesRepID;

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
          key="confirmBtn"
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
      ApiBase.put(`${BASE_URL}action/picos/store`, {
        Country,
        end_week: Visit_Date,
        kpiName,
        params: {
          StoreID,
          Category,
          SalesRepID,
          Status: updatedData.availabilityStatus,
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
    setUpdatedData({ availabilityStatus: "" });
    dispatch(clearPicosModalData());
  };

  const handleAvailabilityChange = (value: string) => {
    setUpdatedData({ availabilityStatus: value });
  };

  useEffect(() => {
    if (modalData && end_week) {
      dispatch(
        getModalData({
          Country,
          end_week: Visit_Date,
          kpiName,
          params: {
            StoreID,
            Category,
            SalesRepID,
          },
        })
      );
    }
    return () => {
      dispatch(clearPicosModalData());
    };
    // eslint-disable-next-line
  }, [modalData]);

  return (
    <>
      <PopupModal
        open={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        centered={true}
        loading={modalDataStatus === "pending"}
        title={Store_Code + "_" + Store_Name}
        btnDisabled={updatedData.availabilityStatus === ""}
      >
        <div className="oosModal">
          <>
            <Title level={5}>Cabinet</Title>
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
                <Text strong>{Sales_Rep || "NA"}</Text>
              </Space>
              <Space>
                <Image
                  width={20}
                  height={20}
                  src="/icons/access_time.svg"
                  alt="clock-icon"
                />
                <Text type="secondary">Due Date:</Text>
                <Text strong>
                  {moment(modalData["NextPlannedVisit"]).format("DD/MM/YYYY") ||
                    "NA"}
                </Text>
              </Space>
              <Space>
                <Text type="secondary">Status:</Text>
                <div
                  className="filters-dropdown"
                  style={{ paddingBottom: 0, minWidth: "250px" }}
                >
                  <CustomSelect
                    items={PICOS_TABLE_ACTION_STATUS}
                    defaultVal={modalData["ActionStatus"]}
                    handleChange={handleAvailabilityChange}
                  />
                </div>
              </Space>
            </Row>
            <Divider className="small" />
            <Typography.Text style={{ fontWeight: "bold" }}>
              Photos taken:
            </Typography.Text>
            <Space.Compact block style={{ alignItems: "start" }}>
              <Space
                style={{
                  width: "37%",
                  overflow: "auto",
                  justifyContent: banners?.length ? "space-between" : "center",
                  height: 300,
                  marginRight: "2rem",
                }}
                wrap={true}
                size={6}
                align="center"
              >
                {banners?.length ? (
                  banners.map((img) => (
                    <Image
                      key={img.URL}
                      src={img.URL}
                      width={250}
                      height={280}
                      alt="store-img"
                    />
                  ))
                ) : (
                  <span>No Images found</span>
                )}
              </Space>
              <Space
                direction="vertical"
                style={{ width: "60%", marginTop: "-1rem" }}
              >
                {[
                  "Core OSA",
                  "Full OSA",
                  "Price Communication",
                  "NPD OSA",
                ].includes(kpiName) && (
                  <Row style={{ gap: "1rem 3rem" }}>
                    <Space>
                      <Text type="secondary">Total SKUs:</Text>
                      <Text strong>{count}</Text>
                    </Space>

                    <Space>
                      <Image
                        width={20}
                        height={20}
                        src="/icons/green_checksvg.svg"
                        alt="check-icon"
                      />
                      <Text type="secondary"># of Available:</Text>
                      <Text strong>{availability.Available || 0}</Text>
                    </Space>

                    <Space align="center">
                      <Image
                        width={20}
                        height={20}
                        src="/icons/gray_close_circle.svg"
                        alt="close-icon"
                      />
                      <Text type="secondary"># of Unavailable:</Text>
                      <Text strong>{availability.Unavailable || 0}</Text>
                    </Space>
                  </Row>
                )}

                <MultiselectTable store={store} kpiName={kpiName} />
              </Space>
            </Space.Compact>
            <Space style={{ marginTop: ".1rem" }}>
              <Text type="secondary">Captured Day:</Text>
              <Text strong>
                {moment(captureDate).format("DD/MM/YYYY") || "NA"}
              </Text>
            </Space>
          </>
        </div>
      </PopupModal>
    </>
  );
}
