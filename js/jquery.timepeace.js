$.fn.timepeace = function(init){
    var totalDegrees = 360,
        hoursOnClock = 12,
        minutesOnClock = 60,
        secondsOnClock = 60,
        $thisClock = this,
        $hourContainer = $('<div class="hour-container">'),
        $minContainer = $('<div class="minute-container">'),
        $secContainer = $('<div class="second-container">');

    init = init || {};
    $.extend($thisClock, {
        hourHand: init.hourHand || '<span class="hour-hand"></span>',
        minHand: init.minHand || '<span class="minute-hand"></span>',
        secHand: init.secHand || '<span class="second-hand"></span>',
        currentTime: init.currentTime || new Date()
    });

    renderClock();
    setClockHands($thisClock.currentTime);
    startClock();

    function startClock(){
        setInterval(function(){
            $thisClock.currentTime.setSeconds($thisClock.currentTime.getSeconds()+1);
            setClockHands($thisClock.currentTime);
        },1000);
    }

    function renderClock(){
        $hourContainer.html($thisClock.hourHand);
        $minContainer.html($thisClock.minHand);
        $secContainer.html($thisClock.secHand);
        $thisClock.append($hourContainer,$minContainer,$secContainer);
    }

    function setClockHands(time){
        var hours = time.getHours(),
            minutes = time.getMinutes(),
            seconds = time.getSeconds(),
            hourAngle = getHourAngle(hours,minutes,seconds),
            minAngle = getMinuteAngle(minutes,seconds),
            secAngle = getSecondAngle(seconds);

            setAngle($hourContainer,hourAngle);
            setAngle($minContainer,minAngle);
            setAngle($secContainer,secAngle);

    }

    function getHourAngle(hr,min,sec){
        var degreePerHour = totalDegrees/hoursOnClock,
            degreePerMinute = totalDegrees/(minutesOnClock*hoursOnClock),
            degreePerSecond = totalDegrees/(secondsOnClock*minutesOnClock*hoursOnClock);

        if(hr >= 12){ hr -= 12; }

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

    return $thisClock;
};