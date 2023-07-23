const Response = require("../classes/Response");
const db = require("../config/db.conf");
const Razorpay = require('razorpay');
const axios = require('axios');
// const razorpay = new Razorpay({
//   key_id: 'rzp_test_VXPeRqGwFHLUCq',
//   key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
// });

// To Create Category
const createCategory = async (req, res) => {
    try{
        let categories = await db.categories.create(req.body);
        res.status(201).send(Response.sendResponse(true,categories,null,201));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const createToken = async (req,res) =>{
    try{
        console.log("reeee",req.params)
        const client_id = 'b0d474a91bbc46ce92bc0c5036619cef';
        const client_secret = '7ecdf8b3fc584be181a9047afe06d188';
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: 'grant_type=client_credentials',
          };
        
          axios(authOptions)
            .then(function (response) {
              if (response.status === 200) {
                const token = response.data.access_token;
                // res.send('Access token: ' + token);
                res.status(201).send(Response.sendResponse(true,token,null,201));
              } else {
                return res.status(500).send(Response.sendResponse(false,null,err,500));
              }
            })
            .catch(function (error) {
                return res.status(500).send(Response.sendResponse(false,null,err,500));
            });
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const customerOrder = async (req,res) =>{
  try{
      let instance = new Razorpay({ key_id: 'rzp_test_VXPeRqGwFHLUCq', key_secret: '8j7lgbNu70a1Rl0fIAEsvmuq' })

      const {order_id, amount, payment_capture, currency} = req.body;

      // const amount = 2;

      let options = {
        amount: parseInt(amount) * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: order_id,
        payment_capture: payment_capture,
      };

      const order = await instance.orders.create(options);

      if(!order)
      return res.status(500).send(err.message);

      res.status(200).json({success:true,data: order});
  }catch(err){
    if (err.response && err.response.data && err.response.data.error) {
      const error = err.response.data.error;
      if (error.field === 'amount' && error.reason === 'input_validation_failed') {
        return res.status(400).send("Invalid amount. Please enter a valid integer amount.");
      }
    }
    console.log("errr222222222222", err);
    return res.status(500).send("Something went wrong. Please try again later.");
}
}

const cardDetails = async (req,res) =>{
  try{
    let instance = new Razorpay({ key_id: 'rzp_test_VXPeRqGwFHLUCq', key_secret: '8j7lgbNu70a1Rl0fIAEsvmuq' })
    const {id} = req.body;

    const order = await instance.orders.fetch(id);

    if(!order)
    return res.status(500).send(err.message);

    res.status(200).json({success:true,data: order});
  }catch(err){
    console.log("errr33333333333333333333",err)
    return res.status(500).send(err.message);
  }
}

const paymentVerify = async (req,res) =>{
  try{
    const options = {
      amount: req.body.amount,
      currency: 'INR',
      receipt: 'order_receipt',
      payment_capture: 1
    };
    razorpay.orders.create(options, (err, order) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
      } else {
        res.status(201).send(Response.sendResponse(true,order,null,201));
        // res.json(order);
      }
    });
  }catch(err){
    return res.status(500).send(Response.sendResponse(false,null,err,500));
  }
}

// const getSongSpotify = async (req,res) =>{
//     try{
//         const query = req.query.q;
//         const response = await axios.get(
//             `https://api.spotify.com/v1/search?q=${query}&type=track&include_external=audio`,
//             {
//               headers: {
//                 Authorization: 'Bearer BQAVj2mUnOlUvfoss-vCOL4hvLR8ZyjrP1RQlHz5FkWxc-wxHMmIAlbTljud9Yu99wA9k5v_BfhZuxtM53HOM9m8hRzme8oOjHkkr4ikKxUlbEgEa6A',
//               },
//             }
//           );
//         const songName = response.data.tracks.items
//         let arrayOfSong = [];
//         let arrayofImage = [];
//         for(let i = 0 ; i < songName.length  ;i++){
//             const songObj = {
//                 name : songName[i].name,
//                 songs_urls: songName[i].external_urls.spotify
//             }
           
//             arrayOfSong.push(songObj);
//             let imageName = songName[i].album.images

//              for(let j = 0;j < imageName.length ; j++){
//                 arrayofImage.push(imageName[j].url)
//              }
//         }

//         let responseFinal = {
//             songs: arrayOfSong,
//             images: arrayofImage
//           };
//         res.status(200).send(Response.sendResponse(true,responseFinal,null,200));
//     }catch(err){
//         console.log("err",err)
//         return res.status(500).send(Response.sendResponse(false,null,err,500));
//     }
// }

const shezamSongApi = async (req,res) =>{
  try{
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: req.query.term,
        locale: 'en-US',
        offset: '0',
        limit: '5'
      },
      headers: {
        'X-RapidAPI-Key': 'c9738b0567msh31326b9ca1473b3p10703djsnabbd88ec16ed',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);

      const arrayhits = response.data.tracks.hits;
      const songs = [];

      for(let i=0 ; i < songs.length ; i++){
        
      }
    } catch (error) {
      console.error(error);
    }

    res.status(200).send(Response.sendResponse(true,response,null,200));
  }catch(err){
    return res.status(500).send(Response.sendResponse(false,null,err,500));
  }
}

