import { useAppSelector } from "@/helper/hooks";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function UserDetails({ type }: { type: string }) {
  const { user, status, error } = useAppSelector((state) => state.user);
  // console.log({ user });
  if (status == "failed") {
    return <>{error}</>;
  }
  return (
    <span className="user-detailed-panel">
      {user.avatarUrl ? (
        <Image width={30} height={30} src={user.avatarUrl} alt="" />
      ) : (
        <UserOutlined />
      )}

      {status == "succeeded" ? (
        <>
          <div>
            {type === "full" ? (
              <div className="user-name">
                {user?.displayName?.split(" ")[0]}
              </div>
            ) : (
              <span className="user-name">{user?.displayName}</span>
            )}
            <small className="user-role">{user.profile}</small>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </span>
  );
}
