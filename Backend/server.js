import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
const app = express();
const port = 3000;
// const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://sdjtivuiavkhleialeot.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkanRpdnVpYXZraGxlaWFsZW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1OTM1MjAsImV4cCI6MjA3MDE2OTUyMH0.8JHqdloJJoZtCyvPhu_ppUtKMIxt_k7dZ97H1dnRE_U"
);

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", async (req, res) => {
  const {
    serviceTag,
    serverModel,
    serverGen,
    serverFormFactor,
    serverShippedDate,
  } = req.body;

  const { data, error } = await supabase.from("server_inventory").insert([
    {
      serviceTag: serviceTag,
      serverModel: serverModel,
      serverGen: serverGen,
      serverFormFactor: serverFormFactor,
      serverShipDate: serverShippedDate,
    },
  ]);

  if (error) {
    console.error(error);
    return res.status(500).send("Error inserting data");
  }
  console.log(req.body);
  res.send("Data inserted successfully!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
