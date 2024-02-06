# Apresentação
Este projeto consiste em três partes: um aplicativo que exibe uma grade de caixas animadas com configurações dinâmicas obtidas de um backend (PHP, MySQL), e um controlador que fornece uma interface para modificar as configurações.

# Configuração de ambiente
- VS Code: editor de código;
- XAMPP: servidor php/apache;
- MySQL Workbench: banco de dados.
## Passo a passo
1. Crie um banco de dados através do MySQL Workbench usando o código que está em `./backend/caixas.sql`.  Use `SELECT * FROM inputs;` para ver a tabela visualmente.
2. Em `./backend/index.php` substitua o servername, username e password conforme a configuração do banco de dados mySQL.
3. Localize a pasta `htdocs` dentro do diretório do XAMPP (exemplo: `C:\Programas\xampp\htdocs`). Copie todos os arquivos deste repositório em `htdocs`.
4. Após a cópia dos arquivos, inicie o Apache pelo painel do XAMPP.
5. Acesse a porta `localhost` que foi gerada. Nesta aplicação contém apenas as páginas `localhost/app` e `localhost/controlador`.

# Correções a serem feitas
- Em `localhost/controlador` a página somente atualiza a visualização ao clicar em Aplicar ou ao dar F5 na página. Já em `localhost/app` atualiza apenas se der F5. É necessário pensar em uma forma de otimizar a atualização das duas páginas.