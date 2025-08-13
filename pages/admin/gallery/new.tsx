import AdminLayout from "../../../components/admin/AdminLayout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const NewImagePage = () => {
	const [image, setImage] = useState<File | null>(null);
	const [error, setError] = useState("");
	const router = useRouter();

	const formContainerStyle: React.CSSProperties = {
		maxWidth: "500px",
		margin: "0 auto",
		padding: "40px",
		backgroundColor: "#f9f9f9",
		borderRadius: "8px",
	};

	const inputStyle: React.CSSProperties = {
		width: "100%",
		padding: "15px",
		marginBottom: "20px",
		border: "1px solid #ddd",
		borderRadius: "4px",
		fontSize: "16px",
	};

	const buttonStyle: React.CSSProperties = {
		width: "100%",
		padding: "15px",
		fontSize: "16px",
	};

	const errorStyle: React.CSSProperties = {
		color: "red",
		marginBottom: "20px",
		textAlign: "center",
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImage(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!image) {
			setError("Please select an image.");
			return;
		}

		const formData = new FormData();
		formData.append("image", image);

		try {
			await axios.post("/api/admin/gallery", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			router.push("/admin/gallery");
		} catch (error) {
			setError("Failed to upload image.");
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
					<h1 className="single-post-title">Upload New Image</h1>
				</div>
			</div>
			<div
				className="container"
				style={{ paddingTop: "80px", paddingBottom: "80px" }}
			>
				<div style={formContainerStyle}>
					<form onSubmit={handleSubmit}>
						{error && <p style={errorStyle}>{error}</p>}
						<input type="file" style={inputStyle} onChange={handleFileChange} />
						<button type="submit" className="view-more">
							Upload Image
						</button>
					</form>
				</div>
			</div>
		</AdminLayout>
	);
};

export default NewImagePage;
