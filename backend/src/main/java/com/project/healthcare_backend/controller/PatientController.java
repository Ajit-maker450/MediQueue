package com.project.healthcare_backend.controller;

import com.project.healthcare_backend.model.Patient;
import com.project.healthcare_backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    //  Add Patient
    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return patientService.addPatient(patient);
    }

    // Get highest priority patient
    @GetMapping("/next")
    public Patient getNextPatient() {
        return patientService.getNextPatient();
    }

    //  Get all active patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // Get history
    @GetMapping("/history")
    public List<Patient> getPatientHistory() {
        return patientService.getPatientHistory();
    }

    // Attend patient (soft delete)
    @PutMapping("/{id}/attend")
    public void attendPatient(@PathVariable String id) {
        patientService.attendPatient(id);
    }

    // Hard remove
    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable String id) {
        patientService.deletePatient(id);
    }
}