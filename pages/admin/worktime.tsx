import AdminLayout from "../../components/admin/AdminLayout";
import { Worktime } from "../../db/schema";
import { useEffect, useState } from "react";
import axios from "axios";

const WorkTimeManagement: React.FC = () => {
	const [workTime, setWorkTime] = useState<Worktime[]>([]);
	const [editingId, setEditingId] = useState<number | null>(null);

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
		const fetchWorkTime = async () => {
			try {
				const { data } = await axios.get("/api/workTime");
				setWorkTime(data);
			} catch (error) {
				console.error("Fehler beim Abrufen der Arbeitszeiten", error);
			}
		};
		fetchWorkTime();
	}, []);

	const handleEditClick = (id: number) => {
		if (editingId === id) {
			// Änderungen speichern
			const itemToSave = workTime.find((item) => item.id === id);
			if (itemToSave) {
				const { open, close } = itemToSave;
				axios
					.put("/api/workTime", { id, open, close })
					.then(() => setEditingId(null))
					.catch((error) =>
						console.error("Fehler beim Aktualisieren der Arbeitszeit", error)
					);
			}
		} else {
			setEditingId(id);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
		field: keyof Worktime
	) => {
		const newWorkTime = workTime.map((item) => {
			if (item.id === id) {
				return { ...item, [field]: e.target.value };
			}
			return item;
		});
		setWorkTime(newWorkTime);
	};

	return (
		<AdminLayout>
			<div className="topSingleBkg">
				<div
					className="item-img"
					style={{ backgroundImage: "url(/img/banner.jpg)" }}
				></div>
				<div className="inner-desc">
					<h1 className="single-post-title">Öffnungszeiten-Verwaltung</h1>
				</div>
			</div>
			<div
				className="container"
				style={{ paddingTop: "40px", paddingBottom: "40px" }}
			>
				<div className="row">
					<div className="col-md-12">
						<table style={{ width: "100%" }} className="responsive-table">
							<thead>
								<tr>
									<th style={cellStyle}>Tag</th>
									<th style={cellStyle}>Geöffnet</th>
									<th style={cellStyle}>Geschlossen</th>
									<th style={cellStyle}>Aktionen</th>
								</tr>
							</thead>
							<tbody>
								{workTime.map((item) => (
									<tr key={item.id}>
										<td style={cellStyle} data-label="Tag">
											{item.day}
										</td>
										<td style={cellStyle} data-label="Geöffnet">
											<input
												type="text"
												value={item.open?.slice(0, 5) || ""}
												onChange={(e) => handleInputChange(e, item.id, "open")}
												disabled={editingId !== item.id}
											/>
										</td>
										<td style={cellStyle} data-label="Geschlossen">
											<input
												type="text"
												value={item.close?.slice(0, 5) || ""}
												onChange={(e) => handleInputChange(e, item.id, "close")}
												disabled={editingId !== item.id}
											/>
										</td>
										<td style={cellStyle} data-label="Aktionen">
											<div style={actionsContainerStyle}>
												<button
													className="view-more"
													onClick={() => handleEditClick(item.id)}
												>
													{editingId === item.id ? "Speichern" : "Bearbeiten"}
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

export default WorkTimeManagement;
