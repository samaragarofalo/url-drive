URLDrive - Mantenha seus arquivos seguros! Keep files safely stored!

# URL-Drive

URL-Drive é um sistema que permite o upload e download de arquivos utilizando URLs. O sistema armazena os arquivos por URL e permite o versionamento, garantindo acesso à versão mais recente ou a uma versão específica.

---

## 📌 Tecnologias Utilizadas

- **Backend:** Django
- **Frontend:** React
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker e Docker Compose

## 📋 Requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Instalação e Execução

1. Clone o repositório:
   ```sh
   git clone https://github.com/samaragarofalo/url-drive.git
   ```
2. Entre no diretório do projeto:
   ```sh
   cd url-drive
   ```
3. Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias:
   ```sh
   PS_USER=seu_usuario
   PS_PASSWORD=sua_senha
   PS_DB=nome_do_banco
   SECRET_KEY=sua_secret_key
   ```
4. Suba os containers com Docker Compose:
   ```sh
   docker-compose up --build
   ```

## 🎯 Uso

### 📤 Upload de Arquivos
1. Insira uma nova URL ou selecione uma já existente.
2. Envie o arquivo desejado. O sistema armazenará o arquivo e manterá o versionamento.

### 📥 Download de Arquivos
1. Acesse `http://localhost:8000/downloads`.
2. Informe a URL do arquivo que deseja baixar.
3. O sistema irá baixar a última versão do arquivo.
4. Para baixar uma versão específica, informe o parâmetro `?version=` seguido do número da versão desejada. Exemplo:
   ```sh
   http://localhost:8000/downloads?version=2
   ```

## 📂 Estrutura do Projeto

```
url-drive/
│── app/
│   └── URLDriver/  # Backend Django
│── client/
│   └── url-driver/  # Frontend React
│── docker-compose.yml
│── Dockerfile (backend e frontend)
│── .env.example
```

## 🛑 Parando o Sistema
Para parar os containers, utilize:
```sh
docker-compose down
```

---

# URL-Drive (English Version)

URL-Drive is a system that allows file uploads and downloads using URLs. The system stores files by URL and enables versioning, ensuring access to the latest or a specific version.

---

## 📌 Technologies Used

- **Backend:** Django
- **Frontend:** React
- **Database:** PostgreSQL
- **Containerization:** Docker and Docker Compose

## 📋 Requirements

Before starting, make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Installation and Execution

1. Clone the repository:
   ```sh
   git clone https://github.com/samaragarofalo/url-drive.git
   ```
2. Navigate to the project directory:
   ```sh
   cd url-drive
   ```
3. Create a `.env` file in the project root and define the required environment variables:
   ```sh
   PS_USER=your_user
   PS_PASSWORD=your_password
   PS_DB=database_name
   SECRET_KEY=your_secret_key
   ```
4. Start the containers with Docker Compose:
   ```sh
   docker-compose up --build
   ```

## 🎯 Usage

### 📤 Uploading Files
1. Enter a new URL or select an existing one.
2. Upload the desired file. The system will store the file and maintain versioning.

### 📥 Downloading Files
1. Access `http://localhost:8000/downloads`.
2. Enter the URL of the file you want to download.
3. The system will download the latest version of the file.
4. To download a specific version, provide the `?version=` parameter followed by the desired version number. Example:
   ```sh
   http://localhost:8000/downloads?version=2
   ```

## 📂 Project Structure

```
url-drive/
│── app/
│   └── URLDriver/  # Backend Django
│── client/
│   └── url-driver/  # Frontend React
│── docker-compose.yml
│── Dockerfile (backend and frontend)
│── .env.example
```

## 🛑 Stopping the System
To stop the containers, use:
```sh
docker-compose down
```
