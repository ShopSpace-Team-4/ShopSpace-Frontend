import Image from "next/image";
import { Star } from "lucide-react";

export interface TestimonialCardProps {
  rating: number; // out of 5
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatarUrl: string;
  className?: string;
}

export default function TestimonialCard({
  rating,
  quote,
  authorName,
  authorRole,
  authorAvatarUrl,
  className = "",
}: TestimonialCardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ${className}`}
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
        “{quote}”
      </p>

      {/* Divider */}
      <div className="mt-5 border-t border-gray-100" />

      {/* Author */}
      <div className="mt-4 flex items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gray-100">
          <Image
            src={authorAvatarUrl}
            alt={authorName}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{authorName}</p>
          <p className="text-xs text-gray-500">{authorRole}</p>
        </div>
      </div>
    </div>
  );
}