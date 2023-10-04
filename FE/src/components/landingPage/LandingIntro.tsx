import { Col, Row } from "antd";
import LandingFilter from "./LandingFilter";

export default function LandingIntro({ user }: { user: any }) {
  return (
    <Row className="intro mb10">
      <Col lg={14} sm={24}>
        <div className="muted ls-wide d-sm-none">
          Everyday Data Driven Great Integrated Execution
        </div>
        <h1 className="title text-primary">
          <>Welcome, {user?.displayName?.split(" ")[0]}!</>
        </h1>
        <small className="desc d-sm-none">
          EDDGIE is a future-fit Execution model that applies data and analytics
          to accelerate growth by identifying and focusing on stores and actions
          with the biggest growth potential at competitive costs, unlocking
          Fuel4Growth. It identifies, prioritizes and address actions to deliver
          the highest growth opportunities through store-level EPOS data and
          Image Recognition technology.
        </small>
      </Col>
      <Col lg={10} sm={24}>
        <h3 className="muted">Settings</h3>
        <LandingFilter />
      </Col>
    </Row>
  );
}
