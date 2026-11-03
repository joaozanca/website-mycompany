#!/usr/bin/env bash
# Espera a Netlify publicar em produção o commit informado (ZV-37).
# A página traz <meta name="zv-versao" content="<commit>">; o script consulta o site até o commit aparecer.
# Uso: aguardar-producao.sh <sha> [url]
set -euo pipefail

SHA="$1"
URL="${2:-https://zancavolt.com.br}"
TENTATIVAS=40 # 40 × 15 s = 10 minutos

for i in $(seq 1 "$TENTATIVAS"); do
  # "?v=" evita receber uma cópia antiga guardada no caminho.
  VERSAO=$(curl -fsSL "$URL/?v=$SHA-$i" | grep -o 'name="zv-versao" content="[^"]*"' | sed 's/.*content="//; s/"$//' || true)
  if [ "$VERSAO" = "$SHA" ]; then
    echo "Commit $SHA publicado em $URL."
    exit 0
  fi
  echo "Tentativa $i/$TENTATIVAS: no ar está '${VERSAO:-nenhuma}', esperando $SHA..."
  sleep 15
done

echo "::error::O commit $SHA não entrou no ar em $URL depois de 10 minutos. Confira o deploy na Netlify."
exit 1
