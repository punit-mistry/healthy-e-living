/**
 * Location pages.
 *
 * Every URL that existed before the redesign is preserved. A location is
 * indexable only when it has its own local content below — a page that is
 * genuinely about that place, not a find-and-replace copy. Sub-areas without
 * local content (e.g. Borivali West) stay live as `noindex, follow` pages that
 * link up to their main area.
 *
 * Honesty rules for this file:
 * - In-person sessions happen in Mumbai; the exact location is shared on
 *   booking. Never imply a clinic in a specific suburb unless one exists.
 * - Cities outside the Mumbai region are served online only.
 * - Local notes use general, well-known facts about a place — never claims
 *   about local clients, results or rankings.
 */

export type District = "Mumbai City" | "Mumbai Suburban" | "Thane" | "Raigad" | "India"

export interface LocalContent {
  intro: string
  tips: { title: string; body: string }[]
}

export interface LocationInfo {
  slug: string
  name: string
  district: District
  /** Parent area for sub-areas, e.g. borivali-west → borivali. */
  parent?: string
  indexable: boolean
  local?: LocalContent
}

const rows: [slug: string, name: string, district: District, parent?: string][] = [
  ["mumbai", "Mumbai", "Mumbai City"],
  ["borivali", "Borivali", "Mumbai Suburban"],
  ["borivali-west", "Borivali West", "Mumbai Suburban", "borivali"],
  ["borivali-east", "Borivali East", "Mumbai Suburban", "borivali"],
  ["malad", "Malad", "Mumbai Suburban"],
  ["malad-west", "Malad West", "Mumbai Suburban", "malad"],
  ["malad-east", "Malad East", "Mumbai Suburban", "malad"],
  ["kandivali", "Kandivali", "Mumbai Suburban"],
  ["kandivali-west", "Kandivali West", "Mumbai Suburban", "kandivali"],
  ["kandivali-east", "Kandivali East", "Mumbai Suburban", "kandivali"],
  ["andheri", "Andheri", "Mumbai Suburban"],
  ["andheri-west", "Andheri West", "Mumbai Suburban", "andheri"],
  ["andheri-east", "Andheri East", "Mumbai Suburban", "andheri"],
  ["goregaon", "Goregaon", "Mumbai Suburban"],
  ["jogeshwari", "Jogeshwari", "Mumbai Suburban", "andheri"],
  ["mira-road", "Mira Road", "Thane"],
  ["bhayander", "Bhayander", "Thane"],
  ["dahisar", "Dahisar", "Mumbai Suburban"],
  ["santacruz", "Santacruz", "Mumbai Suburban", "bandra"],
  ["bandra", "Bandra", "Mumbai Suburban"],
  ["powai", "Powai", "Mumbai Suburban"],
  ["mulund", "Mulund", "Mumbai Suburban", "thane"],
  ["ghatkopar", "Ghatkopar", "Mumbai Suburban", "powai"],
  ["thane", "Thane", "Thane"],
  ["navi-mumbai", "Navi Mumbai", "Thane"],
  ["vashi", "Vashi", "Thane", "navi-mumbai"],
  ["airoli", "Airoli", "Thane", "navi-mumbai"],
  ["kharghar", "Kharghar", "Raigad", "navi-mumbai"],
  ["panvel", "Panvel", "Raigad", "navi-mumbai"],
  ["chembur", "Chembur", "Mumbai Suburban", "mumbai"],
  ["dadar", "Dadar", "Mumbai City", "mumbai"],
  ["lower-parel", "Lower Parel", "Mumbai City", "mumbai"],
  ["colaba", "Colaba", "Mumbai City", "mumbai"],
  ["churchgate", "Churchgate", "Mumbai City", "mumbai"],
  ["worli", "Worli", "Mumbai City", "mumbai"],
  ["juhu", "Juhu", "Mumbai Suburban", "andheri"],
  ["versova", "Versova", "Mumbai Suburban", "andheri"],
  ["bkc", "BKC", "Mumbai Suburban", "bandra"],
  ["prabhadevi", "Prabhadevi", "Mumbai City", "mumbai"],
  ["matunga", "Matunga", "Mumbai City", "mumbai"],
  ["sion", "Sion", "Mumbai City", "mumbai"],
  ["kurla", "Kurla", "Mumbai Suburban", "mumbai"],
  // Major Indian cities — online consultations only.
  ["delhi", "Delhi", "India"],
  ["gurugram", "Gurugram", "India"],
  ["noida", "Noida", "India"],
  ["bengaluru", "Bengaluru", "India"],
  ["hyderabad", "Hyderabad", "India"],
  ["chennai", "Chennai", "India"],
  ["kolkata", "Kolkata", "India"],
  ["pune", "Pune", "India"],
  ["ahmedabad", "Ahmedabad", "India"],
  ["jaipur", "Jaipur", "India"],
  ["lucknow", "Lucknow", "India"],
  ["chandigarh", "Chandigarh", "India"],
]

