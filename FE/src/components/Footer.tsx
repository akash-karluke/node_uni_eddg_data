import { Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const { Footer } = Layout;

export default function MainFooter() {
  return (
    <Footer className="main-footer">
      <Image
        alt="unilever logo"
        src="\icons\Logo-UL.svg"
        // onClick={handleRedirect}
        width={45}
        height={50}
        className="footer_logo"
      />
      <div className="footer-menu">
        <Link href="glossary">Glossary</Link>
        <Link href="feedback">Feedback</Link>
        <Link
          href="#"
          onClick={() => {
            toast.warning("Coming Soon!");
          }}
        >
          Contact Details
        </Link>
      </div>
    </Footer>
  );
}
