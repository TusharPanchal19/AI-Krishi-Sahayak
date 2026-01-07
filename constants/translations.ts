import type { Language } from '../types';

type Translation = {
  main_title: string;
  main_subtitle: string;
  form_title: string;
  label_state: string;
  label_district: string;
  label_crop: string;
  label_land_size: string;
  unit_acres: string;
  label_annual_income: string;
  label_irrigation: string;
  button_submit: string;
  button_loading: string;
  results_title: string;
  no_schemes_found: string;
  eligibility_score: string;
  why_recommended: string;
  button_get_ai_analysis: string;
  button_fetching_ai: string;
  button_apply_now: string;
  ai_analysis_title: string;
  documents_required: string;
  error_ai_analysis: string;
  error_required: string;
  error_positive_number: string;
  error_non_negative_number: string;
  details: string;
  button_listen_description: string;
  error_tts: string;
  chatbot_title: string;
  chatbot_greeting: string;
  chatbot_placeholder: string;
  footer_text: string;
  // Recommendation Reasons
  reason_state_match: string;
  reason_land_match: string;
  reason_land_slightly_low: string;
  reason_land_slightly_high: string;
  reason_land_no_match: string;
  reason_crop_match: string;
  reason_crop_no_specific_match: string;
  reason_income_match: string;
  reason_income_slightly_high: string;
  reason_income_no_limit: string;
  reason_irrigation_bonus: string;
};

