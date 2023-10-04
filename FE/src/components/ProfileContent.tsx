import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import { clearAllFilters } from "@/reducers/filters/filterSlice";
import { clearUser, fetchUser } from "@/reducers/userSlice";
import Router from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import getAuthToken from "./api/getToken";

export default function ProfileContent() {
  const { status, tokenExpiry } = useAppSelector((store: any) => store.user);

  const dispatch = useAppDispatch();

  if (status === "failed") {
    dispatch(clearAllFilters());
    Router.push("/notAuthorized");
  }

  useEffect(() => {
    let userResetTimer = setTimeout(() => {
      console.log("Stuck in pending, clearing user!");
      dispatch(clearUser());
      dispatch(clearAllFilters());
    }, 10000);
    if (status !== "pending") {
      clearTimeout(userResetTimer);
    }
    if (
      tokenExpiry < new Date().getTime() &&
      !["succeeded", "pending"].includes(status)
    ) {
      // console.log({ user, status, tokenExpiry: new Date(tokenExpiry) });
      getAuthToken()
        .then((token) => {
          dispatch(fetchUser(token)).then(() => {
            if (status === "succeeded") {
              toast.success("User Signed-in successfully!", {
                autoClose: 2000,
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      clearTimeout(userResetTimer);
    };
  }, [status, tokenExpiry, dispatch]);

  return <></>;
}
