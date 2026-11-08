import type { Faq } from "./services"

/**
 * The "Diwali Detox — 5-Day Festive Reset" plan, as written by
 * Dt. Irika Goyal (MSc, CDE) and supplied on 2026-11-08. The meal lines are
 * reproduced as given, apart from tidying the source document's broken wraps.
 *
 * This is the page Instagram comment-to-DM traffic lands on: people comment
 * "DETOX", get /diwali-detox in the DM, follow the plan here, and book from
 * the same page if they want something built for them.
 */

export const detoxPlan = {
  /** Bump when the plan copy changes, so sitemap lastmod stays truthful. */
  updated: "2026-11-08",
  /** Written and reviewed by the dietitian herself. */
  reviewed: "2026-11-08",
  duration: "5 days",
  structure: "4 days of reset + 1 day of normal balanced eating",
} as const

export interface Meal {
  slot: string
  food: string
}

export interface DetoxDay {
  n: number
  title: string
  blurb: string
  tone: "mint" | "butter" | "coral" | "paper"
  meals: Meal[]
}

export const detoxDays: DetoxDay[] = [
  {
    n: 1,
    title: "Light & Refresh",
    blurb: "A light, hydration-focused start to your festive reset.",
    tone: "mint",
    meals: [
      { slot: "Early morning", food: "1 cup ginger water" },
      { slot: "Breakfast", food: "1 cup papaya + 1 glass salted lemon water" },
      {
        slot: "Lunch",
        food: "1 cup curd rice + 1 cup cucumber or beetroot raita + 2 cups cooked vegetables (lauki, pumpkin, tinda, tori or ash gourd)",
      },
      { slot: "Dinner", food: "1 scoop protein shake in water + 1 bowl light vegetable soup" },
    ],
  },
  {
    n: 2,
    title: "Nourish & Recharge",
    blurb: "A day focused on wholesome foods, fibre and balanced nutrition.",
    tone: "butter",
    meals: [
      { slot: "Early morning", food: "1 glass warm lemon water with a pinch of black salt" },
      { slot: "Breakfast", food: "2 moong dal cheelas + ½ cup low-fat curd + 1 cup green tea" },
      { slot: "Mid-morning", food: "1 glass coconut water + 1 cup cucumber slices" },
      {
        slot: "Lunch",
        food: "1 bowl salad (cucumber, carrot, tomato, lettuce) + 1 bowl dal + 1 cup stir-fried vegetables + 1 portion grilled paneer or tofu",
      },
      { slot: "Evening snack", food: "1 handful roasted chana + 1 cup herbal tea" },
      { slot: "Dinner", food: "1 bowl lauki-beetroot soup + 1 cup sautéed vegetables + ½ cup curd" },
      { slot: "Bedtime", food: "1 cup saunf tea" },
    ],
  },
  {
    n: 3,
    title: "Gut-Friendly Reset",
    blurb: "A day centred on fibre-rich foods, probiotics and mindful nourishment.",
    tone: "coral",
    meals: [
      { slot: "Early morning", food: "1 glass jeera-ajwain water" },
      { slot: "Breakfast", food: "1 bowl vegetable daliya + 1 glass buttermilk" },
      { slot: "Mid-morning", food: "½ cup yogurt + 1 tsp flaxseed powder" },
      { slot: "Lunch", food: "1 bowl chole salad (chole, cucumber, onion, tomato, mint chutney) + ½ cup curd" },
      { slot: "Evening snack", food: "1 glass buttermilk + 1 tsp chia seeds" },
      { slot: "Dinner", food: "1 bowl cabbage-carrot soup + 1 portion grilled tofu" },
      { slot: "Bedtime", food: "1 cup ajwain tea" },
    ],
  },
  {
    n: 4,
    title: "Light & Energised",
    blurb: "A refreshing combination of vegetables, protein and nourishing ingredients.",
    // Mint, not butter: Day 2 is butter, and two identical cards one apart
    // made Day 4 read as a continuation of Day 3 rather than its own day.
    tone: "mint",
    meals: [
      { slot: "Early morning", food: "1 glass ginger water" },
      { slot: "Breakfast", food: "1 bowl smoothie bowl (spinach, cucumber, curd, flaxseeds, apple)" },
      { slot: "Mid-morning", food: "1 glass buttermilk + 1 tsp chia seeds" },
      { slot: "Lunch", food: "1 bowl mixed vegetable soup + 1 portion paneer tikka" },
      { slot: "Evening snack", food: "1 handful pumpkin seeds + 1 glass warm water" },
      { slot: "Dinner", food: "1 bowl moong soup + 1 cup steamed vegetables" },
      { slot: "Bedtime", food: "1 cup chamomile tea" },
    ],
  },
  {
    n: 5,
    title: "Back to Balance",
    blurb: "Time to move back to your regular balanced routine, while keeping your festive food choices mindful.",
    tone: "paper",
    meals: [
      { slot: "Early morning", food: "1 glass plain or warm water" },
      { slot: "Breakfast", food: "2 moong dal cheelas + 1 portion paneer stuffing + 1 tbsp green chutney" },
      { slot: "Mid-morning", food: "1 seasonal fruit + 5 almonds" },
      {
        slot: "Lunch",
        food: "2 multigrain rotis + 1 bowl dal + 1 bowl seasonal vegetable + 1 bowl fresh salad + ½ cup curd",
      },
      { slot: "Evening snack", food: "1 handful roasted makhana + 1 cup green tea" },
      { slot: "Dinner", food: "1 bowl vegetable khichdi + 1 bowl cucumber raita" },
      { slot: "Bedtime", food: "1 cup warm water or unsweetened herbal tea" },
    ],
  },
]

