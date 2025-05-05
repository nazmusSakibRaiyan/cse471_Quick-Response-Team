import SOS from "../models/SOS.js";

// Get all SOS cases (both resolved and unresolved)
export const getAllSOS = async (req, res) => {
	try {
		const sosList = await SOS.find().populate("user", "-password");
		res.status(200).json(sosList);
	} catch (error) {
		console.error("Error fetching SOS cases:", error);
		res.status(500).json({ message: "Failed to fetch SOS cases" });
	}
};

// Delete a specific SOS case by ID
export const deleteSOS = async (req, res) => {
	try {
		const sos = await SOS.findById(req.params.id);
		if (!sos) {
			return res.status(404).json({ message: "SOS not found" });
		}
		await sos.deleteOne();
		res.status(200).json({ message: "SOS deleted successfully" });
	} catch (error) {
		console.error("Error deleting SOS:", error);
		res.status(500).json({ message: "Failed to delete SOS case" });
	}
};
