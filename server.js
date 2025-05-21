const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT;


app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "calc.html"));
});

app.listen(port, () => {
  console.log(`Serviço principal rodando na porta ${port}`);
});