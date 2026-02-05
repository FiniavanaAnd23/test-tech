"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Eye, ChevronDown, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setGlowPosition({ x, y });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background py-12 md:py-0">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient mesh background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at ${100 - glowPosition.x}% ${100 - glowPosition.y}%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)
            `,
            transition: "background-position 0.3s ease-out",
          }}
        />

        {/* Animated floating elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-br from-primary/10 to-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-tr from-primary/5 to-cyan-500/5 rounded-full blur-3xl animate-float-delayed" />

        {/* Geometric patterns */}
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-primary/10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-primary/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/10 to-cyan-500/10 backdrop-blur-sm rounded-full border border-primary/20 animate-pulse">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Nouvelle Collection 2026
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  Conçu pour les
                </span>
                <span className="block bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  Rêveurs Visionnaires
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                Redécouvrez le monde avec une{" "}
                <span className="relative inline-block">
                  <span className="text-primary font-medium">
                    clarté exceptionnelle
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-primary to-cyan-500 rounded-full"></span>
                </span>
                . Chaque regard devient une œuvre d'art.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="text-left">
                <div className="text-3xl font-bold text-primary flex items-center gap-2">
                  <span>4.9</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Satisfaction client
                </p>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  2000+
                </div>
                <p className="text-sm text-muted-foreground">Paires vendues</p>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  24h
                </div>
                <p className="text-sm text-muted-foreground">Essai virtuel</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="group px-8 py-6 text-lg bg-linear-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-primary-foreground font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <Link href="/products">
                  <span className="flex items-center gap-3 relative z-10">
                    Explorer la collection
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-linear-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group px-8 py-6 text-lg rounded-full border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Link href="/essayage-3d" className="flex items-center gap-3">
                  <Eye className="w-5 h-5" />
                  Essayer en 3D
                  <span className="ml-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full animate-pulse">
                    NOUVEAU
                  </span>
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Recommandé par
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                {["Forbes", "Vogue", "GQ", "Elle"].map((brand) => (
                  <div
                    key={brand}
                    className="px-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-border"
                  >
                    <span className="text-sm font-medium text-foreground/70">
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Featured Product */}
          <div className="relative animate-in fade-in slide-in-from-right duration-1000">
            <div className="relative">
              {/* Main product container */}
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-cyan-500/20 rounded-3xl blur-2xl animate-pulse-slow" />

                {/* Product frame */}
                <div className="relative bg-linear-to-br from-background via-background to-secondary/50 rounded-3xl p-12 border border-primary/20 backdrop-blur-sm shadow-2xl group hover:scale-[1.02] transition-all duration-500">
                  {/* Featured badge */}
                  <div className="absolute -top-3 -right-3 z-20">
                    <div className="px-4 py-2 bg-linear-to-r from-primary to-cyan-500 text-primary-foreground font-bold rounded-full shadow-lg animate-bounce-slow">
                      #1 VENTES
                    </div>
                  </div>

                  {/* Lens reflection effect */}
                  <div className="absolute inset-12 rounded-full bg-linear-to-br from-white/10 to-transparent blur-sm" />

                  {/* Product display */}
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <p className="text-sm font-light text-primary mb-2">
                        Produit Vedette
                      </p>
                      <h3 className="text-2xl font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                        Édition Limitée
                      </h3>
                    </div>

                    {/* Animated glasses */}
                    <div className="relative mx-auto w-48 h-48 flex items-center justify-center">
                      <div className="text-8xl opacity-90 animate-float-delayed">
                        👓
                      </div>

                      {/* Glowing effect */}
                      <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/10 to-primary/0 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700" />
                    </div>

                    {/* Floating particles */}
                    <div className="absolute top-12 left-12 w-3 h-3 bg-primary rounded-full animate-float" />
                    <div className="absolute bottom-12 right-12 w-2 h-2 bg-cyan-500 rounded-full animate-float-delayed" />
                    <div className="absolute top-1/2 left-8 w-4 h-4 bg-primary/50 rounded-full animate-float-slow" />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-primary/0 via-transparent to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating info cards */}
                <div className="absolute -left-8 top-1/4 animate-slide-in-left">
                  <div className="p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-primary/20 shadow-lg">
                    <p className="text-sm font-medium text-primary">
                      Verres anti-reflets
                    </p>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-1/4 animate-slide-in-right">
                  <div className="p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-primary/20 shadow-lg">
                    <p className="text-sm font-medium text-primary">
                      Titane ultra-léger
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes slide-in-left {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 1s;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite 2s;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out 0.5s;
        }
      `}</style>
    </section>
  );
}
