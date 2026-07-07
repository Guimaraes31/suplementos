$base = "https://images.pexels.com/photos/{0}/pexels-photo-{0}.jpeg?auto=compress&cs=tinysrgb&w={1}"

$downloads = @{
  "public\images\hero\hero.jpg" = @(29107595, 900)
  "public\images\categories\whey.jpg" = @(13779116, 700)
  "public\images\categories\creatina.jpg" = @(33921585, 700)
  "public\images\categories\pre-treino.jpg" = @(16216610, 700)
  "public\images\categories\pos-treino.jpg" = @(15120889, 700)
  "public\images\categories\vitaminas.jpg" = @(7615571, 700)
  "public\images\categories\packs.jpg" = @(6551143, 700)
  "public\images\products\whey-gold.jpg" = @(13779103, 600)
  "public\images\products\whey-concentrado.jpg" = @(13779108, 600)
  "public\images\products\whey-vegan.jpg" = @(13787643, 600)
  "public\images\products\creatina-mono.jpg" = @(33921585, 600)
  "public\images\products\creatina-hcl.jpg" = @(28879521, 600)
  "public\images\products\pre-fury.jpg" = @(16216610, 600)
  "public\images\products\pre-focus.jpg" = @(10132277, 600)
  "public\images\products\pos-recovery.jpg" = @(16513595, 600)
  "public\images\products\bcaa.jpg" = @(12625114, 600)
  "public\images\products\multi.jpg" = @(7615570, 600)
  "public\images\products\vitamina-d3.jpg" = @(17820728, 600)
  "public\images\products\omega3.jpg" = @(17820707, 600)
  "public\images\products\pack-massa.jpg" = @(29107595, 600)
  "public\images\products\pack-cutting.jpg" = @(13464104, 600)
  "public\images\products\pack-iniciante.jpg" = @(13779107, 600)
  "public\images\products\zma.jpg" = @(3850701, 600)
}

foreach ($entry in $downloads.GetEnumerator()) {
  $id, $width = $entry.Value
  $url = $base -f $id, $width
  try {
    Invoke-WebRequest -Uri $url -OutFile $entry.Key -TimeoutSec 45
    Write-Output "OK $($entry.Key)"
  } catch {
    Write-Output "FAIL $($entry.Key)"
  }
}