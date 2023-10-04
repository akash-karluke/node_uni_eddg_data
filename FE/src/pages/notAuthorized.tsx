import { SignOutButton } from "@/components/SignOutButton";
import Router from "next/router";
import { useAppDispatch } from "@/helper/hooks";
import { clearUser } from "@/reducers/userSlice";
import { Typography } from "antd";

export default function NotAuthorized() {
  const dispatch = useAppDispatch();

  function handleReset() {
    dispatch(clearUser());
    Router.push("/");
  }

  return (
    <div
      style={{
        padding: "8rem",
        width: "75%",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Typography.Title level={4}>
        <span>You do not have access! Try reload by clicking</span>
        <a onClick={handleReset} style={{ color: "blue", margin: ".5rem" }}>
          reload
        </a>
        {/*(Automatically trying in 10 seconds) */}
      </Typography.Title>
      <Typography.Title level={5}>OR</Typography.Title>
      <Typography.Title level={4}>
        <span>Please try with different account</span>
      </Typography.Title>
      <div
        style={{
          width: "30%",
          margin: "1rem auto",
          display: "flex",
          gap: "2rem",
        }}
      >
        <SignOutButton type="button" />
      </div>
    </div>
  );
}
