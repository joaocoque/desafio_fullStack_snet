# Projeto de desafio Service Net

## Configurando ambiente

Para rodar o projeto siga os seguintes passos:

* Duplique o arquivo `.env.example` para `.env`
* Rode o comando composer install --ignore-platform-reqs
* Execute o projeto usando o comando 
```
./vendor/bin/sail docker-compose up -d 
```

* Rode o banco e as seeders do projeto usando o seguinte comando
```
 ./vendor/bin/sail php artisan migrate:fresh --seed
```

## Utilizando as rotas

Segue abaixo end-points para fazer uso das rotas  `api`, para fazer requisições de visualizar, editar e excluir é necessário passar o uuid do respectivo usuário.

```
{Environment}/api/v1/usuarios                               => GET
localhost/api/v1/usuarios/{uuid}                            => GET
localhost/api/v1/usuarios                                   => POST
localhost/api/v1/usuarios/{uuid}                            => PUT
localhost/api/v1/usuarios/{uuid}                            => DELETE

```


## Exemplo de json de cadastro e atualização de usuário

Para que uma mensagem possa ser parseada pelo sistema de encoder, ela deverá chegar no seguinte formato em json:

```
{
    "name":"João Victor",
    "email":"joaocoque@gmail.com",
    "password":"12345678",
    "birth": "1999-01-26"
}
```

* Importante salientar que no cadastro todos os campos são obrigatórios, porém no atualizar são opcionais, sendo possível atualizar apenas um dos campos.

## Padrão de retorno de mensagens

### Sucesso ao cadastrar

Ao efetuar um cadastro bem sucedido o retorno será:

```
{
    "message": "Usuário criado com sucesso!"
}
```

### Erro de cadastro

Em caso de um cadastro mal sucedido, o retorno será:

```
{
    "message": "Falha ao  adicionar Usuário",
    "data": {
        "email": [
            "email já está sendo utilizado."
        ]
    }
}
```

Um dos possíveis erros ao cadastrar um usuário seria devido ao email ser único, desta forma será retornado erro.
