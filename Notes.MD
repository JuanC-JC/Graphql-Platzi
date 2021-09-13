# Notas GRAPHQL

## Pasos

Crear un schema

```
  const express = require("express");
  const { graphqlHTTP } = require("express-graphql");
  const resolvers = require("./lib/resolvers");

```

## Types

Enum genera una lista de opciones para un parametro en algun objeto, solo puedo tener los valores que esten identificados aca

```
  enum Level {
    principiante
    intermedio
    avanzado
  }

  type Course{
    _id: ID!
    title: String
    description: String
    difficulty: Level
  }
```

## Querys

### 1) Aliases and fragments:

Podemos utilizar aliases y fragment para facilitar nuestras queries

- aliases renombra la salida de un dato
- fragment permite reutilizar los campos solicitados

```

{
	allCourses: courses{
   ...allFields
  }

}

  fragment allFields on Course {
    _id
    title
    topic
    teacher
    people{
      _id
      name
    }
  }

```

### 2) Variables

Las variables nos permiten crear funciones en las mutation para reciclar info, sin embargo las queryVaribles deben ser creadas en formato json, en la automatizacion de las funciones tambien se pueden utilizar directivas como @include (if:$variable)con el fin de agregar a la query un campo de manera condicional

```
  mutation addPersonToCourse ($course:ID!,$person:ID!){
    addPeople(courseID:$course,personID:$person){
      title
      people{
        _id
        name
      }
    }
  }

  {
    "course":"613c541cc2f9c4234ac10616" ,
    "person": "613d30e230749743be5b71d5"
  }

```

### 3) interfaces

```
  interface Person{
    _id:ID!
    name: String!
    email: String!
  }

  type Student implements Person{

  }
```

### 5) Indices

Los indices facilitan la busqueda para mongodb creand

```

```

### 4) Uniones

```

```
