import ApiBase from "../Apibase";

export const fetchDashboardDetails = () => {
  return ApiBase.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}dashboard/`).then(
    (res) => res.data
  );
};
