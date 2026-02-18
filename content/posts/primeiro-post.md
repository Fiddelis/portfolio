---
title: "Primeiro post em Markdown"
excerpt: "Este e um post de exemplo para validar o pipeline de Markdown para HTML no build do Next.js."
date: "2026-02-17"
---

## Objetivo

Este post prova que o site consegue:

- ler arquivos `.md` locais,
- converter para HTML no build,
- publicar uma pagina de listagem e detalhe por slug.

## Exemplo de codigo

```ts
export function hello(name: string) {
  return `Hello, ${name}`;
}
```

## Proximos passos

Voce pode criar novos posts dentro de `content/posts` com frontmatter:

- `title`
- `excerpt`
- `date`
- `locale` (opcional: `pt` ou `en`)
