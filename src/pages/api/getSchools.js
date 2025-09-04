import { connectDB } from "./db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
    try {
        debugger
        const db = await connectDB();
        const [rows] = await db.execute("SELECT * FROM schools");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
