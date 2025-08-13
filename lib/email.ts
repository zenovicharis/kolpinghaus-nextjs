import nodemailer from "nodemailer";

interface EmailParams {
	type: "contact" | "reservation";
	data: any;
}

function getContactEmailHtml(data: any): string {
	return `
	<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
	  <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
		<div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
		  <h1 style="color: #BC8D4B; margin: 0;">Neue Kontaktanfrage</h1>
		</div>
		<div style="padding: 20px 0;">
		  <p style="margin: 10px 0;"><strong>Von:</strong> ${data.name} &lt;${data.email}&gt;</p>
		  <p style="margin: 10px 0;"><strong>Betreff:</strong> ${data.subject}</p>
		</div>
		<div style="padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 5px;">
		  <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
		</div>
		<div style="text-align: center; padding-top: 20px; margin-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
		  <p>Diese E-Mail wurde über das Kontaktformular Ihrer Webseite gesendet.</p>
		</div>
	  </div>
	</div>
  `;
}

function getReservationEmailHtml(data: any): string {
	return `
	<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
	  <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
		<div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
		  <h1 style="color: #BC8D4B; margin: 0;">Neue Reservierungsanfrage</h1>
		</div>
		<div style="padding: 20px 0;">
		  <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
		  <p style="margin: 10px 0;"><strong>E-Mail:</strong> ${data.email}</p>
		  <p style="margin: 10px 0;"><strong>Telefon:</strong> ${
				data.phone || "Nicht angegeben"
			}</p>
		  <hr style="border: none; border-top: 1px solid #eee;" />
		  <p style="margin: 10px 0;"><strong>Datum:</strong> ${data.datepicker}</p>
		  <p style="margin: 10px 0;"><strong>Uhrzeit:</strong> ${data.time}</p>
		  <p style="margin: 10px 0;"><strong>Anzahl der Gäste:</strong> ${
				data.persons
			}</p>
		</div>
		<div style="padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 5px;">
		  <p style="margin: 0; white-space: pre-wrap;">${
				data.message || "Keine zusätzliche Nachricht."
			}</p>
		</div>
		<div style="text-align: center; padding-top: 20px; margin-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
		  <p>Diese E-Mail wurde über das Reservierungsformular Ihrer Webseite gesendet.</p>
		</div>
	  </div>
	</div>
  `;
}

function getEmailHtml(type: "contact" | "reservation", data: any): string {
	switch (type) {
		case "contact":
			return getContactEmailHtml(data);
		case "reservation":
			return getReservationEmailHtml(data);
		default:
			throw new Error("Ungültiger E-Mail-Typ");
	}
}

export async function sendEmail({ type, data }: EmailParams) {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_APP_PASSWORD,
		},
	});

	const html = getEmailHtml(type, data);
	const subject =
		type === "contact"
			? `Kontaktformular: ${data.subject}`
			: `Neue Reservierungsanfrage von ${data.name}`;

	const mailOptions = {
		from: `"${data.name}" <${process.env.EMAIL}>`,
		to: process.env.EMAIL_RECEIVER,
		subject: subject,
		html: html,
		replyTo: data.email,
	};

	await transporter.sendMail(mailOptions);
}
