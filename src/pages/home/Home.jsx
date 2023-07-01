import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./home.css";
import {
  _getCreatedUsersStats,
  __updateUserRequestHeaders,
  userRequest,
} from "../../utils/requestTokenUtils";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const adminToken = useSelector((state) => state.user.currentUser.accessToken);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    if (adminToken) {
      __updateUserRequestHeaders(adminToken);
      _getCreatedUsersStats().then((data) =>
        data?.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        )
      );
    }
  }, [adminToken]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        datakey="Active User"
        grid
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
