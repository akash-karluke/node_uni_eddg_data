import { makeCamelCase } from "@/helper/helperFunc";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Paragraph } = Typography;

interface CardProps {
  color: string;
  title: string;
  desc: string;
  href?: string;
}
export default function ColorCard({ color, title, desc, href }: CardProps) {
  return (
    <>
      <div
        className="color-card"
        style={{ background: color, textAlign: "left" }}
      >
        <Image
          src={`/icons/${makeCamelCase(title)}.svg`}
          alt={title}
          width={48}
          height={48}
          className="card-icon"
        />
        <h3>{title}</h3>
        <Paragraph
          className="desc d-sm-none"
          ellipsis={{ rows: 3, tooltip: { title: desc, trigger: "hover" } }}
        >
          {desc}
        </Paragraph>

        <BottomDetails href={href || makeCamelCase(title)} />
      </div>
    </>
  );
}

export function BottomDetails({ href, style }: { href: string; style?: {} }) {
  return (
    <div className="bottom-details d-sm-none" style={style}>
      <Link href={href ? href : "/"}>
        Click here to see Details
        <Image src="/icons/landing-info.svg" alt="i" width={20} height={20} />
      </Link>
    </div>
  );
}
