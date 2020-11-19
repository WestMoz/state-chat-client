import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import { Link as ReachRouterLink, navigate } from '@reach/router';
import '../../styles/signin.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: 'lightgrey',
  },
  image: {
    backgroundImage:
      'url(https://www.pngarts.com/files/4/USA-Map-Transparent-Background-PNG.png)',
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'light'
    //     ? theme.palette.grey[50]
    //     : theme.palette.grey[900],
    backgroundColor: 'lightgray',
    backgroundSize: '100%',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'rgb(70,70,70)',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: '100px',
    height: '100px',
    fontSize: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: 'white',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: 'rgb(70,70,70)',
  },
  main: {
    // backgroundColor: 'rgb(50, 160, 168)',
    backgroundColor: 'rgb(28, 125, 133)',
  },
  input: {
    color: 'white',
  },
}));

export default function SignIn({ setSignedIn }) {
  const classes = useStyles();

  return (
    <div className="sign-cont">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.main}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>State Chat</Avatar>
            {/* <Typography component="h1" variant="h5">
              Sign in
            </Typography> */}
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const username = e.target.elements.username.value;
                const password = e.target.elements.password.value;
                (async function () {
                  try {
                    const user = await Auth.signIn(username, password);
                    console.log(user);
                    console.log(user.signInUserSession.idToken.jwtToken);
                    //   dispatch(setSignedIn(user));

                    setSignedIn(user);
                    navigate('/home');
                  } catch (error) {
                    console.log('error sigining in', error);
                  }
                })();
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                InputProps={{ className: classes.input }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{ className: classes.input }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <ReachRouterLink style={{ color: 'white' }} to="/signup">
                    {"Don't have an account? Sign Up"}
                  </ReachRouterLink>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import { Auth } from 'aws-amplify';
// import { Link as ReachRouterLink, navigate } from '@reach/router';
// import '../../styles/signin.css';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     // backgroundColor: 'lightgray',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignIn({ setSignedIn }) {
//   const classes = useStyles();

//   return (
//     <div className="sign-cont">
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form
//             className={classes.form}
//             noValidate
//             onSubmit={(e) => {
//               e.preventDefault();
//               const username = e.target.elements.username.value;
//               const password = e.target.elements.password.value;
//               (async function () {
//                 try {
//                   const user = await Auth.signIn(username, password);
//                   console.log(user);
//                   console.log(user.signInUserSession.idToken.jwtToken);
//                   //   dispatch(setSignedIn(user));

//                   setSignedIn(user);
//                   navigate('/home');
//                 } catch (error) {
//                   console.log('error sigining in', error);
//                 }
//               })();
//             }}
//           >
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <ReachRouterLink to="/signup">
//                   {"Don't have an account? Sign Up"}
//                 </ReachRouterLink>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//         <Box mt={8}>
//           <Copyright />
//         </Box>
//       </Container>
//     </div>
//   );
// }

// import React from 'react';
// import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

// const SignIn = () => {
//   return (
//     <MDBContainer>
//       <MDBRow>
//         <MDBCol md="6">
//           <form>
//             <p className="h5 text-center mb-4">Sign in</p>
//             <div className="grey-text">
//               <MDBInput
//                 label="Type your email"
//                 icon="envelope"
//                 group
//                 type="email"
//                 validate
//                 error="wrong"
//                 success="right"
//               />
//               <MDBInput
//                 label="Type your password"
//                 icon="lock"
//                 group
//                 type="password"
//                 validate
//               />
//             </div>
//             <div className="text-center">
//               <MDBBtn>Login</MDBBtn>
//             </div>
//           </form>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

// export default SignIn;
