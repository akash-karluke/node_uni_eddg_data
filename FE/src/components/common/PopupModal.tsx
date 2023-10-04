import React, { ReactNode, useState } from "react";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { Button, Modal, Row, Skeleton } from "antd";
import DownloadBtn from "./DownloadBtn";
import IconedButton from "./IconedButton";

export interface ModalProps {
  open: boolean;
  handleOk: any;
  handleCancel: any;
  loading: boolean;
  centered?: boolean;
  btnDisabled?: boolean;
  title: string;
  children: ReactNode;
}

export default function PopupModal({
  open,
  handleOk,
  handleCancel,
  loading,
  centered = true,
  btnDisabled,
  title,
  children,
}: ModalProps) {
  return (
    <>
      <Modal
        open={open}
        onCancel={handleCancel}
        width="90%"
        centered={centered}
        closable={false}
        bodyStyle={{ borderRadius: 0 }}
        className="modal-content"
        modalRender={(modal) => (
          <>
            <div id="popup-modal">
              <Row
                justify="space-between"
                align="middle"
                className="modal-header"
              >
                {title || "Title"}
                <a
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                    pointerEvents: "all",
                    padding: "0.5rem 1rem",
                  }}
                  onClick={handleCancel}
                >
                  <CloseOutlined />
                </a>
              </Row>
              <div className="modal-body">{modal}</div>
            </div>
          </>
        )}
        footer={[
          <IconedButton
            key="submit"
            text="Submit"
            onClick={handleOk}
            disabled={btnDisabled}
            icon={<CheckOutlined />}
          />,
        ]}
      >
        <Skeleton active loading={loading}>
          {children}
        </Skeleton>
      </Modal>
    </>
  );
}
