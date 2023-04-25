batteryLvl = document.querySelector(".batteryLvl");
batteryStatus = document.querySelector(".batteryStatus");
chargingTime = document.querySelector(".chargingTime");
timeToDischrg = document.querySelector(".dischargingTime");

const battery = () => {
    if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {

            function updateAllEvent() {
                showLvl();
                status();
                chrgingTime();
                disChrgingTime();
            }
            updateAllEvent()
            //Battery Percentage
            battery.addEventListener('levelchange', () => {
                showLvl();
            });
            function showLvl() {
                batteryLvl.innerHTML = (battery.level * 100) + '%';
            }

            //Battery Status
            battery.addEventListener('chargingchange', () => {
                status();
            });
            function status() {
                const isCharging = battery.charging;
                const yesCharge = 'Yes',
                    noCharge = 'No';
                if (isCharging === true) {
                    batteryStatus.innerHTML = yesCharge;
                }
                else {
                    batteryStatus.innerHTML = noCharge;
                };
            }

            //Battery Charging Time
            battery.addEventListener('chargingtimechange', () => {
                chrgingTime();
            });
            function chrgingTime() {
                const time = battery.chargingTime;
                const isitCharging = battery.charging;

                if (isitCharging !== false) {
                    if (time == 0) {
                        chargingTime.innerHTML = `Battery is full`;
                    }
                    else chargingTime.innerHTML = ` ${time} s`
                }
                else {
                    chargingTime.innerHTML = `Battery is NOT charging`;
                }
            }

            //Battery Discharging Time
            battery.addEventListener('dischargingtimechange', () => {
                disChrgingTime();
            })
            function disChrgingTime() {
                const isitCharging = battery.charging;
                if (isitCharging === true) {
                    const disTime = battery.dischargingTime;
                    if (disTime == 'Infinity')
                        timeToDischrg.innerHTML = `Battery is full`;
                    else timeToDischrg.innerHTML = `${disTime} s`;
                }
                else timeToDischrg.innerHTML = `Battery is NOT charging`;
            }
        })
    }
}

battery();