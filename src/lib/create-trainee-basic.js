const axios = require('axios');
const fetchToken = require('./helper-functions');
const traineeJson = require('../example-json/CreateTraineeBasic.json');

module.exports = async function createTraineeBasic() {
    //fetch oidc token 
    const token = await fetchToken();

    //post json to odata api trainee endpoint
    const res = await axios.post(`${process.env.maytasSampleBaseUrl}/odata/trainee`, traineeJson, { 
        //we want to continue even if we get an error response
        validateStatus: function (status) { return true; },
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (res.status == 201) {
        console.log(`Success : Created trainee.  Returned TraineeId = ${res.data.TRAINEEID}`);
    }
    else {
        console.log(`Error : Create returned code ${res.status}`);
        if (res.data)
            console.log(JSON.stringify(res.data, null, 2));
    }
}
