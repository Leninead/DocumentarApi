

/*
Tasks to be Completed:

Modify the persistence layer to incorporate the concepts of Factory (optional), DAO (Data Access Object), and DTO (Data Transfer Object).

The selected DAO (determined by a command-line parameter) will be returned by a Factory for use by the business layer.
Implement the Repository pattern to work with the DAO in the business logic.
Modify the route /current to avoid sending sensitive information. Instead, send a DTO (Data Transfer Object) with only the necessary user information.

Create a middleware that works in conjunction with the "current" strategy to establish an authorization system and restrict access to specific endpoints:

Only administrators can create, update, and delete products.
Only users can send messages in the chat.
Only users can add products to their cart.
Create a "Ticket" model that will encompass all the formalizations of a purchase. This model should have the following fields:

Id (auto-generated by MongoDB)
Code: a unique auto-generated string
Purchase date and time: to record the exact date and time of purchase
Amount: the total purchase amount
Purchaser: a string containing the email of the user associated with the cart.
Implement a new route in the cart router: /carts/:cid/purchase. This route will allow users to finalize the purchase process for their cart. The purchase process should:

Verify the product's stock at the time of purchase.
Deduct the purchased quantity from the product's stock if available.
Generate a ticket with the purchase details using the Tickets service.
In case of products with insufficient stock, provide a list of product IDs that couldn't be processed.
Remove the successfully purchased products from the user's cart, leaving the unavailable products.
Let's start by addressing each of these tasks one by one. If you have any specific questions or if you'd like guidance on a particular task, please let me know, and I'll be happy to assist you further.
**************************************************************
1. Modify the Persistence Layer:

Create DAO (Data Access Object) files for each model (e.g., cartDAO.js, productDAO.js, userDAO.js) in the dao folder. These DAOs will interact with your database.
2. Implement the Repository Pattern:

Create repository modules for each model to handle database operations in the business logic. For example, you can create cartRepository.js, productRepository.js, and userRepository.js.
3. Modify the /current Route:

Update the /current route to ensure it doesn't send sensitive information. Instead, send a DTO (Data Transfer Object) with only the necessary user information.
4. Create an Authorization Middleware:

Implement an authorization middleware, such as authorizationMiddleware.js, to control access to specific endpoints. You'll need to define and enforce access rules for administrators and regular users.
5. Create a "Ticket" Model and Route:

Create a ticket.model.js in the models folder with the specified fields.
Implement a new route, /carts/:cid/purchase, in the cart router (cartRoutes.js) to handle finalizing purchases, generating tickets, and handling product stock.
6. Remove Successfully Purchased Products from the User's Cart:

Implement the logic to remove products from the user's cart that have been successfully purchased.
7. Error Handling:

Consider adding robust error handling throughout your application, especially when dealing with database operations, authorization, and purchases. Ensure that your routes and services handle errors gracefully.
8. Documentation:

As you progress with the implementation, maintain good documentation for your code, including comments and README files. Clear and organized code is essential for collaboration and future maintenance.
9. Testing:

Develop unit tests and integration tests to ensure that your application functions as expected. Test different scenarios, including successful and failed cases.
10. Refactoring and Code Organization:

As your application grows, periodically review and refactor your code to keep it organized and maintainable. Consider breaking down large functions into smaller, reusable pieces.
11. Security:

Pay close attention to security, especially when handling user data and transactions. Prevent common security vulnerabilities such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).
You can gradually work on these tasks one by one, starting with creating the DAOs and repository modules, then updating routes and implementing authorization and the "Ticket" model. Focus on one task at a time to ensure that each component is properly integrated and tested before moving on to the next.

Remember to regularly test your application and document your progress. If you encounter specific challenges or have questions related to any of these tasks, feel free to ask for assistance or guidance on each specific task as you work through them.


TO RUN THE ENPOINTS: 
Users Routes:

Retrieve current user: [GET] http://localhost:8080/users/current
Home route: [GET] http://localhost:8080/users/
User profile route: [GET] http://localhost:8080/users/profile
Register a user: [POST] http://localhost:8080/users/register
Log in a user: [POST] http://localhost:8080/users/login
Log out a user: [POST] http://localhost:8080/users/logout
Admin dashboard route: [GET] http://localhost:8080/users/admin
Protected route to get the current user: [GET] http://localhost:8080/users/user
Protected route for the admin dashboard: [GET] http://localhost:8080/users/admin-dashboard
Protected route to get the current user (API style): [GET] http://localhost:8080/users/api/sessions/current
Cart Routes:

Create a cart: [POST] http://localhost:8080/cart/
Get a cart by user ID: [GET] http://localhost:8080/cart/:userId
Add a product to the cart: [POST] http://localhost:8080/cart/:cartId/products
Update the product quantity: [PUT] http://localhost:8080/cart/:cartId/products/:productId
Remove a specific product from the cart: [DELETE] http://localhost:8080/cart/:cartId/products/:productId
Clear the entire cart: [DELETE] http://localhost:8080/cart/:cartId
Purchase cart: [POST] http://localhost:8080/cart/:cid/purchase
Products Routes:

Create a product: [POST] http://localhost:8080/products/
Add a product to the cart: [POST] http://localhost:8080/products/addToCart
Update a product in the cart: [PUT] http://localhost:8080/products/updateCartProduct/:productId
Update the quantity of a product in the cart: [PUT] http://localhost:8080/products/updateQuantityProduct/:productId
Get the contents of the cart: [GET] http://localhost:8080/products/getCartContents
Remove a product from the cart: [DELETE] http://localhost:8080/products/removeFromCart/:productId
Ticket Routes:

Create a ticket: [POST] http://localhost:8080/tickets/create
Get a list of tickets: [GET] http://localhost:8080/tickets/list
Authentication Routes:

Authenticate a user (returning a JWT token): [POST] http://localhost:8080/auth/authenticate
Protected Routes:

Protected resource route: [GET] http://localhost:8080/protected-resource
Now, let's double-check the 



Thank you for sharing the authentication middleware code. The "Unauthorized" response is being sent when there's an issue with either not receiving a token or a problem with token verification.

Since you mentioned that you've registered a user, let's focus on the registration and authentication process. Make sure the following steps are correctly implemented:

User Registration (users.router.js):

Confirm that your user registration endpoint is correctly creating a new user in the database.
Check that the password is being securely hashed before storing it in the database.
Ensure that the registration endpoint returns a valid JWT token upon successful registration.
User Authentication (auth.js):

Confirm that your authentication endpoint is correctly authenticating users based on their credentials.
Make sure the authentication endpoint returns a valid JWT token upon successful authentication.
Sending Token in the Request:

When you make a request to a secured endpoint, make sure you are including the JWT token in the request headers. It should be in the format: Authorization: Bearer YOUR_TOKEN.
Token Verification (authenticationMiddleware):

Ensure that the JWT_SECRET used for signing and verifying tokens is correctly set in your environment variables.
Here's an example of how you can register a user and obtain a token:

Register User:
POST http://localhost:8080/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}


Thank you for sharing the authentication middleware code. The "Unauthorized" response is being sent when there's an issue with either not receiving a token or a problem with token verification.

Since you mentioned that you've registered a user, let's focus on the registration and authentication process. Make sure the following steps are correctly implemented:

User Registration (users.router.js):

Confirm that your user registration endpoint is correctly creating a new user in the database.
Check that the password is being securely hashed before storing it in the database.
Ensure that the registration endpoint returns a valid JWT token upon successful registration.
User Authentication (auth.js):

Confirm that your authentication endpoint is correctly authenticating users based on their credentials.
Make sure the authentication endpoint returns a valid JWT token upon successful authentication.
Sending Token in the Request:

When you make a request to a secured endpoint, make sure you are including the JWT token in the request headers. It should be in the format: Authorization: Bearer YOUR_TOKEN.
Token Verification (authenticationMiddleware):

Ensure that the JWT_SECRET used for signing and verifying tokens is correctly set in your environment variables.
Here's an example of how you can register a user and obtain a token:

Register User:

http
Copy code
POST http://localhost:8080/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
If the registration is successful, the response should include a JWT token.

Authenticate User:
POST http://localhost:8080/auth/authenticate
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}

GET http://localhost:8080/secure-route
Authorization: Bearer YOUR_TOKEN

*/ 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const { jwtSecret } = require('../generate-secret');
const authenticationMiddleware = require('./middlewares/authentication');
const emailRouter = require('./services/email.router');
const smsRouter = require('./services/sms.router');
const connectDB = require('./db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUIExpress = require('swagger-ui-express');
const swaggerOptions = require('../src/swaggerOptions'); // Adjust the path accordingly
require('dotenv').config();

// Connect to the database
connectDB();

console.log(`JWT Secret: ${jwtSecret}`);
console.log(`Server is running on port ${process.env.PORT}`);
console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
console.log(`JWT Secret: ${process.env.JWT_SECRET}`);
console.log(`Twilio Account SID: ${process.env.TWILIO_ACCOUNT_SID}`);
console.log(`Twilio Auth Token: ${process.env.TWILIO_AUTH_TOKEN}`);

// Initialize the Express app
const app = express();

// Use your email router
app.use('/email', emailRouter);
app.use('/sms', smsRouter);

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

// Set up the database connection (Use the MONGODB_URI from .env)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure and use Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_fallback_session_secret_here',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 86400000,
      sameSite: 'strict',
    },
  })
);

// Use cookie parser
app.use(cookieParser());

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Include your routes (Update routes to match your project structure)
const cartRoutes = require('./routes/cart.router');
const productRoutes = require('./routes/products.router');
const userRoutes = require('./routes/users.router');
const authRoutes = require('./routes/auth');

app.use('/cart', authenticationMiddleware, cartRoutes)
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);



// Example route for the home page
app.get('/', (req, res) => {
  res.render('home'); // Render the 'home.ejs' view when accessing '/'
});

// Start the Express server (Use the PORT from .env)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
