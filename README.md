# g-calender-api

# API DOC FOR BACKEND

# IMPORTANT NOTE!!

## Authorization

## Thank you

# List of available data

- `User`
- `Event`

## Endpoints User

List of Available Users Endpoints:

- `POST /register`
- `POST /google-login`
- `POST /login`

### POST /register

#### Description

- Create a new user data

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "password": String,
    "email": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message" : String
  }
  ```

_400 - Bad Request_

- Body

  example for email is empty

  ```json
  {
    "statusCode": 400,
    "message": "Email is empty"
  }
  ```

  example for already registered

  ```json
  {
    "statusCode": 409,
    "message": "Email Already Taken"
  }
  ```

### POST /google-login

#### Description

- log in to homepage via google account

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "access_token": String
  }
  ```

_201 - Created_

- Body
  ```json
  {
    "message": String
  }
  ```

### POST /login

#### Description

- log in to homepage

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "password": String,
    "email": String,
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "access_token": String
  }
  ```

_401 - Not authorized_

- Body
  ```json
  {
    "statusCode": 401,
    "message": "Invalid email or password"
  }
  ```

## Endpoints User

List of Available Users Endpoints:

- `GET /events`
- `POST /events`
- `PUT /events`
- `DELETE /events`

### GET /events

#### Description

- Get the all the events

#### Response

_200 - OK_

- Body

  ```json
  [
    {
        "NameKegiatan": String,
        "Tanggal": Date,
        "JamMulai": Date,
        "JamSelesai": Date,
        "status": String
    },
    {
        "NameKegiatan": String,
        "Tanggal": Date,
        "JamMulai": Date,
        "JamSelesai": Date,
        "status": String
    },
    ...
  ]
  ```


### POST /events

#### Description

- Create a new event

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": String
  }
  ```
- Body
  ```json
  {
    "NameKegiatan": String,
    "JamMulai": Date,
    "JamSelesai": Date,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": String
  }
  ```

_400 - Bad Request_

- Body

  example for NamaKegiatan is empty

  ```json
  {
    "statusCode": 400,
    "message":
      {
        "Event name is empty"
      }
  }
  ```

### PUT /events/:id

#### Description

- Update the specific data of event

#### Request

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded",
    "access_token": STRING
  }
  ```
- Body
  ```json
  {
    "NameKegiatan": String,
    "Tanggal": Date,
    "JamMulai": Date,
    "JamSelesai": Date,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": String
  }
  ```

_400 - Bad Request_

- Body

  example for name is empty

  ```json
  {
    "statusCode": 400,
    "message":
      {
        "name cannot be empty"
      }
  }
  ```

### DELETE /events/:id

#### Description

- Remove a user data based on given id

#### Response

_200 - OK_

- Body
```json
{
  "message": "<entity username> succes to delete"
}
```

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "message": "Internal Server Error"
  }
  ```
