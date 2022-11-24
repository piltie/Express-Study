import { body } from "express-validator"

export const productCreateValidation = () => {
  return [
    body("nome")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome precisa ter no mínimo 5 caracteres"),
    body("preco")
      .isNumeric() // OBS: ESSE TAMBÉM ACEITA O NÚMERO SE TIVER NUMA STRING, MAS NÃO ACEITA "203e" POR EXEMPLO.
      .withMessage("O preço precisa ser um número.")
      .custom((value: number) => {
        if(value < 0 || value > 50) {
          throw new Error("O preço precisa ser entre 0 e 50.")
        }
        return true; // SE O VALOR PASSAR NA VERIFICAÇÃO, CONTINUAR
      }), // VERIFICAÇÃO CUSTOMIZADAS
      body ("descricao")
        .isString() // OUTRO MÉTODO DESSE É O .isURL()
        .withMessage("A descrição é obrigatória."),
  ]
}