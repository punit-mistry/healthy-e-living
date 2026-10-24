/**
 * Permanent redirects for blog URLs retired in the redesign.
 *
 * The previous site rendered a page for every entry in its topic list
 * (~300 auto-generated posts), and Google indexed some of them. Each retired
 * URL now redirects to the most relevant page that exists today — matched on
 * the topic first, then the old category — rather than to the homepage, so
 * visitors and search engines land somewhere genuinely related.
 *
 * Plain JS (not TS) because next.config.mjs imports it.
 */
import { readFileSync } from "node:fs"

const posts = JSON.parse(readFileSync(new URL("../data/legacy-blog-posts.json", import.meta.url), "utf8"))

const A = {
  dietPlan: "/blog/best-indian-diet-plan-for-weight-loss",
  bellyFat: "/blog/how-to-lose-belly-fat-fast-with-indian-diet",
  protein: "/blog/10-best-protein-sources-for-vegetarians-in-india",
  breakfast: "/blog/healthy-indian-breakfast-ideas-for-weight-loss",
  pcos: "/blog/pcos-diet-plan-what-to-eat-and-what-to-avoid",
}

/** Topic keywords, checked in order; the first match wins. */
const topicRules = [
  [/belly|tummy|visceral/, A.bellyFat],
  [/pcos|pcod|seed-cycling|spearmint|inositol/, A.pcos],
  [/breakfast|poha|upma|idli|dosa|oats|chilla|cheela|dalia|thalipeeth/, A.breakfast],
  [/protein|vegetarian|vegan|plant-based|tofu|paneer|soy|sprouts|lentil|dal-/, A.protein],
  [/diabet|blood-sugar|glycemic|insulin|karela|bitter-gourd|fenugreek|methi|cinnamon/, "/services/diabetes-diet"],
  [/thyroid/, "/services/thyroid-diet"],
  [/pregnan|postpartum|lactation|breastfeed|fertility|conceive|trimester/, "/services/pregnancy-nutrition"],
  [/child|kids|picky|school|tiffin|lunch-box|toddler/, "/services/child-nutrition"],
  [/senior|elderly|ageing|aging|joint|arthritis/, "/services/senior-citizen-diet"],
  [/bone|calcium|osteopor|vitamin-d/, "/services/bone-health"],
  [/heart|cholesterol|blood-pressure|hypertension|dash-diet|omega|olive-oil|cooking-oil|coconut-oil|ghee/, "/services/heart-health"],
  [/kidney/, "/services/kidney-nutrition"],
  [/cancer/, "/services/cancer-nutrition-support"],
  [/gut|digest|probiotic|prebiotic|ibs|bloat|fibre|fiber|constipation|ferment|acidity/, "/services/gut-health"],
  [/allerg|intoleran|gluten|lactose/, "/services/food-allergies-intolerances"],
  [/muscle|whey|creatine/, "/services/muscle-gain"],
  [/gain-weight|weight-gain-diet|for-weight-gain/, "/services/weight-gain"],
  [/workout|sports|athlet|marathon|running|gym|fitness|exercise|electrolyte|coconut-water/, "/services/sports-nutrition"],
  [/dietitian|dietician|nutritionist|eat-out|restaurant|street-food|mumbai/, "/locations/mumbai"],
  [/weight-loss|lose-weight|fat-loss|calorie|portion|keto|low-carb|intermittent|roti|paratha|naan|rice|wheat|millet/, A.dietPlan],
]

/** Fallback by the old post's category. */
const categoryFallback = {
  "Weight Loss": A.dietPlan,
  PCOS: A.pcos,
  Diabetes: "/services/diabetes-diet",
  "Gut Health": "/services/gut-health",
  "Weight Gain": "/services/weight-gain",
  Pregnancy: "/services/pregnancy-nutrition",
  Fertility: "/services/pregnancy-nutrition",
  Thyroid: "/services/thyroid-diet",
  "Sports Nutrition": "/services/sports-nutrition",
  Fitness: "/services/sports-nutrition",
  "Heart Health": "/services/heart-health",
  "Child Nutrition": "/services/child-nutrition",
  "Senior Health": "/services/senior-citizen-diet",
  General: "/consultation",
}

export function legacyBlogDestination(slug, category) {
  for (const [pattern, destination] of topicRules) if (pattern.test(slug)) return destination
  return categoryFallback[category] ?? "/blog"
}

export const legacyBlogRedirects = posts.map(({ slug, category }) => ({
  source: `/blog/${slug}`,
  destination: legacyBlogDestination(slug, category),
  permanent: true,
}))
