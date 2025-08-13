import AdminLayout from "../../components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { images } from "../../db/schema";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const GalleryManagement: React.FC = () => {
	const router = useRouter();
	const [imagesState, setImagesState] = useState<
		(typeof images.$inferSelect)[]
	>([]);
	const [hoveredButtonId, setHoveredButtonId] = useState<number | null>(null);

	const imageContainerStyle: React.CSSProperties = {
		position: "relative",
		marginBottom: "30px",
	};

	const getDeleteButtonStyle = (id: number): React.CSSProperties => ({
		position: "absolute",
		top: "10px",
		left: "10px",
		padding: "5px 10px",
		backgroundColor:
			hoveredButtonId === id ? "rgba(220, 53, 69, 0.9)" : "rgba(0, 0, 0, 0.7)",
		color: "white",
		border: "none",
		cursor: "pointer",
		transition: "background-color 0.3s ease",
		zIndex: 10,
	});

	const uploadButtonStyle: React.CSSProperties = {
		display: "block",
		margin: "40px auto",
		textAlign: "center",
	};

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const { data } = await axios.get("/api/admin/gallery");
				setImagesState(data);
			} catch (error) {
				console.error("Fehler beim Laden der Bilder", error);
			}
		};
		fetchImages();
	}, []);

	const handleDelete = async (id: number) => {
		if (
			window.confirm("Sind Sie sicher, dass Sie dieses Bild löschen möchten?")
		) {
			try {
				await axios.delete(`/api/admin/gallery?id=${id}`);
				setImagesState(imagesState.filter((image) => image.id !== id));
			} catch (error) {
				console.error("Fehler beim Löschen des Bildes", error);
				alert("Fehler beim Löschen des Bildes.");
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
					<h1 className="single-post-title">Galerie-Verwaltung</h1>
				</div>
			</div>
			<div
				className="container"
				style={{ paddingTop: "40px", paddingBottom: "40px" }}
			>
				<div className="row">
					{imagesState.map((item) => (
						<div className="col-md-4" key={item.id} style={imageContainerStyle}>
							<Image
								src={item.url}
								alt={`Galeriebild ${item.id}`}
								width={600}
								height={400}
								style={{ width: "100%", height: "auto" }}
								sizes="(max-width: 768px) 100vw, 33vw"
							/>
							<button
								onClick={() => handleDelete(item.id)}
								className="view-more"
								style={getDeleteButtonStyle(item.id)}
								onMouseEnter={() => setHoveredButtonId(item.id)}
								onMouseLeave={() => setHoveredButtonId(null)}
							>
								Löschen
							</button>
						</div>
					))}
				</div>
				<div className="row">
					<div className="col-md-12">
						<button
							onClick={() => router.push("/admin/gallery/new")}
							className="view-more"
							style={uploadButtonStyle}
						>
							Bilder hochladen
						</button>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default GalleryManagement;
