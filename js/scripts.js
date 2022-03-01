class Validator {
  constructor() {
    this.validations = [
      'data-required',
      'data-min-length',
      'data-email-validate'
    ]
  }
  //iniciar a validação de todos os campos
  validate(form) {
    //resgata todas as validações
    let currentValidations = document.querySelectorAll('form .error-validation')
    if (currentValidations.length > 0) {
      this.cleanValidations(currentValidations)
    }
    //pegar todos os inputs
    let inputs = form.getElementsByTagName('input')
    //transformo um HTML Collection -> array
    let inputsArray = [...inputs]
    //loop nos inputs e validação
    inputsArray.forEach(function (input) {
      //loop todas as validações existentes
      for (let i = 0; this.validations.length > i; i++) {
        //verifica se a validação atual existe no input
        if (input.getAttribute(this.validations[i]) != null) {
          //transformar o data-min-length em minlength
          //transformando a string em método
          let method = this.validations[i].replace('data-', '').replace('-', '')
          //valor do input
          let value = input.getAttribute(this.validations[i])
          //invocar o método
          this[method](input, value)
        }
      }
    }, this)
  }
  //verifica se um input tem um número mínimo de caracteres
  minlength(input, minValue) {
    let inputLength = input.value.length
    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`
    if (inputLength < minValue) {
      this.printMessage(input, errorMessage)
    }
  }
  //valida email
  emailvalidate(input) {
    //email@dominio.com -> email@dominio.com.br
    let re = /\S+@\S+\.\S+/
    let email = input.value
    let errorMessage = `Insira um e-mail válido`
    if (!re.test(email)) {
      this.printMessage(input, errorMessage)
    }
  }
  //método para imprimir mensagem de erro na tela
  printMessage(input, msg) {
    //quantidade de erros
    let errorsQty = input.parentNode.querySelector('.error-validation')
    if (errorsQty === null) {
      let template = document.querySelector('.error-validation').cloneNode(true)
      template.textContent = msg
      let inputParent = input.parentNode
      template.classList.remove('template')
      inputParent.appendChild(template)
    }
  }
  //verifica se o input é requerido
  required(input) {
    let inputValue = input.value
    if (inputValue === '') {
      let errorMessage = `Este campo é obrigatório`
      this.printMessage(input, errorMessage)
    }
  }
  //limpa as validações da tela
  cleanValidations(validations) {
    validations.forEach(el => el.remove())
  }
}

let form = document.getElementById('register-form')
let submit = document.getElementById('btn-submit')

let validator = new Validator()
//evento que dispara as validações
submit.addEventListener('click', function (e) {
  e.preventDefault()
  validator.validate(form)
})
