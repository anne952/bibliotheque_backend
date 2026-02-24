$entries = @(
    @{
        fiscalYearId = "f21982f8-d776-43c0-a2b2-c4a8a2fda8d2"
        date = "2026-02-24"
        journalType = "GENERAL"
        description = "Masse test 1 - Ventes"
        lines = @(
            @{ account = "101"; debit = 3000; credit = 0 },
            @{ account = "701"; debit = 0; credit = 3000 }
        )
    },
    @{
        fiscalYearId = "f21982f8-d776-43c0-a2b2-c4a8a2fda8d2"
        date = "2026-02-24"
        journalType = "GENERAL"
        description = "Masse test 2 - Achats"
        lines = @(
            @{ account = "102"; debit = 2000; credit = 0 },
            @{ account = "601"; debit = 0; credit = 2000 }
        )
    },
    @{
        fiscalYearId = "f21982f8-d776-43c0-a2b2-c4a8a2fda8d2"
        date = "2026-02-24"
        journalType = "GENERAL"
        description = "Masse test 3 - Stock"
        lines = @(
            @{ account = "103"; debit = 1500; credit = 0 },
            @{ account = "71"; debit = 0; credit = 1500 }
        )
    }
)

$successCount = 0
$errorCount = 0

foreach ($entry in $entries) {
    $json = $entry | ConvertTo-Json -Depth 10
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4000/api/accounting/entries" `
            -Method POST `
            -ContentType "application/json" `
            -Body $json `
            -ErrorAction Stop
        
        $result = $response.Content | ConvertFrom-Json
        Write-Host "✅ $($entry.description): $($result.entryNumber) créée"
        $successCount++
    }
    catch {
        $errorMsg = $_.Exception.Response.Content | ConvertFrom-Json
        Write-Host "❌ $($entry.description): $($errorMsg.message)"
        $errorCount++
    }
}

Write-Host "`n Results:"
Write-Host "  Success: $successCount"
Write-Host "  Errors: $errorCount"