const local: Record<string, LocalContent> = {
  /* ---------------------------------------------------- Mumbai region */
  mumbai: {
    intro: "Mumbai runs on long commutes, packed calendars and some of the best street food in the country. Your plan should work with that, not against it.",
    tips: [
      { title: "Long commutes", body: "Hours on the train or in traffic make meal timing tricky. We plan portable breakfasts and snacks — and a dabba that actually travels well." },
      { title: "Street-food city", body: "Vada pav, pav bhaji and chaat are part of life here. We work out how and when they fit, instead of pretending they don't exist." },
      { title: "Heat, humidity & monsoon", body: "Sticky summers mean higher fluid needs; the monsoon brings food-safety questions and comfort cravings. Both get planned for." },
      { title: "Festival season", body: "From Ganeshotsav modaks to Diwali sweets and wedding season, we plan for celebrations rather than around them." },
    ],
  },
  borivali: {
    intro: "Borivali mornings often start with a walk near Sanjay Gandhi National Park and end with a long ride home on the Western line. Good nutrition here means fitting around both.",
    tips: [
      { title: "Walkers and early risers", body: "If your day starts with a walk or a workout, we plan what to have before (if anything) and a breakfast that actually refuels you afterwards." },
      { title: "Western line days", body: "Long rides into town mean breakfast on the go and lunch from a dabba. We build both to keep you full through the commute." },
      { title: "Gujarati and Maharashtrian kitchens", body: "Thepla, dhokla, poha, varan-bhaat — the dishes many Borivali homes cook every day stay on the menu, with smarter portions and pairings." },
    ],
  },
  kandivali: {
    intro: "Kandivali is busy family territory — school runs, tuition timings and a commute for most of the household. The best plan is one the whole family can share.",
    tips: [
      { title: "Family-first meals", body: "One kitchen, several needs. We make one menu work for a diabetic parent, a growing child and you, rather than cooking three separate meals." },
      { title: "School tiffins", body: "Quick, packable tiffin ideas that children actually eat, without relying on packaged snacks." },
      { title: "Evening snack lanes", body: "Local snack stalls are part of the fun. We plan for the occasional plate rather than banning it." },
    ],
  },
  malad: {
    intro: "Between Malad's office parks, malls and busy markets, many days are spent eating at a desk or a food court. We make those meals count.",
    tips: [
      { title: "Office-park lunches", body: "Canteen, cafeteria or order-in — we work out the best choices from what's actually available near your desk." },
      { title: "Food-court weekends", body: "Mall outings don't have to undo the week. A few simple rules make food courts and restaurants easy to navigate." },
      { title: "Late shifts", body: "If you work evening or night shifts, meal timing matters as much as meal content. We plan around your hours." },
    ],
  },
  goregaon: {
    intro: "From studio shoots to office towers along the highway, Goregaon keeps unusual hours. Nutrition needs to flex with your schedule.",
    tips: [
      { title: "Irregular schedules", body: "Shoots, shifts and long meetings make regular mealtimes impossible. We build a flexible rhythm instead of a rigid clock." },
      { title: "Green escapes", body: "Aarey's tree-lined roads are a favourite for walks and cycling. We match your fuel to your activity." },
      { title: "Set catering and craft services", body: "If you eat what's provided at work, we work out how to choose well from it." },
    ],
  },
  andheri: {
    intro: "Andheri is Mumbai at full speed — the Metro, the airport, media offices and cafés that stay open late. We plan for a life that rarely slows down.",
    tips: [
      { title: "Late nights", body: "Late shoots, late meetings and late dinners are common. We plan lighter evening meals and smarter snacks that don't wreck your sleep." },
      { title: "Café culture", body: "Lokhandwala and Versova cafés are part of the social calendar. Simple swaps keep coffee catch-ups enjoyable." },
      { title: "Frequent travellers", body: "Living near the airport often means flying a lot. We build a travel kit and airport-food strategy you can repeat every trip." },
    ],
  },
  dahisar: {
    intro: "At Mumbai's northern edge, Dahisar mixes family homes with long commutes into the city. Your plan needs to work from your own kitchen.",
    tips: [
      { title: "Home-cooked first", body: "Most meals here are cooked at home, which is a real advantage. We tune familiar recipes rather than replacing them." },
      { title: "Commuter breakfasts", body: "Early departures call for breakfasts you can eat quickly or carry, with enough protein to last until lunch." },
      { title: "Online when it's easier", body: "If a trip into town for a session doesn't suit you, online follow-ups keep your plan on track." },
    ],
  },
  "mira-road": {
    intro: "Mira Road has grown into a busy township of young families, many of whom commute into Mumbai every day. Time is the scarcest ingredient.",
    tips: [
      { title: "Time-saving meal prep", body: "Batch-cooked dals, chopped vegetables and ready chutneys make weekday dinners quick without turning to takeaway." },
      { title: "Weekend eating out", body: "Weekend outings are part of family life. We plan for them so they fit the week rather than reset it." },
      { title: "Online or in Mumbai", body: "Online sessions save the commute; in-person sessions are held in Mumbai if you prefer to meet." },
    ],
  },
  bhayander: {
    intro: "From the fishing villages of Uttan to busy station markets, Bhayander's kitchens range from fresh seafood to strictly vegetarian and Jain homes. Plans here have to respect both.",
    tips: [
      { title: "Fresh fish, cooked well", body: "Local fish is an excellent source of protein. We look at portions and cooking methods — more curries and grills, fewer fries." },
      { title: "Vegetarian and Jain plans", body: "For vegetarian and Jain households, we build protein from dals, dairy and other allowed foods, without onion or garlic where needed." },
      { title: "Online or in Mumbai", body: "Most people in Bhayander choose online sessions; in-person sessions are held in Mumbai if you'd rather meet." },
    ],
  },
  bandra: {
    intro: "Bandra eats out: bakeries, brunches and café-hopping, with evening walks along Carter Road and Bandstand. We keep the joy and add some balance.",
    tips: [
      { title: "Brunch and bakeries", body: "Weekend brunch and a local bakery habit can both fit. We look at frequency and pairing rather than cutting them out." },
      { title: "Promenade walks", body: "Carter Road and Bandstand make daily walks easy. We plan meals that support the activity you already enjoy." },
      { title: "Social calendars", body: "Dinners out and drinks with friends are common. A few go-to strategies make them stress-free." },
    ],
  },
  powai: {
    intro: "Lakeside walks, tech campuses and student hostels — Powai's days are long and often spent at a desk. We plan food that keeps up.",
    tips: [
      { title: "Desk-bound days", body: "Long hours at a screen call for steady energy: protein at lunch, smart snacks and enough water." },
      { title: "Hostel and PG eating", body: "Students and young professionals often eat what's served. We work with mess menus and simple add-ons." },
      { title: "Lakeside activity", body: "Running or cycling around Powai Lake? We match fuel and recovery to your training." },
    ],
  },
  thane: {
    intro: "Thane — the city of lakes — combines Central line commutes with a strong home-cooking tradition. Your plan can be built around both.",
    tips: [
      { title: "Central line commutes", body: "Early trains and late returns make dinner the biggest meal of the day. We rebalance so it isn't." },
      { title: "Lake walks", body: "Upvan and Masunda lakes make walking an easy daily habit. Pair it with a plan, and it adds up." },
      { title: "Misal and more", body: "Thane's famous misal can stay — with a few tweaks to portions, toppings and what comes alongside." },
    ],
  },
  "navi-mumbai": {
    intro: "Planned sectors, IT parks and some of the city's widest walking tracks make Navi Mumbai a great place to build healthy routines.",
    tips: [
      { title: "Seasonal produce", body: "With Vashi's huge APMC wholesale market nearby, fresh seasonal fruit and vegetables are easy to find and affordable. We plan menus around the seasons." },
      { title: "IT-park routines", body: "Office shifts at business parks mean predictable days. We use that predictability to build a steady meal rhythm." },
      { title: "Walking tracks and hills", body: "From Palm Beach Road to Kharghar's hills, there's space to move. We fuel the activity you enjoy." },
    ],
  },

  /* ------------------------------------------------ Indian cities (online) */
  delhi: {
    intro: "Delhi eats with gusto — parathas in winter, chole bhature on weekends and chaat on every corner. Online consultations bring personalised care to your Delhi kitchen.",
    tips: [
      { title: "Winter comfort food", body: "Parathas, gajar ka halwa and rich gravies are part of the season. We plan portions and pairings so winter doesn't undo the year." },
      { title: "Street-food favourites", body: "Chole bhature and chaat can fit in a balanced week — we work out how often and with what." },
      { title: "Poor air-quality days", body: "When pollution makes outdoor exercise a bad idea, we plan indoor activity and adjust meals to match." },
    ],
  },
  gurugram: {
    intro: "Corporate towers, long commutes and food delivered to the desk — Gurugram's pace leaves little time to think about food. That's where a plan helps.",
    tips: [
      { title: "Desk lunches and delivery apps", body: "We build a shortlist of better choices from the delivery apps you already use." },
      { title: "Meetings that run late", body: "Late calls with global teams push dinner later. We plan lighter evening meals and smarter snacks." },
      { title: "Weekend dining out", body: "Busy weekend food scenes can fit into the week with a few simple strategies." },
    ],
  },
  noida: {
    intro: "From IT parks to busy sector markets, Noida's days are long and its momos are tempting. Online consultations fit around your shifts.",
    tips: [
      { title: "Shift-friendly eating", body: "Rotating or late shifts need a meal plan built around your actual hours, not a 9-to-5 template." },
      { title: "Market snacks", body: "Momos, rolls and chaat from sector markets can fit — we plan the how and how often." },
      { title: "North Indian winters", body: "Cold months bring heavier food and less movement. We plan for the season in advance." },
    ],
  },
  bengaluru: {
    intro: "Bengaluru's mild weather is made for walking and cycling, its breakfasts are legendary, and its tech hours are long. We plan for all three.",
    tips: [
      { title: "Darshini breakfasts", body: "Idli, dosa and filter coffee can be a great start to the day — we tune portions and add protein so it lasts until lunch." },
      { title: "Ragi, the local hero", body: "Ragi mudde and ragi dosa are traditional Karnataka staples, and ragi is one of the richest cereal sources of calcium." },
      { title: "Tech-hour fatigue", body: "Long screen days call for steady energy, regular meals and fewer late-night snacks." },
    ],
  },
  hyderabad: {
    intro: "Hyderabad means biryani, haleem season and long days in the HITEC City corridor. Online consultations help you enjoy the food the city is famous for.",
    tips: [
      { title: "Biryani, sensibly", body: "Biryani can stay on the menu — we look at portion size, how often, and what to serve alongside." },
      { title: "Ramzan and fasting", body: "During Ramzan we plan sehri and iftar that keep you energised, hydrated and steady through the fast." },
      { title: "IT-corridor routines", body: "Long office days need planned lunches and snacks rather than whatever's nearest." },
    ],
  },
  chennai: {
    intro: "Chennai's heat, humidity and rice-centred meals shape how the city eats. Online consultations bring a plan made for your plate and your climate.",
    tips: [
      { title: "Hydration in the heat", body: "Hot, humid months raise fluid needs. We plan drinks and water-rich foods, beyond just plain water." },
      { title: "Rice-based meals", body: "Sambar, rasam, kootu and curd rice stay — we balance portions and add protein and vegetables." },
      { title: "Filter coffee habits", body: "We look at how much sugar your coffee habit adds up to, and how to enjoy it without the extra." },
    ],
  },
  kolkata: {
    intro: "Fish and rice, puchka on the go and sweets for every occasion — Kolkata's food culture is a joy. Online consultations help you keep it in balance.",
    tips: [
      { title: "Fish and rice", body: "Fish is a great source of protein. We balance it with vegetables and sensible rice portions." },
      { title: "Mishti, mindfully", body: "Rosogolla and sandesh are part of celebrations — we plan for them rather than banning them." },
      { title: "Festival season", body: "Durga Puja brings days of feasting. We plan the weeks around it so the festival can be fully enjoyed." },
    ],
  },
  pune: {
    intro: "Students, IT professionals and weekend trekkers make Pune an active, busy city. Online consultations fit around lectures, shifts and Sinhagad mornings.",
    tips: [
      { title: "Student and PG eating", body: "Mess food and late-night snacks are common. We work with what's available and add simple upgrades." },
      { title: "Misal and poha", body: "Local favourites stay on the menu with smarter portions and protein-rich add-ons." },
      { title: "Weekend treks", body: "Trekking needs the right fuel and recovery — we plan both." },
    ],
  },
  ahmedabad: {
    intro: "Ahmedabad's vegetarian thalis, farsan and festive Navratri nights are part of daily life. Online consultations build on the Gujarati kitchen you already have.",
    tips: [
      { title: "Gujarati thali balance", body: "Dal, shaak, rotli and rice already make a great base. We look at sweetness, oil and protein." },
      { title: "Farsan, sensibly", body: "Dhokla and khaman are steamed and light; fried farsan is a treat. We plan the mix." },
      { title: "Navratri nights", body: "Nine nights of garba need energy — and fasting days need care. We plan both." },
    ],
  },
  jaipur: {
    intro: "Dal baati churma, ghee-rich sweets and long, hot summers define Jaipur's food life. Online consultations help you keep tradition and health together.",
    tips: [
      { title: "Ghee and tradition", body: "Rajasthani food is famously rich. We keep the flavour while finding the right amount of ghee for you." },
      { title: "Summer heat", body: "Hot months raise fluid needs. Buttermilk, lemon water and water-rich foods help." },
      { title: "Millet heritage", body: "Bajra rotis and raab are traditional Rajasthani foods — and great for a balanced plate." },
    ],
  },
  lucknow: {
    intro: "Awadhi kebabs, biryani and chaat give Lucknow one of India's richest food cultures. Online consultations help you enjoy it without the guilt.",
    tips: [
      { title: "Kebabs and biryani", body: "We look at portions, frequency and what to pair with rich Awadhi dishes." },
      { title: "Chaat culture", body: "Basket chaat and tikki can fit in — with a little planning around the rest of the day." },
      { title: "Winter months", body: "North Indian winters bring heavier food and less movement. We plan ahead for the season." },
    ],
  },
  chandigarh: {
    intro: "Lassi, paneer and generous Punjabi meals — alongside morning walks at Sukhna Lake. Chandigarh makes an active, well-fed life easy. Online consultations help you balance it.",
    tips: [
      { title: "Dairy-rich diets", body: "Paneer, curd and lassi provide good protein and calcium; we look at portions and added sugar." },
      { title: "Punjabi portions", body: "Generous servings are part of the hospitality. We find ways to enjoy them without overdoing it." },
      { title: "Active mornings", body: "Walking and cycling are easy in a planned city — we fuel the activity you enjoy." },
    ],
  },
}

