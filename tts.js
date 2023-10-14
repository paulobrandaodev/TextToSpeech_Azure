const apiToken  = 'eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleTEiLCJ0eXAiOiJKV1QifQ.eyJyZWdpb24iOiJicmF6aWxzb3V0aCIsInN1YnNjcmlwdGlvbi1pZCI6IjAxOGZiNWQyZWUwMjQ1ODc4ZDhjMDYwNmEzYTdhNmVjIiwicHJvZHVjdC1pZCI6IlNwZWVjaFNlcnZpY2VzLkYwIiwiY29nbml0aXZlLXNlcnZpY2VzLWVuZHBvaW50IjoiaHR0cHM6Ly9hcGkuY29nbml0aXZlLm1pY3Jvc29mdC5jb20vaW50ZXJuYWwvdjEuMC8iLCJhenVyZS1yZXNvdXJjZS1pZCI6Ii9zdWJzY3JpcHRpb25zLzI0ZTA5NDVlLTk2NmQtNDgwMy04YWNmLTBlMjZmOWFmMWUwMi9yZXNvdXJjZUdyb3Vwcy9DaGF0R1BUL3Byb3ZpZGVycy9NaWNyb3NvZnQuQ29nbml0aXZlU2VydmljZXMvYWNjb3VudHMvamFydmlzZW5haSIsInNjb3BlIjoic3BlZWNoc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoc2VydmljZXMuYnJhemlsc291dGgiLCJleHAiOjE2OTczMjM4MjEsImlzcyI6InVybjptcy5jb2duaXRpdmVzZXJ2aWNlcyJ9.JDuMJVHPNEObD-aHO-IHjIzKkI49WcPZyL3MbhNMH74sBy0BFaz82693FazOAR-PVNDgGRVQwIBp4CEYpx3TSw'; // Substitua pela sua chave de API
const endpoint  = 'https://brazilsouth.tts.speech.microsoft.com/cognitiveservices/v1';

function textToSpeech() {
    const textoParaFala = document.getElementById('textoParaFala').value;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Ocp-Apim-Subscription-Key': '2e8eef00d83c4dbf83b3070aab58e047',
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
            'User-Agent': 'curl',
        },
        body: `<speak version='1.0' xml:lang='pt-BR'>
                <voice xml:lang='pt-BR' xml:gender='Female' name='pt-BR-AntonioNeural'>
                 ${textoParaFala}
                </voice>
            </speak>`,
    };

    fetch(endpoint, requestOptions)
        .then(response => {
            if (response.ok) {
                return response.arrayBuffer();
            } else {
                throw new Error(`Falha na requisição: ${response.status} - ${response.statusText}`);
            }
        })
        .then(data => {
            const blob = new Blob([data], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(blob);

            const audioElement = new Audio(audioUrl);
            audioElement.play();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}