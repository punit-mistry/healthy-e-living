/**
 * Every external source cited on the site. Each URL was checked to resolve to
 * the named document (PubMed IDs verified via NCBI E-utilities) on 2026-10-24.
 */
export interface Reference {
  title: string
  publisher: string
  year?: string
  url: string
}

export const refs = {
  whoHealthyDiet: { title: "Healthy diet — fact sheet", publisher: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
  whoObesity: { title: "Obesity and overweight — fact sheet", publisher: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" },
  whoDiabetes: { title: "Diabetes — fact sheet", publisher: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/diabetes" },
  whoHypertension: { title: "Hypertension — fact sheet", publisher: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/hypertension" },
  whoCvd: { title: "Cardiovascular diseases (CVDs) — fact sheet", publisher: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)" },
  whoPcos: { title: "Polycystic ovary syndrome — fact sheet", publisher: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome" },
  whoBreastfeeding: { title: "Infant and young child feeding — fact sheet", publisher: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/breastfeeding" },
  whoMalnutrition: { title: "Malnutrition — fact sheet", publisher: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/malnutrition" },
  ninGuidelines: { title: "Dietary Guidelines for Indians", publisher: "ICMR – National Institute of Nutrition", year: "2024", url: "https://www.nin.res.in/dietaryguidelines/index.html" },
  asianBmi: { title: "Appropriate body-mass index for Asian populations and its implications for policy and intervention strategies", publisher: "WHO Expert Consultation, The Lancet", year: "2004", url: "https://pubmed.ncbi.nlm.nih.gov/14726171/" },
  indianObesityConsensus: { title: "Consensus statement for diagnosis of obesity, abdominal obesity and the metabolic syndrome for Asian Indians", publisher: "Journal of the Association of Physicians of India", year: "2009", url: "https://pubmed.ncbi.nlm.nih.gov/19582986/" },
  idfMetabolicSyndrome: { title: "Metabolic syndrome — a new world-wide definition. A consensus statement from the International Diabetes Federation", publisher: "Diabetic Medicine", year: "2006", url: "https://pubmed.ncbi.nlm.nih.gov/16681555/" },
  whoPhysicalActivity: { title: "Physical activity — fact sheet", publisher: "World Health Organization", url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
  modestWeightLoss: { title: "Benefits of modest weight loss in improving cardiovascular risk factors in overweight and obese individuals with type 2 diabetes", publisher: "Diabetes Care", year: "2011", url: "https://pubmed.ncbi.nlm.nih.gov/21593294/" },
  pcosGuideline: { title: "Recommendations from the 2023 international evidence-based guideline for the assessment and management of polycystic ovary syndrome", publisher: "European Journal of Endocrinology", year: "2023", url: "https://pubmed.ncbi.nlm.nih.gov/37580861/" },
  adaNutrition: { title: "Nutrition therapy for adults with diabetes or prediabetes: a consensus report", publisher: "Diabetes Care", year: "2019", url: "https://pubmed.ncbi.nlm.nih.gov/31000505/" },
  ataHypothyroidism: { title: "Hypothyroidism — patient information", publisher: "American Thyroid Association", url: "https://www.thyroid.org/hypothyroidism/" },
  ataGuideline: { title: "Guidelines for the treatment of hypothyroidism", publisher: "American Thyroid Association, Thyroid", year: "2014", url: "https://pubmed.ncbi.nlm.nih.gov/25266247/" },
  accAha: { title: "2019 ACC/AHA guideline on the primary prevention of cardiovascular disease", publisher: "Circulation", year: "2019", url: "https://pubmed.ncbi.nlm.nih.gov/30879355/" },
  kdoqi: { title: "KDOQI clinical practice guideline for nutrition in CKD: 2020 update", publisher: "American Journal of Kidney Diseases", year: "2020", url: "https://pubmed.ncbi.nlm.nih.gov/32829751/" },
  niddkCkd: { title: "Eating right for chronic kidney disease", publisher: "National Institute of Diabetes and Digestive and Kidney Diseases (NIH)", url: "https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd/eating-nutrition" },
  nhsCkd: { title: "Chronic kidney disease", publisher: "NHS", url: "https://www.nhs.uk/conditions/kidney-disease/" },
  espenCancer: { title: "ESPEN guidelines on nutrition in cancer patients", publisher: "Clinical Nutrition", year: "2017", url: "https://pubmed.ncbi.nlm.nih.gov/27637832/" },
  wcrf: { title: "World Cancer Research Fund", publisher: "WCRF International", url: "https://www.wcrf.org/" },
  acgIbs: { title: "ACG clinical guideline: management of irritable bowel syndrome", publisher: "American Journal of Gastroenterology", year: "2021", url: "https://pubmed.ncbi.nlm.nih.gov/33315591/" },
  nhsIbs: { title: "Irritable bowel syndrome (IBS)", publisher: "NHS", url: "https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/" },
  nhsCoeliac: { title: "Coeliac disease", publisher: "NHS", url: "https://www.nhs.uk/conditions/coeliac-disease/" },
  niaidAllergy: { title: "Guidelines for the diagnosis and management of food allergy in the United States (NIAID expert panel)", publisher: "Journal of Allergy and Clinical Immunology", year: "2010", url: "https://pubmed.ncbi.nlm.nih.gov/21134576/" },
  nhsFoodAllergy: { title: "Food allergy", publisher: "NHS", url: "https://www.nhs.uk/conditions/food-allergy/" },
  nhsFoodIntolerance: { title: "Food intolerance", publisher: "NHS", url: "https://www.nhs.uk/conditions/food-intolerance/" },
  nhsPregnancyDiet: { title: "Have a healthy diet in pregnancy", publisher: "NHS", url: "https://www.nhs.uk/pregnancy/keeping-well/have-a-healthy-diet/" },
  protAge: { title: "Evidence-based recommendations for optimal dietary protein intake in older people (PROT-AGE Study Group)", publisher: "Journal of the American Medical Directors Association", year: "2013", url: "https://pubmed.ncbi.nlm.nih.gov/23867520/" },
  bhofOsteoporosis: { title: "The clinician's guide to prevention and treatment of osteoporosis", publisher: "Osteoporosis International", year: "2022", url: "https://pubmed.ncbi.nlm.nih.gov/35478046/" },
  nhsOsteoporosis: { title: "Osteoporosis", publisher: "NHS", url: "https://www.nhs.uk/conditions/osteoporosis/" },
  nhsVitaminD: { title: "Vitamin D", publisher: "NHS", url: "https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/" },
  sportsPosition: { title: "Nutrition and athletic performance — joint position of the Academy of Nutrition and Dietetics, Dietitians of Canada and the American College of Sports Medicine", publisher: "Journal of the Academy of Nutrition and Dietetics", year: "2016", url: "https://pubmed.ncbi.nlm.nih.gov/26920240/" },
  issnProtein: { title: "International Society of Sports Nutrition position stand: protein and exercise", publisher: "Journal of the International Society of Sports Nutrition", year: "2017", url: "https://pubmed.ncbi.nlm.nih.gov/28642676/" },
  andVegetarian: { title: "Position of the Academy of Nutrition and Dietetics: vegetarian diets", publisher: "Journal of the Academy of Nutrition and Dietetics", year: "2016", url: "https://pubmed.ncbi.nlm.nih.gov/27886704/" },
  nhsWeight: { title: "Managing your weight", publisher: "NHS", url: "https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/" },
  nhsT2dFood: { title: "Type 2 diabetes: food and keeping active", publisher: "NHS", url: "https://www.nhs.uk/conditions/type-2-diabetes/food-and-keeping-active/" },
  nhsBalancedDiet: { title: "Eating a balanced diet", publisher: "NHS", url: "https://www.nhs.uk/live-well/eat-well/how-to-eat-a-balanced-diet/eating-a-balanced-diet/" },
  nhsFoodLabels: { title: "Food labels", publisher: "NHS", url: "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/how-to-read-food-labels/" },
} satisfies Record<string, Reference>
