import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import dotenv from dotenv;

const PORT = 3000;
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const db = new pg.Client({
  host: process.env.DATABASE_HOSTNAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

await db.connect();

app.post("/submit", async (req, res) => {
  const data = req.body.formData;
  console.log(data);
  try {
    await db.query(
      "INSERT INTO student_data(name, enrollment, section, year, email) VALUES ($1, $2, $3, $4, $5)",
      [data.name, data.enroll, data.section, data.year, data.email]
    );
    res.status(200).json({ message: "Data inserted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database insert failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
