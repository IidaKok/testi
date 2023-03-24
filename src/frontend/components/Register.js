import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Loginstyle.css";


const Register = () => {
  const [iduser, setIduser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passMatch, setPassMatch] = useState(true);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [userToBeInserted, setuserToBeInserted] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const insertUser = async () => {

      const r = await fetch("http://localhost:5000/api/users/post/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          iduser: userToBeInserted.iduser,
          username: userToBeInserted.username,
          password: userToBeInserted.password,
          email: userToBeInserted.email
        }),
      });
      if (!r.ok) {
        setErrorMessage("Username " + userToBeInserted.username + " is already taken");
      }
      else if (r.ok) setRegSuccess(true);
      else setErrorMessage("Something went wrong");
      setuserToBeInserted(null);

      console.log("INSERT:", r);
      console.log("asiakasToBeInserted", userToBeInserted);
    };
    if (userToBeInserted != null) insertUser();
  }, [userToBeInserted]);



  const Register = () => {
    setuserToBeInserted({ iduser: iduser, username: username, password: password, email: email });
    setIduser("");
    setUsername("");
    setPassword("");
    setEmail("");
  }

  /*if (regSuccess) {
    navigate("/");
  }*/

  const passwordValidator = (e) => {
    setPasswordAgain(e.target.value);
    console.log(passwordAgain);

    if (password !== passwordAgain) {
      return setPassMatch(false);
    }
    if (password === passwordAgain) {
      return setPassMatch(true);
    }
  }
  //false kun ei näy
  const [type, setType] = useState("password");
  const showPassword = (e) => {
    if(e) {
      setType("text");
    }
    else setType("Password");
  }
  return (
    <div className="Forms">
      <h2>Register</h2>
      <div className="Container">

        <input type="text" value={iduser} onChange={(e) => setIduser(e.target.value)} placeholder="Id..." />

        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username..." />

        <input type={type} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
      
        <input type={type} value={passwordAgain} onChange={(e) => passwordValidator(e)} placeholder="Password again..." />
        <input type="checkbox" onChange={(e) => showPassword(e.target.checked)}/>

        {passMatch ? null : <p>Passwords do not match</p>}

        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />

        <button onClick={() => Register()}>Register</button>

        <p>{errorMessage}</p>
      </div>


      <div className="Container">
        <p>Already have an account? <Link to="/">Login</Link></p>


      </div>
    </div>
  )
}
export { Register }