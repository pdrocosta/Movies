| Método | Endpoint    | Responsabilidade       |
| ------ | ----------- | ---------------------- |
| POST   | /movies     | Criar os filmes        |
| GET    | /movies     | Listar todos os filmes |
| GET    | /movies/:id | Buscar filme por id    |
| PATCH  | /movies/:id | Atualizar filme por id |
| DELETE | /movies/:id | Deletar filme por id   |

### GET /movies

-   A rota **GET /movies**, além de listar todos os filmes do cinema, também deve conseguir listar os filmes a partir da categoria específica.
    -   Essa categoria deve ser enviada pelo query parameter **category**.
    -   Caso a categoria enviada não exista, deve-se retornar todos os filmes do banco.

## Casos de erro

-   Nas rotas **GET, PATCH e DELETE /movies/:id**, caso **id** não exista, deve-se retornar a mensagem de erro e status code mencionados abaixo:

    -   Status code: **_404 NOT FOUND._**
    -   Mensagem de retorno:

        ```json
        {
            "error": "Movie not found!"
        }
        ```

-   Nas rotas **POST e PATCH**, caso **name** já exista, deve retornar a mensagem de erro abaixo. O status code deve ser o mencionado abaixo:

    -   Status code: **_409 CONFLICT._**
    -   Mensagem de retorno:

        ```json
        {
            "error": "Movie name already exists!"
        }
        ```

#

## Exemplos de requisição

### POST /movies

Rota de criação de filme. Deve ser possível criar um filme.
| **Corpo da requisição:** |
|-|

```json
{
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
}
```

| **Resposta do servidor:**           |
| ----------------------------------- |
| **Status code:** **_201 CREATED._** |

```json
{
    "id": 1,
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
}
```

### GET /movies

Rota de listagem de filmes. Deve ser possível retornar todos os filmes do cinema.
| Resposta do servidor: |
| - |
|**Status code:** **_200 OK._**|

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    },
    {
        "id": 2,
        "name": "Matrix",
        "category": "Ficção",
        "duration": 120,
        "price": 35
    }
]
```

#### Com query parameter

O exemplo abaixo foi realizado na seguinte rota: **/movies?category=Animação**.
| Resposta do servidor: |
| - |
| **Status code:** **_200 OK._** |

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    }
]
```

#### Com query parameter

O exemplo abaixo foi realizado na seguinte rota: **/movies?category=outra categoria**.
| Resposta do servidor: |
| - |
| **Status code:** **_200 OK._** |

```json
[
    {
        "id": 1,
        "name": "Divertidamente",
        "category": "Animação",
        "duration": 120,
        "price": 35
    },
    {
        "id": 2,
        "name": "Matrix",
        "category": "Ficção",
        "duration": 120,
        "price": 35
    }
]
```

### GET /movies/:id

Rota de busca de filme. Deve ser possível buscar um filme pelo id.
O exemplo abaixo foi realizado na seguinte rota: **/movies/1**.
| Resposta do servidor: |
| - |
| **Status code:** **_200 OK._** |

```json
{
    "id": 1,
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
}
```

### PATCH /movies/:id

Rota de atualização de filme. Deve ser possível atualizar um filme pelo id. Todos os campos podem ser atualizados de forma opcional.

O exemplo abaixo foi realizado na seguinte rota: **/movies/2**.
| **Corpo da requisição:** |
|-|

```json
{
    "name": "Matrix 2"
}
```

| Resposta do servidor:          |
| ------------------------------ |
| **Status code:** **_200 OK._** |

```json
{
    "id": 2,
    "name": "Matrix 2",
    "category": "Ficção",
    "duration": 120,
    "price": 35
}
```

### DELETE /movies/:id

Rota de deleção de filme. Deve ser possível deletar um filme pelo id.
O exemplo abaixo foi realizado na seguinte rota: **/movies/1**.
| Resposta do servidor: |
|-|
|**Status code:** **_204 NO CONTENT._**|

**Não** altere nenhum dado do readme.

repository uid: 6c05b259-e7c0-4798-917f-270afbc010d9
