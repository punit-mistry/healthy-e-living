/**
 * Client words, reproduced exactly as they appeared on the previous site.
 * Before relaunch, confirm each person's written consent to publication
 * (see docs/client-verification.md). Remove any entry without consent.
 */
export interface Testimonial {
  name: string
  context: string
  quote: string
  title?: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Pulkit Agarwal",
    context: "General wellness · Mumbai",
    quote:
      "Working with Irika has been a game-changer for me. Not only is the diet tailored to my needs, but it's also realistic, enjoyable, and never boring. She truly listens, gives personal attention, and makes you feel supported every step of the way. Her guidance has helped me build a healthy relationship with food without feeling restricted. I finally feel like I'm on a path that I can stick to long-term. Highly recommended!",
  },
  {
    name: "Namrata Jain",
    context: "Body confidence & health · Mumbai",
    quote:
      "Okay so you deserve appreciation for all the hard work you have done for me. I have never been so confident about my body before. I don't have to think about looking really healthy in pictures now, I just flaunt. Of course my skin and hair are doing better than before. I have started reading labels, avoiding junk and sugar, adding cereals and veggies and paneer in my daily diet. Thank you",
  },
  {
    name: "Shweta Bansal",
    context: "Weight loss & energy",
    title: "Working with my dietician has been life changing",
    quote:
      "I can't believe the difference working with my dietician has made in my life. I lost too much weight, have more energy than ever, and feel healthier and happier overall.\n\nShe helped me understand nutrition, create balanced meal plans, and stay motivated. I have learned to make better food choices and maintain a regular exercise routine. My sleep has improved.\n\nIt's been an incredible journey and I'm so grateful for her support and guidance!! Thank you Irika (Health-E-Living)",
  },
  {
    name: "Aditya Bansal",
    context: "Diabetes & plant-based eating",
    quote:
      "My discussion with Irika started with my own belief in the benefits of a plant-based diet and how it can positively impact lifestyle diseases like diabetes, liver issues, and many other chronic conditions. I have long been convinced about its potential, and Irika acknowledged this approach and was very open to aligning the plan accordingly.\n\nHowever, being in my late 30s with diabetes and managing a demanding work schedule from 9:30 AM to 8:30 PM, following such a disciplined diet consistently was not easy. I was also clear from the beginning that I did not want to completely overhaul my kitchen or start buying a lot of new specialty products from the market.\n\nIrika respected these constraints and customized the diet plan around my routine and preferences, modifying recipes so that they aligned slightly with a plant-based approach while still being practical for my lifestyle. The focus was always on eating what benefits the body rather than just satisfying taste.\n\nWith a reasonable amount of commitment from my side, the results have been quite encouraging. My medication requirement has reduced by nearly 70%, which was a very pleasant surprise. The ultimate objective now is to completely eliminate the need for medication.\n\nWhat stands out about Irika is not only her professional knowledge but also the personal attention she gives. She was always ready with practical alternatives whenever I faced challenges in following the diet.\n\nLately, due to work pressures, I have been a bit relaxed and slightly diverted from the routine. However, I am confident that with her continued guidance, I will get back on track very soon.",
  },
]
