const endpoint  = 'https://brazilsouth.tts.speech.microsoft.com/cognitiveservices/v1';

function textToSpeech() {
    const textoParaFala = document.getElementById('textoParaFala').value;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': 'API_KEY',
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
