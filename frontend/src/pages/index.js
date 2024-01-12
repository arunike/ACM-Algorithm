import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import {useEffect} from "react";
import AuthenticationCheck from "../CustomGlobalFunction/AuthenticationCheck";

const Dashboard = () => {

  // add a hook, see if user is authenticated
  // if not, redirect to login page
    useEffect(() => {
      AuthenticationCheck();
  }, []);

  return (
      <ApexChartWrapper>
      </ApexChartWrapper>
    )
}

export default Dashboard
