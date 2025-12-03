# Task 002 — Implementar Validador de CPF

## Status

pending

## Type

feat

## Assignee

jorisveloso

## Description

Implementar um validador completo de CPF brasileiro que verifica:
- Formato válido (11 dígitos)
- Dígitos verificadores corretos
- CPFs com todos os dígitos iguais (inválidos)

Incluir funções auxiliares para formatação e limpeza de CPF.

## Tasks

- [ ] Criar estrutura de diretórios (src/ e tests/)
- [ ] Implementar função validateCPF em src/index.ts
- [ ] Implementar funções auxiliares (clean, format, calculateDigit)
- [ ] Criar testes com Vitest
- [ ] Garantir 100% de cobertura de testes
- [ ] Documentar a API

## Notes

O pacote deve exportar:
- `validateCPF(cpf: string): boolean` - Valida um CPF
- `formatCPF(cpf: string): string` - Formata como XXX.XXX.XXX-XX
- `cleanCPF(cpf: string): string` - Remove caracteres especiais
