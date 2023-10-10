import { generatePostmanCollection } from './postmanCollectionGenerator';
import axios from 'axios';

generatePostmanCollection().then(({ status, result }) => {
    if (!status) {
        console.log('Postman collection creation failed!');
        return process.exit();
    }

    console.log('Postman collection file created.');

    if (process.env.POSTMAN_API_KEY && process.env.POSTMAN_COLLECTION_ID && process.env.POSTMAN_COLLECTION_POSTMAN_ID) {
        console.log('Updating postman collection on the clouds...');
        axios
            .put(
                'https://api.getpostman.com/collections/' + process.env.POSTMAN_COLLECTION_ID,
                {
                    collection: result
                },
                {
                    headers: {
                        'X-Api-Key': process.env.POSTMAN_API_KEY
                    }
                }
            )
            .then((res) => {
                console.log(`statusCode: ${res.status}`);
                console.log('Mission Accomplished!');
                return process.exit();
            })
            .catch((error) => {
                console.error(error);
                console.error(error?.response?.data?.error);
                console.log('Update failed!');
                return process.exit();
            });
    } else {
        console.log("Prepare your postman colleciton's environment data, to auto update it on the clouds!");
        return process.exit();
    }
});
