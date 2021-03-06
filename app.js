class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.selects = document.querySelectorAll('select');
        this.playBtn = document.querySelector('.play');
        this.bpm = 150;
        this.index = 0;
        this.tempoSlider = document.querySelector('.tempo-slider');
        this.muteBtns = document.querySelectorAll('.mute');
        this.isPlaying = null;
    }
    start() {
        const interval = (60 / this.bpm) * 1000
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat()
            }, interval)
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        activeBars.forEach(bar => {
            bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
            if(bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    console.log(bar)
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
    }
    activePad() {
        this.classList.toggle('active');
    }
    updateBtn() {
        if(!this.isPlaying) {
            this.playBtn.classList.add('active');
            this.playBtn.innerText = 'Stop';
        } else {
            this.playBtn.classList.remove('active');
            this.playBtn.innerText = 'Play';
        }
    }
    soundSelect(e) {
        const selectName = e.target.name;
        const selectValue = e.target.value;
        switch(selectName) {
            case 'kick-select':
                this.kickAudio.src = selectValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectValue;
                break;
        }

    }

    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;

    }

    updateTempo(e) {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if(this.playBtn.classList.contains('active')) {
            this.start();
        }
    }

    mute(e) {
        const muteIndex = e.target.getAttribute('data-track');
        console.log(muteIndex);
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')) {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
}

const drumKit = new DrumKit();

drumKit.playBtn.addEventListener('click', () => {
        drumKit.updateBtn();
        drumKit.start();
    })

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = ''
    });
})

drumKit.selects.forEach(select => {
    select.addEventListener('change', (e) => drumKit.soundSelect(e));
})

drumKit.tempoSlider.addEventListener('input', (e) => drumKit.changeTempo(e));
drumKit.tempoSlider.addEventListener('change', (e) => drumKit.updateTempo(e));

drumKit.muteBtns.forEach(muteBtn => {
    muteBtn.addEventListener('click', (e) => drumKit.mute(e));
})
