let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'https://ecsmedia.pl/c/unholy-b-iext120538010.jpg',
        name : 'UNHOLY',
        artist : 'Sam Smith',
        music : '/Users/venakteshdarbasthu/Downloads/Unholy-\(Slowed-and-Reverb\)_320\(PagalWorldl\).mp3 '
    },
    {
        img : 'https://i1.sndcdn.com/artworks-000173935001-g1x896-t500x500.jpg',
        name : 'CLOSER',
        artist : 'One direction',
        music : '/Users/venakteshdarbasthu/Downloads/Closer\ -\ The\ Chainsmokers-\(DJMaza\)\ \(1\).mp3'
    },
    {
        img : 'https://images.hindustantimes.com/tech/img/2022/10/23/960x540/ebf245f4-3bf8-11ed-8cba-ba7ad76ffd07_1666513827508_1666513827508_1666513852203_1666513852203.jpg',
        name : 'KESARIYA',
        artist : 'Arijith singh',
        music : '/Users/venakteshdarbasthu/Downloads/Kesariya\(PagalWorld.com.se\).mp3 '
    },
    {
        img : 'https://www.bollywoodhungama.com/wp-content/uploads/2022/02/Shantanu-Maheshwari-on-Gangubai-Kathiawadi.jpg',
        name : 'MERI JAAN',
        artist : 'Neeti mohan',
        music : '/Users/venakteshdarbasthu/Downloads/Meri\ Jaan\ -\ Gangubai\ Kathiawadi\ 128\ Kbps.mp3 '
    },
    {
        img : 'https://cdn.mos.cms.futurecdn.net/N6L3vkePwHn7WLEhikEAQd.jpg',
        name : 'IN BETWEEN',
        artist : 'scotty mccreery',
        music : '/Users/venakteshdarbasthu/Downloads/Ayra-Starr-In-Between-\(TrendyBeatz.com\).mp3 '
    },
    
    {
        img : 'https://gumlet.assettype.com/freepressjournal/2022-02/69ddd1ea-157e-455c-9ed8-54ec67387e64/Screenshot_2022_02_13_at_6_13_55_AM.png?format=webp&w=480&dpr=2.6',
        name : 'DOOBEY',
        artist : 'Lothika',
        music : '/Users/venakteshdarbasthu/Downloads/Doobey\ Gehraiyaan\ 128\ Kbps.mp3 '
    },
    {
        img : 'https://upload.wikimedia.org/wikipedia/en/f/f9/Let-her-go-by-passenger.jpg',
        name : 'LET HER GO',
        artist : 'Passenger',
        music : '/Users/venakteshdarbasthu/Downloads/Passenger_-_Let_Her_Go_\(Naijay.com\).mp3'
    },
    {
        img : 'https://wallpaperaccess.com/full/7988314.jpg',
        name : 'DARSHANA',
        artist : 'darshana rajendran',
        music : ' /Users/venakteshdarbasthu/Downloads/Darshana\ Hridayam\ 128\ Kbps.mp3'
    },
    ];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function likeTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
