"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const utils_1 = require("../utils");
const toNewPatient = (object) => {
    return utils_1.NewPatientSchema.parse(object);
};
exports.toNewPatient = toNewPatient;
const noSsnPatients = patients_1.default.map((_a) => {
    var { ssn: _ssn } = _a, rest = __rest(_a, ["ssn"]);
    return rest;
});
const patients = patients_1.default;
const getEntries = () => {
    return patients;
};
const findPatientById = (id) => {
    return patients.find((patient) => patient.id === id);
};
const getNoSsnEntries = () => {
    return noSsnPatients;
};
const addPatient = (object) => {
    const newPatientData = (0, exports.toNewPatient)(object);
    const newPatient = Object.assign(Object.assign({}, newPatientData), { id: (0, uuid_1.v1)(), entries: [] });
    patients_1.default.push(newPatient);
    noSsnPatients.push(((_a) => {
        var { ssn: _ssn } = _a, rest = __rest(_a, ["ssn"]);
        return rest;
    })(newPatient));
    return newPatient;
};
exports.default = {
    getEntries,
    getNoSsnEntries,
    addPatient,
    findPatientById,
};
