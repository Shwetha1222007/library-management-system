
import axios from 'axios';

async function testWrongName() {
    try {
        const response = await axios.post('http://localhost:5000/api/login/student', {
            name: 'Wrong Name',
            rollNo: '24uam151'
        });
        console.log('Login Response:', response.data);
    } catch (error) {
        console.log('Login Failed as expected:', error.response ? error.response.data : error.message);
    }
}

testWrongName();
