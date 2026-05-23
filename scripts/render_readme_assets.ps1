$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $repoRoot "screenshots"
$stdout = Join-Path $env:TEMP ("headless-wp-vue-starter-" + [guid]::NewGuid().ToString() + "-stdout.log")
$stderr = Join-Path $env:TEMP ("headless-wp-vue-starter-" + [guid]::NewGuid().ToString() + "-stderr.log")
$port = "5384"
$process = $null
$edgeCandidates = @(
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)

New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem $screenshots -Filter "*.png" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem $screenshots -Filter "*.log" -ErrorAction SilentlyContinue | Remove-Item -Force

function Get-EdgePath {
    foreach ($candidate in $edgeCandidates) {
        if (Test-Path $candidate) {
            return $candidate
        }
    }
    throw "Microsoft Edge was not found."
}

function Wait-ForUrl {
    param([string]$Url)
    for ($i = 0; $i -lt 60; $i++) {
        try {
            Invoke-WebRequest -Uri $Url -UseBasicParsing | Out-Null
            return
        } catch {
            Start-Sleep -Seconds 1
        }
    }
    throw "Timed out waiting for $Url"
}

try {
    $env:PORT = $port
    $process = Start-Process -FilePath "node.exe" `
        -ArgumentList "dist/src/app.js" `
        -WorkingDirectory $repoRoot `
        -RedirectStandardOutput $stdout `
        -RedirectStandardError $stderr `
        -PassThru

    Wait-ForUrl "http://127.0.0.1:$port/"

    $edge = Get-EdgePath
    $targets = @(
        @{ Url = "http://127.0.0.1:$port/"; File = "01-overview-proof.png"; Size = "1880,2120" },
        @{ Url = "http://127.0.0.1:$port/architecture-lane"; File = "02-architecture-lane-proof.png"; Size = "1880,2220" },
        @{ Url = "http://127.0.0.1:$port/content-flow"; File = "03-content-flow-proof.png"; Size = "1700,1220" },
        @{ Url = "http://127.0.0.1:$port/docs"; File = "04-docs-proof.png"; Size = "1880,1860" },
        @{ Url = "http://127.0.0.1:$port/verification"; File = "05-verification-proof.png"; Size = "1700,1140" }
    )

    foreach ($target in $targets) {
        $targetPath = Join-Path $screenshots $target.File
        & $edge `
            --headless `
            --disable-gpu `
            --hide-scrollbars `
            "--window-size=$($target.Size)" `
            "--screenshot=$targetPath" `
            $target.Url | Out-Null

        if (-not (Test-Path $targetPath)) {
            throw "Screenshot was not created for $($target.Url)"
        }
    }
} finally {
    if ($process -and -not $process.HasExited) {
        Stop-Process -Id $process.Id -Force
        Wait-Process -Id $process.Id -ErrorAction SilentlyContinue
    }
    if (Test-Path $stdout) {
        Remove-Item $stdout -Force
    }
    if (Test-Path $stderr) {
        Remove-Item $stderr -Force
    }
}

exit 0
