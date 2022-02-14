const https = require("https");
const express = require("express");
const fs = require("fs");
const app = express();
const httpsOptions = {
  cert: fs.readFileSync(__dirname + "/cloudfare.pem"),
};

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
const PORT = process.env.PORT || 4200;
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log("the server is running on port:" + PORT);
});
