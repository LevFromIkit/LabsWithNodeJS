const http = require("http");
const fs = require("fs");
const querystring = require("querystring");


function authoriz(request, response)
{
	let body = '';
	request.on('data', function (data) {
		body += data;
	});
	request.on('end', function () {
		let post = qs.parse(body);
			verify(post['name'], post['password'], response);
	});
}


http.createServer(function(request, response){
    console.log(`Запрошенный адрес: ${request.url}`);

    if (request.url == "/") {
        request.url = "/index.html";
    }

    const filePath = request.url.substr(1);
    fs.readFile(filePath, function(error, data){
        switch (request.url) {
            case "/user":
                var body = "";
                
                request.on("data", function(chunk) {
                    body += chunk;
                });

                request.on("end", function() {
                    const userData = querystring.parse(body);
                    
                    let userName = "";
                    let password = "";

                    for (let paramName in userData) {
                        const paramValue = userData[paramName];
                        if (paramName == "name") userName = paramValue;
                        if (paramName == "password") password = paramValue;
                    }

                    fs.readFile("users.json", function(err, file){
                        let data = JSON.parse(file);
                        auth = false;
                        for (let i = 0; i < data.users.length; i++) 
                        {
                            if (data.users[i].name === userName && data.users[i].password === password)
                            {
                                console.log("Вход выполнен");
                                auth = true;
                                response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                                fs.createReadStream(__dirname + '/user_info.html').pipe(response);
                            }
                        }
                        
                        if (auth == false){

                            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            console.log("Пользователь не найден!");
                            fs.createReadStream(__dirname + '/registrate.html').pipe(response);
                        }
                    });
                    
                });
            break;

            case "/registr":
                var body = "";
                request.on("data", function(chunk) {
                    body += chunk.toString();
                });

                request.on("end", function() {
                    const userData = querystring.parse(body);

                    fs.readFile("users.json", function(error, jsonData) {
                        if (error) {
                            response.statusCode = 500;
                            response.end("Internal server error!");
                        } else {
                            const users = JSON.parse(jsonData);
                            users.push(userData);

                            fs.writeFile("users.json", JSON.stringify(users), function(error) {
                                if (error) {
                                    response.statusCode = 500;
                                    response.end("Internal server error!");
                                } else {
                                    response.end("User added successfully!");
                                }
                            });
                        }
                    });
                });
            break;

            case error:
                response.statusCode = 404;
                response.end("ERROR 404. Resource not found!");
            break;

            default:
                response.end(data);
        }
  
    });
}).listen(3000, function(){
    console.log("Server started at 3000");
});
