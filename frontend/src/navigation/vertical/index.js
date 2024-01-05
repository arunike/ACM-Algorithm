// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Logout from 'mdi-material-ui/Logout'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: 'error',
      openInNewTab: true
    },
    {
      title: 'Logout',
      icon: Logout,
      path: 'login',
    }
  ]
}

export default navigation
