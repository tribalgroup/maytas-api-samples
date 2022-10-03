const dotenv = require('dotenv');
const path = require('path');
const createTraineeBasic = require('./lib/create-trainee-basic');

(async () => {
    try {
        dotenv.config({ path: path.resolve(__dirname, './env/', 'dev.env') });
        await createTraineeBasic();
    }
    catch (e) {
        console.log(`Failed to execute:  ${e.message}\n${e.stack}`);    
    }
})();


