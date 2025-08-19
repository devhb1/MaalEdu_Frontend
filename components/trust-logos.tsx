"use client"

export function TrustLogos() {
  const partners = [
    {
      name: "Warnborough College UK",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-14%20at%2012.40.15%E2%80%AFPM-ZniUa0jKhSorxLvc8MUsdLSBRrQ5vY.png",
    },
    {
      name: "University Malaya Sabah",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-14%20at%2012.40.15%E2%80%AFPM-ZniUa0jKhSorxLvc8MUsdLSBRrQ5vY.png",
    },
    {
      name: "Malaysia Digital Status",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-14%20at%2012.40.13%E2%80%AFPM-ajFwBnvT7wugCIeBqK4dUK1Gj4uBWe.png",
    },
    {
      name: "Phenomenal Based LMS",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-14%20at%2012.40.45%E2%80%AFPM-pOeiTVUGL0jSZr9du4j5EQlB7QdaWB.png",
    },
  ]

  return (
    <section className="py-16 bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recognized & Accredited By</h2>
          <p className="text-gray-600">Our programs are globally recognized and accredited by leading institutions</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
