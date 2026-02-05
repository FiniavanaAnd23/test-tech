"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  Truck,
  CreditCard,
  Sparkles,
  Eye,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Fond avec gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-primary/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 py-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="shrink-0 group">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-linear-to-r from-primary to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative flex items-center justify-center w-10 h-10 bg-linear-to-br from-primary to-primary/80 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                    OPTIC<span className="text-primary">APP</span>
                  </div>
                  <p className="text-xs font-light text-muted-foreground tracking-wider">
                    LUNETTERIE D'EXCELLENCE
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Votre destination premium pour des lunettes qui allient style,
              confort et technologie de pointe. Redécouvrez le monde avec
              clarté.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Garantie 2 ans</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" />
                <span>Livraison gratuite</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/collections", label: "Collections" },
                { href: "/brands", label: "Marques" },
                { href: "/homme", label: "Homme" },
                { href: "/femme", label: "Femme" },
                { href: "/enfant", label: "Enfant" },
                { href: "/solaire", label: "Lunettes solaires" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary/0 rounded-full group-hover:bg-primary transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/faq", label: "FAQ & Aide" },
                { href: "/contact", label: "Contactez-nous" },
                { href: "/retours", label: "Retours & Échanges" },
                { href: "/conditions", label: "Conditions générales" },
                { href: "/confidentialite", label: "Confidentialité" },
                { href: "/livraison", label: "Livraison & Expédition" },
                { href: "/points-de-vente", label: "Points de vente" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary/0 rounded-full group-hover:bg-primary transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Appelez-nous
                  </p>
                  <p className="text-sm text-muted-foreground">
                    +261 34 00 000 00
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">
                    contact@optic-app.mg
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Adresse</p>
                  <p className="text-sm text-muted-foreground">
                    Antananarivo 101
                    <br />
                    Madagascar
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <p className="text-sm font-medium text-foreground mb-4">
                Suivez-nous
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Youtube, href: "#", label: "YouTube" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-lg transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8 pb-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear}{" "}
                <span className="font-medium text-foreground">OpticApp</span>.
                Tous droits réservés.
                <span className="block lg:inline lg:ml-2 text-xs mt-1 lg:mt-0">
                  Conçu avec{" "}
                  <Heart className="w-3 h-3 inline mx-1 text-red-500" /> par
                  Finiavana Andrianirina
                </span>
              </p>
            </div>

            {/* Payment methods & Language */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Payment methods */}
              <div className="flex items-center gap-4">
                <div className="text-xs text-muted-foreground">
                  Paiements sécurisés :
                </div>
                <div className="flex gap-2">
                  {["Visa", "Mastercard", "PayPal", "Mvola"].map((method) => (
                    <div
                      key={method}
                      className="px-3 py-1.5 bg-muted/50 text-xs font-medium rounded-md text-muted-foreground"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>

              {/* Language selector */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-linear-to-r from-blue-500 to-red-500 rounded-sm"></div>
                <select className="text-sm bg-transparent border-none focus:outline-none text-muted-foreground">
                  <option>FR</option>
                  <option>EN</option>
                  <option>MG</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground/70">
              OpticApp est une marque déposée. Les prix incluent la TVA. Les
              images sont non contractuelles.
            </p>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          asChild
          className="rounded-full w-14 h-14 bg-linear-to-br from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 shadow-xl hover:shadow-2xl transition-all group"
        >
          <Link href="/contact">
            <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </Link>
        </Button>
      </div>
    </footer>
  );
}
