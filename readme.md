# TO-DO list Express API

## Assignment

- [X] Create an Express application to manage a TODO list
  - [X] GET     /todos
  - [X] POST    /todos
  - [X] PUT     /todos/:id
  - [X] DELETE  /todos:id
- [X] Deploy the application in an AWS EC2 instance (use pm2)
- [X] Security groups:
  - [X] Allow 443, 80 for 0.0.0.0
  - [X] Allow 22 for your IP address
- [X] Set a proxy pass using nginx

## Delivery format

- [X] Screenshot of Security Group
- [X] Link to repository
- [X] Nginx configuration
- [X] Screenshot of Pm2 running:
  - [X] list and monitor
- [X] Ip Address & Virtual domain

## Usage

The API domain is: https://uniapi.emmasandbox.com

You can see all current todos via a GET request to:

* https://uniapi.emmasandbox.com/todos

Each todo is also accessible via its id:

* https://uniapi.emmasandbox.com/todos/:id

You can create new todos via a POST at:

* https://uniapi.emmasandbox.com/todos

The body can contain the following information:

```JSON
  {
    "title": "a fresh todo",
    "content": "Description of the task",
    "deadline": "2021-05-13 17:00:00"
  }
```

A correct request will receive a success message along with the todo id.

A new todo must contain at least a title. Else the request will be answered with a 400 status code.

It is not allowed to create a duplicated todo, this will be answered with a 409 alerting the user that duplicates are not allowed.

To update a todo, send a PUT request to:

* https://uniapi.emmasandbox.com/todos/:id

The body must contain at least 1 field to update.

If the update of the todo would result in a duplicate, the todo will not be updated and a 409 status code is send to alert that no duplicates are allowed.

Finally, to delete a todo send a DELETE request to:

* https://uniapi.emmasandbox.com/todos/:id

If any of the requested ids by the client is not found, the answer will be a 404 reporting that the todo could not be found.
