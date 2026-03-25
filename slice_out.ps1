
$path = 'c:\Users\ayaan shaikh\Documents\HACKNICHE4.0\FRONTEND-HACKNICHE4.0\lib\language-context.tsx'
$content = Get-Content $path -Encoding UTF8
# Lines 240-266 are broken (0-indexed: 239-265)
$newContent = $content[0..238] + $content[266..($content.Length-1)]
$newContent | Set-Content $path -Encoding UTF8
Write-Host "Sliced out broken lines"
