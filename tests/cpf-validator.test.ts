import { describe, expect, it } from "vitest";
import { cleanCPF, formatCPF, validateCPF } from "../src/index";

describe("cleanCPF", () => {
  it("deve remover pontos e traços", () => {
    expect(cleanCPF("123.456.789-09")).toBe("12345678909");
  });

  it("deve remover espaços", () => {
    expect(cleanCPF("123 456 789 09")).toBe("12345678909");
  });

  it("deve retornar apenas números", () => {
    expect(cleanCPF("abc123def456ghi789jkl09")).toBe("12345678909");
  });

  it("deve funcionar com CPF já limpo", () => {
    expect(cleanCPF("12345678909")).toBe("12345678909");
  });
});

describe("formatCPF", () => {
  it("deve formatar CPF limpo", () => {
    expect(formatCPF("12345678909")).toBe("123.456.789-09");
  });

  it("deve formatar CPF já formatado", () => {
    expect(formatCPF("123.456.789-09")).toBe("123.456.789-09");
  });

  it("deve retornar vazio para CPF com menos de 11 dígitos", () => {
    expect(formatCPF("123456789")).toBe("");
  });

  it("deve retornar vazio para CPF com mais de 11 dígitos", () => {
    expect(formatCPF("123456789012")).toBe("");
  });

  it("deve retornar vazio para string vazia", () => {
    expect(formatCPF("")).toBe("");
  });
});

describe("validateCPF", () => {
  describe("CPFs válidos", () => {
    it("deve validar CPF válido sem formatação", () => {
      expect(validateCPF("11144477735")).toBe(true);
    });

    it("deve validar CPF válido com formatação", () => {
      expect(validateCPF("111.444.777-35")).toBe(true);
    });

    it("deve validar diversos CPFs válidos", () => {
      const validCPFs = [
        "11144477735",
        "111.444.777-35",
        "52998224725",
        "529.982.247-25",
      ];

      validCPFs.forEach((cpf) => {
        expect(validateCPF(cpf)).toBe(true);
      });
    });
  });

  describe("CPFs inválidos", () => {
    it("deve rejeitar CPF com todos os dígitos iguais", () => {
      const invalidCPFs = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
      ];

      invalidCPFs.forEach((cpf) => {
        expect(validateCPF(cpf)).toBe(false);
      });
    });

    it("deve rejeitar CPF com dígito verificador inválido", () => {
      expect(validateCPF("12345678900")).toBe(false);
      expect(validateCPF("111.444.777-36")).toBe(false);
    });

    it("deve rejeitar CPF com menos de 11 dígitos", () => {
      expect(validateCPF("123456789")).toBe(false);
    });

    it("deve rejeitar CPF com mais de 11 dígitos", () => {
      expect(validateCPF("123456789012")).toBe(false);
    });

    it("deve rejeitar string vazia", () => {
      expect(validateCPF("")).toBe(false);
    });

    it("deve rejeitar apenas letras", () => {
      expect(validateCPF("abcdefghijk")).toBe(false);
    });

    it("deve rejeitar CPF com caracteres especiais apenas", () => {
      expect(validateCPF("...---")).toBe(false);
    });
  });

  describe("casos extremos", () => {
    it("deve lidar com espaços em branco", () => {
      expect(validateCPF("111 444 777 35")).toBe(true);
    });

    it("deve lidar com formatação mista", () => {
      expect(validateCPF("111.444.77735")).toBe(true);
    });

    it("deve lidar com caracteres extras", () => {
      expect(validateCPF("CPF: 111.444.777-35")).toBe(true);
    });
  });
});
