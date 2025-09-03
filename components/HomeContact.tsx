import axios from "axios";
import React, { useState } from "react";
import useForm from "../hooks/useForm";
import { validator } from "../hooks/Validator";
import ReCAPTCHA from "react-google-recaptcha";
import { Snackbar, Alert } from "@mui/material";

export default function HomeContact({ siteKey }: { siteKey: string }) {
  const initState = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [errorAlert, setErrorAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const submit = () => {
    recaptchaRef.current?.execute();
  };

  const onReCAPTCHAChange = (captchaCode: string | null) => {
    if (!captchaCode) {
      return;
    }

    axios
      .post("/api/mail", { ...state, captcha: captchaCode })
      .then(() => {
        setSuccessAlert(true);
        resetForm();
      })
      .catch((e) => {
        console.error(
          "E-Mail konnte nicht gesendet werden:",
          e.response?.data?.message || e.message,
        );
        setErrorAlert(true);
      })
      .finally(() => {
        recaptchaRef.current?.reset();
        setLoading(false);
      });
  };

  const { handleChange, handleSubmit, handleBlur, resetForm, state, errors } =
		useForm({
		  initState,
		  callback: submit,
		  validator,
		});

  const isValidForm =
		Object.values(errors).filter((error) => typeof error !== "undefined")
		  .length === 0;

  return (
    <>
      <div className="gmaps" style={{ marginBottom: "48px" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d264.4559750198658!2d8.015181613643593!3d50.906263076454906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc03331dc2c025%3A0x6cc5b6d2cddd89f9!2sRestaurant%20im%20Kolpinghaus!5e0!3m2!1sen!2srs!4v1753364705313!5m2!1sen!2srs"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <section
        id="contact"
        className="page-content"
        style={{ marginBottom: "72px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="headline">
                <h2>Kontakt aufnehmen</h2>
              </div>
              <div className="margin-b24">
								Haben Sie einen Ratschlag oder einen Vorschlag, den Sie uns
								mitteilen möchten? Fühlen Sie sich frei uns zu kontaktieren.
              </div>
              <div id="contact-form-holder">
                <form onSubmit={(e) => {
                  setLoading(true);
                  handleSubmit(e);
                }}>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                      <p>
                        <input
                          type="text"
                          name="name"
                          className="reservation-fields"
                          value={state.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        {errors.name && (
                          <p style={{ color: "red" }}>{errors.name}</p>
                        )}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <label>Email</label>
                      <p>
                        <input
                          type="email"
                          name="email"
                          className="reservation-fields"
                          value={state.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                        {errors.email && (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                      </p>
                    </div>
                  </div>
                  <label>Betreff</label>
                  <input
                    type="text"
                    name="subject"
                    className="reservation-fields"
                    value={state.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.subject && (
                    <p style={{ color: "red" }}>{errors.subject}</p>
                  )}
                  <label>Nachricht</label>
                  <p>
                    {" "}
                    <textarea
                      name="message"
                      id="msg-contact"
                      className="reservation-fields"
                      rows={7}
                      value={state.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    ></textarea>
                    {errors.message && (
                      <p style={{ color: "red" }}>{errors.message}</p>
                    )}
                  </p>
                  <p className="antispam">
										Leave this empty: <input type="text" name="url" />
                  </p>
                  <p className="contact-btn">
                    <button
                      type="submit"
                      id="submit"
                      style={{ cursor: "pointer" }}
                      disabled={!isValidForm || loading}
                    >
                      {loading ? <span className="button-spinner"></span> : "Nachricht senden"}
                    </button>
                  </p>
                </form>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey={siteKey}
                  onChange={onReCAPTCHAChange}
                />
              </div>
              <div id="output-contact"></div>
            </div>
          </div>
        </div>
      </section>
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
					E-Mail wird nicht gesendet! Bitte versuchen Sie es später erneut.
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
					E-Mail gesendet! Vielen Dank, dass Sie uns geschrieben haben. Wir
					werden so schnell wie möglich antworten möglich.
        </Alert>
      </Snackbar>
    </>
  );
}
