$(document).ready(function(){
    var totalDegrees = 360,
        hoursOnClock = 12,
        minutesOnClock = 60,
        secondsOnClock = 60,
        $hourContainer = $('.hour-container'),
        $minContainer = $('.minute-container'),
        $secContainer = $('.second-container'),
        savedTime = new Date();

    setClockHands(savedTime);
    setInterval(function(){
        savedTime = new Date();
        setClockHands(savedTime);
    },1000);

    function setClockHands(time){
        var hours = time.getHours(),
            minutes = time.getMinutes(),
            seconds = time.getSeconds(),
            hourAngle = getHourAngle(hours,minutes,seconds),
            minAngle = getMinuteAngle(minutes,seconds),
            secAngle = getSecondAngle(seconds);

            console.log('Hour Angle: '+hourAngle);
            console.log('Min Angle: '+minAngle);
            console.log('Sec Angle: '+secAngle);

            setAngle($hourContainer,hourAngle);
            setAngle($minContainer,minAngle);
            setAngle($secContainer,secAngle);

    }

    function getHourAngle(hr,min,sec){
        var degreePerHour = totalDegrees/hoursOnClock,
            degreePerMinute = totalDegrees/(minutesOnClock*hoursOnClock),
            degreePerSecond = totalDegrees/(secondsOnClock*minutesOnClock*hoursOnClock);

        if(hr >= 12){
            hr -= 12;
        }

        console.log('Hour: '+(hr));
        console.log('Minute: '+(min));
        console.log('Second: '+(sec));

        console.log('Hour Degree: '+(hr*degreePerHour));
        console.log('Minute Degree: '+(min*degreePerMinute));
        console.log('Second Degree: '+(sec*degreePerSecond));

        return (hr*degreePerHour)+(min*degreePerMinute)+(sec*degreePerSecond);
    }

    function getMinuteAngle(min,sec){
        var degreePerMinute = totalDegrees/minutesOnClock,
            degreePerSecond = totalDegrees/(secondsOnClock*minutesOnClock);
        return (min*degreePerMinute)+(sec*degreePerSecond);
    }

    function getSecondAngle(sec){
        var degreePerSecond = totalDegrees/secondsOnClock;
        return sec*degreePerSecond;
    }

    function setAngle($div,angle){
        var cssRotate = 'rotate('+angle+'deg)';
        $div.css({
            '-ms-transform': cssRotate,
            '-webkit-transform': cssRotate,
            'transform': cssRotate
        });
    }
});