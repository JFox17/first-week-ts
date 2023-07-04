"use strict";
let playlist = {
    'summer': {
        time: 0,
        volume: 0
    },
    'winter': {
        time: 0,
        volume: 0
    },
    'rain': {
        time: 0,
        volume: 0
    },
};
let season = Object.keys(playlist);
document.addEventListener("click", function (e) {
    if (e.target.id) {
        if (season.includes(e.target.id)) {
            stopAudio(e.target.id);
        }
    }
});
function stopAudio(id) {
    season.forEach(val => {
        let audio = document.getElementById("audio-" + val);
        let img = document.getElementById(val);
        if (id == val) {
            if (audio.paused) {
                audio.currentTime += playlist[val].time;
                volumeAudio(val);
                audio.play();
                img.src = './assets/icons/pause.svg';
                document.body.style.backgroundImage = "url('./assets/" + val + "-bg.jpg')";
            }
            else {
                audio.pause();
                img.src = './assets/icons/' + val + '.svg';
            }
        }
        else {
            audio.pause();
            img.src = './assets/icons/' + val + '.svg';
        }
        playlist[val].time = Math.round(audio.currentTime);
        if (audio.currentTime >= audio.duration) {
            playlist[val].time = 0;
        }
    });
}
function volumeAudio(id) {
    let elem = document.getElementById("range-" + id);
    playlist[id].volume = Number(elem.value);
    let audio = document.getElementById("audio-" + id);
    audio.volume = Number(elem.value) / 100;
}
