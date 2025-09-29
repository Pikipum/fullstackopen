import express from "express";
import patientService from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});
patientRouter.post("/", (req, res) => {
  const requestPatient = req.body;
  res.send(patientService.addPatient(requestPatient));
});

export default patientRouter;
