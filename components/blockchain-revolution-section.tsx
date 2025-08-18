"use client"

export function BlockchainRevolutionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src="/assets/pic 1.png"
              alt="Student with laptop"
              className="w-80 h-80 object-cover rounded-full border-8 border-white shadow-xl"
            />
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xs shadow">HTML</div>
            <div className="absolute top-10 right-0 w-10 h-10 bg-blue-100 rounded-full"></div>
            <div className="absolute bottom-10 left-0 w-8 h-8 bg-green-100 rounded-full"></div>
            <div className="absolute bottom-0 right-10 w-8 h-8 bg-purple-100 rounded-full"></div>
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Join the Blockchain Revolution at <span className="text-orange-600">Maal Data Lab</span>
          </h2>
          <p className="text-gray-700 mb-4">
            Our dual diploma program equips you with the skills needed for the Web3 future. Designed for all backgrounds, our flexible courses provide hands-on experience and real-world insights through innovative Phenomena-Based Learning (PhBL).
          </p>
          <button className="mt-4 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">Start Your Journey Today!</button>
        </div>
      </div>
    </section>
  )
}