const getSongSpotify = async (req, res) => {
    try {
      const query = req.query.q;
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=track&include_external=audio`,
        {
          headers: {
            Authorization: 'Bearer BQAKLf4pTmPf1EM-OSTaxxevU4VbOYj0pUYQCqaTpqzLjxR4XQ3uMMrV8F_bGmJBbgW61DtprYcX8h117HEb4kBtnfQ4hoyQWwdU1QywlFuSSxvdcgA',
          },
        }
      );
      const songNames = response.data.tracks.items;
      const songs = [];
      const images = [];
  
      for (let i = 0; i < songNames.length; i++) {
        const songObj = {
          name: songNames[i].name,
          song_url: songNames[i].external_urls.spotify,
          image_url: songNames[i].album.images[0].url,
          artistsName :songNames[i].artists[0].name
        };
  
        songs.push(songObj);
      }
    
      const responseFinal = {
        songs,
      };
  
      res.status(200).send(Response.sendResponse(true, responseFinal, null, 200));
    } catch (err) {
      console.log("err", err);
      return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
};

// To Get all Category
const getAllCategory = async (req, res) => {
    try {
        let categories = await db.categories.findAll();
        res.status(200).send(Response.sendResponse(true,categories,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}
// To Get Category By its id
const getCategoryById = async (req, res) => {
    try {
        let categories = await db.categories.findOne({where: {id: req.params.id}});
        res.status(200).send(Response.sendResponse(true,categories,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

// To Update  Category By its id
const updateCategory = async (req, res) => {
    try{
        let categories = await db.categories.update(req.body, {where: {id : req.body.id}})
        res.status(200).send(Response.sendResponse(true,categories,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

// To delete  Category By its id
const deleteCategory= async (req, res) => {
    try{
        let categories = await db.categories.destroy({where: {id : req.params.id}})
        res.status(200).send(Response.sendResponse(true,categories,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const FCMNotification= async (req, res) => {

    const FCM = require('fcm-node')
    
    var serverKey = require('../notification.json') //put the generated private key path here    
    
    var fcm = new FCM(serverKey)

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'dEuREXK8QdGFuD6feNQK5I:APA91bFAI7LuJZ5Cp4_aJ4Ku1-E_b_HkTQZxJlxdkPZ6ygqY5Z6U5fqKO7Oa-z-T0m0DJ9EU-rpHiq0jJuZ71gGMUSKRzCRM1ogidDMoiXwpEOBlcWDoiZXN86djBupAOPzlvNs3NGto', 
        // collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    }
    
    fcm.send(message, function(err, response){
        if (err) {
          console.log("err",err)
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })
}


module.exports = { 
    createCategory, 
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    createToken,
    getSongSpotify,
    FCMNotification,
    customerOrder,
    paymentVerify,
    shezamSongApi,
    cardDetails
}


