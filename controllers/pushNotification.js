const FCM = require('fcm-node')
    
    var serverKey = require('/notification.json') //put the generated private key path here    
    
    var fcm = new FCM(serverKey)

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'dEuREXK8QdGFuD6feNQK5I:APA91bFAI7LuJZ5Cp4_aJ4Ku1-E_b_HkTQZxJlxdkPZ6ygqY5Z6U5fqKO7Oa-z-T0m0DJ9EU-rpHiq0jJuZ71gGMUSKRzCRM1ogidDMoiXwpEOBlcWDoiZXN86djBupAOPzlvNs3NGto', 
        collapse_key: 'your_collapse_key',
        
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
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })