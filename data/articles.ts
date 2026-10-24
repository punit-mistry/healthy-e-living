import { refs, type Reference } from "./references"
import type { ArtKey, Faq } from "./services"

/**
 * Journal articles.
 *
 * Inline links use a tiny, safe syntax: [anchor text](/internal-path).
 * Only internal paths are turned into links.
 *
 * REVIEW GATE: an article is indexable, and shows a "medically reviewed"
 * byline, only once `review` is filled in by Dt. Irika Goyal. Until then the
 * page renders with `noindex` and a visible "awaiting review" note.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; title: string; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }

export interface ArticleCategory {
  slug: string
  name: string
}

export interface Article {
  slug: string
  title: string
  metaTitle: string
  description: string
  category: ArticleCategory
  art: ArtKey
  /** Direct, quotable answer shown at the top of the article. */
  shortAnswer: string
  published: string
  updated: string
  review: { by: string; on: string } | null
  body: Block[]
  faqs: Faq[]
  references: Reference[]
  relatedServices: string[]
}

export const categories = {
  weightLoss: { slug: "weight-loss", name: "Weight loss" },
  nutrition: { slug: "nutrition", name: "Nutrition basics" },
  recipes: { slug: "recipes", name: "Recipes & meal ideas" },
  pcos: { slug: "pcos", name: "PCOS" },
} satisfies Record<string, ArticleCategory>

