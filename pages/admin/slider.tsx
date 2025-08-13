import Image from "next/image";
import AdminLayout from "../../components/admin/AdminLayout";
import { Slides } from "../../db/schema";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SliderManagement: React.FC = () => {
	const router = useRouter();
	const [slides, setSlides] = useState<Slides[]>([]);
	const cellStyle: React.CSSProperties = {
		padding: "20px",
		verticalAlign: "middle",
	};

	const actionsContainerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: "10px",
	};

	const actionButtonStyle: React.CSSProperties = {
		width: "140px",
		textAlign: "center",
	};

	useEffect(() => {
		const fetchSlides = async () => {
			try {
				const { data } = await axios.get("/api/admin/slides");
				setSlides(data);
			} catch (error) {
				console.error("Fehler beim Laden der Slides", error);
			}
		};
		fetchSlides();
	}, []);

	const handleDelete = async (id: number) => {
		if (
			window.confirm("Sind Sie sicher, dass Sie diesen Slide löschen möchten?")
		) {
			try {
				await axios.delete(`/api/admin/slides?id=${id}`);
				setSlides(slides.filter((slide) => slide.id !== id));
			} catch (error) {
				console.error("Fehler beim Löschen des Slides", error);
				alert("Fehler beim Löschen des Slides.");
			}
		}
	};

	return (
		<AdminLayout>
			<div className="topSingleBkg">
				<div
					className="item-img"
					style={{ backgroundImage: "url(/img/banner.jpg)" }}
				></div>
				<div className="inner-desc">
					<h1 className="single-post-title">Slider-Verwaltung</h1>
				</div>
			</div>
			<div
				className="container"
				style={{ paddingTop: "40px", paddingBottom: "40px" }}
			>
				<div className="row">
					<div className="col-md-12">
						<button
							onClick={() => router.push("/admin/slider/new")}
							className="view-more"
							style={{ marginBottom: "20px" }}
						>
							Neu hinzufügen
						</button>
						<table style={{ width: "100%" }} className="responsive-table">
							<thead>
								<tr>
									<th style={cellStyle}>Titel</th>
									<th style={cellStyle}>Bild</th>
									<th style={cellStyle}>Erstellt am</th>
									<th style={cellStyle}>Aktionen</th>
								</tr>
							</thead>
							<tbody>
								{slides.map((item) => (
									<tr key={item.id}>
										<td style={cellStyle} data-label="Titel">
											{item.title}
										</td>
										<td style={cellStyle} data-label="Bild">
											<Image
												src={item.url}
												alt={item.title}
												width={150}
												height={100}
												style={{ objectFit: "cover" }}
											/>
										</td>
										<td style={cellStyle} data-label="Erstellt am">
											{item.createdAt
												? new Date(item.createdAt).toLocaleDateString("de-DE", {
														day: "2-digit",
														month: "2-digit",
														year: "numeric",
												  })
												: ""}
										</td>
										<td style={cellStyle} data-label="Aktionen">
											<div style={actionsContainerStyle}>
												<button
													onClick={() =>
														router.push(`/admin/slider/edit/${item.id}`)
													}
													className="view-more"
												>
													Bearbeiten
												</button>
												<button
													onClick={() => handleDelete(item.id)}
													className="view-more"
												>
													Löschen
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default SliderManagement;
