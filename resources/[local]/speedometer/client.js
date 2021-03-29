Delay = (ms) => new Promise(res => setTimeout(res, ms));

function drawText(text) {
    BeginTextCommandDisplayText('STRING');
    SetTextFont(1);
    SetTextScale(1, 0.8);
    AddTextComponentString(text);
    EndTextCommandDisplayText(0.90, 0.90);
}

let speedometertick = setTick(async () => {
    let me = GetPlayerPed(-1);
    let vehicle = GetVehiclePedIsIn(me, false);
    if (!vehicle) {
        return;
    }

    let speed = GetEntitySpeed(vehicle) * 3.6;
    drawText(`${Math.floor(speed).toString()} km/h`);
});
