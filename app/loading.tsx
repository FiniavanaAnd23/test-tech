"use client"; // nécessaire si tu utilises des hooks React

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
    </div>
  );
}