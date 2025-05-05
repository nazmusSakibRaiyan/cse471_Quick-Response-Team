import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function SosAdmin() {
	const { token } = useAuth();
	const [sosList, setSosList] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchUnresolvedSOS = async () => {
		try {
			setLoading(true);
			const res = await fetch("http://localhost:5000/api/sos", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				setSosList(data);
			} else {
				toast.error("Failed to fetch SOS reports.");
			}
		} catch (error) {
			toast.error("Error fetching SOS data.");
		} finally {
			setLoading(false);
		}
	};

	const resolveSOS = async (sosId) => {
		try {
			setLoading(true);
			const res = await fetch("http://localhost:5000/api/sos/setAsResolved", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ sosId }),
			});
			if (res.ok) {
				toast.success("Marked as resolved");
				fetchUnresolvedSOS();
			} else {
				toast.error("Failed to mark as resolved.");
			}
		} catch (error) {
			toast.error("Error resolving SOS.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUnresolvedSOS();
	}, []);

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-bold text-red-600 mb-6">🚨 SOS Admin Panel</h1>
			{loading ? (
				<p className="text-gray-700">Loading SOS reports...</p>
			) : sosList.length === 0 ? (
				<p className="text-green-600 font-semibold">No unresolved SOS reports! ✅</p>
			) : (
				<table className="w-full border border-gray-300">
					<thead className="bg-gray-100">
						<tr>
							<th className="p-2 border">User</th>
							<th className="p-2 border">Message</th>
							<th className="p-2 border">Location</th>
							<th className="p-2 border">Receiver</th>
							<th className="p-2 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{sosList.map((sos) => (
							<tr key={sos._id}>
								<td className="p-2 border">{sos.user?.name || "Unknown"}</td>
								<td className="p-2 border">{sos.message}</td>
								<td className="p-2 border">
									<p>
										{`${sos.coordinates.latitude}, ${sos.coordinates.longitude}`}
									</p>
									<a
										href={`https://www.google.com/maps?q=${sos.coordinates.latitude},${sos.coordinates.longitude}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-500 underline text-sm"
									>
										View in Maps
									</a>
								</td>
								<td className="p-2 border capitalize">{sos.receiver || "N/A"}</td>
								<td className="p-2 border">
									<button
										onClick={() => resolveSOS(sos._id)}
										className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
									>
										Mark as Resolved
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
