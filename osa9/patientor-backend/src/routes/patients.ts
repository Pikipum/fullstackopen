import express from "express";
import patientService from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});
/*
router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});
*/

export default patientRouter;
