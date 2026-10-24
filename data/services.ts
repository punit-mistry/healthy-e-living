import { refs, type Reference } from "./references"

export type ArtKey =
  | "plate" | "scale" | "sprout" | "bolt" | "flower" | "drop" | "sun" | "heart"
  | "bean" | "ribbon" | "bowl" | "shield" | "bump" | "kite" | "cup" | "bone"
  | "people" | "screen" | "pin" | "dumbbell"

export type CategoryId = "metabolism" | "long-term" | "gut" | "life-stages" | "performance" | "formats"

export interface ServiceCategory {
  id: CategoryId
  title: string
  blurb: string
}

export const serviceCategories: ServiceCategory[] = [
  { id: "metabolism", title: "Weight & metabolism", blurb: "Weight, blood sugar, hormones and thyroid — the everyday conditions most people come in for." },
  { id: "long-term", title: "Heart, kidneys & long-term care", blurb: "Nutrition that works alongside your doctor's treatment for longer-term conditions." },
  { id: "gut", title: "Gut & food reactions", blurb: "Bloating, IBS, allergies and intolerances — calmer digestion without unnecessary restriction." },
  { id: "life-stages", title: "Life stages", blurb: "Pregnancy, growing children and healthy ageing each ask something different of your plate." },
  { id: "performance", title: "Performance & strength", blurb: "Fuel for training, competing, recovering and building muscle." },
  { id: "formats", title: "Ways to work together", blurb: "Online, in person in Mumbai, or with your whole team." },
]

export interface Faq {
  question: string
  answer: string
}

export interface Service {
  slug: string
  name: string
  shortName: string
  category: CategoryId
  art: ArtKey
  metaTitle: string
  metaDescription: string
  h1: string
  lede: string
  /** One-line summary for listings. */
  summary: string
  whoFor: string[]
  concerns: string[]
  approach: { title: string; body: string }[]
  faqs: Faq[]
  references: Reference[]
  related: string[]
  articles?: string[]
}

