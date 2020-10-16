function berlinClock(time, elementId, timeZone) {
    const timeArray = [];
    const [hours, minutes, seconds] = time.split(':').map(x => parseInt(x, 10));
    const Color = {
        Off: "O",
        Red: "R",
        Yellow: "Y",
        Green: "G"
    };

    const secondsRow = seconds % 2 === 0 ? Color.Yellow : Color.Off;
    timeArray.push(secondsRow);

    const buildRow = (color, numberOfElements, length = 4) => color.repeat(parseInt(numberOfElements, 10)).padEnd(length, Color.Off)

    const hourString1 = buildRow(Color.Red, hours / 5);
    const hourString2 = buildRow(Color.Red, hours % 5);
    timeArray.push(hourString1, hourString2);

    const minutesString1 = Color.Green
        .repeat(parseInt(minutes / 5, 10))
        .split('')
        .map((i, index) => (index + 1) % 3 === 0 ? Color.Red : i)
        .join("")
        .padEnd(11, Color.Off);
    const minutesString2 = buildRow(Color.Green, minutes % 5);
    timeArray.push(minutesString1, minutesString2);


    const currentElement = document.getElementById(elementId);

    let timezoneMarkup = currentElement.querySelector(".time__timezone");
    if (!timezoneMarkup.innerHTML) {
        timezoneMarkup.innerHTML = timeZone;
    }

    currentElement.querySelector(".time__clock").innerHTML = time;

    const line1 = currentElement.querySelector(".line1");
    changeBackgroundColor(line1, secondsRow)

    const line2 = currentElement.querySelector('.line2');
    changeBackgroundColor(line2, hourString1);

    const line3 = currentElement.querySelector('.line3');
    changeBackgroundColor(line3, hourString2);

    const line4 = currentElement.querySelector('.line4');
    changeBackgroundColor(line4, minutesString1);

    const line5 = currentElement.querySelector('.line5');
    changeBackgroundColor(line5, minutesString2);

    return timeArray.join("\n");
}

function changeBackgroundColor(element, currentStringColors) {
    const ColorFullname = {
        "O": "#17252A",
        "R": "#FF4136",
        "Y": "#FFDC00",
        "G": "#2ECC40"
    };
    const elements = element.children;

    if (!elements || elements.length === 0) {
        element.style.backgroundColor = ColorFullname[currentStringColors]
        return;
    }
    for (let i = 0; i < elements.length; i++) {
        let backgroundColor = elements[i].style;
        if (backgroundColor.backgroundColor !== ColorFullname[currentStringColors[i]]) {
            backgroundColor.backgroundColor = ColorFullname[currentStringColors[i]];
        }
    }
}

function updateTime(timeZone, elementId) {
    const date = new Date(new Date().toLocaleString("en-US", {timeZone: timeZone}));
    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    let seconds = date.getSeconds();
    if (seconds < 10) seconds = '0' + seconds;

    berlinClock(`${hours}:${minutes}:${seconds}`, elementId, timeZone)
}

const nyTime = setInterval(() => updateTime("America/New_York", "timezone1"), 1000);
const yekaterinburgTime = setInterval(() => updateTime("Europe/Rome", "timezone2"), 1000);
const moscowTime = setInterval(() => updateTime("Asia/Yekaterinburg", "timezone3"), 1000);
const australiaTime = setInterval(() => updateTime('Australia/Adelaide', "timezone4"), 1000);




