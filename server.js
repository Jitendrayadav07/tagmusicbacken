const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const formData = require("express-form-data");
const os = require("os");
const cors = require('cors');
var client_id = 'eaa44c655d9a4a15bfcbdc2cac2fe045';
const querystring = require('querystring');
//Cors Handle
app.use(cors({
    credentials:true, 
    origin:'http://localhost:3000'
}));

app.use(express.urlencoded({ extended: true }));
// to accept json body
app.use(express.json({
    limit: "50mb",
}))

app.use(express.static('public')); // for serving the HTML file
// app.use(express.urlencoded())

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
// to accept form data
// app.use(upload.array());    
app.use(express.static('public'));

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };


  // parse data with connect-multiparty. 
app.use(formData.parse(options));
// // delete from the request all empty files (size == 0)
app.use(formData.format());
// // change the file objects to fs.ReadStream 
// app.use(formData.stream());
// // // union the body and the files
app.use(formData.union());
app.use('/uploads', express.static('uploads'));

// function generateRandomString(length) {
//     let result = '';
//     const characters =
//       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
  
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
  
//     return result;
//   }

// app.get('/login', function(req, res) {

//     var state = generateRandomString(16);
//     var scope = 'user-read-private user-read-email';
  
//     res.redirect('https://accounts.spotify.com/authorize?' +
//       querystring.stringify({
//         response_type: 'code',
//         client_id: client_id,
//         scope: scope,
//         redirect_uri: redirect_uri,
//         state: state
//       }));
//       res.send
// });

app.get('/test',(req,res) => {
    res.json("test ok")
});


const sequelizeDB = require("./config/db.conf");
sequelizeDB.sequelize.sync(sequelizeDB);


// ROUTES
const roles = require("./routers/role");
const organization = require("./routers/organization");
const customer = require("./routers/customer");
const categories = require("./routers/category");
const organization_pancard = require("./routers/organization_pancard_details")
const organization_bank_details = require("./routers/organization_bank_details")
const city = require("./routers/city");
const users = require("./routers/organization_user");
const enquiry = require("./routers/enquiry");
const outlet_panel = require("./routers/outlet_panel");


app.use('/v1/role',roles);
app.use('/v1/organization',organization);
app.use('/v1/customer',customer);
app.use('/v1/category',categories);
app.use('/v1/organization_pancard',organization_pancard);
app.use('/v1/organization_bank',organization_bank_details);
app.use('/v1/city',city);
app.use('/v1/user',users);
app.use('/v1/enquiry',enquiry);
app.use('/v1/outlet_panel',outlet_panel);


const PORT = 8000;

app.listen(PORT,  () => {
    console.log(`Started success on PORT http://localhost:${PORT}`)
})