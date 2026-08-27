import React from "react";
import { Star, ExternalLink } from "lucide-react";

const GOOGLE_REVIEW_URL = "YOUR_GOOGLE_REVIEW_LINK";

const GoogleReviews = () => {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">

        <div className="mx-auto max-w-2xl text-center">

          <span className="font-medium text-blue-600">
            Customer Reviews
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-600">
            See what customers have to say about
            SKR SYSTEMS and our technology services.
          </p>

          <div className="mt-8 flex flex-col items-center">

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              4.8 / 5
            </p>

            <p className="text-sm text-gray-500">
              Google Reviews
            </p>

          </div>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Review Us on Google
            <ExternalLink size={18} />
          </a>

        </div>

      </div>
    </section>
  );
};

export default GoogleReviews;