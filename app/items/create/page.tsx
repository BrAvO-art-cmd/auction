"use client";

import { Input } from "../../../src/components/ui/input"
import { Button } from "../../../src/components/ui/button";
import { createItemAction } from "./actions";
import { DatePickerDemo } from "@/components/datepicker";
import React from "react";
import { useState } from "react"

export default function CreatePage() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <main className="container mx-auto py-12 space-y-4">
      <h1 className="text-4xl font-bold">
        Post an Item
      </h1>
      <form className="flex flex-col border p-8 rounded-xl space-y-4 max-w-md"
        action={createItemAction}
        encType="multipart/form-data"
        >
        <Input required className="max-w-md" name="name" placeholder="Name your item" />
        <Input 
          required
          className="max-w-md" 
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="Base Price" 
        />
        <div>
          <label className="block text-sm font-medium mb-2">Upload Photo</label>
          <Input 
            required
            type="file" 
            name="image" 
            accept="image/*"
            className="max-w-md"
          />
        </div>
        <DatePickerDemo 
        date={date}
        setDate={setDate} />
        <Button className="self-end" type="submit">Post Item</Button>
      </form>
    </main>
  );
}
