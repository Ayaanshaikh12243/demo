
$path = 'c:\Users\ayaan shaikh\Documents\HACKNICHE4.0\FRONTEND-HACKNICHE4.0\lib\language-context.tsx'
$content = Get-Content $path -Raw -Encoding UTF8

$newTranslations = @'
  'Knowledge Hub_title':           { English: 'Knowledge Hub',                  Hindi: 'ज्ञान केंद्र',                Marathi: 'ज्ञान केंद्र',               Urdu: 'علم مرکز' },
  'The 6 Common':                   { English: 'The 6 Common',                   Hindi: '6 सामान्य',                   Marathi: '6 सामान्य',                 Urdu: '6 عام' },
  'Plastics':                       { English: 'Plastics',                       Hindi: 'प्लास्टिक',                   Marathi: 'प्लास्टिक',                 Urdu: 'پلاسٹک' },
  "& Why They're a Problem":        { English: "& Why They're a Problem",        Hindi: '& वे एक समस्या क्यों हैं',    Marathi: '& ते एक समस्या का आहेत',     Urdu: 'اور وہ ایک مسئلہ کیوں ہیں' },
  "Every plastic type has a unique chemistry — and a unique way of harming ecosystems. Here me what you need to know about each one.": { English: "Every plastic type has a unique chemistry — and a unique way of harming ecosystems. Here's what you need to know about each one.", Hindi: "प्रत्येक प्लास्टिक प्रकार का एक अनूठा रसायन विज्ञान होता है - और पारिस्थितिक तंत्र को नुकसान पहुँचाने का एक अनूठा तरीका। यहाँ वह है जो आपको हर एक के बारे में जानने की आवश्यकता है।", Marathi: "प्रत्येक प्लास्टिक प्रकाराचे एक अद्वितीय रसायनशास्त्र असते - आणि परिसंस्थांना हानी पोहोचवण्याचा एक अद्वितीय मार्ग. तुम्हाला प्रत्येक गोष्टीबद्दल जे माहित असणे आवश्यक आहे ते येथे आहे.", Urdu: "ہر پلاسٹک کی قسم کی ایک منفرد کیمسٹری ہوتی ہے — اور ماحولیاتی نظام کو نقصان پہنچانے کا ایک منفرد طریقہ۔ یہاں ہر ایک کے بارے میں آپ کو جاننے کی ضرورت ہے۔" },
  'of all plastic ever produced has been recycled': { English: 'of all plastic ever produced has been recycled', Hindi: 'जितना भी प्लास्टिक बना है, उसका केवल इतना प्रतिशत रीसायकल किया गया है', Marathi: 'आतापर्यंत तयार केलेल्या सर्व प्लास्टिकपैकी एवढ्या टक्के रिसायकल झाले आहे', Urdu: 'اب تک پیدا ہونے والے تمام پلاسٹک میں سے اتنا ری سائیکل کیا گیا ہے' },
  'years for most plastics to degrade': { English: 'years for most plastics to degrade', Hindi: 'अधिकांश प्लास्टिक को खराब होने में लगने वाले वर्ष', Marathi: 'बहुतेक प्लास्टिक खराब होण्यासाठी लागणारी वर्षे', Urdu: 'زیادہ تر پلاسٹک کو خراب ہونے میں سال لگتے ہیں' },
  'of global GHG emissions from plastic production': { English: 'of global GHG emissions from plastic production', Hindi: 'प्लास्टिक उत्पादन से वैश्विक ग्रीनहाउस गैस उत्सर्जन', Marathi: 'प्लास्टिक उत्पादनातून जागतिक GHG उत्सर्जन', Urdu: 'پلاسٹک کی پیداوار سے عالمی GHG اخراج' },
  'Quick Reference':                { English: 'Quick Reference',                Hindi: 'त्वरित संदर्भ',                Marathi: 'त्वरित संदर्भ',                Urdu: 'فوری حوالہ' },
  'Code':                           { English: 'Code',                           Hindi: 'कोड',                         Marathi: 'कोड',                         Urdu: 'کوڈ' },
  'Name':                           { English: 'Name',                           Hindi: 'नाम',                         Marathi: 'नाव',                         Urdu: 'نام' },
  'Abbr':                           { English: 'Abbr',                           Hindi: 'संक्षिप्त नाम',               Marathi: 'संक्षिप्त नाव',               Urdu: 'مخفف' },
  'Detailed Analysis — Click to Explore': { English: 'Detailed Analysis — Click to Explore', Hindi: 'विस्तृत विश्लेषण — तलाशने के लिए क्लिक करें', Marathi: 'तपशीलवार विश्लेषण — शोधण्यासाठी क्लिक करा', Urdu: 'تفصیلی تجزیہ — دریافت کرنے کے لیے کلک کریں' },
  'The Waste Hierarchy':            { English: 'The Waste Hierarchy',            Hindi: 'अपशिष्ट पदानुक्रम',            Marathi: 'कचरा उतरंड',                 Urdu: 'فضلہ کا درجہ بندی' },
  'Refuse':                         { English: 'Refuse',                         Hindi: 'अस्वीकार करें',               Marathi: 'नकार द्या',                   Urdu: 'رد کریں' },
  'Reduce':                         { English: 'Reduce',                         Hindi: 'कम करें',                     Marathi: 'कमी करा',                     Urdu: 'کم کریں' },
  'Reuse':                          { English: 'Reuse',                          Hindi: 'पुन: उपयोग करें',             Marathi: 'पुन्हा वापरा',                Urdu: 'دوبارہ استعمال کریں' },
  'Recycle':                        { English: 'Recycle',                        Hindi: 'रीसायकल करें',                 Marathi: 'रीसायकल करा',                 Urdu: 'ری سائیکل کریں' },
  "Don't buy single-use plastic at all": { English: "Don't buy single-use plastic at all", Hindi: "सिंगल-यूज़ प्लास्टिक बिल्कुल न खरीदें", Marathi: "सिंगल-यूझ प्लास्टिक अजिबात खरेदी करू नका", Urdu: "واحد استعمال والا پلاسٹک بالکل نہ خریدیں" },
  "Use less of what you can't avoid": { English: "Use less of what you can't avoid", Hindi: "उसका कम उपयोग करें जिससे आप बच नहीं सकते", Marathi: "ज्या गोष्टी तुम्ही टाळू शकत नाही त्यांचा वापर कमी करा", Urdu: "جس سے آپ بچ نہیں سکتے اس کا کم استعمال کریں" },
  'Extend the life of what you have': { English: 'Extend the life of what you have', Hindi: 'आपके पास जो है उसका जीवन बढ़ाएँ', Marathi: 'तुमच्याकडे असलेल्या गोष्टींचे आयुष्य वाढवा', Urdu: 'آپ کے پاس جو کچھ ہے اس کی زندگی بڑھائیں' },
  'Last resort — not the first step': { English: 'Last resort — not the first step', Hindi: 'अंतिम उपाय — पहला कदम नहीं', Marathi: 'शेवटचा उपाय — पहिली पायरी नाही', Urdu: 'آخری حربہ — پہلا قدم نہیں' },
  'Non-biodegradable persistence': { English: 'Non-biodegradable persistence', Hindi: 'गैर-बायोडिग्रेडेबल स्थायित्व', Marathi: 'नॉन-बायोडिग्रेडेबल टिकावूपणा', Urdu: 'غیر بائیوڈیگریڈیبل استقامت' },
  'Fossil fuel derived':           { English: 'Fossil fuel derived',           Hindi: 'जीवाश्म ईंधन से उत्पन्न',     Marathi: 'जीवाश्म इंधनापासून बनवलेले',  Urdu: 'فوسل فیول سے ماخوذ' },
  'Wildlife ingestion':            { English: 'Wildlife ingestion',            Hindi: 'वन्यजीवों द्वारा अंतर्ग्रहण',  Marathi: 'वन्यजीवांकडून प्राशन',        Urdu: 'جنگلی حیات کا ادخال' },
  'Incineration releases GHGs':    { English: 'Incineration releases GHGs',    Hindi: 'भस्मीकरण से GHG निकलते हैं',  Marathi: 'भस्मीकरणामुळे GHG उत्सर्जित होतात', Urdu: 'بھڑکانے سے GHG خارج ہوتا ہے' },
  'False sense of safety':         { English: 'False sense of safety',         Hindi: 'सुरक्षा की झूठी भावना',       Marathi: 'सुरक्षेची खोटी भावना',        Urdu: 'حفاظتی غلط فہمی' },
'@

# Replace 'Node': ... with 'Node': ... + new translations
$oldLine = "  'Node':                           { English: 'Node',                           Hindi: 'नोड',                        Marathi: 'नोड',                         Urdu: 'نوڈ' },"
$newLine = $oldLine + "`n" + $newTranslations

$content = $content.Replace($oldLine, $newLine)

# Cleanup any potential duplicates we might have added earlier incorrectly
# (None should be there if we start clean, but just in case)

$content | Set-Content $path -Encoding UTF8
Write-Host "Injected new translations"
