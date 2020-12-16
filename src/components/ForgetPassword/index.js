import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const ForgetPassword = (props) => {

  const [email, setEmail] = useState("");
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState("");
  const [success, setSuccess ] = useState(null);
   
  const disabled = email === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .passwordReset(email) 
      .then(() => {
        setError(null);
        setSuccess(`Consulter votre email: ${email} pour changer votre mot de passe`);
        setEmail("");
        setTimeout(()=>{
            props.history.push("/login");
        }, 4000)
        
      })
      .catch((error) => {
        setError(error);
        setEmail("");
        
      });
  };

    return (
        <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && <span style={{
                border: "1px solid green",
                background: "green",
                color: "#ffffff",
            }}>{success}</span>}
            { error && <span>{error.message}</span>}
            <h2>Mot de passe oublié?</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  autoComplete="on"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <button disabled={disabled}>Récupérer</button>
              
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ForgetPassword
