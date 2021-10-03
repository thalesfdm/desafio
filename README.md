# Desafio

Aplicação capaz de ler uma planilha do google sheets, buscar as informações necessárias, calcular e escrever o resultado na planilha.
A planilha consiste em uma tabela de alunos com suas respectivas notas e faltas. Deve-se calcular a situação de cada aluno baseando-se no
número de faltas e na média das três provas, seguindo as seguintes regras:

<table>
  <thead>
    <tr>
      <th>Regra</th>
      <th>Situação</th>
      <th>Nota para Aprovação Final</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Faltas > 25%</td>
      <td>Reprovado por Falta</td>
      <td>0</td>
    </tr>
    <tr>
      <td>Média < 5</td>
      <td>Reprovado por Nota</td>
      <td>0</td>
    </tr>
    <tr>
      <td>5 <= Média < 7</td>
      <td>Exame Final</td>
      <td>5 <= (Média + NAF) / 2</td>
    </tr>
    <tr>
      <td>Média >= 7</td>
      <td>Aprovado</td>
      <td>0</td>
    </tr>
  </tbody>
</table>

## Requisitos
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) >= 12
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
