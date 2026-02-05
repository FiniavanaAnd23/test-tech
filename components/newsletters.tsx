"use client";

import React from "react";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="bg-secondary py-16 md:py-20">
      <div className="relative -top-12 mb-8">
        <div className="bg-linear-to-r from-primary/10 to-cyan-500/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Restez informé
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Abonnez-vous à notre newsletter pour recevoir nos dernières
                collections, offres exclusives et conseils mode.
              </p>
            </div>
            <form className="flex gap-2 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Votre email"
                className="flex-1 lg:flex-none lg:w-64 px-4 py-3 bg-background/80 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              <Button
                type="submit"
                className="bg-linear-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-primary-foreground font-medium px-6"
              >
                S'abonner
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
