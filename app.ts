type ValuePlayList = {
    [id:string]: {
        time: number;
        volume: number;
    };
};
let playlist: ValuePlayList = {
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
let season: string[] = Object.keys(playlist)

document.addEventListener("click", function(e: MouseEvent) {
    if((e.target as HTMLElement).id) {
        if (season.includes((e.target as HTMLElement).id)) {
            stopAudio((e.target as HTMLElement).id)
        }
    }
})

function stopAudio(id: string) {
    season.forEach(val => {
        let audio = <HTMLAudioElement>document.getElementById("audio-"+ val)
        let img = <HTMLImageElement>document.getElementById(val)
        
        if (id == val) {
            if(audio.paused) {
                audio.currentTime += playlist[val].time
                volumeAudio(val)
                audio.play()
                img.src = './assets/icons/pause.svg'
                document.body.style.backgroundImage = "url('./assets/" + val + "-bg.jpg')";
            } else {
                audio.pause()
                img.src = './assets/icons/' + val + '.svg'
            }
        } else {
            audio.pause()
            img.src = './assets/icons/' + val + '.svg'
        }
        playlist[val].time = Math.round(audio.currentTime)
        if(audio.currentTime >= audio.duration ) {
            playlist[val].time = 0
        }
    })
}

function volumeAudio(id: string) {
    let elem = <HTMLInputElement>document.getElementById("range-" + id) 
    playlist[id].volume = Number(elem.value)

    let audio = <HTMLAudioElement>document.getElementById("audio-" + id)
    audio.volume = Number(elem.value) / 100
}

