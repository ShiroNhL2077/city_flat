import React from "react";
import "./login.css";

function login() {
  return (
    <div className="loginPage ">
      <main>
        <div className="box">
          <div className="inner-box">
            <div className="forms-wrap">
              <form
                action="index.html"
                autoComplete="off"
                className="log-in-form"
              >
                <div className="cityflat_logo">
                  <img alt="" src="./logo-cityflat.png" />
                </div>

                <div className="heading">
                  <h2>WELCOME</h2>
                  <h4>Login to your account</h4>
                </div>

                <div className="actual-form">
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
                      />{" "}
                      Remember me{" "}
                    </div>
                    <div className="forgot-password">
                      <a href="/">Forgot password?</a>
                    </div>
                  </div>
                  <input type="submit" value="LOGIN" className="sign-btn" />
                </div>
              </form>
              <div className="separators">
                <hr className="seperator left" />{" "}
                <b style={{ fontFamily: "font-alethia-pro" }}>OR</b>
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
                  You don't have an account?{" "}
                  <a href="/signup">Join for free today</a>
                </span>
              </div>
            </div>

            <div className="carousel_login">
              <div className="logo">
                <img alt="" src="./logo-cityflat.png" className="logo_city_flat" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default login;
