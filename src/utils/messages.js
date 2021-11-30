export default {
  autenticacaoNecessaria: 'Autenticação necessária',
  erroConexao: 'Não foi possível estabelecer conexão com o servidor. Por favor, tente novamente mais tarde',
  emailSenhaIncorretos: 'E-mail ou Senha incorretos',
  erroDesconhecido: 'Ocorreu um erro desconhecido',
  montarErroNao401(error) {
    console.log('NÃO 401', error.response.data)
    let errorMessage = ''
    let errors = error.response.data.errors;
    if (error.response.data.title) {
      errorMessage = error.response.data.title
    } else if (error.response.data.error_description) {
      let description = error.response.data.error_description
      if (description === 'invalid_username_or_password')
        errorMessage = this.emailSenhaIncorretos
    } else if (error.response.data.error) {
      let dataError = error.response.data.error
      if (dataError === 'invalid_grant')
        errorMessage = this.autenticacaoNecessaria
    } else {
      errorMessage = this.erroDesconhecido
    }

    if(!errors){
      errors = []
    }

    return { errorMessage: errorMessage, errors: errors }
  },
  sucesso: {
    cadastro: 'Cadastro realizado com sucesso!',
    exclusao: 'Exclusão realizada com sucesso!',
    edicao: 'Edição realizada com sucesso!',
    upload: 'Envio de arquivo realizado com sucesso!'
  }
}