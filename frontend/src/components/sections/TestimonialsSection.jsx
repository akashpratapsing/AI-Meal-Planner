const TestimonialSection = () => {
  const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
      name: 'Sarah Mitchell',
      handle: '@sarahfit',
      date: 'Dec 15, 2024',
      text: 'Lost 15 pounds in 2 months! The meal plans are so easy to follow and actually delicious.'
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
      name: 'Mike Johnson',
      handle: '@mikejfit',
      date: 'Jan 3, 2025',
      text: 'Finally hit my protein goals consistently. The macro tracking changed everything for me.'
    },
    {
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
      name: 'Emily Chen',
      handle: '@emilyeats',
      date: 'Nov 28, 2024',
      text: 'As a busy mom, this app saves me hours every week. No more meal planning stress!'
    },
    {
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
      name: 'David Park',
      handle: '@davidgains',
      date: 'Dec 20, 2024',
      text: 'Gained 8 pounds of muscle while staying lean. The customization is incredible.'
    },
    {
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
      name: 'Jessica Taylor',
      handle: '@jesstaylor',
      date: 'Jan 8, 2025',
      text: 'The variety keeps me motivated. Never thought healthy eating could be this enjoyable!'
    },
    {
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200',
      name: 'Alex Rivera',
      handle: '@alexfitness',
      date: 'Dec 5, 2024',
      text: 'Best investment in my health. The AI recommendations are spot-on every time.'
    },
  ];

  // Double the testimonials for seamless loop
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="py-20 bg-base-200 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
          Loved by <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">10,000+</span> users
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          See what our community has to say about their transformation journey
        </p>
      </div>

      {/* First Marquee Row */}
      <div className="relative w-full mx-auto max-w-7xl mb-8 overflow-hidden">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-base-200 via-base-200 to-transparent"></div>
        
        {/* Scrolling Content */}
        <div className="flex gap-6 animate-marquee">
          {doubledTestimonials.map((testimonial, index) => (
            <div
              key={`row1-${index}`}
              className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-80 shrink-0 border border-base-300 hover:border-primary/30"
            >
              <div className="flex gap-3 mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-base-content">{testimonial.name}</p>
                    <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="oklch(62% 0.26 285)" />
                    </svg>
                  </div>
                  <span className="text-sm text-base-content/60">{testimonial.handle}</span>
                </div>
              </div>
              <p className="text-base-content/80 mb-4 leading-relaxed">
                {testimonial.text}
              </p>
              <div className="flex items-center justify-between text-base-content/50 text-sm">
                <div className="flex items-center gap-2">
                  <span>Posted on</span>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
                    </svg>
                  </a>
                </div>
                <p>{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

                
        {/* Right Fade */}
        <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-base-200 via-base-200 to-transparent"></div>
      </div>

      {/* Second Marquee Row (Reverse) */}
      <div className="relative w-full mx-auto max-w-7xl overflow-hidden">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-base-200 via-base-200 to-transparent"></div>
        
        {/* Scrolling Content */}
        <div className="flex gap-6 animate-marquee-reverse">
          {doubledTestimonials.map((testimonial, index) => (
            <div
              key={`row2-${index}`}
              className="bg-base-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-80 shrink-0 border border-base-300 hover:border-primary/30"
            >
              <div className="flex gap-3 mb-4">
                <img
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-base-content">{testimonial.name}</p>
                    <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="oklch(62% 0.26 285)" />
                    </svg>
                  </div>
                  <span className="text-sm text-base-content/60">{testimonial.handle}</span>
                </div>
              </div>
              <p className="text-base-content/80 mb-4 leading-relaxed">
                {testimonial.text}
              </p>
              <div className="flex items-center justify-between text-base-content/50 text-sm">
                <div className="flex items-center gap-2">
                  <span>Posted on</span>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
                    </svg>
                  </a>
                </div>
                <p>{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-base-200 via-base-200 to-transparent"></div>
      </div>
    </div>
  );
};

export default TestimonialSection;