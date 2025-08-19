export function BlockchainRevolutionSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="relative w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src="/assets/home-hero-2.svg"
              alt="Student with laptop - Join the Blockchain Revolution"
              className="w-96 h-96 object-contain"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Join the Blockchain Revolution at <span className="text-orange-600 dark:text-orange-400">Maal Data Lab</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors">
            Our dual diploma program equips you with the skills needed for the Web3 future. 
            Designed for all backgrounds, our flexible courses provide hands-on experience 
            and real-world insights through innovative Phenomena-Based Learning (PhBL).
          </p>
          <button className="mt-4 px-8 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
            Start Your Journey Today!
          </button>
        </div>
      </div>
    </section>
  )
}