export const articles: Article[] = [
  {
    slug: "best-indian-diet-plan-for-weight-loss",
    title: "An Indian diet plan for weight loss that you can actually live with",
    metaTitle: "Indian Diet Plan for Weight Loss",
    description:
      "How to build a weight-loss plan from everyday Indian home food — the plate method, a sample day, where extra calories hide, and a realistic pace.",
    category: categories.weightLoss,
    art: "plate",
    shortAnswer:
      "The best Indian diet plan for weight loss is built on the food you already eat: about half your plate as vegetables, a good portion of protein such as dal, paneer, curd, eggs or fish, a measured portion of rice, roti or millet, and fewer fried snacks, sweets and sugary drinks. For most adults, losing about 0.5–1 kg a week is a realistic, sustainable pace.",
    published: "2026-10-24",
    updated: "2026-10-24",
    review: null,
    body: [
      { type: "h2", id: "why-indian", text: "Why your plan should look like your kitchen" },
      { type: "p", text: "Many weight-loss plans are copied from elsewhere — quinoa bowls, imported salads, smoothies that don't suit a family kitchen. They tend to fall apart within weeks because they ask you to cook and eat like someone else." },
      { type: "p", text: "Indian food is already a great base. Dals, sabzis, curd, sprouts, millets and fresh chutneys are nourishing and filling. The ICMR–National Institute of Nutrition's Dietary Guidelines for Indians encourage exactly this kind of varied diet: plenty of vegetables, fruit and pulses, whole grains in place of refined ones, and less salt, sugar and fried food." },
      { type: "h2", id: "plate-method", text: "The plate method, Indian style" },
      { type: "p", text: "Instead of counting every calorie, start by changing the shape of your plate at lunch and dinner:" },
      { type: "ul", items: [
        "Half the plate: vegetables — a sabzi, a salad or kachumber, or a vegetable raita.",
        "A quarter: protein — dal, chana, rajma, paneer, tofu, curd, eggs, fish or chicken.",
        "A quarter: grain — one or two phulkas, a small katori of rice, or a millet bhakri.",
        "A little fat for cooking and flavour — measured with a spoon rather than poured.",
      ] },
      { type: "p", text: "Protein and fibre do most of the work here. They help you feel full on a smaller portion of grain, which is usually where the biggest difference in calories comes from." },
      { type: "h2", id: "sample-day", text: "A sample day (vegetarian, with easy swaps)" },
      { type: "note", title: "This is an example, not a prescription", text: "Portions depend on your body size, activity, health conditions and medicines. If you have diabetes, kidney disease, a thyroid condition, are pregnant or take insulin, please get personalised advice before making big changes." },
      { type: "table", caption: "One example day of eating", head: ["When", "What", "Swap ideas"], rows: [
        ["Breakfast", "Vegetable poha with peanuts and a katori of curd", "Moong dal chilla with mint chutney; 2–3 idlis with sambar"],
        ["Mid-morning", "A piece of fruit — guava, apple, papaya or orange", "A glass of buttermilk"],
        ["Lunch", "2 phulkas, 1 katori dal, 1 katori sabzi, salad", "1 katori rice in place of phulkas; rajma or chole for the dal"],
        ["Evening", "Roasted chana and tea with less sugar", "Sprouts chaat; a handful of peanuts"],
        ["Dinner", "Paneer or tofu bhurji, a sabzi and 1 roti", "Vegetable khichdi with curd; dal with a millet bhakri"],
      ] },
      { type: "h2", id: "hidden-calories", text: "Where extra calories usually hide" },
      { type: "p", text: "Most people don't gain weight from dal-chawal. It tends to come from the extras around it:" },
      { type: "ul", items: [
        "Oil — generous tadkas, rich gravies, pooris, pakoras and parathas",
        "Tea-time snacks — biscuits, namkeen, khari and rusks, often without noticing",
        "Sweets and sugary drinks, including packaged fruit juices",
        "Large rice portions late in the evening",
        "Restaurant and takeaway portions, which are often double a home serving",
        "Alcohol, and the snacks that come with it",
      ] },
      { type: "p", text: "The World Health Organization recommends keeping free sugars below 10% of your daily energy, and ideally below 5%. Cutting back on sugary drinks and sweets is one of the simplest ways to do that." },
      { type: "h2", id: "pace", text: "A realistic pace — and better ways to measure it" },
      { type: "p", text: "Losing about half a kilogram to one kilogram a week is realistic for most adults. Faster loss is harder to sustain and more likely to include muscle." },
      { type: "p", text: "Even modest loss is worthwhile. In people with type 2 diabetes and excess weight, losing 5–10% of body weight has been shown to improve blood sugar, blood pressure and cholesterol. It's also worth knowing that for Asian Indians, health risks start at a lower BMI than international cut-offs suggest, so your waist measurement is a useful number to track alongside the scale." },
      { type: "h2", id: "get-help", text: "When to get personalised help" },
      { type: "p", text: "A general plan is a good start, but it can't account for your medicines, blood reports, work hours or food preferences. If you've tried before and struggled, or you're managing a health condition, [personalised weight management support](/services/weight-loss) can make the plan fit your life — rather than the other way round." },
    ],
    faqs: [
      { question: "Can I lose weight and still eat rice?", answer: "Yes. A measured portion of rice, paired with dal, vegetables and curd, fits well into a weight-loss plan. The portion and what you pair it with matter more than avoiding rice completely." },
      { question: "Is intermittent fasting better for weight loss?", answer: "Some people find that eating within a set window helps them eat less overall. Research so far suggests it works about as well as other ways of reducing calories, not better. It isn't suitable for everyone — for example, people who are pregnant, have a history of disordered eating, or take insulin or certain diabetes tablets." },
      { question: "How many meals a day should I eat?", answer: "There's no single right number. Three meals with one or two planned snacks suits many people, but the best rhythm is the one that keeps you from getting overly hungry." },
    ],
    references: [refs.ninGuidelines, refs.whoHealthyDiet, refs.whoObesity, refs.modestWeightLoss, refs.asianBmi],
    relatedServices: ["weight-loss", "fat-loss", "diabetes-diet"],
  },
  {
    slug: "how-to-lose-belly-fat-fast-with-indian-diet",
    title: "Belly fat and Indian food: what actually helps (and what doesn't)",
    metaTitle: "How to Lose Belly Fat: What Actually Helps",
    description:
      "There's no fast fix for belly fat, but there is a reliable one. What helps, what doesn't, how to measure your waist, and Indian-food ideas that support it.",
    category: categories.weightLoss,
    art: "kite",
    shortAnswer:
      "You can't burn fat from your belly alone — no food, drink or exercise targets one spot. Belly fat reduces with overall fat loss: a modest calorie deficit, enough protein and fibre, regular movement including strength training, good sleep and less alcohol. For Asian Indian adults, a waist of 90 cm or more in men, or 80 cm or more in women, is a signal to take action.",
    published: "2026-10-24",
    updated: "2026-10-24",
    review: null,
    body: [
      { type: "h2", id: "why-it-matters", text: "Why belly fat matters more than the number on the scale" },
      { type: "p", text: "Fat stored deep in the abdomen, around the organs, is linked with a higher risk of type 2 diabetes and heart disease. Many South Asians tend to carry more fat around the middle at a lower body weight, which is why expert groups recommend lower BMI and waist cut-offs for Asian Indians than for people of European descent." },
      { type: "h2", id: "measure", text: "Measure it first" },
      { type: "p", text: "Use a soft tape. Stand relaxed, breathe out gently, and measure around your middle halfway between your lowest rib and the top of your hip bone. Write it down and re-measure every two to four weeks, at the same time of day." },
      { type: "p", text: "Indian consensus guidelines suggest that a waist of 90 cm or more in men, or 80 cm or more in women, indicates abdominal obesity and is worth discussing with your doctor." },
      { type: "h2", id: "what-helps", text: "What actually helps" },
      { type: "ol", items: [
        "A modest calorie deficit. Overall fat loss is what shrinks the waist. A smaller, steady deficit is easier to keep up than a crash diet.",
        "Protein and fibre at every meal. Dal, sprouts, curd, paneer, eggs and plenty of vegetables keep you full while eating less.",
        "Fewer refined carbohydrates and added sugars. Sugary drinks, sweets, white-flour snacks and large late-night portions of rice add up quickly.",
        "Less fried food. Pakoras, samosas and namkeen are some of the most calorie-dense foods on the plate.",
        "Less alcohol. It adds calories and tends to bring salty, fried snacks with it.",
        "Regular movement. The WHO recommends at least 150–300 minutes of moderate activity a week, such as brisk walking, plus muscle-strengthening activity on two or more days.",
        "Sleep and stress. Short sleep and high stress make cravings and late-night snacking much harder to manage.",
      ] },
      { type: "h2", id: "what-doesnt", text: "What doesn't work (however often you see it)" },
      { type: "ul", items: [
        "Jeera water, lemon-honey water or apple cider vinegar as 'fat burners' — fine as drinks, but they don't melt fat.",
        "'Belly-fat' teas and detox drinks — at best they cause water loss, which returns.",
        "Endless crunches — they strengthen the muscles underneath, but don't burn the fat on top.",
        "Skipping meals and then overeating at night.",
      ] },
      { type: "h2", id: "indian-day", text: "An Indian-food day that supports a smaller waist" },
      { type: "ul", items: [
        "Breakfast: besan or moong chilla with grated vegetables, and curd.",
        "Lunch: 1–2 phulkas, dal, a big portion of sabzi and salad.",
        "Evening: roasted chana or sprouts chaat, with tea that has less sugar.",
        "Dinner: grilled fish, chicken, paneer or tofu with vegetables, and a smaller grain portion.",
      ] },
      { type: "p", text: "None of these are special 'belly fat foods'. They simply make a modest calorie deficit easier to live with." },
      { type: "h2", id: "how-long", text: "How long does it take?" },
      { type: "p", text: "Expect weeks to months, not days. A steady drop of a few centimetres over a couple of months is real progress. If you'd like a plan built around your own routine and health, [fat loss and body-composition support](/services/fat-loss) focuses on exactly this — losing fat while protecting muscle." },
    ],
    faqs: [
      { question: "Does jeera or lemon water burn belly fat?", answer: "No. They're fine drinks and can replace sugary ones, which helps indirectly, but no drink burns fat from the belly." },
      { question: "Will crunches give me a flat stomach?", answer: "Crunches strengthen your abdominal muscles, but they don't remove the fat on top of them. Overall fat loss is what reveals a flatter stomach." },
      { question: "Is belly fat more dangerous for Indians?", answer: "South Asians tend to store more fat around the abdomen at a lower body weight, and this pattern is linked with a higher risk of diabetes and heart disease. That's why waist size is worth tracking." },
    ],
    references: [refs.indianObesityConsensus, refs.asianBmi, refs.idfMetabolicSyndrome, refs.whoPhysicalActivity, refs.whoHealthyDiet],
    relatedServices: ["fat-loss", "weight-loss", "heart-health"],
  },
  {
    slug: "10-best-protein-sources-for-vegetarians-in-india",
    title: "10 everyday vegetarian protein sources in India — and how much they really give you",
    metaTitle: "10 Vegetarian Protein Sources in India",
    description:
      "Soya, paneer, dals, curd, tofu, sattu and more — approximate protein per everyday portion, how much you need, and easy 15–20 g vegetarian meals.",
    category: categories.nutrition,
    art: "bean",
    shortAnswer:
      "Good vegetarian protein sources in India include soya chunks, paneer, dals and other pulses, curd and Greek-style yoghurt, milk, tofu, peanuts, sattu and seeds — plus eggs, if you eat them. Most adults need roughly 0.8 g of protein per kg of body weight a day; aiming for about 15–25 g at each main meal is an easy way to get there.",
    published: "2026-10-24",
    updated: "2026-10-24",
    review: null,
    body: [
      { type: "h2", id: "how-much", text: "How much protein do you need?" },
      { type: "p", text: "For most healthy adults, the requirement is roughly 0.8 g of protein per kilogram of body weight a day — about 48 g for someone who weighs 60 kg. People who strength-train, older adults and people recovering from illness often need more. People with kidney disease may need a specific amount set by their doctor." },
      { type: "p", text: "Vegetarian diets can meet these needs comfortably with a little planning. You don't need to combine proteins at every meal; eating a variety of pulses, dairy, grains, nuts and seeds over the day is enough." },
      { type: "h2", id: "ten-sources", text: "Ten sources, with approximate amounts" },
      { type: "table", caption: "Approximate protein in common vegetarian portions", head: ["Food", "Everyday portion", "Protein (approx.)"], rows: [
        ["Soya chunks (dry weight)", "30 g, a small handful", "15 g"],
        ["Paneer", "100 g", "18 g"],
        ["Dal — moong, masoor or toor (raw weight)", "30 g, about one cooked katori", "7 g"],
        ["Chana, rajma or lobia (raw weight)", "30 g, about one cooked katori", "6–7 g"],
        ["Greek-style yoghurt / regular curd", "150 g", "13–15 g / 5 g"],
        ["Milk", "1 glass, 250 ml", "8 g"],
        ["Tofu", "100 g", "8–15 g, depending on firmness"],
        ["Peanuts", "30 g, a handful", "7 g"],
        ["Sattu (roasted chana flour)", "30 g, about 2 heaped tablespoons", "6 g"],
        ["Pumpkin seeds", "15 g, about 1 tablespoon", "4–5 g"],
      ] },
      { type: "p", text: "Values are approximate and vary with variety, brand and preparation. Packaged foods list protein on the label, which is worth checking. If you eat eggs, one egg adds about 6 g. Grains add up too — two phulkas provide roughly 5–6 g." },
      { type: "h2", id: "meals", text: "Easy 15–20 g vegetarian meals" },
      { type: "ul", items: [
        "Moong dal chilla stuffed with paneer, with a katori of curd",
        "Rajma or chole with rice and a bowl of vegetable raita",
        "Paneer or tofu bhurji with one or two phulkas",
        "Soya pulao with cucumber raita",
        "Sprouts chaat followed by a glass of buttermilk or milk",
        "Sattu drink with a handful of roasted peanuts, for busy mornings",
      ] },
      { type: "h2", id: "powders", text: "Do you need protein powder?" },
      { type: "p", text: "Most people can reach their target with food. A powder can be a convenient top-up for very active people or busy days, but it isn't necessary. If you have kidney disease or another medical condition, check with your doctor before increasing protein significantly." },
      { type: "p", text: "If you're training to build muscle on a vegetarian diet, [muscle gain nutrition support](/services/muscle-gain) can help you hit a higher target without living on shakes." },
    ],
    faqs: [
      { question: "Is a katori of dal enough protein for a meal?", answer: "One katori of dal gives roughly 6–8 g of protein. It's a great base, but most meals need another source too, such as curd, paneer, sprouts or a second pulse." },
      { question: "Do I need to combine proteins at every meal?", answer: "No. Eating a variety of protein foods across the day is enough to meet your needs. Classic pairings like dal-chawal happen to be good combinations anyway." },
      { question: "Is soya safe to eat?", answer: "Normal food amounts of soya are safe for most people. If you take levothyroxine for an underactive thyroid, keep soya and the tablet apart, as soya can reduce how much medicine is absorbed." },
    ],
    references: [refs.andVegetarian, refs.issnProtein, refs.ninGuidelines, refs.ataHypothyroidism],
    relatedServices: ["muscle-gain", "sports-nutrition", "weight-gain"],
  },
  {
    slug: "healthy-indian-breakfast-ideas-for-weight-loss",
    title: "12 Indian breakfasts that keep you full until lunch",
    metaTitle: "Healthy Indian Breakfast Ideas for Weight Loss",
    description:
      "Twelve filling Indian breakfasts built on protein and fibre — chillas, poha, idli-sambar, ragi, thalipeeth and more — plus the common breakfast traps.",
    category: categories.recipes,
    art: "sun",
    shortAnswer:
      "A breakfast that supports weight loss pairs protein and fibre with a sensible portion of grain — for example moong dal chilla with curd, vegetable poha with peanuts and sprouts, idli with sambar, or vegetable upma with a glass of milk. Protein and fibre help you stay full, so you're less likely to reach for biscuits mid-morning.",
    published: "2026-10-24",
    updated: "2026-10-24",
    review: null,
    body: [
      { type: "h2", id: "what-makes-filling", text: "What makes a breakfast filling?" },
      { type: "p", text: "Three things: some protein (dal, besan, curd, milk, paneer, eggs), some fibre (vegetables, whole grains, millets, fruit) and not too much oil or sugar. Most Indian breakfasts already have a grain base — the trick is to add the first two." },
      { type: "h2", id: "quick", text: "Quick — ten minutes or less" },
      { type: "ol", items: [
        "Besan chilla with grated vegetables and a katori of curd.",
        "Vegetable poha with peanuts, plus a small bowl of sprouts on the side.",
        "Egg bhurji with plenty of onion, tomato and capsicum, and one roti.",
        "Overnight oats made the night before with curd or milk, chopped fruit and seeds.",
      ] },
      { type: "h2", id: "make-ahead", text: "Make-ahead" },
      { type: "ol", items: [
        "Idli with a generous bowl of sambar — the dal and vegetables do the heavy lifting.",
        "Moong dal chilla from a batter soaked and ground the night before, stuffed with paneer.",
        "Ragi dosa or ragi porridge topped with nuts.",
        "Vegetable dalia khichdi with curd.",
      ] },
      { type: "h2", id: "weekend", text: "Slow weekend breakfasts" },
      { type: "ol", items: [
        "Thalipeeth made with a multigrain flour and onions, served with curd.",
        "Paneer or tofu bhurji wrapped in a roti with salad.",
        "Vegetable upma loaded with peas and carrots, with a glass of milk.",
        "Sprouts chaat with curd, pomegranate and a squeeze of lemon.",
      ] },
      { type: "h2", id: "traps", text: "Common breakfast traps" },
      { type: "ul", items: [
        "Biscuits or rusks with tea — easy to eat several without noticing.",
        "Packaged fruit juice in place of whole fruit.",
        "Sweetened breakfast cereals.",
        "Butter-laden parathas every day — lovely as an occasional treat.",
        "A big plate of poha or upma with no protein alongside.",
      ] },
      { type: "note", title: "If you have diabetes", text: "Different breakfasts affect blood sugar differently from person to person. If you check your glucose, test a few of these and notice which keep your readings steadiest." },
      { type: "h2", id: "skip", text: "Is skipping breakfast bad for weight loss?" },
      { type: "p", text: "Research is mixed. What matters most is what you eat across the whole day. If skipping breakfast leaves you ravenous and snacking by 11 am, a filling breakfast will probably help. For a plan that fits your mornings, see [weight management support](/services/weight-loss)." },
    ],
    faqs: [
      { question: "Is poha good for weight loss?", answer: "Poha can be part of a weight-loss breakfast, especially with extra vegetables, peanuts and a side of sprouts or curd for protein. Watch the portion and the oil." },
      { question: "Are idlis healthy?", answer: "Idlis are steamed and light. Pair them with plenty of sambar for protein and vegetables, and go easy on coconut chutney if you're watching calories." },
      { question: "What's a good breakfast if I have no time?", answer: "Overnight oats with curd and fruit, a sattu drink with a handful of peanuts, or curd with fruit and seeds can all be ready in minutes." },
    ],
    references: [refs.whoHealthyDiet, refs.ninGuidelines, refs.nhsBalancedDiet],
    relatedServices: ["weight-loss", "diabetes-diet", "pcos-diet"],
  },
  {
    slug: "pcos-diet-plan-what-to-eat-and-what-to-avoid",
    title: "PCOS and food: what to eat, what to limit, and what to ignore",
    metaTitle: "PCOS Diet: What to Eat, Limit and Ignore",
    description:
      "There's no single PCOS diet. What the 2023 international guideline says, foods to eat more of, what to limit, popular claims to question, and a sample Indian day.",
    category: categories.pcos,
    art: "flower",
    shortAnswer:
      "There isn't one proven 'PCOS diet'. The 2023 international PCOS guideline recommends healthy eating and physical activity for everyone with PCOS without favouring any particular diet type. In practice, meals that combine protein, fibre-rich carbohydrates and healthy fats, fewer sugary and ultra-processed foods, and a routine you can sustain help most people.",
    published: "2026-10-24",
    updated: "2026-10-24",
    review: null,
    body: [
      { type: "h2", id: "no-single-diet", text: "Why there's no single PCOS diet" },
      { type: "p", text: "Polycystic ovary syndrome affects people in very different ways — cycles, skin, hair, mood, weight and blood sugar. The 2023 international evidence-based guideline reviewed the research and found no diet type that works better than others. It recommends healthy lifestyle habits for everyone with PCOS, tailored to individual preferences and goals, and it explicitly warns against weight stigma." },
      { type: "p", text: "That's good news: you don't need an expensive or extreme plan. You need one that suits you." },
      { type: "h2", id: "eat-more", text: "What to eat more of" },
      { type: "ul", items: [
        "Vegetables at most meals — sabzis, salads, soups and raitas.",
        "Pulses and legumes — dal, chana, rajma, sprouts and moong.",
        "Whole grains and millets — phulkas, brown or hand-pounded rice, jowar, bajra and ragi.",
        "Protein at each meal — curd, paneer, tofu, eggs, fish or chicken.",
        "Nuts and seeds, in handfuls rather than bowlfuls.",
        "Whole fruit, rather than juice.",
      ] },
      { type: "h2", id: "limit", text: "What to limit (not ban)" },
      { type: "ul", items: [
        "Sugary drinks and packaged juices.",
        "Large or frequent portions of sweets and mithai.",
        "White-flour snacks and bakery items.",
        "Deep-fried foods.",
        "Ultra-processed snacks such as chips and instant noodles.",
      ] },
      { type: "p", text: "None of these need to disappear forever. Limiting them simply makes it easier to keep energy and blood sugar steadier through the day." },
      { type: "h2", id: "ignore", text: "What to question before you try it" },
      { type: "ul", items: [
        "'PCOS detox' teas and cleanses — there's no evidence they help.",
        "Cutting out dairy or gluten without a medical reason.",
        "Seed cycling — popular online, with little research behind it.",
        "Supplements such as inositol — the 2023 guideline considers inositol experimental, with limited evidence so far. Discuss any supplement with your doctor.",
      ] },
      { type: "h2", id: "sample-day", text: "A sample Indian day" },
      { type: "ul", items: [
        "Breakfast: moong dal chilla with curd.",
        "Mid-morning: a guava or an apple with a few almonds.",
        "Lunch: jowar roti, dal, a vegetable sabzi and salad.",
        "Evening: roasted chana with tea or buttermilk.",
        "Dinner: paneer, tofu or fish with vegetables and a small portion of rice.",
      ] },
      { type: "h2", id: "weight", text: "If weight is one of your goals" },
      { type: "p", text: "For people with PCOS who are carrying excess weight, modest weight loss can improve cycles and metabolic health. But PCOS care is not only about weight, and people with 'lean PCOS' benefit from healthy eating too. Your doctor may also check blood sugar and cholesterol from time to time, because PCOS can raise long-term risks." },
      { type: "p", text: "If you'd like a plan built around your symptoms, routine and food preferences, [PCOS nutrition support](/services/pcos-diet) works alongside your gynaecologist or endocrinologist." },
    ],
    faqs: [
      { question: "Is dairy bad for PCOS?", answer: "There's no strong evidence that dairy needs to be cut out for PCOS. Curd, milk and paneer are useful sources of protein and calcium. If you think a food is affecting your symptoms, look into it with guidance rather than removing it for good." },
      { question: "Should I go gluten-free for PCOS?", answer: "Only if you have coeliac disease or another medical reason. Going gluten-free doesn't treat PCOS on its own." },
      { question: "Does inositol work for PCOS?", answer: "Evidence is still limited, and the 2023 international guideline considers it experimental. Speak to your doctor before starting it." },
      { question: "Can changing my diet help me get pregnant with PCOS?", answer: "Healthy eating is part of preparing for pregnancy, and for some people modest weight change helps cycles become more regular. It works alongside fertility care, not instead of it." },
    ],
    references: [refs.pcosGuideline, refs.whoPcos, refs.ninGuidelines],
    relatedServices: ["pcos-diet", "weight-loss", "pregnancy-nutrition"],
  },
]

export const articleSlugs = articles.map((a) => a.slug)

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function isReviewed(article: Article): boolean {
  return article.review !== null
}

export function articleCategories(): ArticleCategory[] {
  const seen = new Map<string, ArticleCategory>()
  for (const a of articles) seen.set(a.category.slug, a.category)
  return [...seen.values()]
}

export function getArticlesByCategory(slug: string): Article[] {
  return articles.filter((a) => a.category.slug === slug)
}

export function getArticlesBySlugs(slugs: string[] = []): Article[] {
  return slugs.map(getArticle).filter((a): a is Article => Boolean(a))
}

export function readingMinutes(article: Article): number {
  const words = article.body
    .flatMap((b) => ("text" in b ? [b.text] : "items" in b ? b.items : "rows" in b ? b.rows.flat() : []))
    .join(" ")
    .split(/\s+/).length
  return Math.max(3, Math.round(words / 200))
}
