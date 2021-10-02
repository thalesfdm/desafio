# Desafio

Aplicação capaz de ler uma planilha do google sheets, buscar as informações necessárias, calcular e escrever o resultado na planilha.

## Requisitos
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com)
- Conta na [Google Cloud Platform](https://cloud.google.com)

## Instruções

Crie um arquivo com o nome **.env** no diretório raiz do projeto.
Este arquivo deverá conter as seguintes variáveis:

```env
SHEET_ID="preencher com id da planilha"
PRIVATE_KEY="preencher com a chave do serviço"
CLIENT_EMAIL="preencher com o email do serviço"
```

**SHEET_ID** deve ser preenchido com o ID da planilha, obtido no próprio endereço da mesma.

**PRIVATE_KEY** e **CLIENT_EMAIL** devem ser preenchidos com as chaves de autenticação
obtidas com a criação de uma Service Account na Google Cloud Platform. Para mais informações
seguir as [instruções desta página](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account).

Exemplo:

```env
SHEET_ID="1NzAbiToHGwx-xxgXx3xVNsG4dOx-xeltEDo4DlmQ6To"
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXIIEvgIBADANXgkqhkiG9w0XAQEFAASCXKgwggSkXgEAAoIBAQC..."
CLIENT_EMAIL="example@example-123456.iam.gserviceaccount.com"
```

Instalar as dependências da aplicação:
```
npm install
```

Executar a aplicação:
```
npm run start
```

### Outros comandos:

Formatar o código:
```
npm run format
```

Executar os testes:
```
npm run test
```
