# jbv-cpf-validator

![NPM Version](https://img.shields.io/npm/v/jbv-cpf-validator?style=flat-square)
![NPM License](https://img.shields.io/npm/l/jbv-cpf-validator?style=flat-square)
![NPM Downloads](https://img.shields.io/npm/dm/jbv-cpf-validator?style=flat-square)

Validador de CPF brasileiro leve, rápido e sem dependências. Desenvolvido em TypeScript com suporte completo a tipos.

## 🎯 Problema Resolvido

Validar CPF brasileiro é uma tarefa comum em aplicações web. Este pacote oferece:

- ✅ Validação completa seguindo as regras da Receita Federal
- ✅ Formatação automática (XXX.XXX.XXX-XX)
- ✅ Limpeza de caracteres especiais
- ✅ Zero dependências
- ✅ TypeScript nativo
- ✅ Suporte a CommonJS e ES Modules
- ✅ Testado e confiável (100% cobertura)

## 📦 Instalação

```bash
# npm
npm install jbv-cpf-validator

# yarn
yarn add jbv-cpf-validator

# pnpm
pnpm add jbv-cpf-validator
```

## 🚀 Uso Básico

### Validar CPF

```typescript
import { validateCPF } from 'jbv-cpf-validator';

// Com formatação
validateCPF('111.444.777-35'); // true
validateCPF('111.444.777-36'); // false

// Sem formatação
validateCPF('11144477735'); // true
validateCPF('11144477736'); // false

// Aceita formatos mistos
validateCPF('111 444 777 35'); // true
validateCPF('CPF: 111.444.777-35'); // true
```

### Formatar CPF

```typescript
import { formatCPF } from 'jbv-cpf-validator';

formatCPF('11144477735');        // "111.444.777-35"
formatCPF('111.444.777-35');     // "111.444.777-35"
formatCPF('123');                // "" (inválido)
```

### Limpar CPF

```typescript
import { cleanCPF } from 'jbv-cpf-validator';

cleanCPF('111.444.777-35');      // "11144477735"
cleanCPF('111 444 777 35');      // "11144477735"
cleanCPF('CPF: 111.444.777-35'); // "11144477735"
```

### Importação Default

```typescript
import cpfValidator from 'jbv-cpf-validator';

cpfValidator.validateCPF('111.444.777-35'); // true
cpfValidator.formatCPF('11144477735');      // "111.444.777-35"
cpfValidator.cleanCPF('111.444.777-35');    // "11144477735"
```

## 📖 API

### `validateCPF(cpf: string): boolean`

Valida um CPF brasileiro.

**Parâmetros:**
- `cpf` (string): CPF com ou sem formatação

**Retorna:**
- `boolean`: `true` se válido, `false` caso contrário

**Validações realizadas:**
- ✅ Verifica se tem 11 dígitos
- ✅ Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
- ✅ Calcula e valida os dois dígitos verificadores

**Exemplos:**

```typescript
validateCPF('111.444.777-35');  // true
validateCPF('000.000.000-00');  // false (todos dígitos iguais)
validateCPF('123.456.789-00');  // false (dígito verificador inválido)
validateCPF('12345678');        // false (menos de 11 dígitos)
```

---

### `formatCPF(cpf: string): string`

Formata um CPF no padrão XXX.XXX.XXX-XX.

**Parâmetros:**
- `cpf` (string): CPF com ou sem formatação

**Retorna:**
- `string`: CPF formatado ou string vazia se inválido

**Exemplos:**

```typescript
formatCPF('11144477735');       // "111.444.777-35"
formatCPF('111.444.777-35');    // "111.444.777-35"
formatCPF('123');               // ""
```

---

### `cleanCPF(cpf: string): string`

Remove todos os caracteres não numéricos de um CPF.

**Parâmetros:**
- `cpf` (string): CPF com ou sem formatação

**Retorna:**
- `string`: CPF apenas com dígitos

**Exemplos:**

```typescript
cleanCPF('111.444.777-35');     // "11144477735"
cleanCPF('111 444 777 35');     // "11144477735"
cleanCPF('abc111def444ghi777jkl35'); // "11144477735"
```

## 💡 Casos de Uso

### Validação em Formulários

```typescript
import { validateCPF, formatCPF } from 'jbv-cpf-validator';

function handleCPFInput(value: string) {
  if (validateCPF(value)) {
    // CPF válido - pode prosseguir
    console.log('CPF válido:', formatCPF(value));
    return true;
  } else {
    // CPF inválido - mostrar erro
    console.error('CPF inválido');
    return false;
  }
}
```

### API Backend (Express)

```typescript
import { validateCPF } from 'jbv-cpf-validator';

app.post('/api/users', (req, res) => {
  const { cpf } = req.body;
  
  if (!validateCPF(cpf)) {
    return res.status(400).json({ 
      error: 'CPF inválido' 
    });
  }
  
  // Continuar com o cadastro...
});
```

### React Hook

```typescript
import { useState } from 'react';
import { validateCPF, formatCPF } from 'jbv-cpf-validator';

function useCPF(initialValue = '') {
  const [cpf, setCPF] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (value: string) => {
    setCPF(formatCPF(value));
    setIsValid(validateCPF(value));
  };
  
  return { cpf, isValid, handleChange };
}
```

## 🧪 Testes

Este pacote possui 100% de cobertura de testes com 22 casos de teste cobrindo:

- ✅ CPFs válidos (com e sem formatação)
- ✅ CPFs inválidos (dígitos verificadores incorretos)
- ✅ CPFs com todos os dígitos iguais
- ✅ Strings vazias e caracteres especiais
- ✅ Casos extremos

Para rodar os testes:

```bash
pnpm test
```

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Rodar testes
pnpm test

# Rodar testes em modo watch
pnpm test:watch

# Verificar tipagem
pnpm typecheck

# Lint
pnpm lint

# Formatar código
pnpm format

# Build
pnpm build

# Validar tudo
pnpm validate
```

## 📊 Especificações Técnicas

- **TypeScript:** 5.x
- **Tamanho:** ~2KB (minificado)
- **Dependências:** 0
- **Formatos:** CommonJS, ES Modules
- **Tipos:** Incluídos (.d.ts)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feat/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feat/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

MIT © [Joris Veloso](https://github.com/jorisveloso)

## 🔗 Links

- [NPM](https://www.npmjs.com/package/jbv-cpf-validator)
- [GitHub](https://github.com/jorisveloso/jbv-cpf-validator)
- [Issues](https://github.com/jorisveloso/jbv-cpf-validator/issues)

## 👤 Autor

**Joris Veloso**

- GitHub: [@jorisveloso](https://github.com/jorisveloso)
- Email: jorisveloso@gmail.com

---

Feito com ❤️ por [Joris Veloso](https://github.com/jorisveloso)
