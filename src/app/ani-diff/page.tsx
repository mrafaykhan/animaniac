"use client";
import React from "react";
import AnimeComparison from "@/components/AnimeComparison";
import AboutInfoButton from "@/components/AboutInfoButton";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <AboutInfoButton />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <AnimeComparison />
      </main>
    </div>
  );
}