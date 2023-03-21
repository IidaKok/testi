import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";


const Register = () => {
  const [iduser, setIduser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [userToBeInserted, setuserToBeInserted] = useState(null);

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
        console.log("INSERT:", r);
        setuserToBeInserted(null);
       
        console.log("asiakasToBeInserted", userToBeInserted);
    };
    if (userToBeInserted != null){ insertUser(); console.log("user EI OLE null");}
    if(userToBeInserted === null) console.log("user on null");
    
  }, [userToBeInserted]);



  const Register = () => {
    setuserToBeInserted({ iduser: iduser, username: username, password: password, email: email });
    setIduser("");
    setUsername("");
    setPassword("");
    setEmail("");
  }
/*  if (userToBeInserted !== null){
    console.log("user on null");
  }*/
  

    return (
      <div className="App">
          <h2>Register</h2>
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
          <input type="submit" value="submit" />
          <button onClick={() => Register()}>Register</button>
       



        <p>Already have an account? <Link to="/">Login</Link></p>



      </div>
    )
  }
export { Register }