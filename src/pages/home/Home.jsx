import React from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import { useMemo } from 'react';
import { useEffect } from 'react';
import { userRequest} from '../../requestMethods'
import { useState } from 'react';
import './home.css'
export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const MONTHS  = useMemo(
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
      "Dec"
    ],
    []
  )
      
  useEffect(() => {
    const getStats = async () => {
        try{
          const res = await userRequest.get('/users/stats')
          res.data.map(item => 
            setUserStats(prev => [
              ...prev,
              {name:MONTHS[item._id - 1], "Active User" : item.total},
            ])
          )
        }catch{}
        
    }
    getStats();
  },[]);
  return (
    <div className='home'>
     <FeaturedInfo/>
     <Chart data={userStats}  title="User Analytics" datakey="Active User" grid />
     <div className="homeWidgets">
      <WidgetSm/>
      <WidgetLg/>
     </div>
    </div>
  )
}