/** The daily habits that sit alongside the meals. */
export const detoxChecklist = [
  "Stay adequately hydrated through the day.",
  "Include protein in your main meals.",
  "Eat slowly and practise portion control.",
  "Avoid sugary beverages and excess packaged foods.",
  "Include 30–45 minutes of light to moderate physical activity, as appropriate.",
  "Prioritise 7–8 hours of quality sleep.",
  "Avoid unnecessary snacking and mindless eating.",
]

export const detoxFaqs: Faq[] = [
  {
    question: "Is this a detox that flushes out toxins?",
    answer:
      "No, and it isn't meant to be. Your body already has its own detoxification systems — mainly the liver and the kidneys — and no food or drink replaces them. What this plan does is bring back structure: regular meals, enough water, more vegetables and protein, and less of the mithai-and-namkeen grazing that creeps in over a festive week.",
  },
  {
    question: "How soon after Diwali should I start the detox?",
    answer:
      "Whenever the festivities wind down for you — the day after Bhai Dooj suits most people. There is no need to start on an exact date, and no benefit in punishing yourself for what you ate. Begin on the next ordinary morning you have.",
  },
  {
    question: "Will I lose weight in 5 days?",
    answer:
      "The scale may drop a little, but most of that is water and food weight rather than fat. Treat these five days as a reset of habits, not a weight-loss programme. Lasting change comes from what you eat in the weeks that follow, which is what a personalised plan is for.",
  },
  {
    question: "Can I follow this plan if I have diabetes, PCOS, a thyroid condition or kidney disease?",
    answer:
      "Not unchanged. This is a general plan for healthy adults. If you live with diabetes, PCOS, a thyroid condition or kidney disease, or you are pregnant, breastfeeding or on regular medication, the portions and food choices need adjusting for you — speak to Dt. Irika Goyal, or to your own doctor or dietitian, first.",
  },
  {
    question: "I am vegetarian or vegan — does this work for me?",
    answer:
      "The plan is already vegetarian. If you are vegan, swap curd for a soy or coconut curd, buttermilk for a plant-based chaas or jeera water, paneer for tofu, and choose a plant protein powder. The structure stays exactly the same.",
  },
  {
    question: "Do I need to buy supplements, detox teas or juices?",
    answer:
      "No. Apart from one optional scoop of protein powder on Day 1, everything here is regular Indian kitchen food. There is nothing to buy from us, and you do not need any detox teas, juices or cleanses.",
  },
  {
    question: "What do I do on Day 6?",
    answer:
      "Day 5 is already your bridge back to normal eating, so carry that shape forward: protein at every meal, half your plate vegetables, water through the day, and sweets as something you enjoy occasionally rather than daily. If you would like a plan built around your own routine, preferences and reports, that is what a consultation is for.",
  },
]