export const locations: LocationInfo[] = rows.map(([slug, name, district, parent]) => ({
  slug,
  name,
  district,
  parent,
  local: local[slug],
  indexable: Boolean(local[slug]),
}))

export const districts: { id: District; title: string }[] = [
  { id: "Mumbai City", title: "South & central Mumbai" },
  { id: "Mumbai Suburban", title: "Mumbai suburbs" },
  { id: "Thane", title: "Thane, Mira–Bhayander & Navi Mumbai" },
  { id: "Raigad", title: "Panvel & Kharghar" },
  { id: "India", title: "Across India (online)" },
]

export const locationSlugs = locations.map((l) => l.slug)

export function getLocationBySlug(slug: string): LocationInfo | undefined {
  return locations.find((l) => l.slug === slug)
}

/** Within Mumbai's city limits. */
export function isWithinMumbai(location: LocationInfo): boolean {
  return location.district === "Mumbai City" || location.district === "Mumbai Suburban"
}

/** Outside the Mumbai region: online consultations only. */
export function isOnlineOnly(location: LocationInfo): boolean {
  return location.district === "India"
}

export function getNearbyLocations(location: LocationInfo, count = 8): LocationInfo[] {
  const featured = (l: LocationInfo) => (l.indexable ? 0 : 1)
  return locations
    .filter((l) => l.slug !== location.slug && (isOnlineOnly(location) ? isOnlineOnly(l) : !isOnlineOnly(l)))
    .sort((a, b) => featured(a) - featured(b))
    .slice(0, count)
}

export const featuredMumbaiAreas = locations.filter((l) => l.indexable && !isOnlineOnly(l))
export const featuredCities = locations.filter((l) => l.indexable && isOnlineOnly(l))
