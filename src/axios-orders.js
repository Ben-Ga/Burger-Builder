import axios from 'axios';


const orderInstance = axios.create(
    {
        baseURL: 'https://udemy-41c81.firebaseio.com/'
    }
);

export default orderInstance