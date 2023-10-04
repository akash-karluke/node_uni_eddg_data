import { Layout } from "antd";
import MainFooter from "./Footer";
import Navbar from "./Navbar";

const { Content } = Layout;

export const PageLayout = (props: any) => {
  return (
    <Layout className="layout">
      <Navbar />
      <Content>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <MainFooter />
    </Layout>
  );
};
