const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const fetchToken = require('./lib/helper-functions');
const traineeJson = require('./example-json/CreateTraineeTShip.json');

(async () => {
    try {
        dotenv.config({ path: path.resolve(__dirname, './env/', 'dev.env') });
        await createTraineeBasic();
    }
    catch (e) {
        console.log(`Failed to execute:  ${e.message}\n${e.stack}`);    
    }
})();


async function createTraineeBasic() {
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
