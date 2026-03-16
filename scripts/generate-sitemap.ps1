param(
    [string]$BaseUrl = "https://iddrisrashid.tech",
    [string]$OutputPath = "./sitemap.xml"
)

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

# Collect all HTML files that should be indexed.
$htmlFiles = Get-ChildItem -Path $repoRoot -Recurse -Filter *.html -File | Where-Object {
    $_.FullName -notmatch "\\.git\\|\\node_modules\\" -and
    $_.Name -notmatch "^google[a-z0-9]+\.html$"
}

$urls = foreach ($file in $htmlFiles) {
    $relativePath = $file.FullName.Substring($repoRoot.Path.Length).TrimStart('\\') -replace "\\", "/"

    if ($relativePath -eq "index.html") {
        $loc = "$BaseUrl/"
        $priority = "1.0"
        $changefreq = "weekly"
    }
    else {
        $cleanPath = $relativePath -replace "index\.html$", ""
        $loc = "$BaseUrl/$cleanPath"
        $priority = "0.6"
        $changefreq = "monthly"
    }

        $lastmod = $file.LastWriteTimeUtc.ToString("yyyy-MM-dd")

    @"
  <url>
    <loc>$loc</loc>
        <lastmod>$lastmod</lastmod>
    <changefreq>$changefreq</changefreq>
    <priority>$priority</priority>
  </url>
"@
}

$xml = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
$($urls -join "`n")
</urlset>
"@

Set-Content -Path $OutputPath -Value $xml -Encoding UTF8
Write-Host "Generated sitemap at $OutputPath with $($urls.Count) URL(s)."
