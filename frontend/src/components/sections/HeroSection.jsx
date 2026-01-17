import MealPlanPreview from "./MealPlanPreview";


const HeroSection = () => {

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-100 overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[420px] h-[420px] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-accent/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/15 text-accent font-semibold text-sm">
            ✨ AI-Powered Nutrition
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Eat smarter.
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Live healthier.
            </span>
          </h1>

          <p className="text-lg text-base-content/70 max-w-xl leading-relaxed">
            Personalized meal plans that adapt to your body, goals, and
            lifestyle — powered by AI, built for real life.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 rounded-btn font-semibold text-primary-content bg-primary hover:bg-primary/90 transition shadow-lg">
              Create Your Plan
            </button>

            <button className="px-8 py-4 rounded-btn border border-base-300 bg-base-100 hover:bg-base-200 transition font-semibold">
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT SIDE – App Preview */}
        <MealPlanPreview />
      </div>
    </section>
  );
};

export default HeroSection;
