import { useState, ChangeEvent, FormEvent, createRef } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { GetServerSideProps } from "next";
import ReCAPTCHA from "react-google-recaptcha";
import { getWorkTime } from "../lib/queries/workTime";
import { Worktime } from "../db/schema";

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
		time: "09:00",
		persons: "",
		message: "",
	});
	const [output, setOutput] = useState("");
	const recaptchaRef = createRef<ReCAPTCHA>();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setOutput("Wird gesendet...");

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
		} finally {
			recaptchaRef.current?.reset();
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
								<form id="reservation-form" onSubmit={handleSubmit}>
									<div className="res-row">
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
									</div>
									<div className="res-row">
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
											<label>Uhrzeit*</label>
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
										>
											Jetzt Buchen
										</button>
									</p>
								</form>
								<ReCAPTCHA
									ref={recaptchaRef}
									size="invisible"
									sitekey={siteKey}
								/>
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
