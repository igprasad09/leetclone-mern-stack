const express = require("express");
const routes = express.Router();
const { programsDB, programinfoDB } = require("../models/db");
const { default: axios } = require("axios");

routes.get("/", async (req, res) => {
  const programs = await programsDB.find();
  return res.json({
    programs,
  });
});

routes.post("/programinfo", async (req, res) => {
  const id = req.body.id;
  const programinfo = await programinfoDB.findOne({ id });
  return res.json({
    info: programinfo,
  });
});

routes.post("/programexicute", async (req, res) => {
  const { code, language, testCases } = req.body;

  async function fetchRuntimes() {
    const resp = await axios.get("https://emkc.org/api/v2/piston/runtimes");
    return resp.data;
  }
  let version = "";
  (async () => {
    const runtimes = await fetchRuntimes();
    const langs = [language];
    langs.forEach((lang) => {
      const vs = runtimes
        .filter(
          (r) =>
            r.language.toLowerCase() === lang ||
            (r.aliases && r.aliases.includes(lang))
        )
        .map((r) => r.version);
      version = vs[0]
    });
  })();

   try {
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language,
      version, // e.g. "3.10.0" for python, "10.2.0" for cpp
      files: [
        {
          name: "main",
          content: code,
        },
      ],
      stdin: stdin || "",
    });

    res.json(response.data); // send Piston output back to client
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Error executing code" });
  }
});

module.exports = routes;
