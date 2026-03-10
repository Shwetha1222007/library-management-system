
import axios from 'axios';

async function testRegisterAndLogin() {
    try {
        const rollNo = 'TEST' + Date.now();
        console.log('Registering user with RollNo:', rollNo);

        const regResponse = await axios.post('http://localhost:5000/api/register', {
            name: 'Test User',
            rollNo: rollNo,
            department: 'Computer Science',
            year: '1st Year'
        });
        console.log('Registration Response:', regResponse.data);

        const loginResponse = await axios.post('http://localhost:5000/api/login/student', {
            name: 'Test User',
            rollNo: rollNo
        });
        console.log('Login Response:', loginResponse.data);
    } catch (error) {
        console.error('Action Failed:', error.response ? error.response.data : error.message);
    }
}

testRegisterAndLogin();
