
$path = 'c:\Users\ayaan shaikh\Documents\HACKNICHE4.0\FRONTEND-HACKNICHE4.0\lib\language-context.tsx'
$content = Get-Content $path -Raw -Encoding UTF8

$newLines = @'
  'Knowledge Hub_title':           { English: 'Knowledge Hub',                  Hindi: 'ज्ञान केंद्र',                Marathi: 'ज्ञान केंद्र',               Urdu: 'علم مرکز' },
  'The 6 Common':                   { English: 'The 6 Common',                   Hindi: '6 सामान्य',                   Marathi: '6 सामान्य',                 Urdu: '6 عام' },
  'Plastics':                       { English: 'Plastics',                       Hindi: 'प्लास्टिक',                   Marathi: 'प्लास्टिक',                 Urdu: 'پلاسٹک' },
  'of all plastic ever produced has been recycled': { English: 'of all plastic ever produced has been recycled', Hindi: 'जितना भी प्लास्टिक बना है, उसका केवल इतना प्रतिशत रीसायकल किया गया है', Marathi: 'आतापर्यंत तयार केलेल्या सर्व प्लास्टिकपैकी एवढ्या टक्के रिसायकल झाले आहे', Urdu: 'اب تک پیدا ہونے والے تمام پلاسٹک میں سے اتنا ری سائیکل کیا گیا ہے' },
  'years for most plastics to degrade': { English: 'years for most plastics to degrade', Hindi: 'अधिकांश प्लास्टिक को खराब होने में लगने वाले वर्ष', Marathi: 'बहुतेक प्लास्टिक खराब होण्यासाठी लागणारी वर्षे', Urdu: 'زیادہ تر پلاسٹک کو خراب ہونے میں سال لگتے ہیں' },
  'of global GHG emissions from plastic production': { English: 'of global GHG emissions from plastic production', Hindi: 'प्लास्टिक उत्पादन से वैश्विक ग्रीनहाउस गैस उत्सर्जन', Marathi: 'प्लास्टिक उत्पादनातून जागतिक GHG उत्सर्जन', Urdu: 'پلاسٹک کی پیداوار سے عالمی GHG اخراج' },
  'Quick Reference':                { English: 'Quick Reference',                Hindi: 'त्वरित संदर्भ',                Marathi: 'त्वरित संदर्भ',                Urdu: 'فوری حوالہ' },
  'Code':                           { English: 'Code',                           Hindi: 'कोड',                         Marathi: 'कोड',                         Urdu: 'کوڈ' },
  'Name':                           { English: 'Name',                           Hindi: 'नाम',                         Marathi: 'नाव',                         Urdu: 'نام' },
  'Abbr':                           { English: 'Abbr',                           Hindi: 'संक्षिप्त नाम',               Marathi: 'संक्षिप्त नाव',               Urdu: 'مخفف' },
  'The Waste Hierarchy':            { English: 'The Waste Hierarchy',            Hindi: 'अपशिष्ट पदानुक्रम',            Marathi: 'कचरा उतरंड',                 Urdu: 'فضلہ کا درجہ بندی' },
  'Refuse':                         { English: 'Refuse',                         Hindi: 'अस्वीकार करें',               Marathi: 'नकार द्या',                   Urdu: 'رد کریں' },
  'Reduce':                         { English: 'Reduce',                         Hindi: 'कम करें',                     Marathi: 'कमी करा',                     Urdu: 'کم کریں' },
  'Reuse':                          { English: 'Reuse',                          Hindi: 'पुन: उपयोग करें',             Marathi: 'पुन्हा वापरा',                Urdu: 'دوبارہ इस्तेमाल करें' },
  'Recycle':                        { English: 'Recycle',                        Hindi: 'रीसायकल करें',                 Marathi: 'रीसायकल करा',                 Urdu: 'ری سائیکل کریں' },
  'Non-biodegradable persistence': { English: 'Non-biodegradable persistence', Hindi: 'गैर-बायोडिग्रेडेबल स्थायित्व', Marathi: 'नॉन-बायोडिग्रेडेबल टिकावूपणा', Urdu: 'غیر بائیوڈیگریڈیبل استقامت' },
  'Fossil fuel derived':           { English: 'Fossil fuel derived',           Hindi: 'जीवाश्म ईंधन से उत्पन्न',     Marathi: 'जीवाश्म इंधनापासून बनवलेले',  Urdu: 'فوسل فیول سے ماخوذ' },
  'Wildlife ingestion':            { English: 'Wildlife ingestion',            Hindi: 'वन्यजीवों द्वारा अंतर्ग्रहण',  Marathi: 'वन्यजीवांकडून प्राशन',        Urdu: 'جنگلی حیات کا ادخال' },
  'Incineration releases GHGs':    { English: 'Incineration releases GHGs',    Hindi: 'भस्मीकरण से GHG निकलते हैं',  Marathi: 'भस्मीकरणामुळे GHG उत्सर्जित होतात', Urdu: 'بھڑکانے سے GHG خارج ہوتا ہے' },
  'False sense of safety':         { English: 'False sense of safety',         Hindi: 'सुरक्षा की झूठी भावना',       Marathi: 'सुरक्षेची खोटी भावना',        Urdu: 'حفاظتی غلط فہمی' },
'@

$oldLine = "  'Node':                           { English: 'Node',                           Hindi: 'नोड',                        Marathi: 'नोड',                         Urdu: 'नोड' },"
$newLine = $oldLine + "`n" + $newLines

$content = $content.Replace($oldLine, $newLine)
$content | Set-Content $path -Encoding UTF8
Write-Host "Injected missing main keys"
