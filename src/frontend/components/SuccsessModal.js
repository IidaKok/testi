import React from "react";
import "../styles/ModalStyle.css";
import { IoClose } from "react-icons/io5";

export const Succsess = (props) => {
    const { countdown } = props;

    return (
        <div className="success-container">
            <div className="row">
                <div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">

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
        <div className="success-container">
            <div className="row">
                <div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
                    <div className="modal-header">
                            <IoClose size="20px" onClick={() => setModalOpen(false)} style={{cursor: "pointer"}}/>
                    </div>
                    <h1>The email was sent successfully!</h1>
                    <p>You can close the current tab</p>
                </div>
            </div>
        </div>
    )
}