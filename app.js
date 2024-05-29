// Function to enter the queue
async function enterQueue() {
    const userId = document.getElementById('userId').value;
    if (!userId) {
        alert('Please enter a User ID');
        return;
    }

    const response = await fetch('/enter_queue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
    });
    const data = await response.json();
    document.getElementById('status').innerText = `Your token: ${data.token}`;

    // Start polling for token validation
    setInterval(async () => {
        const response = await fetch(`/check_status?user_id=${userId}`);
        const data = await response.json();
        if (data.valid) {
            document.getElementById('status').innerText = "It's your turn!";
        }
    }, 5000);
}
