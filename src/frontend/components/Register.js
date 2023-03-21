import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Loginstyle.css";


const Register = () => {
  const [iduser, setIduser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  if (regSuccess) {
    navigate("/");
  }

  return (
    <div className="Forms">
      <h2>Register</h2>
      <div className="Container">
        <label>
          Id:
          <input type="text" value={iduser} onChange={(e) => setIduser(e.target.value)}></input>
        </label>
        <label>
          User name:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </label>
        <label>
          Password:
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        <label>
          Password again:
          <input type="text"></input>
        </label>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </label>
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