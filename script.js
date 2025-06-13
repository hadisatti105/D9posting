const form = document.getElementById('leadForm');
const responseMessage = document.getElementById('responseMessage');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(form);

    // Add static values required by API
    formData.append('lead_token', 'cbfba5193d134406a92b13edc2634959');
    formData.append('traffic_source_id', '1016');

    const data = new URLSearchParams();
    for (const pair of formData) {
        data.append(pair[0], pair[1]);
    }

    try {
        const response = await fetch('https://skymarketinggroup.trackdrive.com/api/v1/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });

        if (response.ok) {
            const result = await response.json();
            responseMessage.style.color = 'green';
            responseMessage.textContent = 'Lead submitted successfully! Lead ID: ' + result.lead.id;
        } else {
            const errorText = await response.text();
            responseMessage.style.color = 'red';
            responseMessage.textContent = 'Error submitting lead: ' + errorText;
        }
    } catch (error) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Network error: ' + error.message;
    }
});
