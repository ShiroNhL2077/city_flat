
import fetch from "node-fetch";
import dotenv from 'dotenv';

/* Accessing .env content */
dotenv.config();
const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;

const base = "https://api-m.sandbox.paypal.com";

// function get the access token
export async function generateAccessTokenFetch() {
    const response = await fetch(base + "/v1/oauth2/token", {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization:
          "Basic " + Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET).toString("base64"),
      },
    });
    const data = await response.json();
    return data.access_token;
  }

