const axios = require('axios');
const qs = require('qs');

module.exports = async function fetchToken() {
    const body = qs.stringify({ 
        'grant_type' : 'client_credentials', 
        'scope': 'Maytas.Odata.Read Maytas.Odata.Write',
        'client_id': process.env.maytasSampleClientId,
        'client_secret': process.env.maytasSampleClientSecret
    });
    const res = await axios.post(`${process.env.idsUrl}/connect/token`, body, { 
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    console.log(`Fetched token from ${process.env.idsUrl}`)
    return res.data.access_token;
}