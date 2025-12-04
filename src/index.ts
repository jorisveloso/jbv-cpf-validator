/**
 * jbv-cpf-validator
 * Validador de CPF brasileiro com TypeScript
 */

/**
 * Remove todos os caracteres não numéricos de uma string
 * @param cpf - CPF com ou sem formatação
 * @returns CPF apenas com dígitos
 * @example
 * cleanCPF("123.456.789-09") // "12345678909"
 */
export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

/**
 * Formata um CPF no padrão XXX.XXX.XXX-XX
 * @param cpf - CPF com ou sem formatação
 * @returns CPF formatado ou string vazia se inválido
 * @example
 * formatCPF("12345678909") // "123.456.789-09"
 */
export function formatCPF(cpf: string): string {
  const cleaned = cleanCPF(cpf);
  
  if (cleaned.length !== 11) {
    return "";
  }
  
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/**
 * Calcula o dígito verificador do CPF
 * @param cpf - CPF parcial (9 ou 10 primeiros dígitos)
 * @param factor - Fator inicial (10 para primeiro dígito, 11 para segundo)
 * @returns Dígito verificador calculado
 */
function calculateDigit(cpf: string, factor: number): number {
  let sum = 0;
  
  for (let i = 0; i < cpf.length; i++) {
    sum += parseInt(cpf[i]) * factor--;
  }
  
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/**
 * Verifica se todos os dígitos do CPF são iguais
 * @param cpf - CPF limpo (apenas números)
 * @returns true se todos os dígitos forem iguais
 */
function hasAllEqualDigits(cpf: string): boolean {
  return cpf.split("").every((digit) => digit === cpf[0]);
}

/**
 * Valida um CPF brasileiro
 * @param cpf - CPF com ou sem formatação
 * @returns true se o CPF for válido, false caso contrário
 * @example
 * validateCPF("123.456.789-09") // false
 * validateCPF("111.444.777-35") // true
 */
export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleaned = cleanCPF(cpf);
  
  // Verifica se tem 11 dígitos
  if (cleaned.length !== 11) {
    return false;
  }
  
  // Verifica se não são todos dígitos iguais (ex: 111.111.111-11)
  if (hasAllEqualDigits(cleaned)) {
    return false;
  }
  
  // Calcula e verifica o primeiro dígito verificador
  const firstDigit = calculateDigit(cleaned.substring(0, 9), 10);
  if (firstDigit !== parseInt(cleaned[9])) {
    return false;
  }
  
  // Calcula e verifica o segundo dígito verificador
  const secondDigit = calculateDigit(cleaned.substring(0, 10), 11);
  if (secondDigit !== parseInt(cleaned[10])) {
    return false;
  }
  
  return true;
}

// Exportação default para conveniência
export default {
  validateCPF,
  formatCPF,
  cleanCPF,
};
