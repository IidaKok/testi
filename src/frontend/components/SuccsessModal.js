import React from "react";
import "../styles/ModalStyle.css";

export const Succsess = (props) => {
    const { countdown } = props;

    return (
        <div className="success-container">
            <div className="row">
                <div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate">
                    
                    <h1>Success!</h1>
                    <p>You will be redirected to the login page in {countdown} seconds</p>
                </div>
            </div>
        </div>
    )
}