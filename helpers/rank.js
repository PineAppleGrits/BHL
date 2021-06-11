var unirest = require("unirest");

const rank = {};

rank.getPlayer = async (player) => {
 try {
    var req = unirest("GET", "https://brawlhalla.p.rapidapi.com/apiplayer.php");

    req.query({
        "type": "1v1",
        "p": "PineAppleGrits"
    });
    
    req.headers({
        "x-rapidapi-key": process.env.KEY,
        "x-rapidapi-host": "brawlhalla.p.rapidapi.com",
        "useQueryString": true
    });
    
    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
    
        return res.body;
    });
 } 
 catch (e) {
    console.error(e)
 }


}

module.exports = rank;