# Remove Comments from JavaScript/TypeScript Project Files
function Remove-Comments {
    param (
        [string]$Path = "."
    )

    # File extensions to process
    $extensions = @("*.js", "*.jsx", "*.ts", "*.tsx", "*.vue", "*.svelte")

    # Find all files matching extensions, excluding node_modules
    $files = Get-ChildItem -Path $Path -Recurse -Include $extensions | 
             Where-Object { $_.FullName -notmatch "node_modules" }

    foreach ($file in $files) {
        try {
            # Read the entire file content
            $content = Get-Content -Path $file.FullName -Raw

            # Remove single-line comments
            $content = $content -replace "//.*", ""

            # Remove multi-line comments (/* */)
            $content = $content -replace "/\*[\s\S]*?\*/", ""

            # Remove empty lines and trim whitespace
            $content = ($content -split "\n" | 
                        Where-Object { $_.Trim() -ne "" } | 
                        ForEach-Object { $_.TrimEnd() }) -join "`n"

            # Write the content back to the file
            $content | Set-Content -Path $file.FullName -Encoding UTF8

            Write-Host "Processed: $($file.FullName)"
        }
        catch {
            Write-Host "Error processing $($file.FullName): $_" -ForegroundColor Red
        }
    }
}

# Call the function to remove comments in the current directory
Remove-Comments