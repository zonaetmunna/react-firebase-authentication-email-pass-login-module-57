
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import initailizeAuthenticion from './Firebase/firebase.init';
import { useState } from 'react';

initailizeAuthenticion();
const googleProvider = new GoogleAuthProvider();

function App() {
  // form state
  const [name, setName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [isLogin, setIsToggle] = useState(false)
  const [error, setError] = useState('')
  // 
  const auth = getAuth();
  // handleGoogleSignIn
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user)
      })
  }

  //handle toggle
  const toggleLogin = (e) => {
    setIsToggle(e.target.checked)
  }
  // handle user name
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  // handle input field
  const handleInput = e => {
    setUserEmail(e.target.value)
  }
  // handle password field
  const handlePassword = e => {
    setUserPassword(e.target.value)
  }

  // handle new register
  const hadnleSubmit = (e) => {
    e.preventDefault();
    console.log(userEmail, userPassword)
    // password condition
    if (userPassword.length < 6) {
      setError('password must be 6 chacreater');
      return;
    }
    if (!/(?=.*[A-Z])/.test(userPassword)) {
      setError('passowrd must be container 2 uppercase')
      return;
    }
    // checkedbox login or register
    isLogin ? processLogin(userEmail, userPassword) : registerNewUser(userEmail, userPassword);

  }
  // login
  const processLogin = (userEmail, userPassword) => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(result => {
        const user = result.user;
        console.log(user)
        setError('')

      })
      .catch(error => {
        setError(error.message)
      })
  }

  //new register 
  const registerNewUser = (userEmail, userPassword) => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(result => {
        const user = result.user;
        console.log(user)
        setError('');
        varifyEmail();
        setUserName();
      })
      .catch(error => {
        setError(error.message)
      })
  }
  // 
  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then(result => {

      })
  }
  // verifacation email
  const varifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result)
      })
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, userEmail)
      .then(result => {

      })
  }

  return (
    <div>

      <div className="m-5">
        <form onSubmit={hadnleSubmit}>
          <h3>{isLogin ? 'Please Login' : 'please Register'}</h3>
          {!isLogin &&
            <div className="col-12">
              <label for="inputAddress" className="form-label">user name</label>
              <input onBlur={handleNameChange} type="text" className="form-control" id="inputAddress" placeholder="your name" />
            </div>}
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input onBlur={handleInput} type="email" className="form-control" id="inputEmail3" placeholder="Email" required />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input onBlur={handlePassword} type="password" className="form-control" id="inputPassword3" placeholder="Password" required />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-2">Checkbox</div>
            <div className="col-sm-10">
              <div className="form-check">
                <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
                <label className="form-check-label" htmlFor="gridCheck1">
                  Already Registered
                </label>
              </div>
            </div>
          </div>
          <div className="text-danger">{error}</div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
              <button onClick={handleResetPassword} type="button" className="btn btn-primary m-3 btn-sm">Reset Password</button>
            </div>
          </div>
        </form>
      </div>





      <div>---------------------</div>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>

    </div>
  );
}

export default App;
