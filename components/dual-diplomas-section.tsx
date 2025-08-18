"use client"

export function DualDiplomasSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Blockchain <span className="text-orange-600">Dual Diplomas</span> & Corporate Training
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black text-white rounded-2xl p-8 flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-2">Professional & Academic Diplomas in Blockchain Technology Management</h3>
            <p className="text-gray-200 text-sm">Earn professional and academic diplomas in Blockchain Technology Management. Learn blockchain systems, smart contracts, and decentralized applications with a practical, industry-focused approach.</p>
          </div>
          <div className="bg-orange-600 text-white rounded-2xl p-8 flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-2">Corporate Blockchain Training</h3>
            <p className="text-orange-100 text-sm">Equip your team with hands-on blockchain skills to boost efficiency, security, and innovation. Our hands-on sessions provide practical insights into blockchain technology in today's rapidly evolving digital landscape.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
