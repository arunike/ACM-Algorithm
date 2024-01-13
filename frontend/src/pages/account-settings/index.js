import { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { styled } from '@mui/material/styles';
import MuiTab from '@mui/material/Tab';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline';

import 'react-datepicker/dist/react-datepicker.css';

import TabAccount from 'src/views/account-settings/TabAccount';
import TabSecurity from 'src/views/account-settings/TabSecurity';
import AuthenticationCheckin from "../../CustomGlobalFunction/AuthenticationCheck";
import GetUserInfo from "../../CustomGlobalFunction/GetUserInfo";

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}));

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const AccountSettings = () => {
  const [value, setValue] = useState('account');
  const [userInfo, setUserInfo] = useState({});
  const [bioInfo, setBioInfo] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  useEffect(() => {
    GetUserInfo().then(data => {
      setUserInfo(data);
    }).catch(err => {
      AuthenticationCheckin();
    });

    axios.post(`http://127.0.0.1:8000/api/user/user/${localStorage.getItem('id')}/update-personal-info/`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      setBioInfo(res.data);
    })
  }, []);

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount userInfo={userInfo} setBioInfo={bioInfo}/>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings;
