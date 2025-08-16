import { useState, ChangeEvent, FormEvent, createRef } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { GetServerSideProps } from "next";
import ReCAPTCHA from "react-google-recaptcha";
import { getWorkTime } from "../lib/queries/workTime";
import { Worktime } from "../db/schema";
import { Alert, Snackbar } from "@mui/material";

interface ReservationPageProps {
	siteKey: string;
	workTime: Worktime[];
}

const ReservationPage = ({ siteKey, workTime }: ReservationPageProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    datepicker: "",
    persons: "",
    message: "",
  });
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const recaptchaRef = createRef<ReCAPTCHA>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (recaptchaRef.current) {
      const captchaCode = await recaptchaRef.current.executeAsync();
      onReCAPTCHAChange(captchaCode);
    }
  };

  const onReCAPTCHAChange = async (captchaCode: string | null) => {
    if (!captchaCode) {
      return;
    }

    try {
      await axios.post("/api/reservation", {
        ...formData,
        captcha: captchaCode,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        datepicker: "",
        persons: "",
        message: "",
      });
      setSuccessAlert(true);
    } catch (error) {
      setErrorAlert(true);
      console.error(error);
    } finally {
      recaptchaRef.current?.reset();
      setLoading(false);
    }
  };

  return (
    <Layout workTime={workTime}>
      <section
        className="topSingleBkg topPageBkg"
        style={{
          backgroundImage: "url('/img/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="item-content-bkg">
          <div className="item-img"></div>
          <div className="inner-desc">
            <h1 className="post-title single-post-title">Reservierung</h1>
            <span className="post-subtitle">
							Wir freuen uns auf Ihren Besuch
            </span>
          </div>
        </div>
      </section>

      <section id="wrap-content" className="page-content">
        <div className="container">
          <div className="row reservation-row">
            <div className="reservation-container">
              <div className="page-holder custom-page-template">
                <div className="categ-name">
                  <h2>Tisch reservieren</h2>
                </div>
                <p className="alignc">
									Sie können jederzeit online oder telefonisch unter
									0271/77002976 während unserer Öffnungszeiten einen Tisch
									reservieren:
                </p>
              </div>

              <div className="reservation_txt">
                <form id="reservation-form" onSubmit={(e) => {
                  setLoading(true);
                  handleSubmit(e);
                }}>
                  <div className="res-row grid-cols-2">
                    <div className="res-col">
                      <label>Name*</label>
                      <input
                        type="text"
                        name="name"
                        className="reservation-fields"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="res-col">
                      <label>Email*</label>
                      <input
                        type="email"
                        name="email"
                        className="reservation-fields"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="res-row">
                    <div className="res-col">
                      <label>Telefon*</label>
                      <input
                        type="text"
                        name="phone"
                        className="reservation-fields"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="res-col">
                      <label>Datum*</label>
                      <input
                        type="date"
                        name="datepicker"
                        id="datepicker"
                        className="reservation-fields"
                        value={formData.datepicker}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="res-col">
                      <label>Anzahl Personen*</label>
                      <input
                        type="text"
                        name="persons"
                        className="reservation-fields"
                        value={formData.persons}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <label>Besondere Wünsche</label>
                  <textarea
                    name="message"
                    id="message2"
                    className="reservation-fields"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <p className="alignc">
                    <button
                      type="submit"
                      id="submit"
                      style={{ cursor: "pointer" }}
                      disabled={loading}
                    >
                      {loading ? <span className="button-spinner"></span> : "Jetzt Buchen"}
                    </button>
                  </p>
                </form>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey={siteKey}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar
        open={errorAlert}
        autoHideDuration={5000}
        onClose={() => setErrorAlert(false)}
      >
        <Alert
          onClose={() => setErrorAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.
        </Alert>
      </Snackbar>
      <Snackbar
        open={successAlert}
        autoHideDuration={5000}
        onClose={() => setSuccessAlert(false)}
      >
        <Alert
          onClose={() => setSuccessAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
            Ihre Reservierungsanfrage wurde erfolgreich gesendet!
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
	ReservationPageProps
> = async () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const workTime = await getWorkTime();
  return {
    props: {
      siteKey,
      workTime: JSON.parse(JSON.stringify(workTime)),
    },
  };
};

export default ReservationPage;
