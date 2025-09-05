# Save this as Scan-Secrets.ps1 in your project root

# Folders to scan
$folders = @(".\src", ".")  # Add other folders if needed

# Patterns to look for
$patterns = @(
    "AIza",        # Firebase public API
    "sk_test",     # Stripe secret/test key
    "private_key"  # Firebase service account
)

Write-Host "Scanning for potential secrets..."

foreach ($folder in $folders) {
    foreach ($pattern in $patterns) {
        Get-ChildItem -Path $folder -Recurse -Include *.js,*.ts,*.jsx,*.tsx,*.json |
        ForEach-Object {
            Select-String -Path $_.FullName -Pattern $pattern | ForEach-Object {
                Write-Host "Potential secret found in file:" $_.Path "Line:" $_.LineNumber
                Write-Host "  -->" $_.Line.Trim()
            }
        }
    }
}

Write-Host "Scan complete."
