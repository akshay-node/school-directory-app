import multer from "multer";
import { connectDB } from "./db";
const isProd = process.env.APP_ENV === "production";

let storage;

if (isProd) {
  storage = multer.memoryStorage();
} else {
  storage = multer.diskStorage({
    destination: "./public/schoolImages",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
}

const upload = multer({ storage });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
    debugger;
  if (req.method === "POST") {
    try {
      await runMiddleware(req, res, upload.single("image"));

      const { name, address, city, state, contact, email_id } = req.body;
    
        let image = null;
      if (isProd) {
        if (req.file) {
          // I have no bucket Subcription
          image = "/next.svg";
        }
      } else {
        
        image = req.file ? `/schoolImages/${req.file.filename}` : null;
      };

      const db = await connectDB();
      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, image, email_id]
      );

      res.status(200).json({ message: "School added successfully!" });
    } catch (err) {
      console.error("Error inserting school:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
