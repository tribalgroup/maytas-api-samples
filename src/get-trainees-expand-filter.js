const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const fetchToken = require('./lib/helper-functions');

(async () => {
    try {
        dotenv.config({ path: path.resolve(__dirname, './env/', 'dev.env') });
        await getTrainees();
    }
    catch (e) {
        console.log(`Failed to execute:  ${e.message}\n${e.stack}`);    
    }
})();


async function getTrainees() {
    //fetch oidc token 
    const token = await fetchToken();

    //expand into TraineePot and select the StartDate and scheme id properties.   
    //then expand TraineePot into TraineeDetails and select NVQRef
    const expandClause = '$expand=Pots($expand=Details($select=NVQREF);$select=STARTDATE,SCHEMEID)';
    //filter for gender = M
    const filterClause = "$filter=GENDER eq 'M'";
    //select firstname, lastname and gender
    const selectClause = '$select=FIRSTNAME,LASTNAME,GENDER';
    //take the next 10 rows, skipping 20 rows
    const pageClause = '$top=10&$skip=20';

    const requestUrl = `${process.env.maytasSampleBaseUrl}/odata/trainee?${expandClause}&${filterClause}&${selectClause}&${pageClause}`;

    console.log(`Executing GET request to ${requestUrl}`);

    const res = await axios.get(requestUrl, { 
        //we want to continue even if we get an error response
        validateStatus: function (status) { return true; },
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (res.status == 200) {
        const results = res.data.value;
        results.forEach(trainee => {
            console.log(`Trainee - ${trainee.FIRSTNAME} ${trainee.LASTNAME} - gender ${trainee.GENDER}`);
            trainee.POTS.forEach(pot => {
                console.log(`   Pot - Start date - ${pot.STARTDATE} - SchemeId ${pot.SCHEMEID}`);                
            });
        });
        
    }
    else {
        console.log(`Error : Get returned code ${res.status}`);
        if (res.data)
            console.log(JSON.stringify(res.data, null, 2));
    }
}



