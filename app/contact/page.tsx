"use client";

import React from "react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Merci pour votre message! Nous vous répondrons bientôt.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl font-light text-foreground mb-4">
              Nous Contacter
            </h1>
            <p className="text-lg text-muted-foreground">
              Nous serions ravis d'entendre parler de vous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-card rounded-lg p-8">
              <Mail className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-light text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">contact@OpticApp.com</p>
            </div>

            <div className="bg-card rounded-lg p-8">
              <Phone className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-light text-foreground mb-2">
                Téléphone
              </h3>
              <p className="text-muted-foreground">+261 XX XX XXX XX</p>
            </div>

            <div className="bg-card rounded-lg p-8">
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-light text-foreground mb-2">
                Adresse
              </h3>
              <p className="text-muted-foreground">Antananarivo, Madagascar</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-light text-foreground mb-6">
                Formulaire de Contact
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-light text-foreground mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-card border border-border rounded text-foreground"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-card border border-border rounded text-foreground"
                    placeholder="votre.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-card border border-border rounded text-foreground"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-card border border-border rounded text-foreground"
                    placeholder="Votre message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground py-3 rounded font-light hover:bg-accent/90 transition-colors"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            <div className="bg-card rounded-lg p-8">
              <h2 className="text-2xl font-light text-foreground mb-6">
                À propos de nous
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                OpticApp est une lunetterie premium spécialisée dans la création
                de montures élégantes et intemporelles. Nous croyons que les
                lunettes sont bien plus qu'un accessoire - elles sont une
                expression de style personnel.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Chaque paire de lunettes est conçue avec soin, utilisant les
                meilleurs matériaux et techniques de fabrication pour garantir
                confort et durabilité.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Notre équipe dévouée est toujours disponible pour vous aider à
                trouver la paire parfaite qui correspond à votre style et à vos
                besoins de vision.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
