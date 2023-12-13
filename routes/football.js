var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/:dataType', async function(req, res, next) {
    const apiKey = '3cc394c3ffbe4a4ba35d57b11f266159';
    const dataType = req.params.dataType;

    const apiUrl = `https://api.football-data.org/v4/competitions/PL/${dataType}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Auth-Token': apiKey,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420'
            }
        });

        const responseDataArray = [response.data];

        res.send(responseDataArray);
    } catch (error) {
        console.error('Error during Axios request:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;