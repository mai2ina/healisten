const sound = document.querySelector('.sound'); // 既定の audio 要素
const pulse = document.querySelector('.pulse-box'); // 脈動アニメーション用要素
const play = document.querySelector('.play'); // 再生ボタン
const stop = document.querySelector('.stop'); // 一時停止ボタン
const timeDisplay = document.querySelector('.timer-display'); // 再生時間表示

let time = 0;

/*
    音楽停止中 -> 音楽再生
    音楽再生中 -> 音楽一時停止
*/
const checkPlaying = sound => {
    if (sound.paused) {
        sound.play();
        play.style.display = 'none';
        stop.style.display = 'block';
        pulse.classList.toggle('active');
    } else {
        sound.pause();
        play.style.display = 'block';
        stop.style.display = 'none';
        pulse.classList.toggle('active');
    }
};

const updateTimeDisplay = () => {
    // 分・秒・ミリ秒を計算
    let minutes = Math.floor(time / 100 / 60);
    let seconds = Math.floor(time / 100);

    // 分が１桁の場合は、先頭に０をつける
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // 秒が６０秒以上の場合　例）89秒→29秒にする
    if (seconds >= 60) {
        seconds = seconds % 60;
    }

    // 秒が１桁の場合は、先頭に０をつける
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // タイマーラベルを更新
    timeDisplay.textContent = `${minutes}:${seconds}`;
}

const countUp = () => {
    if (isTimerExecuted) {
        setTimeout(() => {
            time++;

            // 表示時間更新
            updateTimeDisplay();

            // 再帰呼び出し
            countUp();
        }, 10);
    }
}

const startTimer = () => {
    isTimerExecuted = true;
    countUp();
}

const stopTimer = () => {
    isTimerExecuted = false;
}

document.addEventListener('DOMContentLoaded', () => {
    sound.load();
});

/* 最後まで再生した場合のイベントを定義 */
sound.addEventListener('ended', () => {
    sound.currentTime = 0; // 再生位置を初期化
    sound.play();
});

/* 再生・一時停止ボタンのクリックイベントを定義 */
play.addEventListener('click', () => {
    setTimeout(checkPlaying(sound), 3000);
    startTimer();
});

stop.addEventListener('click', () => {
    checkPlaying(sound);
    stopTimer();
});
