import type { Scheme } from '../types';

export const schemes: Scheme[] = [
  // Existing Schemes
  {
    "name": "PM Kisan Samman Nidhi",
    "description": "A central sector scheme providing direct income support of ₹6,000 per year to all landholding farmer families.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://pmkisan.gov.in/",
    "last_updated": "2025-10-05"
  },
  {
    "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "description": "A comprehensive crop insurance scheme to provide financial support to farmers against crop loss or damage from unforeseen events.",
    "states_allowed": ["ALL"],
    "crops_allowed": ["Rice", "Wheat", "Maize", "Pulses", "Soybean", "Groundnut", "Cotton", "Vegetables", "Fruits", "Millets"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://pmfby.gov.in/",
    "last_updated": "2025-10-01"
  },
  {
    "name": "Kisan Credit Card (KCC) Scheme",
    "description": "Provides farmers with timely access to credit for their cultivation, post-harvest expenses, and other needs.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://www.agricoop.gov.in/en/FarmCredit",
    "last_updated": "2025-09-28"
  },
  {
    "name": "Soil Health Card Scheme",
    "description": "A scheme to issue soil health cards to farmers every 2 years to address nutritional deficiencies in soil and improve productivity.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://soilhealth.dac.gov.in/",
    "last_updated": "2025-09-25"
  },
  {
    "name": "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    "description": "A national mission to improve farm productivity and ensure better utilization of water resources through micro-irrigation systems.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://pmksy.gov.in/",
    "last_updated": "2025-09-20",
    "irrigation_bonus": ["Drip Irrigation", "Sprinkler Irrigation"]
  },
  {
    "name": "Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)",
    "description": "An umbrella scheme allowing states to choose their own agriculture and allied sector development activities based on local needs.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://rkvy.nic.in/",
    "last_updated": "2025-09-15"
  },
  {
    "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
    "description": "Promotes organic farming through cluster approach and Participatory Guarantee System (PGS) certification.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://pgsindia-ncof.gov.in/pkvy/index.aspx",
    "last_updated": "2025-09-18"
  },
  {
    "name": "National Food Security Mission (NFSM)",
    "description": "Aims to increase the production of rice, wheat, pulses, coarse cereals, and commercial crops through area expansion and productivity enhancement.",
    "states_allowed": ["ALL"],
    "crops_allowed": ["Rice", "Wheat", "Pulses", "Maize", "Sugarcane", "Jute", "Cotton", "Millets"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://www.nfsm.gov.in/",
    "last_updated": "2025-09-10"
  },
  {
    "name": "PM Kisan Maan Dhan Yojana (PM-KMY)",
    "description": "A voluntary and contributory pension scheme for small and marginal farmers, providing a monthly pension of ₹3,000 on attaining the age of 60.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 4.94,
    "income_limit": 180000,
    "apply_link": "https://maandhan.in/auth/login",
    "last_updated": "2025-09-22"
  },
  {
    "name": "PM-KUSUM",
    "description": "Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan promotes the use of solar energy in agriculture via solar pumps and solar power generation.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://pmkusum.mnre.gov.in/",
    "last_updated": "2025-10-04"
  },
  {
    "name": "Agriculture Infrastructure Fund (AIF)",
    "description": "Provides medium-long term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://agriinfra.dac.gov.in/",
    "last_updated": "2025-10-02"
  },
  {
    "name": "Sub-Mission on Agricultural Mechanization (SMAM)",
    "description": "Promotes the use of farm mechanization by providing subsidies on various agricultural machinery and equipment.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://agrimachinery.nic.in/",
    "last_updated": "2025-09-29"
  },
  {
    "name": "Mission for Integrated Development of Horticulture (MIDH)",
    "description": "Aims for the holistic growth of the horticulture sector, covering fruits, vegetables, spices, flowers, and plantation crops.",
    "states_allowed": ["ALL"],
    "crops_allowed": ["Fruits", "Vegetables", "Spices", "Flowers", "Coconut"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://midh.gov.in/",
    "last_updated": "2025-09-26"
  },
  {
    "name": "National Livestock Mission",
    "description": "Focuses on the development of the livestock sector, including breed improvement, feed and fodder development, and skill development.",
    "states_allowed": ["ALL"],
    "crops_allowed": ["Livestock"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://nlm.udyamimitra.in/",
    "last_updated": "2025-09-24"
  },
  {
    "name": "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    "description": "A comprehensive scheme to bring about a 'Blue Revolution' through sustainable and responsible development of the fisheries sector.",
    "states_allowed": ["ALL"],
    "crops_allowed": ["Fish"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://dof.gov.in/pmmsy",
    "last_updated": "2025-09-23"
  },
  {
    "name": "Rythu Bandhu Scheme",
    "description": "Telangana government's farmer investment support scheme providing financial assistance of ₹5,000 per acre per season for two crops a year.",
    "states_allowed": ["Telangana"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://rythubandhu.telangana.gov.in/",
    "last_updated": "2025-10-03"
  },
  {
    "name": "KALIA Scheme",
    "description": "Krushak Assistance for Livelihood and Income Augmentation scheme by Odisha to provide financial aid to small farmers and landless agricultural laborers.",
    "states_allowed": ["Odisha"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 5,
    "income_limit": 150000,
    "apply_link": "https://kalia.odisha.gov.in/",
    "last_updated": "2025-09-30"
  },
  {
    "name": "Mukhya Mantri Krishi Ashirwad Yojana",
    "description": "A scheme by the Jharkhand government to provide direct financial assistance to small and marginal farmers.",
    "states_allowed": ["Jharkhand"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 5,
    "apply_link": "https://mmkay.jharkhand.gov.in/",
    "last_updated": "2025-09-01"
  },
  {
    "name": "YSR Rythu Bharosa",
    "description": "Andhra Pradesh scheme providing financial assistance of ₹13,500 per farmer family per year, including the central PM-KISAN component.",
    "states_allowed": ["Andhra Pradesh"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://ysrrythubharosa.ap.gov.in/",
    "last_updated": "2025-10-01"
  },
  {
    "name": "Krishak Bandhu Scheme",
    "description": "West Bengal's scheme offering annual financial assistance to farmers and a one-time grant of ₹2 lakh to the family in case of a farmer's death.",
    "states_allowed": ["West Bengal"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://krishakbandhu.net/",
    "last_updated": "2025-09-29"
  },
  {
    "name": "Bihar Rajya Fasal Sahayata Yojana",
    "description": "A crop assistance scheme in Bihar that provides financial aid to farmers in case of crop damage due to natural calamities, replacing crop insurance.",
    "states_allowed": ["Bihar"],
    "crops_allowed": ["Rice", "Maize", "Soybean"],
    "min_land_acres": 0,
    "max_land_acres": 4.94,
    "apply_link": "https://pacsonline.bih.nic.in/fsy/",
    "last_updated": "2025-09-19"
  },
  {
    "name": "Mukhyamantri Kisan Sahay Yojana",
    "description": "Gujarat's scheme to provide financial assistance to farmers for crop losses due to drought, excess rain, or unseasonal rain without any premium.",
    "states_allowed": ["Gujarat"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 9.88,
    "apply_link": "https://ikhedut.gujarat.gov.in/",
    "last_updated": "2025-09-21"
  },
  {
    "name": "Mahatma Jyotirao Phule Shetkari Karjmukti Yojana",
    "description": "A farm loan waiver scheme by the Maharashtra government to waive off crop loans up to ₹2 lakh.",
    "states_allowed": ["Maharashtra"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://mjpsky.maharashtra.gov.in/",
    "last_updated": "2025-09-25"
  },
  {
    "name": "UP Fasal Rin Mochan Yojana",
    "description": "A loan waiver scheme by the Uttar Pradesh government to relieve small and marginal farmers by waiving off crop loans up to ₹1 lakh.",
    "states_allowed": ["Uttar Pradesh"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 4.94,
    "apply_link": "https://www.upkisankarjrahat.upsdc.gov.in/",
    "last_updated": "2025-09-11"
  },
  {
    "name": "Mera Pani Meri Virasat",
    "description": "A Haryana government scheme to encourage crop diversification from water-guzzling paddy to alternative crops by providing financial incentives.",
    "states_allowed": ["Haryana"],
    "crops_allowed": ["Cotton", "Maize", "Pulses", "Vegetables", "Fruits"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://fasal.haryana.gov.in/",
    "last_updated": "2025-09-27"
  },
  {
    "name": "Mukhyamantri Beej Swavalamban Yojana",
    "description": "A Rajasthan scheme to promote the production of quality seeds by the farmers themselves in their own fields.",
    "states_allowed": ["Rajasthan"],
    "crops_allowed": ["Wheat", "Pulses", "Soybean", "Groundnut"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://rajkisan.rajasthan.gov.in/",
    "last_updated": "2025-09-14"
  },
  {
    "name": "Krishi Bhagya Scheme",
    "description": "A Karnataka government initiative to support rain-fed agriculture through the creation of farm ponds for water conservation.",
    "states_allowed": ["Karnataka"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "irrigation_bonus": ["Tank Irrigation"],
    "apply_link": "https://raitamitra.karnataka.gov.in/",
    "last_updated": "2025-09-09"
  },
  {
    "name": "Nanaji Deshmukh Krishi Sanjivani Prakalp",
    "description": "A climate-resilient agriculture project in Maharashtra to promote sustainable farming in drought and salinity-affected regions.",
    "states_allowed": ["Maharashtra"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 12.35,
    "apply_link": "https://dbt.mahapocra.gov.in/",
    "last_updated": "2025-09-24"
  },
  {
    "name": "National Bamboo Mission",
    "description": "A central scheme to increase the area under bamboo plantation in non-forest Government and private lands to supplement farm income.",
    "states_allowed": ["ALL"],
    "crops_allowed": ["Bamboo"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://nbm.nic.in/",
    "last_updated": "2025-09-16"
  },
  {
    "name": "Rashtriya Gokul Mission",
    "description": "A mission to develop and conserve indigenous bovine breeds and enhance milk production and productivity.",
    "states_allowed": ["ALL"],
    "crops_allowed": ["Livestock"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://dahd.nic.in/rashtriya_gokul_mission",
    "last_updated": "2025-09-12"
  },
  {
    "name": "YSR Jala Kala",
    "description": "A scheme in Andhra Pradesh to drill free borewells for needy farmers with small and marginal land holdings.",
    "states_allowed": ["Andhra Pradesh"],
    "crops_allowed": "ALL",
    "min_land_acres": 2.5,
    "max_land_acres": 5,
    "irrigation_bonus": ["Well/Tube-well"],
    "apply_link": "http://ysrjalakala.ap.gov.in/",
    "last_updated": "2025-09-28"
  },
  {
    "name": "Punjab Agri Export Corporation Schemes",
    "description": "Various schemes by Punjab Agri Export Corporation to promote the export of agricultural produce through infrastructure and marketing support.",
    "states_allowed": ["Punjab"],
    "crops_allowed": ["Fruits", "Vegetables", "Rice", "Wheat"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "http://www.punjabagro.co.in/",
    "last_updated": "2025-09-18"
  },
  {
    "name": "Dr. YSR Free Crop Insurance Scheme",
    "description": "An Andhra Pradesh scheme where the state government pays the entire insurance premium on behalf of farmers for notified crops.",
    "states_allowed": ["Andhra Pradesh"],
    "crops_allowed": ["Rice", "Groundnut", "Maize", "Cotton", "Vegetables"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "http://ysrcropinsurance.ap.gov.in/",
    "last_updated": "2025-09-30"
  },
  {
    "name": "e-NAM (National Agriculture Market)",
    "description": "A pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://www.enam.gov.in/web/",
    "last_updated": "2025-10-05"
  },
  {
    "name": "Interest Subvention Scheme for Farmers",
    "description": "A central scheme providing interest subsidy on short-term crop loans up to ₹3 lakh, making the effective interest rate lower for prompt-paying farmers.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://www.rbi.org.in/",
    "last_updated": "2025-09-27"
  },
  {
    "name": "Formation and Promotion of 10,000 FPOs",
    "description": "A central scheme to form and promote 10,000 new Farmer Producer Organizations (FPOs) to provide small farmers with better market access and bargaining power.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://enam.gov.in/web/stakeholders-Involved/fpos",
    "last_updated": "2025-09-28"
  },
  {
    "name": "Gobar Dhan Yojana",
    "description": "A central government initiative that aims to convert cattle dung and solid waste in farms and villages into compost, biogas and bio-CNG.",
    "states_allowed": ["ALL"],
    "crops_allowed": ["Livestock"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://sbm.gov.in/gbdw20/Home.aspx",
    "last_updated": "2025-09-15"
  },
  
  // New Schemes Added
  {
    "name": "Kisan Drone Yojana",
    "description": "A central scheme to promote the use of drones in agriculture for crop assessment, digitization of land records, and spraying of insecticides and nutrients.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://agricoop.gov.in/en/services/kisan-drone",
    "last_updated": "2025-10-06"
  },
  {
    "name": "PM Formalisation of Micro Food Processing Enterprises (PMFME) Scheme",
    "description": "Provides financial, technical, and business support for upgrading existing micro food processing enterprises.",
    "states_allowed": ["ALL"],
    "crops_allowed": ["Fruits", "Vegetables", "Millets", "Fish", "Livestock"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://pmfme.mofpi.gov.in/",
    "last_updated": "2025-10-03"
  },
  {
    "name": "Karnataka Raitha Siri Scheme",
    "description": "A scheme by the Karnataka government to promote the cultivation of millets by providing financial assistance of ₹10,000 per hectare.",
    "states_allowed": ["Karnataka"],
    "crops_allowed": ["Millets"],
    "min_land_acres": 0,
    "max_land_acres": 12.35,
    "apply_link": "https://raitamitra.karnataka.gov.in/",
    "last_updated": "2025-09-15"
  },
  {
    "name": "Mukhyamantri Bagwani Protsahan Yojana",
    "description": "A Haryana scheme to encourage crop diversification towards horticulture crops with assured prices for farmers.",
    "states_allowed": ["Haryana"],
    "crops_allowed": ["Fruits", "Vegetables", "Spices", "Flowers"],
    "min_land_acres": 0,
    "max_land_acres": 10,
    "apply_link": "https://hortharyana.gov.in/",
    "last_updated": "2025-09-20"
  },
  {
    "name": "Himachal Pradesh Apple Rejuvenation Project",
    "description": "A project to support small and marginal apple growers in replacing old, senile apple orchards with new, improved varieties.",
    "states_allowed": ["Himachal Pradesh"],
    "crops_allowed": ["Fruits"],
    "min_land_acres": 0.1,
    "max_land_acres": 10,
    "apply_link": "https://www.hpagrisnet.gov.in/",
    "last_updated": "2025-09-22"
  },
  {
    "name": "Kerala Coconut Development Scheme",
    "description": "Provides assistance for integrated farming in coconut holdings, promoting productivity and value addition.",
    "states_allowed": ["Kerala"],
    "crops_allowed": ["Coconut"],
    "min_land_acres": 0.05,
    "max_land_acres": 7.5,
    "apply_link": "http://www.coconutboard.nic.in/",
    "last_updated": "2025-09-25"
  },
  {
    "name": "Mukhyamantri Pashudhan Vikas Yojana",
    "description": "An Uttar Pradesh scheme to improve the breed and health of livestock, thereby increasing milk production and farmers' income.",
    "states_allowed": ["Uttar Pradesh"],
    "crops_allowed": ["Livestock"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "http://www.animalhusb.upsdc.gov.in/",
    "last_updated": "2025-09-18"
  },
  {
    "name": "Atal Solar Krishi Pump Yojana",
    "description": "A Maharashtra government scheme to provide subsidized solar-powered agricultural pumps to farmers, reducing their dependence on conventional electricity.",
    "states_allowed": ["Maharashtra"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "irrigation_bonus": ["Well/Tube-well"],
    "apply_link": "https://www.mahadiscom.in/solar-pump/",
    "last_updated": "2025-10-01"
  },
  {
    "name": "CHIRAG Yojana",
    "description": "A Chhattisgarh scheme focusing on climate-resilient agriculture, nutrition security, and income generation for tribal communities.",
    "states_allowed": ["Chhattisgarh"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 10,
    "apply_link": "https://agriportal.cg.nic.in/",
    "last_updated": "2025-08-30"
  },
  {
    "name": "Jal Sinchan Abhiyan",
    "description": "A Rajasthan initiative for the construction of water harvesting structures like farm ponds (diggis) and water tanks to support agriculture.",
    "states_allowed": ["Rajasthan"],
    "crops_allowed": "ALL",
    "min_land_acres": 0.5,
    "max_land_acres": 1000,
    "irrigation_bonus": ["Tank Irrigation", "Rain-fed"],
    "apply_link": "https://rajkisan.rajasthan.gov.in/",
    "last_updated": "2025-09-10"
  },
  {
    "name": "Banglar Dairy",
    "description": "A scheme by West Bengal to boost the dairy sector by providing financial assistance for setting up small dairy farms.",
    "states_allowed": ["West Bengal"],
    "crops_allowed": ["Livestock"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://www.wblivestock.com/",
    "last_updated": "2025-09-12"
  },
  {
    "name": "Assam Tea Plantation Provident Fund",
    "description": "A welfare scheme for the workers in tea plantations in Assam, which can include small tea growers.",
    "states_allowed": ["Assam"],
    "crops_allowed": ["Tea"],
    "min_land_acres": 0,
    "max_land_acres": 25,
    "apply_link": "https://socialwelfare.assam.gov.in/",
    "last_updated": "2025-09-05"
  },
  {
    "name": "Jai Kisan Samriddhi Yojana",
    "description": "A Madhya Pradesh scheme providing incentives to farmers for selling wheat and paddy at Minimum Support Price (MSP).",
    "states_allowed": ["Madhya Pradesh"],
    "crops_allowed": ["Wheat", "Rice"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "http://mpkrishi.mp.gov.in/",
    "last_updated": "2025-09-08"
  },
  {
    "name": "Uttarakhand Organic Farming Grant",
    "description": "A state-level grant to promote organic farming practices and certification among farmers in Uttarakhand.",
    "states_allowed": ["Uttarakhand"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://agriculture.uk.gov.in/",
    "last_updated": "2025-09-14"
  },
  {
    "name": "Birsa Harit Gram Yojana",
    "description": "A Jharkhand scheme focused on afforestation and horticulture, providing fruit-bearing saplings to farmers to enhance their income.",
    "states_allowed": ["Jharkhand"],
    "crops_allowed": ["Fruits"],
    "min_land_acres": 0,
    "max_land_acres": 5,
    "apply_link": "https://cm.jharkhand.gov.in/schemes",
    "last_updated": "2025-09-11"
  },
  {
    "name": "Agri-Clinics and Agri-Business Centres (ACABC)",
    "description": "A central scheme to provide training and financial support to agriculture graduates to set up their own agri-ventures and provide extension services.",
    "states_allowed": ["ALL"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://www.acabcmis.gov.in/",
    "last_updated": "2025-10-04"
  },
   {
    "name": "National Mission on Edible Oils - Oil Palm",
    "description": "A central scheme to boost the production of oil palm in the country and reduce dependency on imported edible oils.",
    "states_allowed": ["Andhra Pradesh", "Telangana", "Tamil Nadu", "Odisha", "Karnataka", "Gujarat", "Assam", "Mizoram", "Nagaland", "Arunachal Pradesh"],
    "crops_allowed": ["Oil Palm"],
    "min_land_acres": 0.5,
    "max_land_acres": 62,
    "apply_link": "https://nmeo.dac.gov.in/",
    "last_updated": "2025-10-07"
  },
  {
    "name": "Rythu Bima",
    "description": "A farmer's group life insurance scheme by the Government of Telangana, providing insured benefit of ₹5 lakh to the nominee in case of the farmer's death.",
    "states_allowed": ["Telangana"],
    "crops_allowed": "ALL",
    "min_land_acres": 0.025,
    "max_land_acres": 7.5,
    "apply_link": "https://rythubandhu.telangana.gov.in/Dashboard/Login",
    "last_updated": "2025-09-26"
  },
  {
    "name": "Bhavantar Bhugtan Yojana",
    "description": "A Madhya Pradesh scheme to provide compensation to farmers for the difference between the government's Minimum Support Price (MSP) and the market price.",
    "states_allowed": ["Madhya Pradesh"],
    "crops_allowed": ["Soybean", "Groundnut", "Maize", "Millets", "Pulses"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "http://mpkrishi.mp.gov.in/hindisite_New/bby.aspx",
    "last_updated": "2025-09-08"
  },
  {
    "name": "Suryashakti Kisan Yojana (SKY)",
    "description": "A Gujarat government scheme that allows farmers to generate their own electricity using solar panels and sell the surplus to the grid.",
    "states_allowed": ["Gujarat"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://geda.gujarat.gov.in/sky_yojana",
    "last_updated": "2025-09-22"
  },
  {
    "name": "Ama Gaon Ama Bikas",
    "description": "An Odisha government initiative focusing on rural development, including support for agriculture and allied activities in villages.",
    "states_allowed": ["Odisha"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://www.odisha.gov.in/panchayatiraj/ama-gaon-ama-bikas",
    "last_updated": "2025-09-04"
  },
  {
    "name": "Kisan Uday Yojana",
    "description": "An Uttar Pradesh scheme to provide energy-efficient water pumps to farmers to reduce their electricity consumption and costs.",
    "states_allowed": ["Uttar Pradesh"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "irrigation_bonus": ["Well/Tube-well"],
    "apply_link": "https://www.upenergy.in/",
    "last_updated": "2025-09-03"
  },
  {
    "name": "Apna Khet Apna Kaam",
    "description": "A component of MGNREGA in Rajasthan allowing farmers to work on their own fields for land improvement and get wages.",
    "states_allowed": ["Rajasthan"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 4.94,
    "income_limit": 150000,
    "apply_link": "https://nrega.nic.in/",
    "last_updated": "2025-09-02"
  },
  {
    "name": "Go-Sugam Agri-Tech Scheme",
    "description": "A scheme in Maharashtra promoting the use of technology in agriculture, from precision farming to market linkages.",
    "states_allowed": ["Maharashtra"],
    "crops_allowed": "ALL",
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://krishi.maharashtra.gov.in/",
    "last_updated": "2025-08-29"
  },
  {
    "name": "Assam Agri-Business and Rural Transformation Project (APART)",
    "description": "A World Bank-funded project in Assam to support value chain development and market access for farmers.",
    "states_allowed": ["Assam"],
    "crops_allowed": ["Rice", "Pork", "Fish", "Dairy", "Fruits", "Vegetables"],
    "min_land_acres": 0,
    "max_land_acres": 1000,
    "apply_link": "https://www.arias.in/apart.html",
    "last_updated": "2025-08-28"
  }
];
