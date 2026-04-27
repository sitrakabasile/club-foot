const fetch = require('node-fetch');

async function test() {
  try {
    const res = await fetch('http://localhost:4000/api/auth/me');
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Data:', data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
