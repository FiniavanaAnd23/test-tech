"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! Page non trouvée.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-secondary rounded-lg hover:bg-primary hover:text-white transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
