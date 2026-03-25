
$path = 'c:\Users\ayaan shaikh\Documents\HACKNICHE4.0\FRONTEND-HACKNICHE4.0\lib\language-context.tsx'
$lines = Get-Content $path -Encoding UTF8
$newLines = @()
$seenKeys = @{}

foreach ($line in $lines) {
    if ($line -match "^\s*'([^']+)'\s*:") {
        $key = $Matches[1]
        
        # If we see messed up characters (like à¤), we skip it if we haven't seen the key yet,
        # but actually it's safer to just skip it if it has certain byte patterns.
        # But wait, the "clean" one comes AFTER the "messed up" one in the file.
        
        if ($line -like "*à¤*") {
            continue # Skip messed up encoding lines
        }

        if ($seenKeys.ContainsKey($key)) {
            continue # Skip duplicates
        }
        $seenKeys[$key] = $true
    }
    
    $newLines += $line
}

$newLines | Set-Content $path -Encoding UTF8
Write-Host "Deduplication and cleanup complete"
