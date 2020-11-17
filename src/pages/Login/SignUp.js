import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as ReachRouterLink, navigate } from '@reach/router';
import { Auth } from 'aws-amplify';
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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ setUsername, setPassword }) {
  const classes = useStyles();

  return (
    <div className="sign-cont">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target.elements.email);
              console.log(e.target.elements);

              const username = e.target.elements.username.value;
              const password = e.target.elements.password.value;
              const email = e.target.elements.email.value;
              (async function () {
                try {
                  const { user } = await Auth.signUp({
                    username,
                    password,
                    attributes: {
                      email, // optional
                    },
                  });
                  console.log(user);
                  setUsername(username);
                  setPassword(password);
                  navigate('/confirm');
                } catch (error) {
                  console.log('error signing up:', error);
                }
              })();
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <ReachRouterLink to="/signin">
                  Already have an account? Sign in
                </ReachRouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

// import React from 'react';
// import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

// const SignUp = () => {
//   return (
//     <MDBContainer>
//       <MDBRow>
//         <MDBCol md="6">
//           <form>
//             <p className="h5 text-center mb-4">Sign up</p>
//             <div className="grey-text">
//               <MDBInput
//                 label="Your name"
//                 icon="user"
//                 group
//                 type="text"
//                 validate
//                 error="wrong"
//                 success="right"
//               />
//               <MDBInput
//                 label="Your email"
//                 icon="envelope"
//                 group
//                 type="email"
//                 validate
//                 error="wrong"
//                 success="right"
//               />
//               {/* <MDBInput
//                 label="Confirm your email"
//                 icon="exclamation-triangle"
//                 group
//                 type="text"
//                 validate
//                 error="wrong"
//                 success="right"
//               /> */}
//               <MDBInput
//                 label="Your password"
//                 icon="lock"
//                 group
//                 type="password"
//                 validate
//               />
//             </div>
//             <div className="text-center">
//               <MDBBtn color="primary">Register</MDBBtn>
//             </div>
//           </form>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// };

// export default SignUp;
