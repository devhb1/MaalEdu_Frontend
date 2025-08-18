"use client"

export function TrustLogos() {
  const partners = [
    { name: "Amazon Web Services", logo: "/assets/Group 32.png" },
    { name: "Microsoft Azure", logo: "/assets/Group 38.png" },
    { name: "coincover", logo: "/assets/Group 508.png" },
    { name: "Fireblocks", logo: "/assets/Group 534.png" },
  ];

  return (
    <section className="py-8 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2 md:mb-0">Trusted By Employees at Leading Organizations</p>
          <div className="flex gap-8 items-center overflow-x-auto">
            {partners.map((partner, idx) => (
              <img
                key={idx}
                src={partner.logo}
                alt={partner.name}
                className="h-8 w-auto grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
