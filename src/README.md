# Library Management System API

`A RESTful API built with Node.js, Express, TypeScript, MongoDB, and Zod validation for managing books and borrowing operations in a library.`

---

## Features

` CRUD operations for books  
 Borrow books with validation on availability  
  Borrowed books summary with aggregation  
 Input validation using Zod  
  Error handling middleware  
 Well-structured modular codebase  `

--------------------------------------

## Setup Instructions

### Technologies Used

 `Node.js
  Express.js (v4)`
  TypeScript`
  MongoDB & Mongoose`
  Zod (for validation)`
  ts-node-dev (for development)`




## API Endpoints
### 1. Create a Book

`*URL: POST /api/books`
`*Body:
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}`

`*Response:
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "book_id_here",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}`

### 2. Get All Books
`*URL: GET /api/books`
 `Query Params: filter, sortBy, sort, limit
` Response:`
 {
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ /* array of book objects */ ]
}`

### 3 Get Book by ID
`URL: GET /api/books/:bookId`
`Response:
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": { /* book object */ }
}`

### 4. Update a Book
`URL: PUT /api/books/:bookId`

`Body: Partial or full fields to update (same as create)`

`Response:
{
  "success": true,
  "message": "Book updated successfully",
  "data": { /* updated book object */ }
}`

### 5. Delete a Book
`URL: DELETE /api/books/:bookId`

`Response:
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}`

### 6. Borrow a Book
`URL: POST /api/borrow`

`Body:
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}`

`Business Logic:

`Verifies the book exists.`

`Checks enough copies are available.`

`Deducts borrowed quantity from book’s copies.`

`Updates available to false if copies become 0.`

`Saves borrow record.`

`Response:
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "borrow_record_id",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}`


### 7. Borrowed Books Summary
URL: GET /api/borrow

`Response:`
`{
  "success": true,
  "message": "Borrowed books summary retrieved successfully"`
  `"data": [
 `{
      "book": {
        "title": "The Theory of Everything",`
        "isbn": "9780553380163"`
      },`
      "totalQuantity": 5`
    },`
    `{
      "book": {`
        "title": "1984",
        "isbn": "9780451524935"
      },`
      "totalQuantity": 3`
    }`
  ]
}`
`
#### Validation & Error Handling
`All input data is validated using Zod schemas.`

`Validation failures return HTTP 400 with descriptive messages.`

`Centralized error handling middleware manages unexpected errors gracefully.`

### Start the server in dev mode:
`npm run dev`

