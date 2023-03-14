import React from 'react'
import "./signup.css";

function signup() {
  return (
    <div className="signupPage ">
    <main>
        <div className="box">
          <div className="inner-box">
            <div className="forms-wrap">
              
              <form
                action="index.html"
                autoComplete="off"
                className="sign__up__form"
              >
                <div className="cityflat_logo"><img alt ="" src="./logo-cityflat.png"/></div>

                <div className="heading">
                  <h2>WELCOME</h2>
                  <h4>Signup to your account</h4>
                </div>

                <div className="actual-form">
                <div className="input-wrap">
                    <label className="label-form">Your name</label>
                    <input
                      type="text"
                      minLength="4"
                      className="input-field"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="input-wrap">
                    <label className="label-form">Email or phone number</label>
                    <input
                      type="text"
                      minLength="4"
                      className="input-field"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div className="input-wrap">
                    <label className="label-form">Password</label>
                    <input
                      type="password"
                      minLength="4"
                      className="input-field"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="reset__options">
                    <div className="remember-me">
                      {" "}
                      <input
                        type="checkbox"
                        className="form-check-input"
                      /><span>By creating an account, you agree to our</span>
                      <strong className="terms"> terms</strong>
                      <span>{` and `}</span>
                      <strong className="terms">privacy policy</strong>
                    </div>
                  </div>
                  <input type="submit" value="SIGN UP" className="sign-btn" />
                </div>
              </form>
              <div className="separators">
                <hr className="seperator left" /> OR
                <hr className="seperator right" />
              </div>

              <div className="social-container">
                <a href="#/" className="social">
                  <img src="./vector.svg" alt="" size="2x" />
                </a>
                <a href="#/" className="social">
                  <img src="./google--original.svg" alt="" size="2x" />
                </a>
                <a href="#/" className="social">
                  <img src="./apple--original.svg" alt="" size="2x" />
                </a>
              </div>
              <div className="signup">
                <span>
                  You  have an account?{" "}
                  <a href="/login">Login now</a>
                </span>
              </div>
            </div>

            <div className="carousel">
             

              <div className="logo">
               <img alt ="" src="./logo-cityflat.png"/>
              </div>
            </div>
          </div>
        </div>
      </main>
  </div>
  )
}

export default signup