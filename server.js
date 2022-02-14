const https = require("https");
const http = require("http");
const express = require("express");
const fs = require("fs");
const options = {
  key: fs.readFileSync(__dirname + "/cloudfare.key"),
  cert: fs.readFileSync(__dirname + "/cloudfare.crt"),
};
const app = express();

//app.use(requireHTTPS);
// function requireHTTPS(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && req.get("x-forwarded-proto") !== "https") {
//     return res.redirect("https://" + req.get("host") + req.url);
//   }
//   next();
// }

app.use(express.static(__dirname + "/dist/frontend"));
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: __dirname + "/dist/frontend/" });
});

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(options, app);
//options var are not recognized
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log("the server is running on port:" + PORT);
});
// httpServer.listen(4200, () => {
//   console.log("the server is running on port:" + 4200);
// });
