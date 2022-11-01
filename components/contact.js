import axios from "axios";
import React from "react";
import { env } from "process";
import useForm from "../hooks/useForm";
import Button from "@mui/material/Button";
import { validator } from "../hooks/Validator";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneIcon from "@mui/icons-material/Phone";
import styles from "../styles/Contact.module.scss";
import { TextField, Snackbar, Alert } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#373e58",
    },
    secondary: {
      main: "#e0aa28",
    },
  },
});

export default function Contact({ siteKey }) {
  const initState = {
    name: "",
    email: "",
    message: "",
  };

  // console.log(SITE_KEY);

  const [errorAlert, setErrorAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);

  const recaptchaRef = React.createRef();

  const submit = () => {
    recaptchaRef.current.execute();

    axios
      .post("/api/mail", state)
      .then((res) => {
        setSuccessAlert(true);
        resetForm();
      })
      .catch((e) => {
        resetForm();
        setErrorAlert(true);
      });
  };

  const onReCAPTCHAChange = async (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the response is ok than show the success alert
        alert("Email registered successfully");
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error?.message || "Something went wrong");
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      recaptchaRef.current.reset();
      resetForm();
    }
  };

  const { handleChange, handleSubmit, handleBlur, resetForm, state, errors } =
    useForm({
      initState,
      callback: submit,
      validator,
    });

  let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className={styles.contact}>
          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.foothead}>
                <h2>Schicken Sie uns eine Nachricht</h2>
              </div>
              <div>
                <TextField
                  required
                  label="Dein Name..."
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  onBlur={handleBlur}
                  id="standard-basic"
                  variant="standard"
                  sx={{
                    color: "success.main",
                  }}
                />
              </div>
              <div>
                <TextField
                  required
                  label="E-mail.."
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  onBlur={handleBlur}
                  id="standard-basic"
                  variant="standard"
                />
              </div>
              <div>
                <TextField
                  id="standard-multiline-static"
                  name="message"
                  value={state.message}
                  onChange={handleChange}
                  error={errors.message ? true : false}
                  helperText={errors.message}
                  onBlur={handleBlur}
                  label="Nachricht..."
                  multiline
                  rows={4}
                  variant="standard"
                />
              </div>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={siteKey}
                onChange={onReCAPTCHAChange}
              />
              <div className={styles.submit}>
                <Button
                  variant="contained"
                  disabled={!isValidForm}
                  type="submit"
                >
                  Absenden
                </Button>
              </div>
            </form>
          </div>
          <div>
            <div className={styles.foothead}>
              <h2 className={styles.contuct}>Kontakt</h2>
            </div>
            <div className={styles.locationAdress}>
              <p>Restaurant im Kolpighaus</p>
              <p>Weidenauer Straße 27</p>
              <p>57078 Siegen - Weidenau</p>
              <p>Deutschland</p>
              <br />
              <p>
                <PhoneIcon /> 0271/ &nbsp; 770 &nbsp; 029 &nbsp;76
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2515.9496111231283!2d8.013327515508392!3d50.90614846230574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc03331dc2c025%3A0x6cc5b6d2cddd89f9!2sRestaurant+im+Kolpinghaus!5e0!3m2!1sen!2s!4v1493747676134"
              width="100%"
              height="450"
            ></iframe>
          </div>
        </div>
        <Snackbar
          open={errorAlert}
          autoHideDuration={6000}
          onClose={() => setErrorAlert(false)}
        >
          <Alert
            onClose={() => setErrorAlert(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Email is not Sent! Please try again later.
          </Alert>
        </Snackbar>
        <Snackbar
          open={successAlert}
          autoHideDuration={6000}
          onClose={() => setSuccessAlert(false)}
        >
          <Alert
            onClose={() => setSuccessAlert(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Email Sent! Thank you for writing to us. We will respond as soon as
            possible.
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
}
