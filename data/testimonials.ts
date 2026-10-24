/**
 * Client words, reproduced exactly as they appeared on the previous site.
 * Before relaunch, confirm each person's written consent to publication
 * (see docs/client-verification.md). Remove any entry without consent.
 */
export interface Testimonial {
  name: string
  context: string
  quote: string
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
]
