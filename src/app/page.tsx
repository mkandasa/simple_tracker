"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export default function HealthTracker() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    weight: "",
    glucoseFasting: "",
    glucosePP: "",
    hba1c: "",
    bp: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setEntries([form, ...entries]);
    setForm({ ...form, weight: "", glucoseFasting: "", glucosePP: "", hba1c: "", bp: "", notes: "" });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Murugesan Health Tracker</h1>

      <Card className="mb-4">
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          {[
            { name: "date", label: "Date", type: "date" },
            { name: "time", label: "Time", type: "time" },
            { name: "weight", label: "Weight (kg)", type: "number" },
            { name: "glucoseFasting", label: "Fasting Glucose (mg/dL)", type: "number" },
            { name: "glucosePP", label: "Post-meal Glucose (mg/dL)", type: "number" },
            { name: "hba1c", label: "HbA1c (%)", type: "number", step: "0.1" },
            { name: "bp", label: "Blood Pressure", type: "text" },
            { name: "notes", label: "Notes", type: "text" }
          ].map(({ name, label, type, step }) => (
            <div key={name}>
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                name={name}
                type={type}
                step={step}
                value={form[name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </CardContent>
        <div className="p-4">
          <Button onClick={handleSubmit}>Add Entry</Button>
        </div>
      </Card>

      <h2 className="text-xl font-semibold mb-2">Recent Entries</h2>
      {entries.length === 0 && <p className="text-gray-500">No entries yet.</p>}
      {entries.map((entry, index) => (
        <Card key={index} className="mb-2">
          <CardContent className="p-4 text-sm">
            <p><strong>{entry.date}</strong> at {entry.time}</p>
            <p>Weight: {entry.weight} kg</p>
            <p>Fasting Glucose: {entry.glucoseFasting} mg/dL</p>
            <p>Post-meal Glucose: {entry.glucosePP} mg/dL</p>
            <p>HbA1c: {entry.hba1c}%</p>
            <p>BP: {entry.bp}</p>
            <p>Notes: {entry.notes}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
