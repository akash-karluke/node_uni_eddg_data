import { Button, ConfigProvider, Divider, Space, Tooltip } from "antd";
import { ArrowDownOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import IconedButton from "./IconedButton";
import useGetSelectedFilters from "./useGetSelectedFilters";
import Image from "next/image";

export default function DownloadBtn({
  payload,
  url,
  title,
  disabled,
}: {
  title: string;
  url: string;
  payload: any;
  disabled?: boolean;
}) {
  const [isDownloading, SetIsDownloading] = useState(false);

  const downlaodData = async () => {
    SetIsDownloading(true);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + url,
        {
          ...payload,
        },
        { responseType: "arraybuffer" },
      );

      if (res.status === 200) {
        const fileName = `${title}_${
          payload.Abbreviation || payload.Country.toString() || "new"
        }_${payload.end_week ? payload.end_week : "sheet"}.csv`;
        const data = res.data;
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      } else if (res.status === 204) {
        toast.info("No data available");
      } else {
        toast.error("Failed While Dowloading Data!");
      }
      SetIsDownloading(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed While Dowloading Data!");
      SetIsDownloading(false);
    }
  };
  return (
    <span style={{ position: "relative", marginRight: "1rem" }}>
      <IconedButton
        text="Download"
        icon={<ArrowDownOutlined />}
        color="#9c44c0"
        loading={isDownloading}
        disabled={disabled || isDownloading}
        onClick={() => downlaodData()}
      />
      <ConfigProvider
        theme={{
          token: {
            // colorText: "rgba(0, 0, 0, 0.88)",
            fontSize: 10,
            colorTextLightSolid: "rgba(0, 0, 0, 0.88)",
          },
        }}
      >
        <Tooltip
          placement="leftBottom"
          color="#fff"
          title="Download feature to be at the lowest level"
        >
          <Image
            src="/icons/info.svg"
            alt="i"
            width={17}
            height={17}
            className="download-info"
          />
        </Tooltip>
      </ConfigProvider>
    </span>
  );
}
