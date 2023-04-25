import React from "react";
import "../styles/ModalStyle.css";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";

export const Succsess = (props) => {
    const { countdown } = props;

    return (
        <div className="modal">
            <div className="success-container">
                <div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
                <BsCheckCircle size="80px" style={{ color: "green" }} />
                    <h1>User creation succeeded!</h1>
                    <p>You will be redirected to the login page in {countdown} seconds</p>
                </div>
            </div>
        </div>
    )
}
export const EmailSuccess = (props) => {
    const { setModalOpen } = props;

    return (
        <div className="modal">
            <div className="success-container">
                <div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
                    <div className="modal-header">
                        <IoClose size="20px" onClick={() => setModalOpen(false)} style={{ cursor: "pointer" }} />
                    </div>
                    <BsCheckCircle size="80px" style={{ color: "green" }} />
                    <h1>The email was sent successfully!</h1>
                    <p>You can close the current tab</p>
                </div>
            </div>
        </div>
    )
}
export const PasswordSuccess = (props) => {
    const { setModalOpen } = props;

    return (
        <div className="modal">
            <div className="success-container">
                <div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
                    <div className="modal-header">
                        <IoClose size="30px" onClick={() => setModalOpen(false)} style={{ cursor: "pointer" }} />
                    </div>
                    <BsCheckCircle size="80px" style={{ color: "green" }} />
                    <h1>Password changed successfully!</h1>
                    <Link to="/">Go to login</Link>
                </div>
            </div>
        </div>

    )
}