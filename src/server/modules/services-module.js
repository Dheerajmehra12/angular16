module.exports=function (express, app) {
    const path = require('path');
    const fs = require('fs');
    const appConstants = require('../app-constants');
    const needle = require('needle');
    require('dotenv').config({path: appConstants.ENVIRONMENT_DIR + '/' + (process.env.ENV || '') + '.env'}).parsed;
 

    function loginApi(req, res) {
            // Read the JSON file containing user data
            const userData = [
                {
                  "name": "user1",
                  "email": "user1",
                  "password": "password1"
                },
                { 
                  "name": "user2",
                  "email": "user2",
                  "password": "password2"
                }
            ];  
            // Get the username and password from the request body
            const { email, password } = req.body;  
            // Find the user in the JSON data
            console.log("req.body",email,password)
            const user = userData.find(u => u.email === email && u.password === password);
            // If user is found, return success response
            if (user) {
              res.status(200).json({message: 'Login successful!', data:{name:user.name,token:user.name+'token'}});
            } else {
              res.status(401).json({ message: 'Invalid username or password',data:null });
            }
    }
    return {
        loginApi:loginApi      
    };
};
