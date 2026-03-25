
$path = 'c:\Users\ayaan shaikh\Documents\HACKNICHE4.0\FRONTEND-HACKNICHE4.0\lib\language-context.tsx'
$content = Get-Content $path -Raw -Encoding UTF8

$newLines = @'
  'Recyclability':                  { English: 'Recyclability',                  Hindi: 'पुनर्चक्रण क्षमता',           Marathi: 'पुनर्वापर क्षमता',           Urdu: 'ری سائیکل ایبلٹی' },
  'Danger Level':                   { English: 'Danger Level',                   Hindi: 'खतरनाक स्तर',                Marathi: 'धोका पातळी',               Urdu: 'خطرے کی سطح' },
  'Bio-Persistence':                { English: 'Bio-Persistence',                Hindi: 'जैव-दृढ़ता',                 Marathi: 'जैव-दृढता',                 Urdu: 'بائیو استقامت' },
  'EXECUTIVE PROTOCOL':             { English: 'EXECUTIVE PROTOCOL',             Hindi: 'कार्यकारी प्रोटोकॉल',          Marathi: 'कार्यकारी प्रोटोकॉल',          Urdu: 'ایگزیکٹو پروٹوکول' },
  'COMMON MANIFESTATIONS':          { English: 'COMMON MANIFESTATIONS',          Hindi: 'सामान्य अभिव्यक्ति',          Marathi: 'सामान्य प्रकटीकरण',          Urdu: 'عام مظاہر' },
  'Neural Matrix Specs':            { English: 'Neural Matrix Specs',            Hindi: 'न्यूरल मैट्रिक्स विनिर्देश',   Marathi: 'न्यूरल मॅट्रिक्स वैशिष्ट्ये', Urdu: 'نیورل میٹرکس چشمہ' },
  'Neural Insight Generator':       { English: 'Neural Insight Generator',       Hindi: 'न्यूरल अंतर्दृष्टि जेनरेटर',    Marathi: 'न्यूरल अंतर्दृष्टी जनरेटर',    Urdu: 'نیورل بصیرت جنریٹر' },
  'Synthetic Logic Stream':         { English: 'Synthetic Logic Stream',         Hindi: 'सिंथेटिक लॉजिक स्ट्रीम',     Marathi: 'सिंथेटिक लॉजिक स्ट्रीम',     Urdu: 'مصنوعی منطق ندی' },
  'GENERATE AI INSIGHTS':           { English: 'GENERATE AI INSIGHTS',           Hindi: 'AI अंतर्दृष्टि उत्पन्न करें',   Marathi: 'AI अंतर्दृष्टी व्युत्पन्न करा', Urdu: 'AI بصیرت پیدا کریں' },
  'Sources':                        { English: 'Sources',                        Hindi: 'स्रोत',                       Marathi: 'स्रोत',                       Urdu: 'ذرائع' },
  'Symbol':                         { English: 'Symbol',                         Hindi: 'प्रतीक',                      Marathi: 'चिन्ह',                       Urdu: 'علامت' },
  'ID Lattice':                     { English: 'ID Lattice',                     Hindi: 'आईडी लैटिस',                  Marathi: 'आयडी लॅटिस',                  Urdu: 'آئی ڈی لیٹس' },
  'Access Intel':                   { English: 'Access Intel',                   Hindi: 'एक्सेस इंटेल',                Marathi: 'ॲक्सेस इंटेल',                Urdu: 'انٹل تک رسائی حاصل کریں' },
  'Global Impact Node':             { English: 'Global Impact Node',             Hindi: 'ग्लोबल इम्पैक्ट नोड',          Marathi: 'ग्लोबल इम्पॅक्ट नोड',          Urdu: 'عالمی اثر نوڈ' },
  'Material Database':              { English: 'Material Database',              Hindi: 'सामग्री डेटाबेस',               Marathi: 'साहित्य डेटाबेस',              Urdu: 'مواد ڈیٹا بیس' },
  'Environmental Impact Guide':     { English: 'Environmental Impact Guide',     Hindi: 'पर्यावरण प्रभाव गाइड',         Marathi: 'पर्यावरणीय प्रभाव मार्गदर्शक', Urdu: 'ماحولیاتی اثرات کی گائیڈ' },
  'Neural Insight':                 { English: 'Neural Insight',                 Hindi: 'न्यूरल अंतर्दृष्टि',          Marathi: 'न्यूरल अंतर्दृष्टी',           Urdu: 'نیورل بصیرت' },
  'Input required for logic continuity': { English: 'Input required for logic continuity', Hindi: 'तार्किक निरंतरता के लिए इनपुट आवश्यक', Marathi: 'तार्किक सातत्य राखण्यासाठी माहिती आवश्यक', Urdu: 'منطق کے تسلسل کے لیے ان پٹ درکار ہے' },
'@

$oldLine = "  'False sense of safety':         { English: 'False sense of safety',         Hindi: 'सुरक्षा की झूठी भावना',       Marathi: 'सुरक्षेची खोटी भावना',        Urdu: 'حفاظتی غلط فہمی' },"
$newLine = $oldLine + "`n" + $newLines

$content = $content.Replace($oldLine, $newLine)
$content | Set-Content $path -Encoding UTF8
Write-Host "Injected final missing keys"