export const translations: Record<Language, Translation> = {
  en: {
    main_title: "AI Krishi Sahayak",
    main_subtitle: "Your personal AI assistant for discovering government schemes and subsidies for agriculture in India.",
    form_title: "Tell us about your farm",
    label_state: "State",
    label_district: "District",
    label_crop: "Primary Crop",
    label_land_size: "Land Size",
    unit_acres: "acres",
    label_annual_income: "Annual Income",
    label_irrigation: "Irrigation Type",
    button_submit: "Find Schemes",
    button_loading: "Analyzing...",
    results_title: "Top Recommended Schemes For You",
    no_schemes_found: "No specific schemes found based on your profile. Try adjusting your inputs.",
    eligibility_score: "Eligibility Score",
    why_recommended: "Why it's recommended:",
    button_get_ai_analysis: "Get AI Analysis",
    button_fetching_ai: "Getting Analysis...",
    button_apply_now: "Apply Now",
    ai_analysis_title: "AI Analysis",
    documents_required: "Potential Documents Required",
    error_ai_analysis: "Sorry, the AI analysis could not be completed at this time.",
    error_required: "This field is required.",
    error_positive_number: "Please enter a positive number.",
    error_non_negative_number: "Please enter a non-negative number.",
    details: "Details",
    button_listen_description: "Listen to description",
    error_tts: "Could not play audio.",
    chatbot_title: "AI Farming Assistant",
    chatbot_greeting: "Hello! How can I help you with your farming today?",
    chatbot_placeholder: "Ask about crop diseases, pests, etc.",
    footer_text: "Made with ❤️ for the farmers of India.",
    reason_state_match: "Scheme is available in your state ({state}).",
    reason_land_match: "Your land holding ({landSize} acres) is within the required range.",
    reason_land_slightly_low: "Your land holding is slightly below the minimum, but you may still be considered.",
    reason_land_slightly_high: "Your land holding is slightly above the maximum, but you may still be considered.",
    reason_land_no_match: "Your land holding ({landSize} acres) may not fit the scheme's range ({min_land_acres}-{max_land_acres} acres).",
    reason_crop_match: "Your primary crop ({crop}) is covered by the scheme.",
    reason_crop_no_specific_match: "The scheme is not specific to your primary crop ({crop}), but may still apply.",
    reason_income_match: "Your annual income is within the eligible limit for this scheme.",
    reason_income_slightly_high: "Your annual income is slightly above the limit, but you may be considered.",
    reason_income_no_limit: "This scheme is open to farmers of all income levels.",
    reason_irrigation_bonus: "This scheme provides a bonus for your irrigation type ({irrigationType}).",
  },
  hi: {
    main_title: "एआई कृषि सहायक",
    main_subtitle: "भारत में कृषि के लिए सरकारी योजनाओं और सब्सिडी की खोज के लिए आपका व्यक्तिगत एआई सहायक।",
    form_title: "हमें अपने खेत के बारे में बताएं",
    label_state: "राज्य",
    label_district: "ज़िला",
    label_crop: "प्रमुख फसल",
    label_land_size: "भूमि का आकार",
    unit_acres: "एकड़",
    label_annual_income: "वार्षिक आय",
    label_irrigation: "सिंचाई का प्रकार",
    button_submit: "योजनाएं खोजें",
    button_loading: "विश्लेषण हो रहा है...",
    results_title: "आपके लिए शीर्ष अनुशंसित योजनाएं",
    no_schemes_found: "आपकी प्रोफ़ाइल के आधार पर कोई विशिष्ट योजना नहीं मिली। अपनी जानकारी बदलने का प्रयास करें।",
    eligibility_score: "पात्रता स्कोर",
    why_recommended: "यह क्यों अनुशंसित है:",
    button_get_ai_analysis: "एआई विश्लेषण प्राप्त करें",
    button_fetching_ai: "विश्लेषण प्राप्त हो रहा है...",
    button_apply_now: "अभी आवेदन करें",
    ai_analysis_title: "एआई विश्लेषण",
    documents_required: "संभावित आवश्यक दस्तावेज़",
    error_ai_analysis: "क्षमा करें, इस समय एआई विश्लेषण पूरा नहीं हो सका।",
    error_required: "यह फ़ील्ड आवश्यक है।",
    error_positive_number: "कृपया एक धनात्मक संख्या दर्ज करें।",
    error_non_negative_number: "कृपया एक गैर-ऋणात्मक संख्या दर्ज करें।",
    details: "विवरण",
    button_listen_description: "विवरण सुनें",
    error_tts: "ऑडियो नहीं चल सका।",
    chatbot_title: "एआई खेती सहायक",
    chatbot_greeting: "नमस्ते! आज मैं आपकी खेती में कैसे मदद कर सकता हूँ?",
    chatbot_placeholder: "फसलों की बीमारियों, कीटों आदि के बारे में पूछें।",
    footer_text: "भारत के किसानों के लिए ❤️ के साथ बनाया गया।",
    reason_state_match: "योजना आपके राज्य ({state}) में उपलब्ध है।",
    reason_land_match: "आपकी भूमि ({landSize} एकड़) आवश्यक सीमा के भीतर है।",
    reason_land_slightly_low: "आपकी भूमि न्यूनतम से थोड़ी कम है, लेकिन आप पर फिर भी विचार किया जा सकता है।",
    reason_land_slightly_high: "आपकी भूमि अधिकतम से थोड़ी अधिक है, लेकिन आप पर फिर भी विचार किया जा सकता है।",
    reason_land_no_match: "आपकी भूमि ({landSize} एकड़) योजना की सीमा ({min_land_acres}-{max_land_acres} एकड़) में फिट नहीं हो सकती है।",
    reason_crop_match: "आपकी मुख्य फसल ({crop}) योजना के अंतर्गत आती है।",
    reason_crop_no_specific_match: "यह योजना आपकी मुख्य फसल ({crop}) के लिए विशिष्ट नहीं है, लेकिन फिर भी लागू हो सकती है।",
    reason_income_match: "आपकी वार्षिक आय इस योजना के लिए पात्र सीमा के भीतर है।",
    reason_income_slightly_high: "आपकी वार्षिक आय सीमा से थोड़ी अधिक है, लेकिन आप पर विचार किया जा सकता है।",
    reason_income_no_limit: "यह योजना सभी आय स्तरों के किसानों के लिए खुली है।",
    reason_irrigation_bonus: "यह योजना आपके सिंचाई प्रकार ({irrigationType}) के लिए बोनस प्रदान करती है।",
  },
  mr: {
    main_title: "एआय कृषी सहायक",
    main_subtitle: "भारतातील शेतीसाठी सरकारी योजना आणि सबसिडी शोधण्यासाठी तुमचा वैयक्तिक एआय सहाय्यक.",
    form_title: "तुमच्या शेताबद्दल आम्हाला सांगा",
    label_state: "राज्य",
    label_district: "जिल्हा",
    label_crop: "मुख्य पीक",
    label_land_size: "जमिनीचा आकार",
    unit_acres: "एकर",
    label_annual_income: "वार्षिक उत्पन्न",
    label_irrigation: "सिंचनाचा प्रकार",
    button_submit: "योजना शोधा",
    button_loading: "विश्लेषण करत आहे...",
    results_title: "तुमच्यासाठी शीर्ष शिफारस केलेल्या योजना",
    no_schemes_found: "तुमच्या प्रोफाइलवर आधारित कोणत्याही विशिष्ट योजना आढळल्या नाहीत. तुमची माहिती बदलण्याचा प्रयत्न करा.",
    eligibility_score: "पात्रता गुण",
    why_recommended: "हे का शिफारसीय आहे:",
    button_get_ai_analysis: "एआय विश्लेषण मिळवा",
    button_fetching_ai: "विश्लेषण मिळवत आहे...",
    button_apply_now: "आता अर्ज करा",
    ai_analysis_title: "एआय विश्लेषण",
    documents_required: "संभाव्य आवश्यक कागदपत्रे",
    error_ai_analysis: "क्षमस्व, यावेळी एआय विश्लेषण पूर्ण होऊ शकले नाही.",
    error_required: "हे क्षेत्र आवश्यक आहे.",
    error_positive_number: "कृपया धन संख्या प्रविष्ट करा.",
    error_non_negative_number: "कृपया ऋण नसलेली संख्या प्रविष्ट करा.",
    details: "तपशील",
    button_listen_description: "वर्णन ऐका",
    error_tts: "ऑडिओ प्ले करू शकलो नाही.",
    chatbot_title: "एआय शेती सहाय्यक",
    chatbot_greeting: "नमस्कार! आज मी तुमच्या शेतीत कशी मदत करू शकेन?",
    chatbot_placeholder: "पिकांचे रोग, कीटक इत्यादींबद्दल विचारा.",
    footer_text: "भारताच्या शेतकऱ्यांसाठी ❤️ ने बनवले आहे.",
    reason_state_match: "योजना तुमच्या राज्यात ({state}) उपलब्ध आहे.",
    reason_land_match: "तुमची जमीन ({landSize} एकर) आवश्यक मर्यादेत आहे.",
    reason_land_slightly_low: "तुमची जमीन किमान मर्यादेपेक्षा थोडी कमी आहे, पण तरीही तुमचा विचार केला जाऊ शकतो.",
    reason_land_slightly_high: "तुमची जमीन कमाल मर्यादेपेक्षा थोडी जास्त आहे, पण तरीही तुमचा विचार केला जाऊ शकतो.",
    reason_land_no_match: "तुमची जमीन ({landSize} एकर) योजनेच्या मर्यादेत ({min_land_acres}-{max_land_acres} एकर) बसत नाही.",
    reason_crop_match: "तुमचे मुख्य पीक ({crop}) या योजनेत समाविष्ट आहे.",
    reason_crop_no_specific_match: "ही योजना तुमच्या मुख्य पिकासाठी ({crop}) विशिष्ट नाही, पण तरीही लागू होऊ शकते.",
    reason_income_match: "तुमचे वार्षिक उत्पन्न या योजनेसाठी पात्र मर्यादेत आहे.",
    reason_income_slightly_high: "तुमचे वार्षिक उत्पन्न मर्यादेपेक्षा थोडे जास्त आहे, पण तुमचा विचार केला जाऊ शकतो.",
    reason_income_no_limit: "ही योजना सर्व उत्पन्न स्तरांच्या शेतकऱ्यांसाठी खुली आहे.",
    reason_irrigation_bonus: "ही योजना तुमच्या सिंचन प्रकारासाठी ({irrigationType}) बोनस देते.",
  },
  gu: {
    main_title: "એઆઈ કૃષિ સહાયક",
    main_subtitle: "ભારતમાં કૃષિ માટે સરકારી યોજનાઓ અને સબસિડી શોધવા માટે તમારા વ્યક્તિગત એઆઈ સહાયક.",
    form_title: "તમારા ખેતર વિશે અમને કહો",
    label_state: "રાજ્ય",
    label_district: "જિલ્લો",
    label_crop: "મુખ્ય પાક",
    label_land_size: "જમીનનું કદ",
    unit_acres: "એકર",
    label_annual_income: "વાર્ષિક આવક",
    label_irrigation: "સિંચાઈનો પ્રકાર",
    button_submit: "યોજનાઓ શોધો",
    button_loading: "વિશ્લેષણ કરી રહ્યું છે...",
    results_title: "તમારા માટે ટોચની ભલામણ કરેલ યોજનાઓ",
    no_schemes_found: "તમારી પ્રોફાઇલ પર આધારિત કોઈ ચોક્કસ યોજનાઓ મળી નથી. તમારી માહિતી બદલવાનો પ્રયાસ કરો.",
    eligibility_score: "પાત્રતા સ્કોર",
    why_recommended: "તે શા માટે ભલામણ કરવામાં આવે છે:",
    button_get_ai_analysis: "એઆઈ વિશ્લેષણ મેળવો",
    button_fetching_ai: "વિશ્લેષણ મેળવી રહ્યું છે...",
    button_apply_now: "હવે અરજી કરો",
    ai_analysis_title: "એઆઈ વિશ્લેષણ",
    documents_required: "સંભવિત જરૂરી દસ્તાવેજો",
    error_ai_analysis: "માફ કરશો, આ સમયે એઆઈ વિશ્લેષણ પૂર્ણ થઈ શક્યું નથી.",
    error_required: "આ ક્ષેત્ર આવશ્યક છે.",
    error_positive_number: "કૃપા કરીને ધન સંખ્યા દાખલ કરો.",
    error_non_negative_number: "કૃપા કરીને ઋણ ન હોય તેવી સંખ્યા દાખલ કરો.",
    details: "વિગતો",
    button_listen_description: "વર્ણન સાંભળો",
    error_tts: "ઓડિયો પ્લે કરી શકાયો નથી.",
    chatbot_title: "એઆઈ ખેતી સહાયક",
    chatbot_greeting: "નમસ્તે! આજે હું તમારી ખેતીમાં કેવી રીતે મદદ કરી શકું?",
    chatbot_placeholder: "પાકના રોગો, જીવાતો વગેરે વિશે પૂછો.",
    footer_text: "ભારતના ખેડૂતો માટે ❤️ સાથે બનાવેલ છે.",
    reason_state_match: "આ યોજના તમારા રાજ્ય ({state}) માં ઉપલબ્ધ છે.",
    reason_land_match: "તમારી જમીન ({landSize} એકર) જરૂરી મર્યાદામાં છે.",
    reason_land_slightly_low: "તમારી જમીન લઘુત્તમ કરતાં સહેજ ઓછી છે, પરંતુ તમારા પર હજુ પણ વિચારણા થઈ શકે છે.",
    reason_land_slightly_high: "તમારી જમીન મહત્તમ કરતાં સહેજ વધુ છે, પરંતુ તમારા પર હજુ પણ વિચારણા થઈ શકે છે.",
    reason_land_no_match: "તમારી જમીન ({landSize} એકર) યોજનાની મર્યાદા ({min_land_acres}-{max_land_acres} એકર) માં બંધબેસતી નથી.",
    reason_crop_match: "તમારો મુખ્ય પાક ({crop}) આ યોજના હેઠળ આવરી લેવામાં આવ્યો છે.",
    reason_crop_no_specific_match: "આ યોજના તમારા મુખ્ય પાક ({crop}) માટે વિશિષ્ટ નથી, પરંતુ હજુ પણ લાગુ પડી શકે છે.",
    reason_income_match: "તમારી વાર્ષિક આવક આ યોજના માટે પાત્ર મર્યાદામાં છે.",
    reason_income_slightly_high: "તમારી વાર્ષિક આવક મર્યાદા કરતાં સહેજ વધુ છે, પરંતુ તમારા પર વિચારણા થઈ શકે છે.",
    reason_income_no_limit: "આ યોજના તમામ આવક સ્તરના ખેડૂતો માટે ખુલ્લી છે.",
    reason_irrigation_bonus: "આ યોજના તમારા સિંચાઈના પ્રકાર ({irrigationType}) માટે બોનસ પૂરો પાડે છે.",
  },
  pa: {
    main_title: "ਏਆਈ ਕ੍ਰਿਸ਼ੀ ਸਹਾਇਕ",
    main_subtitle: "ਭਾਰਤ ਵਿੱਚ ਖੇਤੀਬਾੜੀ ਲਈ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਅਤੇ ਸਬਸਿਡੀਆਂ ਦੀ ਖੋਜ ਲਈ ਤੁਹਾਡਾ ਨਿੱਜੀ ਏਆਈ ਸਹਾਇਕ।",
    form_title: "ਸਾਨੂੰ ਆਪਣੇ ਖੇਤ ਬਾਰੇ ਦੱਸੋ",
    label_state: "ਰਾਜ",
    label_district: "ਜ਼ਿਲ੍ਹਾ",
    label_crop: "ਮੁੱਖ ਫਸਲ",
    label_land_size: "ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ",
    unit_acres: "ਏਕੜ",
    label_annual_income: "ਸਾਲਾਨਾ ਆਮਦਨ",
    label_irrigation: "ਸਿੰਚਾਈ ਦੀ ਕਿਸਮ",
    button_submit: "ਯੋਜਨਾਵਾਂ ਲੱਭੋ",
    button_loading: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...",
    results_title: "ਤੁਹਾਡੇ ਲਈ ਪ੍ਰਮੁੱਖ ਸਿਫਾਰਸ਼ੀ ਯੋਜਨਾਵਾਂ",
    no_schemes_found: "ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਦੇ ਆਧਾਰ 'ਤੇ ਕੋਈ ਖਾਸ ਯੋਜਨਾਵਾਂ ਨਹੀਂ ਮਿਲੀਆਂ। ਆਪਣੀ ਜਾਣਕਾਰੀ ਨੂੰ ਬਦਲਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    eligibility_score: "ਯੋਗਤਾ ਸਕੋਰ",
    why_recommended: "ਇਹ ਕਿਉਂ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:",
    button_get_ai_analysis: "ਏਆਈ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਾਪਤ ਕਰੋ",
    button_fetching_ai: "ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਾਪਤ ਕਰ ਰਿਹਾ ਹੈ...",
    button_apply_now: "ਹੁਣੇ ਅਰਜ਼ੀ ਦਿਓ",
    ai_analysis_title: "ਏਆਈ ਵਿਸ਼ਲੇਸ਼ਣ",
    documents_required: "ਸੰਭਾਵੀ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼",
    error_ai_analysis: "ਮੁਆਫ ਕਰਨਾ, ਇਸ ਸਮੇਂ ਏਆਈ ਵਿਸ਼ਲੇਸ਼ਣ ਪੂਰਾ ਨਹੀਂ ਹੋ ਸਕਿਆ।",
    error_required: "ਇਹ ਖੇਤਰ ਲਾਜ਼ਮੀ ਹੈ।",
    error_positive_number: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸਕਾਰਾਤਮਕ ਨੰਬਰ ਦਰਜ ਕਰੋ।",
    error_non_negative_number: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਗੈਰ-ਨਕਾਰਾਤਮਕ ਨੰਬਰ ਦਰਜ ਕਰੋ।",
    details: "ਵੇਰਵੇ",
    button_listen_description: "ਵੇਰਵਾ ਸੁਣੋ",
    error_tts: "ਆਡੀਓ ਨਹੀਂ ਚੱਲ ਸਕਿਆ।",
    chatbot_title: "ਏਆਈ ਖੇਤੀ ਸਹਾਇਕ",
    chatbot_greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਖੇਤੀ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    chatbot_placeholder: "ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ, ਕੀੜਿਆਂ ਆਦਿ ਬਾਰੇ ਪੁੱਛੋ।",
    footer_text: "ਭਾਰਤ ਦੇ ਕਿਸਾਨਾਂ ਲਈ ❤️ ਨਾਲ ਬਣਾਇਆ ਗਿਆ।",
    reason_state_match: "ਇਹ ਯੋਜਨਾ ਤੁਹਾਡੇ ਰਾਜ ({state}) ਵਿੱਚ ਉਪਲਬਧ ਹੈ।",
    reason_land_match: "ਤੁਹਾਡੀ ਜ਼ਮੀਨ ({landSize} ਏਕੜ) ਲੋੜੀਂਦੀ ਸੀਮਾ ਦੇ ਅੰਦਰ ਹੈ।",
    reason_land_slightly_low: "ਤੁਹਾਡੀ ਜ਼ਮੀਨ ਘੱਟੋ-ਘੱਟ ਤੋਂ ਥੋੜ੍ਹੀ ਘੱਟ ਹੈ, ਪਰ ਤੁਹਾਡੇ 'ਤੇ ਅਜੇ ਵੀ ਵਿਚਾਰ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।",
    reason_land_slightly_high: "ਤੁਹਾਡੀ ਜ਼ਮੀਨ ਵੱਧ ਤੋਂ ਵੱਧ ਤੋਂ ਥੋੜ੍ਹੀ ਜ਼ਿਆਦਾ ਹੈ, ਪਰ ਤੁਹਾਡੇ 'ਤੇ ਅਜੇ ਵੀ ਵਿਚਾਰ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।",
    reason_land_no_match: "ਤੁਹਾਡੀ ਜ਼ਮੀਨ ({landSize} ਏਕੜ) ਯੋਜਨਾ ਦੀ ਸੀਮਾ ({min_land_acres}-{max_land_acres} ਏਕੜ) ਵਿੱਚ ਫਿੱਟ ਨਹੀਂ ਹੋ ਸਕਦੀ।",
    reason_crop_match: "ਤੁਹਾਡੀ ਮੁੱਖ ਫਸਲ ({crop}) ਯੋਜਨਾ ਦੁਆਰਾ ਕਵਰ ਕੀਤੀ ਗਈ ਹੈ।",
    reason_crop_no_specific_match: "ਇਹ ਯੋਜਨਾ ਤੁਹਾਡੀ ਮੁੱਖ ਫਸਲ ({crop}) ਲਈ ਵਿਸ਼ੇਸ਼ ਨਹੀਂ ਹੈ, ਪਰ ਫਿਰ ਵੀ ਲਾਗੂ ਹੋ ਸਕਦੀ ਹੈ।",
    reason_income_match: "ਤੁਹਾਡੀ ਸਾਲਾਨਾ ਆਮਦਨ ਇਸ ਯੋਜਨਾ ਲਈ ਯੋਗ ਸੀਮਾ ਦੇ ਅੰਦਰ ਹੈ।",
    reason_income_slightly_high: "ਤੁਹਾਡੀ ਸਾਲਾਨਾ ਆਮਦਨ ਸੀਮਾ ਤੋਂ ਥੋੜ੍ਹੀ ਜ਼ਿਆਦਾ ਹੈ, ਪਰ ਤੁਹਾਡੇ 'ਤੇ ਵਿਚਾਰ ਕੀਤਾ जा ਸਕਦਾ ਹੈ।",
    reason_income_no_limit: "ਇਹ ਯੋਜਨਾ ਹਰ ਆਮਦਨ ਪੱਧਰ ਦੇ ਕਿਸਾਨਾਂ ਲਈ ਖੁੱਲ੍ਹੀ ਹੈ।",
    reason_irrigation_bonus: "ਇਹ ਯੋਜਨਾ ਤੁਹਾਡੀ ਸਿੰਚਾਈ ਦੀ ਕਿਸਮ ({irrigationType}) ਲਈ ਬੋਨਸ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।",
  },
};