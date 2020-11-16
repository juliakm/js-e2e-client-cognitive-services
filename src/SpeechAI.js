import * as Speech from "microsoft-cognitiveservices-speech-sdk";

// Authentication requirements
const key = process.env.REACT_APP_SpeechKey;
const endpoint = process.env.REACT_APP_SpeechEndPoint;

export const isConfigured = () => {
    
    const result = (key && endpoint && (key.length > 0) && (endpoint.length > 0)) ? true : false;
    console.log(`key = ${key}`)
    console.log(`endpoint = ${endpoint}`)
    console.log(`Speech isConfigured = ${result}`)
    return result;
}

export const synthesizeSpeech = async (text, fileName) => {
    
    try {
        const speechConfig = Speech.SpeechConfig.fromEndpoint(endpoint, key);
        const audioConfig = Speech.AudioConfig.fromAudioFileOutput(fileName /*"path-to-file.wav"*/);

        const synthesizer = new Speech.SpeechSynthesizer(speechConfig, audioConfig);
        const result = await synthesizer.speakTextAsync(text);
        synthesizer.close();
        return result;
    } catch (ex) {
        console.log(ex.message);
    }
}