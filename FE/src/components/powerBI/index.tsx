import { BASE_URL } from "@/helper/Constants";
import { useAppSelector } from "@/helper/hooks";
import { Col, Row } from "antd";
import * as pbi from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import { useEffect, useState } from "react";
import ApiBase from "../api/Apibase";

export default function ReportEmbed({ url }: { url: string }): JSX.Element {
  const [reportData, setReportData] = useState<any>({});
  const [isLoding, setLoading] = useState<Boolean>(false);
  const { selectedSettings } = useAppSelector((store) => store.settings);
  const selectedCountry = selectedSettings.Country?.CountryName;

  useEffect(() => {
    setLoading(true);
    ApiBase.get(`${BASE_URL}powerBI/accessToken/${url}`)
      .then((res) => {
        res.status == 200 && setReportData(res.data.data);
        setLoading(false);
      })
      .catch((res: any) => {
        setReportData(res.response.data);
        setLoading(false);
      });

    return () => {
      setReportData({});
    };
  }, [url]);

  async function setCountryToSlicer() {
    if (url === "executiveSummary") return false;
    const report = (window as any)?.report;

    try {
      const pages = await report.getPages();
      const activePage = pages.find((page: any) => page.isActive);
      const visuals = await activePage.getVisuals();

      const slicersVisuals = visuals.filter(
        (visual: any) => visual.type === "slicer"
      );
      // console.log("slicersVisuals", slicersVisuals);

      const slicerPromises = slicersVisuals.map(async (slicer: any) => {
        const res = await slicer.getSlicerState();
        if (res.targets[0].column === "Country") {
          return { target: res.targets[0], name: slicer.name };
        }
        return null;
      });

      const resolvedPromises = await Promise.all(slicerPromises);
      const countrySlicerObj = resolvedPromises.find(
        (target) => target !== null
      );
      // console.log("countrySlicer", countrySlicerObj);

      if (countrySlicerObj) {
        const filters = [
          {
            $schema: "http://powerbi.com/product/schema#basic",
            filterType: 1,
            operator: "In",
            requireSingleSelection: false,
            target: countrySlicerObj.target,
            values: [selectedCountry],
          },
        ];

        const countrySlicer = slicersVisuals.find(
          (visual: any) => visual.name === countrySlicerObj.name
        );

        await countrySlicer.setSlicerState({ filters });
      } else {
        console.error("No country slicer found");
      }
    } catch (error) {
      console.log("Error in setting slicer:", error);
    }
  }

  return (
    <div className="powerbi-component" style={{ marginTop: "1.5px" }}>
      {isLoding ? (
        <Row justify="center">
          <Col>
            <h5 style={{ padding: "2rem 0rem" }}>Configuring...</h5>
          </Col>
        </Row>
      ) : reportData.token ? (
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual and qna
            id: reportData.data.reportId,
            embedUrl: reportData.data.embedURL,
            accessToken: reportData.token,
            tokenType: pbi.models.TokenType.Embed,
            permissions: pbi.models.Permissions.All,
            viewMode: pbi.models.ViewMode.View,
            settings: {
              panes: {
                filters: {
                  expanded: true,
                  visible: true,
                },
              },
              background: pbi.models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              ["loaded", setCountryToSlicer],
              [
                "rendered",
                function () {
                  // console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event: any) {
                  console.log(event.detail);
                },
              ],
            ])
          }
          cssClassName={"Embed-container"}
          getEmbeddedComponent={(embeddedReport) => {
            (window as any).report = embeddedReport;
          }}
        />
      ) : (
        <Row justify="center">
          <Col>
            <h5 style={{ color: "red", padding: "2rem 0rem" }}>
              {reportData.message}
            </h5>
          </Col>
        </Row>
      )}
    </div>
  );
}