export const services: Service[] = [
  /* ------------------------------------------------------------------ */
  /* Weight & metabolism                                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "weight-loss",
    name: "Weight Management",
    shortName: "Weight loss",
    category: "metabolism",
    art: "scale",
    metaTitle: "Weight Loss Dietitian in Mumbai & Online",
    metaDescription:
      "Personalised, Indian food-first weight loss support from clinical dietitian Irika Goyal. No crash diets or banned foods. Online across India or in person in Mumbai.",
    h1: "Weight loss that fits the way you actually eat",
    lede: "A personalised, Indian food-first plan to help you lose weight at a steady pace — without crash diets, banned foods or guilt.",
    summary: "Steady, realistic weight loss built around the food you already love.",
    whoFor: [
      "Adults who want to lose weight and keep it off this time",
      "People with weight-related concerns such as prediabetes, raised blood pressure or fatty liver, alongside their doctor's care",
      "Anyone tired of restarting after restrictive diets",
      "Busy professionals who eat out, travel or cook for a family",
    ],
    concerns: [
      "Portion sizes and meal timing with home-cooked Indian food",
      "Cravings, late-night snacking and eating when stressed",
      "Office lunches, eating out, festivals and weddings",
      "Plateaus, and what to change when progress slows",
      "Keeping muscle while losing fat",
      "Sleep, stress and other things that quietly affect appetite",
    ],
    approach: [
      { title: "Start from your real week", body: "We look at what, when and why you eat now, so changes fit around work, family meals and the foods you enjoy — not around a template." },
      { title: "Aim for a pace you can keep", body: "For most adults a steady loss of around half to one kilogram a week is realistic. In people living with type 2 diabetes and excess weight, losing even 5–10% of body weight has been shown to improve blood sugar, blood pressure and cholesterol." },
      { title: "Plates that keep you full", body: "Enough protein and fibre at each meal — dal, curd, paneer, eggs, sprouts, vegetables — makes a smaller portion of rice or roti feel satisfying." },
      { title: "Adjust, don't restart", body: "Follow-ups are where the real work happens. We review what's working, what isn't, and tweak the plan instead of throwing it out." },
    ],
    faqs: [
      { question: "How much weight can I expect to lose?", answer: "It depends on your starting point, health conditions, medicines and routine, so I won't promise a number. For most adults a steady 0.5–1 kg a week is realistic. We also track waist size, energy and blood reports — not just the scale." },
      { question: "Do I have to stop eating rice or roti?", answer: "No. Portion size, what you pair it with (dal, vegetables, curd) and choosing whole grains or millets more often usually matter far more than cutting a food out completely." },
      { question: "Will I need to exercise?", answer: "Movement helps with health, muscle and keeping weight off, so we'll talk about it — but the plan starts with what's realistic for you, whether that's a daily walk or a full training schedule." },
      { question: "Can you help if I'm taking weight-loss medication?", answer: "Yes. I can support you with protein, hydration, meal size and managing side effects alongside your doctor's treatment. I don't prescribe, stop or change any medication." },
    ],
    references: [refs.whoObesity, refs.modestWeightLoss, refs.asianBmi, refs.nhsWeight],
    related: ["fat-loss", "pcos-diet", "diabetes-diet", "thyroid-diet"],
    articles: ["best-indian-diet-plan-for-weight-loss", "healthy-indian-breakfast-ideas-for-weight-loss", "how-to-lose-belly-fat-fast-with-indian-diet"],
  },
  {
    slug: "fat-loss",
    name: "Fat Loss & Body Composition",
    shortName: "Fat loss",
    category: "metabolism",
    art: "kite",
    metaTitle: "Fat Loss & Body Composition Nutrition",
    metaDescription:
      "Lose body fat while protecting muscle and energy. Protein-first, training-aware nutrition from clinical dietitian Irika Goyal — online or in Mumbai.",
    h1: "Fat loss that protects your muscle (and your energy)",
    lede: "For people who care less about the number on the scale and more about how they look, feel and perform. We reduce body fat while keeping the muscle you've worked for.",
    summary: "Reduce body fat, keep muscle — with training-aware nutrition.",
    whoFor: [
      "People who strength-train, or want to start",
      "Those whose weight is in a healthy range but who want to reduce body fat or waist size",
      "Anyone who lost weight before and regained it",
      "Active people who feel tired or weak on low-calorie diets",
    ],
    concerns: [
      "Protein targets, spread sensibly across the day",
      "Eating around workouts so training doesn't suffer",
      "Measuring progress beyond the scale — waist, photos, strength",
      "Belly fat, and why spot reduction doesn't work",
      "Which supplements are useful and which are marketing",
    ],
    approach: [
      { title: "A moderate deficit", body: "Cutting too hard costs muscle, sleep and mood. A smaller, steady deficit is easier to live with and protects lean mass." },
      { title: "Protein first", body: "Sports nutrition position statements suggest active people often benefit from roughly 1.4–2.0 g of protein per kg of body weight a day. We'll work out what that looks like on your plate — vegetarian or not." },
      { title: "Training-aware meals", body: "Carbohydrate isn't the enemy. Timing some of it around training helps you lift, run and recover well." },
      { title: "Measure what matters", body: "Waist measurements, progress photos and strength numbers tell a truer story than daily weigh-ins, which swing with water and salt." },
    ],
    faqs: [
      { question: "Is fat loss different from weight loss?", answer: "Weight loss can include water and muscle. Fat loss focuses on reducing body fat while keeping muscle, which usually means a smaller calorie deficit, more protein and some resistance training." },
      { question: "Can I target belly fat specifically?", answer: "No food or exercise burns fat from one spot. Overall fat loss, strength training, sleep and stress all influence where you lose fat, and the waist usually follows." },
      { question: "Do I need protein powder?", answer: "Not necessarily. Many people reach their target with food. A powder can be a convenient top-up if your day makes that hard — we'll decide together." },
      { question: "How do I know it's working if the scale isn't moving?", answer: "If your waist is shrinking, clothes fit differently and your strength is steady or improving, it's working. The scale can stall while body composition changes." },
    ],
    references: [refs.issnProtein, refs.sportsPosition, refs.asianBmi],
    related: ["weight-loss", "muscle-gain", "sports-nutrition"],
    articles: ["how-to-lose-belly-fat-fast-with-indian-diet", "10-best-protein-sources-for-vegetarians-in-india"],
  },
  {
    slug: "weight-gain",
    name: "Healthy Weight Gain",
    shortName: "Weight gain",
    category: "metabolism",
    art: "bowl",
    metaTitle: "Healthy Weight Gain Diet Plan",
    metaDescription:
      "Gain weight in a healthy way with satisfying, energy-dense Indian meals that build strength — personalised support from clinical dietitian Irika Goyal.",
    h1: "Healthy weight gain, one satisfying meal at a time",
    lede: "Gaining weight can be just as hard as losing it. We build meals that add energy and nourishment without leaning on junk food or forcing down food you don't enjoy.",
    summary: "Gain weight and strength without relying on junk food.",
    whoFor: [
      "People who are underweight or find it hard to keep weight on",
      "Those with a small appetite or who feel full quickly",
      "Teens and young adults — under-18s together with a parent",
      "People rebuilding after illness, once their doctor has checked any unexplained weight loss",
    ],
    concerns: [
      "Energy-dense meals with Indian staples — nuts, seeds, dairy, pulses, ghee in sensible amounts",
      "Small-appetite strategies: snacks, smoothies and meal rhythm",
      "Building lean mass with protein and strength training",
      "Digestive comfort as portions grow",
    ],
    approach: [
      { title: "Check the why first", body: "Unintended weight loss can have medical causes, so if your weight has dropped without trying, we'll make sure your doctor has looked into it." },
      { title: "Add, don't stuff", body: "Small additions — a spoon of nut butter, a glass of milk, a handful of roasted chana — add up without making meals feel like a chore." },
      { title: "Build, not just gain", body: "Pairing extra food with protein and some resistance exercise helps more of the gain become muscle." },
    ],
    faqs: [
      { question: "How quickly can I gain weight in a healthy way?", answer: "It varies with appetite, activity and health. Gradual gain — think a kilogram or so a month — is easier to sustain and more likely to include muscle." },
      { question: "Should I just eat more fried food and sweets?", answer: "They add calories but little else, and can leave you feeling unwell. Energy-dense whole foods do the job better and support your overall health." },
      { question: "Do I need weight-gainer shakes?", answer: "Usually not. A homemade milkshake with banana, oats and nuts often does the same job for less money. If a supplement makes sense for you, we'll discuss it." },
    ],
    references: [refs.whoMalnutrition, refs.whoHealthyDiet],
    related: ["muscle-gain", "gut-health", "sports-nutrition"],
    articles: ["10-best-protein-sources-for-vegetarians-in-india"],
  },
  {
    slug: "pcos-diet",
    name: "PCOS Nutrition",
    shortName: "PCOS",
    category: "metabolism",
    art: "flower",
    metaTitle: "PCOS Dietitian in Mumbai & Online",
    metaDescription:
      "Evidence-based PCOS nutrition support for steady energy, cycles and long-term health — alongside your gynaecologist's care. Online or in Mumbai with Irika Goyal.",
    h1: "PCOS nutrition that works with your body, not against it",
    lede: "There's no single 'PCOS diet'. Together we build an eating pattern that supports steady energy, your cycle and long-term health — alongside the care you get from your gynaecologist or endocrinologist.",
    summary: "Steady energy and long-term health with PCOS — no fads.",
    whoFor: [
      "Women diagnosed with PCOS, at any body size — including 'lean PCOS'",
      "Those with irregular periods, acne or insulin resistance who are being evaluated by their doctor",
      "Women with PCOS who are planning a pregnancy, alongside their fertility care",
    ],
    concerns: [
      "Meals that keep blood sugar and energy steadier through the day",
      "Cravings and afternoon slumps",
      "Weight management without extreme dieting, if weight is a goal for you",
      "Inositol, spearmint tea, seed cycling — what the evidence actually says",
      "Longer-term risks such as type 2 diabetes and heart health",
    ],
    approach: [
      { title: "Evidence over trends", body: "The 2023 international PCOS guideline found no single diet type to be better than others. A balanced, sustainable pattern you can live with is what matters." },
      { title: "Weight is not the whole story", body: "Where weight loss is a goal, modest loss can improve symptoms for many people. But not everyone with PCOS needs to lose weight, and the plan never depends on it." },
      { title: "Steady plates", body: "Pairing carbohydrate with protein, fibre and some fat — think roti with dal and sabzi, or poha with peanuts and sprouts — helps avoid big blood sugar swings." },
      { title: "Long-term thinking", body: "PCOS can raise the risk of type 2 diabetes and heart disease over time, so we build habits that protect you for years, not weeks." },
    ],
    faqs: [
      { question: "Is there a special diet for PCOS?", answer: "No. Current international guidelines don't favour one diet type over another. The best plan is a balanced one you can stick to, adjusted to your symptoms, preferences and goals." },
      { question: "Do I need to give up dairy or gluten?", answer: "Not unless you have a specific medical reason, such as coeliac disease or a diagnosed allergy. There isn't good evidence that cutting them out routinely helps PCOS." },
      { question: "Can nutrition help with fertility?", answer: "Good nutrition is part of preparing for pregnancy, and for some people modest weight change can help cycles become more regular. I work alongside your fertility doctor and can't guarantee any outcome." },
      { question: "I have 'lean PCOS'. Is this still for me?", answer: "Yes. Nutrition support for PCOS is about energy, symptoms and long-term health, not only weight." },
    ],
    references: [refs.pcosGuideline, refs.whoPcos],
    related: ["weight-loss", "diabetes-diet", "pregnancy-nutrition", "thyroid-diet"],
    articles: ["pcos-diet-plan-what-to-eat-and-what-to-avoid"],
  },
  {
    slug: "diabetes-diet",
    name: "Diabetes Nutrition",
    shortName: "Diabetes",
    category: "metabolism",
    art: "drop",
    metaTitle: "Diabetes Dietitian in Mumbai & Online",
    metaDescription:
      "Personalised nutrition for type 2 diabetes, prediabetes and type 1 diabetes — Indian meals that support steadier blood sugar, alongside your doctor's treatment.",
    h1: "Diabetes nutrition that keeps Indian food on the table",
    lede: "Managing blood sugar doesn't mean giving up the food you grew up with. We work out portions, pairings and routines that suit your readings, your medicines and your life.",
    summary: "Steadier blood sugar with the Indian meals you love.",
    whoFor: [
      "People with type 2 diabetes or prediabetes",
      "People with type 1 diabetes who want help with carbohydrate awareness, alongside their endocrinologist's insulin plan",
      "Family members who cook for someone with diabetes",
    ],
    concerns: [
      "Carbohydrate quality and portions in rice, roti, poha and idli meals",
      "Building a balanced plate, and whether eating vegetables and protein first helps your after-meal readings",
      "Understanding your glucose and HbA1c reports",
      "Fasting days, festivals and sweets",
      "Low blood sugar awareness if you take insulin or certain tablets",
      "Protecting heart and kidney health, which often go hand in hand with diabetes",
    ],
    approach: [
      { title: "No single 'right' ratio", body: "Expert consensus is that there's no ideal split of carbohydrate, protein and fat for everyone with diabetes. What helps most is more non-starchy vegetables, fewer added sugars and refined grains, and whole foods — arranged around your preferences." },
      { title: "Use your own data", body: "If you check your glucose, we use those numbers to see how your meals actually affect you, rather than relying on generic food lists." },
      { title: "Work with your medicines", body: "Food, activity and medication all interact. I coordinate with — never replace — your doctor's advice, and I never change medication." },
    ],
    faqs: [
      { question: "Can diet reverse diabetes?", answer: "Some people with type 2 diabetes reach remission, often after significant weight loss, but it isn't possible for everyone and isn't a cure. Never stop or reduce medication without your doctor's guidance." },
      { question: "Do I have to stop eating rice?", answer: "Not necessarily. Smaller portions, pairing rice with dal and vegetables, and sometimes switching to other grains can all help. Your glucose readings will tell us what works for you." },
      { question: "Can I eat fruit?", answer: "Yes. Whole fruit in sensible portions fits well into most diabetes plans. Fruit juice raises blood sugar much faster, so whole fruit is the better choice." },
      { question: "Will you adjust my insulin or tablets?", answer: "No. Medication decisions stay with your doctor. I help you understand how food affects your readings so you can have better conversations at your appointments." },
    ],
    references: [refs.adaNutrition, refs.whoDiabetes, refs.nhsT2dFood],
    related: ["weight-loss", "heart-health", "kidney-nutrition", "pcos-diet"],
    articles: ["healthy-indian-breakfast-ideas-for-weight-loss", "best-indian-diet-plan-for-weight-loss"],
  },
  {
    slug: "thyroid-diet",
    name: "Thyroid Nutrition",
    shortName: "Thyroid",
    category: "metabolism",
    art: "sun",
    metaTitle: "Thyroid Diet Support: Hypothyroidism & More",
    metaDescription:
      "Practical nutrition support for hypothyroidism, Hashimoto's and other thyroid conditions — medicine timing, myths about goitrogens, energy and weight. With Irika Goyal.",
    h1: "Eating well with a thyroid condition",
    lede: "Food can't replace thyroid medication, but it can make everyday life easier — energy, weight, digestion — and help your medicine work as intended.",
    summary: "Energy, weight and medicine-friendly routines with thyroid conditions.",
    whoFor: [
      "People with hypothyroidism, including Hashimoto's thyroiditis",
      "People with hyperthyroidism who are under treatment",
      "Anyone noticing tiredness, weight change or constipation alongside a thyroid condition",
    ],
    concerns: [
      "Timing thyroid tablets around breakfast, tea, coffee, calcium and iron",
      "Cabbage, cauliflower and soy — what's myth and what's worth knowing",
      "Iodised salt, and why iodine or selenium supplements aren't for everyone",
      "Weight management once thyroid levels are treated",
      "Fatigue, constipation and other everyday symptoms",
    ],
    approach: [
      { title: "Protect your medicine", body: "Levothyroxine is best taken the same way every day. Food, coffee and calcium or iron supplements can reduce how much is absorbed, so we plan breakfast and supplements around it." },
      { title: "Bust the scary food lists", body: "Normal, cooked portions of vegetables like cabbage and cauliflower are fine for most people. There's rarely a reason to fear whole food groups." },
      { title: "Then, the usual good stuff", body: "Once your levels are treated, the same principles apply as for anyone: balanced plates, enough protein and fibre, and a routine you can keep." },
    ],
    faqs: [
      { question: "Should I avoid cabbage, cauliflower and broccoli?", answer: "For most people, no. Normal amounts of cooked vegetables don't harm thyroid function. They're nutritious and worth keeping on your plate." },
      { question: "Does a gluten-free diet help Hashimoto's?", answer: "Only if you also have coeliac disease, which is more common in people with autoimmune thyroid conditions. Ask your doctor about testing before cutting out gluten, because testing needs you to still be eating it." },
      { question: "Can I lose weight with hypothyroidism?", answer: "Yes. Once your thyroid levels are well treated, weight responds to the same things as for anyone else. We'll set realistic expectations together." },
      { question: "Should I take iodine or selenium supplements?", answer: "Not routinely. Using iodised salt is usually enough iodine, and too much can be harmful for some thyroid conditions. Only supplement if your doctor advises it." },
    ],
    references: [refs.ataHypothyroidism, refs.ataGuideline, refs.nhsCoeliac],
    related: ["weight-loss", "pcos-diet", "gut-health"],
  },

  /* ------------------------------------------------------------------ */
  /* Heart, kidneys & long-term care                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "heart-health",
    name: "Heart Health & Blood Pressure",
    shortName: "Heart health",
    category: "long-term",
    art: "heart",
    metaTitle: "Diet for Blood Pressure & Cholesterol",
    metaDescription:
      "Heart-healthy eating for high blood pressure, cholesterol and triglycerides — made for Indian kitchens. Nutrition support from clinical dietitian Irika Goyal.",
    h1: "Heart-healthy eating, made for Indian kitchens",
    lede: "High blood pressure or cholesterol often comes with a long list of foods to avoid. We swap the list for a plan — one that keeps flavour, festivals and family meals in it.",
    summary: "Lower salt, smarter fats and flavour that stays.",
    whoFor: [
      "People with high blood pressure, cholesterol or triglycerides",
      "Anyone with a family history of heart disease",
      "People living with diabetes, which raises heart risk",
      "People recovering after a cardiac event, with their cardiologist's go-ahead",
    ],
    concerns: [
      "Hidden salt in pickles, papad, namkeen, sauces and packaged food",
      "Choosing cooking oils, and how much ghee or butter fits",
      "Trans fats in vanaspati and repeatedly reused frying oil",
      "Fibre, pulses, nuts and whole grains for cholesterol",
      "Reading your lipid profile and blood pressure readings",
      "Alcohol, sleep and stress",
    ],
    approach: [
      { title: "Patterns, not single foods", body: "Prevention guidelines emphasise an overall pattern: plenty of vegetables, fruit, pulses, nuts and whole grains; less salt, refined carbohydrate and processed meat; and unsaturated fats in place of saturated and trans fats." },
      { title: "Salt you can taste less of", body: "The WHO recommends less than 5 g of salt a day — about a teaspoon, including what's already in food. We find where yours is coming from and cut it gradually so your taste adjusts." },
      { title: "Alongside your doctor", body: "Food changes can support your treatment, but decisions about medicines stay with your cardiologist or physician." },
    ],
    faqs: [
      { question: "Which cooking oil is best for the heart?", answer: "There's no single best oil. Use moderate amounts, favour oils rich in unsaturated fats, consider rotating or blending them, avoid vanaspati, and don't reuse frying oil again and again." },
      { question: "Is ghee bad for my heart?", answer: "Ghee is high in saturated fat, so amount matters. A small quantity can fit within an overall heart-healthy pattern, depending on your lipid profile. We'll set a sensible amount for you." },
      { question: "How much salt is too much?", answer: "The WHO advises under 5 g a day for adults — roughly one level teaspoon in total, including salt already in packaged and restaurant food." },
      { question: "Can diet lower my cholesterol enough to avoid medicine?", answer: "Diet can make a real difference, but whether you need medicine depends on your overall risk. That decision is your doctor's." },
    ],
    references: [refs.accAha, refs.whoHypertension, refs.whoCvd, refs.whoHealthyDiet],
    related: ["diabetes-diet", "weight-loss", "kidney-nutrition"],
  },
  {
    slug: "kidney-nutrition",
    name: "Kidney Disease Nutrition",
    shortName: "Kidney health",
    category: "long-term",
    art: "bean",
    metaTitle: "Diet for Chronic Kidney Disease (CKD)",
    metaDescription:
      "Kidney-friendly Indian meals planned around your stage, blood reports and nephrologist's targets — protein, potassium, phosphorus and salt made practical.",
    h1: "Kidney-friendly eating, planned with your nephrologist",
    lede: "Diet for kidney disease is highly individual. It depends on your stage, your blood results and whether you're on dialysis. My job is to turn your nephrologist's targets into everyday Indian meals.",
    summary: "Protein, potassium and salt — tailored to your stage and reports.",
    whoFor: [
      "People with chronic kidney disease (CKD) who are not on dialysis",
      "People on dialysis",
      "People with diabetes or high blood pressure who have been told their kidney function needs watching",
    ],
    concerns: [
      "How much protein suits your stage — and good sources of it",
      "Sodium, potassium and phosphorus, guided by your blood reports",
      "Cooking methods that reduce potassium in vegetables, when that's needed",
      "Phosphate additives in packaged and processed food",
      "Fluid guidance, if your doctor has advised it",
      "Keeping weight and muscle up, so you stay strong",
    ],
    approach: [
      { title: "Your reports set the rules", body: "There's no single 'kidney diet'. Potassium restriction, for example, isn't needed by everyone — so we work from your latest results, not generic lists." },
      { title: "Enough, not too little", body: "Protein targets differ for people who are and aren't on dialysis. Eating too little can lead to muscle loss and malnutrition, which is a risk of its own." },
      { title: "One plan for several conditions", body: "Many people with kidney disease also manage diabetes or high blood pressure. We bring it together into one plan rather than three conflicting ones." },
    ],
    faqs: [
      { question: "Should I stop eating dal and other protein?", answer: "No. Protein needs change with the stage of kidney disease and with dialysis, but you still need it. Your nephrologist sets the target and we plan the right amount and sources." },
      { question: "Do I need to avoid all fruit?", answer: "Not necessarily. Only some people need to limit potassium, and even then many fruits fit in suitable portions. It depends on your blood results." },
      { question: "Can diet stop kidney disease from getting worse?", answer: "Good nutrition can help manage blood pressure, blood sugar and symptoms, which matters for your kidneys. It works alongside medical treatment and can't guarantee how the condition progresses." },
    ],
    references: [refs.kdoqi, refs.niddkCkd, refs.nhsCkd],
    related: ["diabetes-diet", "heart-health", "senior-citizen-diet"],
  },
  {
    slug: "cancer-nutrition-support",
    name: "Cancer Nutrition Support",
    shortName: "Cancer support",
    category: "long-term",
    art: "ribbon",
    metaTitle: "Nutrition Support During Cancer Treatment",
    metaDescription:
      "Gentle, practical nutrition support during and after cancer treatment — appetite, weight, taste changes and side effects — working alongside your oncology team.",
    h1: "Nutrition support during and after cancer treatment",
    lede: "Eating well can help you stay stronger through treatment. I work alongside your oncology team to manage appetite, weight and side effects — with food you can actually face.",
    summary: "Appetite, strength and side effects, alongside your oncology team.",
    whoFor: [
      "People going through chemotherapy, radiotherapy or surgery",
      "Caregivers who cook and worry about what to serve",
      "People rebuilding strength after treatment",
    ],
    concerns: [
      "Low appetite, taste changes, nausea and mouth sores",
      "Unintended weight and muscle loss",
      "Small, protein- and energy-rich meals and snacks",
      "Food safety when immunity is low",
      "'Anti-cancer' diet claims and supplements you've heard about",
    ],
    approach: [
      { title: "Strength comes first", body: "Clinical nutrition guidelines recommend checking for malnutrition early and helping people meet their energy and protein needs. Restrictive diets without evidence can do harm during treatment." },
      { title: "Food that feels manageable", body: "On hard days we aim for what you can eat — soft, cool, bland or small — and make it count." },
      { title: "Part of your team", body: "I complement, never replace, your oncologist and hospital dietitian, and supplements are always checked with them because some can interact with treatment." },
    ],
    faqs: [
      { question: "Should I cut out sugar because it 'feeds' cancer?", answer: "All cells in the body use glucose, and cutting sugar doesn't starve a tumour. Overall diet quality matters, but very restrictive eating during treatment risks losing weight and strength." },
      { question: "Can I take supplements or herbal remedies?", answer: "Please check with your oncologist first. Some supplements and herbs can interact with chemotherapy or radiotherapy." },
      { question: "Do you replace my hospital dietitian?", answer: "No. I work alongside your hospital team and can help with day-to-day meals at home." },
    ],
    references: [refs.espenCancer, refs.wcrf],
    related: ["weight-gain", "gut-health", "senior-citizen-diet"],
  },

  /* ------------------------------------------------------------------ */
  /* Gut & food reactions                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "gut-health",
    name: "Gut Health & IBS",
    shortName: "Gut health",
    category: "gut",
    art: "bowl",
    metaTitle: "Gut Health & IBS Dietitian in Mumbai & Online",
    metaDescription:
      "Nutrition support for bloating, IBS, constipation and acidity — food and symptom patterns, guided low-FODMAP trials and calmer digestion with Irika Goyal.",
    h1: "Gut health, without the guesswork",
    lede: "Bloating, irregular bowels or an unsettled stomach can colour your whole day. We look for patterns, make sure red flags are checked by a doctor, and build a calmer gut with food you enjoy.",
    summary: "Calmer digestion — patterns first, restriction last.",
    whoFor: [
      "People diagnosed with irritable bowel syndrome (IBS)",
      "Anyone dealing with regular bloating, gas, constipation or loose stools",
      "People with acidity or reflux",
      "People with diagnosed coeliac disease or lactose intolerance",
    ],
    concerns: [
      "A food and symptom diary to spot your patterns",
      "Getting the type and amount of fibre right for you",
      "A short, structured low-FODMAP trial for IBS, followed by reintroduction",
      "Fermented foods such as curd, buttermilk, idli and dosa",
      "Meal timing, stress and sleep",
    ],
    approach: [
      { title: "Rule out red flags", body: "Blood in your stool, unexplained weight loss, persistent vomiting, trouble swallowing or a lasting change in bowel habits need a doctor first. Nutrition support starts once those are checked." },
      { title: "Patterns before restriction", body: "A couple of weeks of notes often reveals more than a long list of banned foods ever could." },
      { title: "Guided low-FODMAP, done properly", body: "For IBS, gastroenterology guidelines suggest a limited trial of a low-FODMAP diet. It's a short, three-phase process — reduce, reintroduce, personalise — not a forever diet." },
    ],
    faqs: [
      { question: "Is a low-FODMAP diet meant to be long term?", answer: "No. It's a short elimination phase followed by careful reintroduction, so you end up avoiding only what actually bothers you." },
      { question: "Should I take a probiotic?", answer: "Evidence is mixed and depends on the specific strain and symptom. Food comes first; if a probiotic trial makes sense for you, we'll plan it with a clear time limit." },
      { question: "Do I need a food intolerance test?", answer: "Many commercial intolerance tests, such as IgG panels, aren't reliable for diagnosis. A guided elimination and reintroduction usually gives more useful answers." },
      { question: "When should I see a doctor first?", answer: "If you notice blood in your stool, unexplained weight loss, persistent vomiting, difficulty swallowing, or a change in bowel habits that doesn't settle, please see a doctor before changing your diet." },
    ],
    references: [refs.acgIbs, refs.nhsIbs, refs.nhsCoeliac],
    related: ["food-allergies-intolerances", "weight-gain", "thyroid-diet"],
  },
  {
    slug: "food-allergies-intolerances",
    name: "Food Allergies & Intolerances",
    shortName: "Allergies & intolerances",
    category: "gut",
    art: "shield",
    metaTitle: "Food Allergy & Intolerance Nutrition Support",
    metaDescription:
      "Eat safely and widely with a food allergy, lactose intolerance or coeliac disease — label reading, eating out and nutrient replacement with Irika Goyal.",
    h1: "Food allergies and intolerances: eat safely, eat widely",
    lede: "Whether you've been diagnosed with an allergy or suspect a food doesn't agree with you, the goal is the same — avoid what you must, and keep everything else on the menu.",
    summary: "Avoid what you must; keep everything else on the menu.",
    whoFor: [
      "Adults and children with diagnosed food allergies, such as peanut, tree nut, milk, egg, wheat or shellfish",
      "People with lactose intolerance",
      "People with coeliac disease",
      "Anyone who suspects a food intolerance and wants a structured way to find out",
    ],
    concerns: [
      "Reading ingredient lists and allergen declarations on packaged food",
      "Eating out, travelling and festive meals",
      "Replacing nutrients when a food group is removed — calcium without dairy, for example",
      "A structured elimination and reintroduction for suspected intolerances",
      "Avoiding unnecessary restriction, especially for children",
    ],
    approach: [
      { title: "Diagnosis first", body: "Food allergies should be diagnosed by a doctor or allergist using a clinical history and validated tests. Unvalidated tests such as IgG food panels aren't recommended for diagnosing allergy." },
      { title: "Safety plan", body: "If you're at risk of a severe reaction, your doctor will give you an emergency plan. I help with the everyday side — what to buy, cook and order." },
      { title: "Keep the menu wide", body: "Every food removed should be removed for a reason. We protect variety and nutrition so the diet doesn't shrink more than it has to." },
    ],
    faqs: [
      { question: "What's the difference between an allergy and an intolerance?", answer: "A food allergy involves the immune system and can be serious, even life-threatening. An intolerance usually affects digestion — such as lactose intolerance — and is uncomfortable but not dangerous." },
      { question: "Can you test me for allergies?", answer: "No. Allergy diagnosis is done by a doctor or allergist. Once you have a diagnosis, I help you eat safely and well around it." },
      { question: "Should I go gluten-free?", answer: "Only if you have coeliac disease, a diagnosed wheat allergy, or a clear reason identified with guidance. If coeliac disease is suspected, get tested before cutting out gluten — the test needs you to still be eating it." },
      { question: "If I avoid dairy, how do I get enough calcium?", answer: "From foods such as ragi, sesame, fortified plant milks, tofu set with calcium, and some leafy greens. We'll check your intake and decide whether a supplement is needed." },
    ],
    references: [refs.niaidAllergy, refs.nhsFoodAllergy, refs.nhsFoodIntolerance, refs.nhsCoeliac],
    related: ["gut-health", "child-nutrition", "bone-health"],
  },

  /* ------------------------------------------------------------------ */
  /* Life stages                                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "pregnancy-nutrition",
    name: "Pregnancy & Postpartum Nutrition",
    shortName: "Pregnancy",
    category: "life-stages",
    art: "bump",
    metaTitle: "Pregnancy & Postpartum Nutrition Support",
    metaDescription:
      "Nourishing support before, during and after pregnancy — nausea, iron, gestational diabetes, food safety and postpartum recovery — alongside your obstetrician.",
    h1: "Nourishing you through pregnancy and the fourth trimester",
    lede: "From planning a pregnancy to the months after birth, your needs keep changing. We keep your meals realistic, nourishing and safe — alongside the care from your obstetrician.",
    summary: "Before, during and after pregnancy — realistic and safe.",
    whoFor: [
      "Women planning a pregnancy",
      "Women in any trimester",
      "Women with gestational diabetes, together with their obstetric team",
      "New mothers, including those breastfeeding",
    ],
    concerns: [
      "Nausea, food aversions and heartburn",
      "Iron, folate, calcium, iodine and protein from Indian foods",
      "Food safety — unpasteurised dairy, undercooked eggs or meat, and certain fish",
      "Healthy weight gain, and the 'eating for two' myth",
      "Meal planning for gestational diabetes",
      "Postpartum recovery, traditional foods and breastfeeding",
    ],
    approach: [
      { title: "Supplements as prescribed", body: "Supplements such as folic acid, iron and calcium are important in pregnancy. Your obstetrician prescribes them; I make sure your meals support them." },
      { title: "Not eating for two", body: "Energy needs rise only modestly, and mostly later in pregnancy. Quality matters more than quantity." },
      { title: "Tradition, with balance", body: "Panjiri, laddoos and other postpartum foods can be part of recovery. They're energy-dense, so we find the right amount for you." },
    ],
    faqs: [
      { question: "Do I need to eat for two?", answer: "No. Most women don't need extra calories in the first two trimesters, and only a modest amount — around 200 kcal a day — in the last trimester. Focus on nourishing choices rather than bigger portions." },
      { question: "Are traditional postpartum foods okay?", answer: "Yes, they can be part of recovery. They're often rich in ghee, nuts and jaggery, so we'll fit them in at a sensible amount for you." },
      { question: "Can I try to lose weight while breastfeeding?", answer: "Gradual weight loss is usually fine once feeding is established, but crash dieting isn't. We'll focus on nourishing you first." },
      { question: "Which supplements should I take?", answer: "Your obstetrician will advise you. Folic acid before and early in pregnancy is widely recommended, and iron, calcium and vitamin D are commonly prescribed depending on your needs." },
    ],
    references: [refs.nhsPregnancyDiet, refs.whoBreastfeeding, refs.ninGuidelines],
    related: ["pcos-diet", "child-nutrition", "diabetes-diet"],
  },
  {
    slug: "child-nutrition",
    name: "Child Nutrition",
    shortName: "Kids",
    category: "life-stages",
    art: "kite",
    metaTitle: "Child Nutrition & Fussy Eater Support",
    metaDescription:
      "Calmer mealtimes and healthy growth — support for parents of fussy eaters, tiffin planning, growth concerns and active kids, with clinical dietitian Irika Goyal.",
    h1: "Happy mealtimes for growing kids (and their grown-ups)",
    lede: "Mealtimes with children can feel like negotiations. We take the pressure off — for you and your child — and build habits the whole family can share.",
    summary: "Calmer mealtimes, better tiffins, healthy growth.",
    whoFor: [
      "Parents of fussy or selective eaters",
      "Children with growth or weight concerns, together with their paediatrician",
      "Families wanting better tiffin and snack ideas",
      "Active children and teens in sport",
      "Children with diagnosed food allergies",
    ],
    concerns: [
      "Picky eating and mealtime battles",
      "Tiffin ideas children actually eat",
      "Packaged snacks, sugary drinks and screen-time snacking",
      "Iron, calcium and vitamin D",
      "Growth, using your paediatrician's charts — never diet talk with children",
    ],
    approach: [
      { title: "Parents lead, kids decide", body: "You choose what's offered, when and where. Your child decides whether to eat and how much. It sounds simple, and it takes a lot of pressure out of the table." },
      { title: "Lots of tiny tries", body: "Many children need to see and taste a new food many times before accepting it. Repeated, no-pressure exposure works better than bribes." },
      { title: "No diets for kids", body: "Weight concerns are handled sensitively, with your paediatrician, through family habits — not by putting a child on a diet." },
    ],
    faqs: [
      { question: "My child eats only a few foods. Is that normal?", answer: "Selective eating is common, especially in toddlers and young children. If it's affecting growth, energy or family life, or the list of accepted foods is very short, it's worth getting support." },
      { question: "Does my child need supplements?", answer: "Most children can meet their needs from food. Supplements are only suggested if there's a specific deficiency or your paediatrician advises one." },
      { question: "Will you put my child on a diet?", answer: "No. We work on family habits and the food environment, and keep conversations with children positive and weight-neutral." },
    ],
    references: [refs.whoHealthyDiet, refs.nhsVitaminD, refs.ninGuidelines],
    related: ["food-allergies-intolerances", "sports-nutrition", "pregnancy-nutrition"],
  },
  {
    slug: "senior-citizen-diet",
    name: "Healthy Ageing Nutrition",
    shortName: "Healthy ageing",
    category: "life-stages",
    art: "cup",
    metaTitle: "Senior Citizen Diet & Healthy Ageing Nutrition",
    metaDescription:
      "Nutrition for strong, independent later years — protein for muscle, bone health, appetite, chewing and managing several conditions. Support for seniors and caregivers.",
    h1: "Nutrition for strong, independent later years",
    lede: "Good food in later life is about strength, independence and enjoyment. We plan meals that protect muscle and bones and still feel like home.",
    summary: "Protect muscle, bones and independence — deliciously.",
    whoFor: [
      "Adults over 60 who want to stay strong and independent",
      "Caregivers planning meals for a parent or grandparent",
      "Older adults with a poor appetite or recent weight loss",
      "People managing several conditions and medicines at once",
    ],
    concerns: [
      "Enough protein to protect muscle",
      "Calcium, vitamin D and vitamin B12",
      "Chewing or swallowing difficulties and texture changes",
      "Appetite, thirst and staying hydrated",
      "Constipation",
      "Balancing diets for diabetes, heart and kidney conditions together",
    ],
    approach: [
      { title: "More protein, not less", body: "Expert groups suggest healthy older adults may need around 1.0–1.2 g of protein per kg of body weight a day — more than younger adults — to help protect muscle." },
      { title: "Small and often", body: "When appetite is low, smaller meals and nourishing snacks are easier than three big plates." },
      { title: "One simple plan", body: "When several conditions overlap, we simplify the advice into one plan that's easy to follow at home." },
    ],
    faqs: [
      { question: "Do older adults need less protein?", answer: "Usually not. Research suggests older adults often need more protein per kilogram than younger adults to maintain muscle, unless a condition such as kidney disease means otherwise." },
      { question: "My parent eats very little. What helps?", answer: "Small, frequent meals, nourishing drinks, soft textures and eating together often help. Unintended weight loss should also be mentioned to their doctor." },
      { question: "Is it safe to lose weight in older age?", answer: "Sometimes, but unintended weight and muscle loss are bigger concerns at this age. Any weight loss should be gradual and supervised." },
    ],
    references: [refs.protAge, refs.bhofOsteoporosis, refs.nhsVitaminD],
    related: ["bone-health", "heart-health", "diabetes-diet"],
  },
  {
    slug: "bone-health",
    name: "Bone Health & Osteoporosis",
    shortName: "Bone health",
    category: "life-stages",
    art: "bone",
    metaTitle: "Nutrition for Bone Health & Osteoporosis",
    metaDescription:
      "Calcium, vitamin D and protein from Indian foods for stronger bones — support for osteopenia, osteoporosis and after menopause, alongside your doctor's care.",
    h1: "Building and protecting stronger bones",
    lede: "Bones are living tissue, and what you eat helps keep them strong at every age. We build calcium, vitamin D and protein into meals you already like.",
    summary: "Calcium, vitamin D and protein — built into everyday meals.",
    whoFor: [
      "People diagnosed with osteopenia or osteoporosis",
      "Women around and after menopause",
      "People with a family history of osteoporosis",
      "Anyone avoiding dairy who wants to protect their bones",
    ],
    concerns: [
      "Calcium from dairy, ragi, sesame, leafy greens and tofu",
      "Vitamin D — sunlight, testing and when supplements make sense",
      "Protein for bone and muscle",
      "Salt, caffeine and alcohol",
      "Weight-bearing and strength exercise, ideally guided by a physiotherapist",
    ],
    approach: [
      { title: "Food first", body: "Osteoporosis guidance recommends adequate calcium and vitamin D, mainly from food, with supplements used where diet falls short." },
      { title: "Check vitamin D", body: "Vitamin D deficiency is common. Your doctor can test your levels and advise on supplements." },
      { title: "Food plus movement", body: "Nutrition works best together with weight-bearing and strengthening exercise." },
    ],
    faqs: [
      { question: "How much calcium do I need?", answer: "Needs depend on age and sex. Many adults over 50 are advised to aim for roughly 1,000–1,200 mg a day from food and, if needed, supplements. We'll work out your intake and gap." },
      { question: "Is ragi a good source of calcium?", answer: "Yes — ragi (finger millet) is one of the richest cereal sources of calcium, and it's easy to use in rotis, dosa, porridge and laddoos." },
      { question: "Can I get enough vitamin D from the sun?", answer: "It depends on skin type, time spent outdoors, clothing and season. Deficiency is common even in sunny places, so testing is the best way to know." },
    ],
    references: [refs.bhofOsteoporosis, refs.nhsOsteoporosis, refs.nhsVitaminD],
    related: ["senior-citizen-diet", "food-allergies-intolerances", "pregnancy-nutrition"],
  },

  /* ------------------------------------------------------------------ */
  /* Performance & strength                                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "sports-nutrition",
    name: "Sports Nutrition",
    shortName: "Sports nutrition",
    category: "performance",
    art: "bolt",
    metaTitle: "Sports Nutritionist in Mumbai & Online",
    metaDescription:
      "Fuel for training, competing and recovering — carbohydrate, protein, hydration in Mumbai's heat and safe supplement choices, with clinical dietitian Irika Goyal.",
    h1: "Fuel for training, competing and recovering",
    lede: "Whether you run marathons, play weekend cricket or lift before work, the right fuel helps you train harder, recover faster and stay well.",
    summary: "Train harder, recover better, stay well.",
    whoFor: [
      "Runners, cyclists and endurance athletes",
      "Team-sport and racquet-sport players",
      "Gym-goers and people starting a fitness routine",
      "Young athletes, together with a parent",
    ],
    concerns: [
      "Carbohydrate to match your training load",
      "Protein for recovery",
      "Hydration and electrolytes in Mumbai's heat and humidity",
      "Race-day and match-day eating",
      "Signs of under-fuelling — fatigue, frequent injury, missed periods",
      "Supplements, contamination risks and anti-doping rules",
    ],
    approach: [
      { title: "Fuel for the work required", body: "Sports nutrition position statements tailor carbohydrate to training load and suggest roughly 1.2–2.0 g of protein per kg of body weight a day for athletes. Easy days and hard days don't need the same plate." },
      { title: "Practise in training", body: "Race-day food and drinks should be tested in training first — never something new on the day." },
      { title: "Supplements, carefully", body: "A few supplements have good evidence, many don't, and some are contaminated. Competitive athletes should choose batch-tested products and check anti-doping rules." },
    ],
    faqs: [
      { question: "What should I eat before an early morning run?", answer: "Something small and easy to digest, such as a banana, toast or a few dates, 30–60 minutes before. Longer or harder sessions may need more. Practise it in training." },
      { question: "Do I need sports drinks?", answer: "For long sessions — usually over 60–90 minutes — or heavy sweating, they can help. For shorter workouts, water and regular meals are usually enough." },
      { question: "Are supplements safe for competitive athletes?", answer: "Some carry a risk of contamination with banned substances. Choose third-party batch-tested products and check your federation's anti-doping rules before taking anything." },
    ],
    references: [refs.sportsPosition, refs.issnProtein],
    related: ["muscle-gain", "fat-loss", "child-nutrition"],
    articles: ["10-best-protein-sources-for-vegetarians-in-india"],
  },
  {
    slug: "muscle-gain",
    name: "Muscle Gain Nutrition",
    shortName: "Muscle gain",
    category: "performance",
    art: "dumbbell",
    metaTitle: "Muscle Gain Diet Plan, Including Vegetarian",
    metaDescription:
      "Build muscle with the right protein, calories and timing — including vegetarian and eggetarian plans with Indian foods. Support from clinical dietitian Irika Goyal.",
    h1: "Build muscle with food that works as hard as you do",
    lede: "Lifting is half the work. We make sure your plate supplies the protein and energy to turn training into muscle — vegetarian, eggetarian or non-vegetarian.",
    summary: "Protein, energy and timing — vegetarian-friendly.",
    whoFor: [
      "Gym-goers who want to build muscle",
      "Vegetarians who struggle to reach their protein target",
      "Beginners unsure where to start",
      "People who are naturally lean and find it hard to gain",
    ],
    concerns: [
      "Your protein target and how to spread it across the day",
      "Combining plant proteins — dal, soya, paneer, curd, sprouts",
      "Eating enough overall to support growth",
      "Whey, creatine and other supplements",
      "Recovery and sleep",
    ],
    approach: [
      { title: "Protein that adds up", body: "For people training to build muscle, sports nutrition evidence supports around 1.4–2.0 g of protein per kg of body weight a day, spread over several meals." },
      { title: "Enough fuel", body: "Muscle is hard to build in a big calorie deficit. A modest surplus usually helps, without overdoing it." },
      { title: "Food first, supplements second", body: "Whey or plant protein powders can be convenient. Creatine monohydrate is well researched, but whether it suits you depends on your health — we'll talk it through." },
    ],
    faqs: [
      { question: "How much protein do I need to build muscle?", answer: "For most people who train regularly, around 1.4–2.0 g per kg of body weight a day, spread across meals. We'll calculate a target that fits your size, training and health." },
      { question: "Can I build muscle on a vegetarian diet?", answer: "Yes. Combining dal, soya, paneer, curd, milk, sprouts, nuts and seeds can meet your needs with good planning." },
      { question: "Is whey protein safe?", answer: "For most healthy people, whey from a reputable brand is a safe, convenient protein source. If you have kidney disease or other conditions, check with your doctor first." },
    ],
    references: [refs.issnProtein, refs.sportsPosition, refs.andVegetarian],
    related: ["sports-nutrition", "fat-loss", "weight-gain"],
    articles: ["10-best-protein-sources-for-vegetarians-in-india"],
  },

  /* ------------------------------------------------------------------ */
  /* Ways to work together                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "online-consultation",
    name: "Online Consultations",
    shortName: "Online",
    category: "formats",
    art: "screen",
    metaTitle: "Online Diet Consultation with a Dietitian",
    metaDescription:
      "Personalised nutrition consultations over video, from anywhere in India or abroad. Plans shared digitally, with questions answered on WhatsApp between sessions.",
    h1: "Online nutrition consultations, wherever you are",
    lede: "The same personalised care as in person — over a video call from your home, office or hotel room.",
    summary: "Personalised care over video, from anywhere.",
    whoFor: [
      "People outside Mumbai, anywhere in India or abroad",
      "Anyone with a packed schedule",
      "People who'd rather talk from the comfort of home",
    ],
    concerns: [
      "Booking a time that works across time zones",
      "Sharing recent reports before the call",
      "Taking simple measurements at home",
      "Getting your plan digitally",
      "Questions between sessions over WhatsApp",
    ],
    approach: [
      { title: "Book on WhatsApp", body: "Send a message with what you'd like help with. You'll get available times and current fees before anything is confirmed." },
      { title: "Talk it through on video", body: "We go through your health history, routine, preferences and goals — exactly as we would in person." },
      { title: "Plan and follow-ups", body: "Your plan is shared digitally, and follow-ups keep it working as life changes." },
    ],
    faqs: [
      { question: "What do I need for an online consultation?", answer: "A phone or computer with a camera, a reasonably stable internet connection, and any recent blood reports or prescriptions you'd like to discuss." },
      { question: "Do you see clients outside India?", answer: "Yes. As long as we can find a time that works across time zones, you're welcome to book from anywhere." },
      { question: "Is online as effective as in person?", answer: "For most nutrition care, yes — the conversation is the core of it, and simple measurements can be taken at home. If you're in Mumbai and prefer to meet, in-person sessions are available too." },
    ],
    references: [],
    related: ["offline-consultation", "corporate-wellness"],
  },
  {
    slug: "offline-consultation",
    name: "In-Person Consultations in Mumbai",
    shortName: "In person",
    category: "formats",
    art: "pin",
    metaTitle: "In-Person Dietitian Consultation in Mumbai",
    metaDescription:
      "Prefer to meet face to face? In-person nutrition consultations with clinical dietitian Irika Goyal are available in Mumbai — the location is shared when you book.",
    h1: "In-person nutrition consultations in Mumbai",
    lede: "Prefer to talk face to face? In-person sessions are available in Mumbai. The exact location is shared when you book.",
    summary: "Face-to-face sessions in Mumbai.",
    whoFor: [
      "People in Mumbai who prefer to meet in person",
      "Families who'd like to come together",
      "Anyone who finds video calls hard",
    ],
    concerns: [
      "Booking a convenient slot",
      "What to bring to your first session",
      "How long sessions take",
      "Mixing in-person and online follow-ups",
    ],
    approach: [
      { title: "Book on WhatsApp", body: "Send a message to check available slots and current fees. The location is shared once your appointment is confirmed." },
      { title: "Bring what you have", body: "Recent blood reports, a list of medicines and supplements, and a rough idea of what you eat in a typical day." },
      { title: "Family welcome", body: "If someone else cooks for you or shares your meals, they're welcome to join." },
    ],
    faqs: [
      { question: "Where are in-person sessions held?", answer: "In Mumbai. The exact location is shared when your appointment is confirmed." },
      { question: "How long is an in-person consultation?", answer: "The first consultation usually takes 45–60 minutes, and follow-ups 20–30 minutes." },
      { question: "Can I switch between in-person and online sessions?", answer: "Ask when you book — mixing the two is often the most convenient option." },
    ],
    references: [],
    related: ["online-consultation", "weight-loss"],
  },
  {
    slug: "corporate-wellness",
    name: "Corporate Wellness",
    shortName: "Corporate",
    category: "formats",
    art: "people",
    metaTitle: "Corporate Nutrition Workshops & Wellness Talks",
    metaDescription:
      "Practical, conversation-led nutrition workshops for teams — desk lunches, energy slumps, travel and festive season. Online or on-site in Mumbai.",
    h1: "Nutrition sessions your team will actually enjoy",
    lede: "Practical, conversation-led sessions on eating well at work — desk lunches, late meetings, travel and festive season. Online, or on-site in Mumbai.",
    summary: "Talks and workshops for teams, online or on-site.",
    whoFor: [
      "HR and people teams planning wellness programmes",
      "Start-ups and growing companies",
      "Employee wellness committees",
    ],
    concerns: [
      "Energy slumps and afternoon snacking",
      "Eating well with long hours and travel",
      "Canteen, cafeteria and order-in choices",
      "Reading food labels",
      "Festive-season eating",
      "Optional one-to-one consultations for employees",
    ],
    approach: [
      { title: "Tailored to your team", body: "Share your team size, format and goals. Sessions are planned around your people, not a slide deck that's been used a hundred times." },
      { title: "Interactive, not preachy", body: "Real food, real questions and practical take-aways employees can use the same day." },
      { title: "Confidential one-to-ones", body: "Where individual consultations are included, they stay confidential between the employee and me." },
    ],
    faqs: [
      { question: "Do you run sessions online or on-site?", answer: "Both. Online sessions work for distributed teams anywhere, and on-site sessions are available in Mumbai." },
      { question: "How is pricing worked out?", answer: "It depends on the format, length and team size. Share the details on WhatsApp or email and you'll receive a proposal." },
    ],
    references: [refs.whoHealthyDiet],
    related: ["online-consultation", "weight-loss"],
  },
]

export const serviceSlugs = services.map((s) => s.slug)

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServicesByCategory(id: CategoryId): Service[] {
  return services.filter((s) => s.category === id)
}

export function getRelatedServices(service: Service): Service[] {
  return service.related.map(getServiceBySlug).filter((s): s is Service => Boolean(s))
}

/** Phrase used mid-sentence ("Ask about …", "How Irika approaches …"). */
const topics: Record<string, string> = {
  "weight-loss": "weight loss",
  "fat-loss": "fat loss",
  "weight-gain": "healthy weight gain",
  "pcos-diet": "PCOS",
  "diabetes-diet": "diabetes",
  "thyroid-diet": "thyroid health",
  "heart-health": "heart health",
  "kidney-nutrition": "kidney health",
  "cancer-nutrition-support": "nutrition during cancer care",
  "gut-health": "gut health",
  "food-allergies-intolerances": "food allergies and intolerances",
  "pregnancy-nutrition": "pregnancy nutrition",
  "child-nutrition": "children's nutrition",
  "senior-citizen-diet": "healthy ageing",
  "bone-health": "bone health",
  "sports-nutrition": "sports nutrition",
  "muscle-gain": "muscle gain",
  "online-consultation": "online consultations",
  "offline-consultation": "in-person consultations",
  "corporate-wellness": "corporate wellness",
}

export function topicFor(service: Service): string {
  return topics[service.slug] ?? service.shortName
}
