
$path = 'c:\Users\ayaan shaikh\Documents\HACKNICHE4.0\FRONTEND-HACKNICHE4.0\lib\language-context.tsx'
$lines = Get-Content $path -Encoding UTF8
$newLines = @()
$seenKeys = @{}

foreach ($line in $lines) {
    if ($line -match "^\s*'([^']+)'\s*:") {
        $key = $Matches[1]
        if ($seenKeys.ContainsKey($key)) {
            Write-Host "Removing duplicate key: $key"
            continue
        }
        $seenKeys[$key] = $true
    }
    $newLines += $line
}

$newLines | Set-Content $path -Encoding UTF8
Write-Host "Cleanup Complete"
