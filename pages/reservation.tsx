import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    datepicker: "",
    time: "09:00",
    persons: "",
    message: "",
  });
  const [output, setOutput] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOutput("Sending...");

    const reservationMessage = `
      Neue Reservierung:
      Name: ${formData.name}
      Telefon: ${formData.phone}
      Datum: ${formData.datepicker}
      Uhrzeit: ${formData.time}
      Personen: ${formData.persons}
      Besondere Wünsche: ${formData.message}
    `;

    try {
      await axios.post("/api/mail", {
        name: formData.name,
        email: formData.email,
        message: reservationMessage,
      });
      setOutput("Ihre Reservierungsanfrage wurde erfolgreich gesendet!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        datepicker: "",
        time: "09:00",
        persons: "",
        message: "",
      });
    } catch (error) {
      setOutput(
        "Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut."
      );
      console.error(error);
    }
  };

  return (
    <Layout>
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
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="page-holder custom-page-template">
                <div className="categ-name">
                  <h2>Tisch reservieren</h2>
                </div>
                <p className="alignc">
                  Sie können jederzeit online oder telefonisch unter 0271/77002976
                  während unserer Öffnungszeiten einen Tisch reservieren:
                </p>
              </div>

              <div className="reservation_txt">
                <form id="reservation-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4">
                      <label>Name*</label>
                      <p>
                        <input
                          type="text"
                          name="name"
                          className="reservation-fields"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </p>
                    </div>
                    <div className="col-md-4">
                      <label>Email*</label>
                      <p>
                        <input
                          type="email"
                          name="email"
                          className="reservation-fields"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </p>
                    </div>
                    <div className="col-md-4">
                      <label>Telefon*</label>
                      <p>
                        <input
                          type="text"
                          name="phone"
                          className="reservation-fields"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label>Datum*</label>
                      <p>
                        <input
                          type="date"
                          name="datepicker"
                          id="datepicker"
                          className="reservation-fields"
                          value={formData.datepicker}
                          onChange={handleChange}
                          required
                        />
                      </p>
                    </div>
                    <div className="col-md-4">
                      <label>Uhrzeit*</label>
                      <p>
                        <select
                          name="time"
                          className="reservation-fields"
                          value={formData.time}
                          onChange={handleChange}
                        >
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                          <option value="19:00">19:00</option>
                          <option value="20:00">20:00</option>
                          <option value="21:00">21:00</option>
                          <option value="22:00">22:00</option>
                        </select>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <label>Anzahl Personen*</label>
                      <p>
                        <input
                          type="text"
                          name="persons"
                          className="reservation-fields"
                          value={formData.persons}
                          onChange={handleChange}
                          required
                        />
                      </p>
                    </div>
                  </div>
                  <label>Besondere Wünsche</label>
                  <p>
                    <textarea
                      name="message"
                      id="message2"
                      className="reservation-fields"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </p>
                  <p className="alignc">
                    <input type="submit" value="Jetzt Buchen" id="submit" />
                  </p>
                </form>
              </div>

              <div id="output" className="alignc" style={{ marginTop: "20px" }}>
                {output}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReservationPage;
