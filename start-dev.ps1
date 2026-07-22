$ErrorActionPreference = 'Stop'

$runtimeRoot = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies'
$nodeDir = Join-Path $runtimeRoot 'node\bin'
$pnpm = Join-Path $runtimeRoot 'bin\fallback\pnpm.cmd'

if (-not (Test-Path $pnpm)) {
    Write-Host 'Node.js runtime not found. Please install Node.js LTS: https://nodejs.org/' -ForegroundColor Yellow
    exit 1
}

$env:PATH = "$nodeDir;$env:PATH"
Set-Location $PSScriptRoot

if (-not (Test-Path (Join-Path $PSScriptRoot 'node_modules'))) {
    Write-Host 'First run: installing project dependencies...' -ForegroundColor Cyan
    & $pnpm install
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host 'Starting website. Open http://localhost:5173/ in your browser.' -ForegroundColor Green
& $pnpm run dev
