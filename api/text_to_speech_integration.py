from google.cloud import texttospeech
import os

# Set the path to your Google Cloud service account key
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "mythicnavigator-google-key.json"

# Initialize Google Text-to-Speech client
client = texttospeech.TextToSpeechClient()

async def generate_audio(text: str):
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    # Configure the Text-to-Speech request
    tts_request = texttospeech.SynthesizeSpeechRequest(
        input=texttospeech.SynthesisInput(text=text),
        voice=texttospeech.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Journey-D"
        ),
        audio_config=texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3),
    )

    try:
        # Generate speech
        response = client.synthesize_speech(tts_request)
        audio_content = response.audio_content
        return {"audioContent": audio_content.decode("latin1")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))