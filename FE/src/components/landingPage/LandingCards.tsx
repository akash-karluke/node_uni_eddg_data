import ColorCard, { BottomDetails } from "@/components/ColorCard";
import variables from "@/styles/variables.module.scss";
import { Col, Row, Typography } from "antd";
import Image from "next/image";

const { Paragraph } = Typography;

export default function LandingCards() {
  return (
    <>
      <Row gutter={16} className="cards">
        <Col lg={6} md={6} sm={24}>
          <div
            className="color-card action"
            style={{ background: variables.primaryColor }}
          >
            <Image
              src="/icons/actions.svg"
              alt="actions"
              width={60}
              height={60}
            />
            <div className="ls-wide d-sm-none">SPOTLIGHT:</div>
            <h1>Actions</h1>
            <Paragraph
              className="desc d-sm-none"
              ellipsis={{
                rows: 3,
                tooltip: {
                  title: "...OOS alerts & Growth Opportunities.",
                  placement: "bottomRight",
                },
              }}
            >
              Recommended priority driven in-store actions to be performed by
              the sales representative(s) for both OOS alerts & Growth
              Opportunities.
            </Paragraph>

            <BottomDetails href="actions" style={{ marginTop: "unset" }} />
          </div>
        </Col>
        <Col lg={6} md={6} sm={24}>
          <div className="double-stack">
            <ColorCard
              color={variables.blueColor}
              title="Executive Summary"
              desc="Global Summary for all EDDGIE countries by category, retailer with the ability to switch between OSA & PICOS metrices."
            />
            <ColorCard
              color={variables.greenColor}
              title="Average OSA Analysis"
              desc="Provides overview of Weighted and Average OSA by BGs and Countries."
            />
          </div>
        </Col>
        <Col lg={6} md={6} sm={24}>
          <div className="double-stack">
            <ColorCard
              color={variables.greenColor}
              title="OOS Deep Dive"
              desc="Identifies leaders-bleeders by stores/categories and includes details of OOS products by ASM-Sales Rep to Store-Category."
            />
            <ColorCard
              color={variables.purpleColor}
              title="PICOS Deep Dive"
              href="picosDeepDive"
              desc="Helps identify PICOS compliance of Sales Representatives at Store-Category level."
            />
          </div>
        </Col>

        <Col lg={6} md={6} sm={24}>
          <div className="double-stack">
            <ColorCard
              color={variables.greenColor}
              title="OSA Deep Dive"
              desc="Detailed analysis of OSA which helps identify All star performer store and Sales Rep along with Root Cause Analysis."
            />
            <ColorCard
              color={variables.pinkColor}
              title="Scorecard"
              desc="A snapshot guide explaining the PICOS compliance by Country-Retailer at category level."
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
