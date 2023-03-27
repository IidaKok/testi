import React, { useState, useEffect, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Loginstyle.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


const Register = () => {
  const [iduser, setIduser] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [userToBeInserted, setuserToBeInserted] = useState(null);
  let navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passMatch, setPassMatch] = useState(false);
  const [type, setType] = useState("password");


  const [validName, setValidName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [buttonPressed, setButtonPressed] = useState(false);

  //creates new user
  useEffect(() => {
    const insertUser = async () => {

      try {
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
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === undefined) {
              console.log("INSERT:", userToBeInserted);
              setuserToBeInserted(null);
              setRegSuccess(true);
              return;
            }
            let msg = data.message;
            console.log("Message: ", msg);
            if (msg.includes("email") && msg.includes("Username")) {
              var m = msg.split(",");
              setErrorMessage(m[0]);
              setErrorMessage2(m[1]);
            }
            else {
              if (msg.includes("email")) {
                setErrorMessage2(msg);
              }
              else if (msg.includes("Username")) {
                setErrorMessage(msg);
              }
            }
          });
      }
      catch (error) {
        console.log(error);
      }
    };
    if (userToBeInserted != null) insertUser();
  }, [userToBeInserted]);

  if(regSuccess){
    navigate("/");
  }

  //password validation
  useEffect(() => {
    if (password !== passwordAgain) setPassMatch(true);
    if (password === passwordAgain) setPassMatch(false);

    // console.log("Passvalid on " + validPassword);
  }, [passwordAgain]);


  //username validation
  useEffect(() => {
    if (username.length < 5) setValidName(true);
    else setValidName(false);
  }, [username]);

  //password validation
  useEffect(() => {
    if (password.length < 5) setValidPassword(true);
    else setValidPassword(false);
    
    if (password !== passwordAgain) setPassMatch(true);
    if (password === passwordAgain) setPassMatch(false);
    
  }, [password]);

  //email validation
  useEffect(() => {
    if (email.length < 5) setValidEmail(true);
    else setValidEmail(false);
  }, [email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonPressed(true);

    setErrorMessage("");
    setErrorMessage2("");
    if (!validName && !validPassword && !validEmail) {
      setuserToBeInserted({ iduser: iduser, username: username, password: password, email: email });

      setIduser("");
      setUsername("");
      setPassword("");
      setPasswordAgain("");
      setEmail("");
      setButtonPressed(false);
    }
    else {
      console.log("Inputs are not valid");
    };
  }
  //show password
  const showPassword = (e) => {
    if (e) {
      setType("text");
    }
    else setType("Password");
  }
  return (
    <div className="Forms">
      <h2>Register</h2>
      <div className="Container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" value={iduser} onChange={(e) => setIduser(e.target.value)} placeholder="Id..." />

          <OverlayTrigger overlay={(<Tooltip>{validName && buttonPressed ? <Error value="Username" /> : ""}</Tooltip>)} placement="right">
            <input type="text" value={username} className={validName && buttonPressed ? "invalid" : "valid"} onChange={(e) => setUsername(e.target.value)} placeholder="Username..." />
          </OverlayTrigger>
          <p>{errorMessage}</p>
          <OverlayTrigger overlay={(<Tooltip>{validPassword && buttonPressed ? <Error value="Password" /> : ""}</Tooltip>)} placement="right">
            <input type={type} value={password} className={validPassword && buttonPressed || passMatch ? "invalid" : "valid"} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
          </OverlayTrigger>

          <input type={type} value={passwordAgain} className={passMatch ? "invalid" : "valid"} onChange={(e) => setPasswordAgain(e.target.value)} placeholder="Password again..." />
          {passMatch ? <p>Passwords don't match</p> : ""}

          <input type="checkbox" onChange={(e) => showPassword(e.target.checked)} />
          <OverlayTrigger overlay={(<Tooltip>{validEmail && buttonPressed ? <Error value="Email" /> : ""}</Tooltip>)} placement="right">
            <input type="text" value={email} className={validEmail && buttonPressed ? "invalid" : "valid"} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
          </OverlayTrigger>
          <p>{errorMessage2}</p>

          <input type="submit" value="Register" />

        </form>
      </div>


      <div className="Container">
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>

    </div>
  )
}

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null,  value: props.value };

    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.setState({ message: this.state.value + " is too short" });
  }
  render() {
    return (
      <p>{this.state.message}</p>
    )
  }
}
export { Register }