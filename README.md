## Lessons
1. Introduction to the course  
2. Install development tools  
3. Create Angular App  
   1. Create project's folder  
   2. Install @angular/cli  
   3. Create App as frontend  
4. Add Header  
   1. Generate Component  
   2. Add Html  
   3. Add Css
5. List Foods  
   1. Create Food model  
   2. Create data.ts  
      1. Add sample foods  
   3. Add images to assets  
   4. Create Food service  
   5. Create Home component  
      1. Add ts  
      2. Add html  
      3. Add css
6. Search  
   1. Add method to Food service  
   2. Add search route  
   3. Show search result in Home component  
   4. Generate search component  
      1. Add to home component  
      2. Add ts  
      3. Add html  
      4. Add css
7. Tags Bar  
   1. Create Tag model  
   2. Add sample tags to data.ts  
   3. Food service  
      1. Add get all tags method  
      2. Add get all foods by tag method  
   4. Add tags route  
   5. Show tag result in Home component  
   6. Generate Tags component  
      1. Add to home component  
      2. Add ts  
      3. Add html  
      4. Add css
8. Food Page  
   1. Add method to food service  
   2. Generate Food Page component  
      1. Add Route  
      2. Add ts  
      3. Add html  
      4. Add css
9. Cart Page  
   1. Create CartItem Model  
   2. Create Cart Model  
   3. Generate Cart service  
   4. Add to Cart Button in Food Page  
   5. Generate Cart page component  
      1. Add Route  
      2. Add ts  
      3. Add html  
      4. Add css
10. Connect To Backend  
   1. Create backend folder  
   2. npm init  
   3. npm install typescript  
   4. Create tsconfig.json  
   5. Create .gitignore  
   6. Copy data.ts to backend/src  
   7. npm install express cors  
   8. Create server.ts  
      1. install @types  
      2. Add Apis  
   9. npm install nodemon ts-node --save-dev  
  10. Add urls.ts to frontend  
  11. Add HttpClient module  
  12. Update food service
11. Login Page  
   1. Generate Component  
      1. Add to routes  
      2. Add ts  
      3. Add html  
         1. Import Reactive Forms Module  
      4. Add Css  
   2. Add Login API  
      1. Use json  
      2. Add jsonwebtoken  
      3. Test Using Postman  
   3. Generate User Service  
      1. Generate User model  
      2. Add User Subject  
      3. Add Login Method  
         1. Add User Urls  
         2. Generate IUserLogin interface  
         3. Add ngx-toastr  
            1. Import Module  
            2. Import BrowserAnimationsModule  
            3. Add styles in angular.json  
         4. Add to Header  
      1. Add Local Storage methods  
      2. Add Logout Method  
         1. Add to Header  
12. Connect Login API To MongoDB Atlas  
    1. Moving Apis into routers  
    2. Create MongoDB Atlas  
    3. Create .env file  
    4. Install  
        1. mongoose  
        2. dotenv  
        3. bcryptjs  
        4. jsonwebtoken  
        5. express-async-handler  
    5. Connect to MongoDB Atlas  
    6. Use MongoDB instead of data.ts in apis  
13. Register User
    1. Add Register API
    2. Add Register Service method
    3. Add Register link
    4. Add Register component
14. Loading!
    1. Add Image
    2. Add Component
    3. Add Service
    4. Add interceptor
15. Checkout Page
    1. Create Order Model
    2. Create Checkout Page Component
    3. Add User to User Service
    4. Add Cart to Cart Service
    5. Create order items list component
17. Checkout Page
    1. Create Order Model
    2. Create Checkout Page Component 
      1. Add To Router
    3. Add User to User Service
    4. Add Cart to Cart Service
    5. Create Order Items List Component
    6. Adding Map To The Checkout Page
      1. Add Leaflet npm package
         1. Add @types/leaflet 
         2. Add Css to angular.json
      2. Add AddressLatLng to Order Model 
      3. Create Map component
         1. Add to checkout page
         2. Add TS
            1. Change app-map selector to map
         3. Add Html
         4. Add CSS
      4. Add Auth Guard
18. Save Order
   1. Add Order Model
   2. Add Order Status enum
   3. Add Auth Middleware
   4. Add Order Router
     1. Add Create API
   5. Add Order URL's to Url.ts
   6. Add Order Service
     1. Add Create Method
   7. Add Auth Interceptor
19. Payment Page
   1. Generate Component
   2. Add 'getOrderForCurrentUser' api 
   3. Add Order Service Method
   4. Connect Component to service
   5. Make the map component readonly
20. Adding Paypal
   1. Generate Component
     1. Add to payment page
   2. Get paypal client id
   3. Add Paypal JS to index.html
   4. Set up paypal button
   5. Add Pay Api to order router
   6. Get Paypal sandbox account
21. Order track Page
   1. Generate Component
     1. Add to routes
   2. Add API
     1. Add to urls.ts
   3. Add Method to order service
   4. Add HTML
   5. ADD CSS    

