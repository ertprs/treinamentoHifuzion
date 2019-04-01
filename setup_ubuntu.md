# Setup ambiente dev UBUNTU 18

## Atualizando

Como root, atualize os pacotes já instalados.

- `add-apt-repository universe`
- `apt update`
- `apt upgrade`

## Git

Instale o git `sudo apt install git`

Com o usuário `deploy` vamos configurar o git. Para isso vamos criar a chave ssh e configurar o usuário e email global

Vamos Gerar a Chave

```bash
ssh-keygen -t rsa -C "email@dominio.com"

Generating public/private rsa key pair.
Enter file in which to save the key (/home/deploy/.ssh/id_rsa):[Enter]
Created directory '/home/deploy/.ssh'.
Enter passphrase (empty for no passphrase):[Senha]
Enter same passphrase again:[Repete a Senha]
Your identification has been saved in /home/deploy/.ssh/id_rsa.
Your public key has been saved in /home/deploy/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:***************************** email@dominio.com
```

Aplique a chave no seu servidor de versões (gitlab, ou github)

Configurando usuário global

```bash
git config --global user.name "Seu Nome"
git config --global user.email "email@dominio.com"
```

## MySQL

Vamos instalar o MySQL

```bash
sudo apt install mysql-server libmysqlclient-dev
sudo mysql_secure_installation
```

Após efetuar a configuração de segurança, vamos habilitar a conexão remota. Para isso edite o arquivo `/etc/mysql/mysql.conf.d/mysqld.cnf`

```
...
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address            = 0.0.0.0
...
```

Reinicie o serviço `sudo /etc/init.d/mysql restart`

Agora, vamos criar um usuário para não utilizar o root:

```bash
sudo mysql -u root
> CREATE USER 'developer'@'%' IDENTIFIED BY '*****';
> GRANT ALL PRIVILEGES ON * . * TO 'developer'@'%';
```

## Frontend

Vamos instalar o node 10 e npm para depois adicionar as libs de frontend

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs

~$ node -v
v4.2.6
~$ npm -v
3.5.2
sudo npm install -g npm
```

## Backend

Dependencias

```bash
sudo apt install build-essential libssl-dev libffi-dev python3-dev
```

Instalando o pyenv

```bash
sudo apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev

git clone https://github.com/pyenv/pyenv.git ~/.pyenv
echo '' >> ~/.profile
echo '# PYENV' >> ~/.profile
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.profile
```

Vamos instalar o python 3.6.6

```bash
pyenv install 3.6.6
pyenv global 3.6.6
python -V
```

## PipEnv

_PS: Caso esteja com virtualenv ativo, desative o mesmo `deactive`_

Instale o uwsgi

```
pip install pipenv
```

## Redis

Rode o comando `sudo apt install redis-server redis-tools`

Após isso, teste da seginte forma

```bash
redis-cli
127.0.0.1:6379> ping
PONG
127.0.0.1:6379>
```
