const express = require('express')
const app = express()

var users = [
    {
        name: "John",
        kidneys: [{
            healthy: false
        }]
    }  
]

app.use(express.json())

app.get('/', function(req, res) {
    const johnkidney = users[0].kidneys
    const numberofKidneys = johnkidney.length;  
    let noOfHealthyKidneys = 0;
    for(let i=0; i<numberofKidneys; i++){
        if(johnkidney[i].healthy == true){
            noOfHealthyKidneys++;
        }
    }
    let noOfUnhealthykidneys = numberofKidneys - noOfHealthyKidneys;

    res.send({
        numberofKidneys,
        noOfHealthyKidneys,
        noOfUnhealthykidneys
    })
})

app.post('/', function(req, res){
    const isHealthy = req.body.isHealthy
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done"
    })
})

// Converts all the unhealthy kidneys to Healthy kidneys

app.put("/", function(req, res){
    for(let i=0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true
    }
    res.json({});
})

// Remove all the unhealthy kidneys 
// return only healthy kidneys

app.delete("/", function(req, res){
    if(isThereAtleastOneUnHealthyKidney()){
        const newKidneys = []
        for(let i=0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys
        res.json({msg: "Done"})
    } else{
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
     
})

function isThereAtleastOneUnHealthyKidney(){
    let atLeastOneUnhealthyKidney = false;
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atLeastOneUnhealthyKidney = true
            break
        }
    }
    return atLeastOneUnhealthyKidney
}
app.listen(3000)