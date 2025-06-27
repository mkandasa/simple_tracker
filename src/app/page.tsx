"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

interface HealthEntry {
  date: string;
  time: string;
  weight: string;
  glucoseFasting: string;
  glucosePP: string;
  hba1c: string;
  bp: string;
  notes: string;
}

export default function HealthTracker() {
  const [entries, setEntries] = useState<HealthEntry[]>([]);
  const [form, setForm] = useState<Omit<HealthEntry, 'date' | 'time'>>({
    weight: "",
    glucoseFasting: "",
    glucosePP: "",
    hba1c: "",
    bp: "",
    notes: ""
  });

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const currentTime = format(new Date(), "HH:mm");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newEntry: HealthEntry = {
      date: currentDate,
      time: currentTime,
      ...form
    };
    setEntries(prev => [newEntry, ...prev]);
    setForm({
      weight: "",
      glucoseFasting: "",
      glucosePP: "",
      hba1c: "",
      bp: "",
      notes: ""
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Murugesan Health Tracker</h1>

      <Card className="mb-4">
        <form onSubmit={handleSubmit}>
          <CardContent className="grid grid-cols-2 gap-4 p-4">
            {[
              { name: "date" as const, label: "Date", type: "date", value: currentDate, readOnly: true },
              { name: "time" as const, label: "Time", type: "time", value: currentTime, readOnly: true },
              { name: "weight" as const, label: "Weight (kg)", type: "number" },
              { name: "glucoseFasting" as const, label: "Fasting Glucose (mg/dL)", type: "number" },
              { name: "glucosePP" as const, label: "Post-meal Glucose (mg/dL)", type: "number" },
              { name: "hba1c" as const, label: "HbA1c (%)", type: "number", step: "0.1" },
              { name: "bp" as const, label: "Blood Pressure", type: "text" },
              { name: "notes" as const, label: "Notes", type: "text" }
            ].map(({ name, label, type, step, readOnly, value }) => (
              <div key={name}>
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  step={step}
                  value={name in form ? form[name as keyof typeof form] : value}
                  onChange={name in form ? handleChange : undefined}
                  readOnly={readOnly}
                  className={readOnly ? "bg-gray-100" : ""}
                />
              </div>
            ))}
          </CardContent>
          <div className="p-4">
            <Button type="submit">Add Entry</Button>
          </div>
        </form>
      </Card>

      <h2 className="text-xl font-semibold mb-2">Recent Entries</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500">No entries yet.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-2">
                <p className="font-medium">{entry.date} at {entry.time}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Weight: <span className="font-medium">{entry.weight} kg</span></p>
                  <p>Fasting Glucose: <span className="font-medium">{entry.glucoseFasting} mg/dL</span></p>
                  <p>Post-meal Glucose: <span className="font-medium">{entry.glucosePP} mg/dL</span></p>
                  <p>HbA1c: <span className="font-medium">{entry.hba1c}%</span></p>
                  <p>BP: <span className="font-medium">{entry.bp}</span></p>
                  {entry.notes && (
                    <p className="col-span-2 text-gray-700">
                      <span className="font-medium">Notes:</span> {entry.notes}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
