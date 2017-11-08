<template>
    <div>
        <h1>Dobbi</h1>
        
        <button @click="sendMessage">Speak</button>
        <br>
        <textarea v-model="question"></textarea>
        <hr>
        <p>{{response}}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            question: '',
            response: ''
        }
    },

    mounted() {
        this.listen();
    },

    methods: {
        listen() {
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            if (!SpeechRecognition) {
                throw new Error('Speech Recognition does not exist on this browser. Use Chrome or Firefox')
                return
            }

            console.log('Began listening');

            const recognition = new SpeechRecognition()
            recognition.lang = 'en-US';
            recognition.interimResults = true
            recognition.addEventListener('result', event => {
                const text = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
                this.question = text
            });

            recognition.addEventListener('end', () => {
                console.log(this.question)
                this.sendMessage();
                this.runtimeTranscription = ''
                recognition.start()
            })
            recognition.start()
        },

        sendMessage() {
            axios.post('http://localhost:3000/api/message',{
                text: this.question
            })
            .then((response) => {
                console.log(response);
                this.response = response.data["botReply"];
                this.speak();
            })
            .catch((err)=>{
                console.log(err);
            });

        },

        speak() {
            const msg = new SpeechSynthesisUtterance(this.response);
            const voices = speechSynthesis.getVoices();
            msg.voice = voices[1];
            window.speechSynthesis.speak(msg);
        },

        voiceschanged() {
            speak();
        }
    }
}

</script>