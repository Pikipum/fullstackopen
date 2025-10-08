"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const patientRouter = express_1.default.Router();
patientRouter.get("/", (_req, res) => {
    //res.send(patientService.getNoSsnEntries());
    res.send(patientService_1.default.getEntries());
});
patientRouter.get("/:id", (req, res) => {
    const patient = patientService_1.default.findPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.send(404);
    }
});
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientSchema.parse(req.body);
        console.log(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
patientRouter.post("/", newPatientParser, (req, res) => {
    const addedEntry = patientService_1.default.addPatient(req.body);
    res.json(addedEntry);
});
patientRouter.use(errorMiddleware);
exports.default = patientRouter;
