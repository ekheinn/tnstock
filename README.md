# Gestock

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [Yarn](https://yarnpkg.com/) (v1.22 ou superior)
- [Python](https://www.python.org/) (v3.8 ou superior)
- [Pip](https://pip.pypa.io/en/stable/) (gerenciador de pacotes Python)
- [Django](https://www.djangoproject.com/) (v4.0 ou superior)

## Configuração do Projeto

### Frontend (React Vite)

1. **Navegue até a pasta do frontend:**

   ```bash
   cd client
   ```

2. **Instale as dependências:**

   ```bash
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   yarn dev
   ```

   O frontend estará rodando em `http://localhost:3000`.

### Backend (Django)

1. **Navegue até a pasta do backend:**

   ```bash
   cd server
   ```

2. **Crie um ambiente virtual (opcional, mas recomendado):**

   ```bash
   python -m venv venv
   ```

3. **Ative o ambiente virtual:**

   - No Windows:

     ```bash
     venv\Scripts\activate
     ```

   - No macOS/Linux:

     ```bash
     source venv/bin/activate
     ```

4. **Instale as dependências:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Execute as migrações:**

   ```bash
   python manage.py migrate
   ```

6. **Inicie o servidor de desenvolvimento:**

   ```bash
   python manage.py runserver
   ```

   O backend estará rodando em `http://localhost:8000`.

## Estrutura do Projeto

- **`frontend/`**: Contém o código do frontend em React Vite.

  - `src/`: Pasta principal do código fonte do React.
  - `public/`: Arquivos estáticos como `index.html`.
  - `vite.config.js`: Configurações do Vite.

- **`backend/`**: Contém o código do backend em Django.
  - `manage.py`: Script de gerenciamento do Django.
  - `settings.py`: Configurações do projeto Django.
  - `urls.py`: Configurações de URLs do projeto.
  - `models.py`: Definições dos modelos do banco de dados.
  - `views.py`: Lógica das views do Django.
