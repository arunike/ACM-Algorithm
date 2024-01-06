import { useState, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel from '@mui/material/FormControlLabel';

import Github from 'mdi-material-ui/Github';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

import themeConfig from 'src/configs/themeConfig';

import BlankLayout from 'src/@core/layouts/BlankLayout';

import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}));

const RegisterPage = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    errors: {},
    isFormValid: false,
  });
  const [checked, setChecked] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  const validateUsername = (username) => username.length >= 4;
  const validateName = (name) => name.length >= 4;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;
  const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

  const updateFormValidity = () => {
    const isUsernameValid = validateUsername(values.username);
    const isNameValid = validateName(values.name);
    const isEmailValid = validateEmail(values.email);
    const isPasswordValid = validatePassword(values.password);
    const isConfirmPasswordValid = validateConfirmPassword(values.password, values.confirmPassword);
    setValues(values => ({ ...values, isFormValid: isUsernameValid && isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid }));
  };

  const handleChange = (prop) => (event) => {
    const { value } = event.target;
    let error = '';

    if (prop === 'username' && !validateUsername(value)) {
      error = 'Username must be at least 4 characters';
    } else if (prop === 'name' && !validateName(value)) {
      error = 'Name must be at least 4 characters';
    } else if (prop === 'email' && !validateEmail(value)) {
      error = 'Invalid email format';
    } else if (prop === 'password' && !validatePassword(value)) {
      error = 'Password must be at least 8 characters';
    } else if (prop === 'confirmPassword' && !validateConfirmPassword(values.password, value)) {
      error = 'Passwords do not match';
    }

    setValues({ ...values, [prop]: value, errors: { ...values.errors, [prop]: error } });
    updateFormValidity();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  };

  const handleMouseDownPassword = event => {
    event.preventDefault()
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = () => {
    if (!values.isFormValid) {
      console.error('Validation failed');
      return;
    };

    const user = {
      username: values.username,
      name: values.name,
      email: values.email,
      password: values.password,
    };

    axios.post('http://localhost:8000/auth/signup/', user)
    .then(resp => {
      // console.log("Registration successful", resp.data);
      router.push('http://localhost:3000/login/');
      toast.success("Registration successful");
    }).catch(err => {
      toast.error(err.response.data.message);
    });

    // console.log("Form Submitted");
  };

  return (
    <Box className='content-center'>
      <ToastContainer />
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>

            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Adventure starts here 🚀
            </Typography>
            <Typography variant='body2'>Make your app management easy and fun!</Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <TextField
                autoFocus
                fullWidth
                id='username'
                label='Username'
                value={values.username}
                onChange={handleChange('username')}
                error={!!values.errors.username}
                helperText={values.errors.username}
                sx={{ marginBottom: 4 }}
              />

            <TextField
              autoFocus
              fullWidth
              id='name'
              label='Name'
              value={values.name}
              onChange={handleChange('name')}
              error={!!values.errors.name}
              helperText={values.errors.name}
              sx={{ marginBottom: 4 }}
            />

            <TextField
              fullWidth
              type='email'
              label='Email'
              value={values.email}
              onChange={handleChange('email')}
              error={!!values.errors.email}
              helperText={values.errors.email}
              sx={{ marginBottom: 4 }}
            />

            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-register-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                error={!!values.errors.password}
                sx={{ marginBottom: 4 }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {values.errors.password && <Typography color="error">{values.errors.password}</Typography>}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-confirm-password'>Confirm Password</InputLabel>
              <OutlinedInput
                label='Confirm Password'
                value={values.confirmPassword}
                id='auth-register-confirm-password'
                onChange={handleChange('confirmPassword')}
                type={values.showPassword ? 'text' : 'password'}
                error={!!values.errors.confirmPassword}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {values.errors.confirmPassword && <Typography color="error">{values.errors.confirmPassword}</Typography>}
            </FormControl>

            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link href='/' passHref>
                    <LinkStyled onClick={e => e.preventDefault()}>privacy policy & terms</LinkStyled>
                  </Link>
                </Fragment>
              }
            />

            <Button
              fullWidth size='large'
              type='submit'
              variant='contained'
              disabled={!values.isFormValid || !checked}
              sx={{ marginBottom: 7 }}
            >
              Sign up
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>

            <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={() => handleDropdownClose('http://127.0.0.1:8000/login/github/login/github/')}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage;
