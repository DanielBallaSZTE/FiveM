const spawnPos = [686.245, 577.950, 130.461];

on('onClientGameTypeStart', () => {
    exports.spawnmanager.setAutoSpawnCallback(() => {
        exports.spawnmanager.spawnPlayer({
            x: spawnPos[0],
            y: spawnPos[1],
            z: spawnPos[2],
            model: 's_m_y_baywatch_01'
        }, () => {
            emit('chat:addMessage', {
                args: [
                    'Welcome to the party!~'
                ]
            })
        });
    });

    exports.spawnmanager.setAutoRespawn(true)
    exports.spawnmanager.forceRespawn()
});

on('gameEventTriggered', (name, args) => {
    emit('chat::addMessage', {
        args: [`Game event ${name} ${args.join(', ')}`]
    });
});

Delay = (ms) => new Promise(res => setTimeout(res, ms));

RegisterCommand('respawn', (source, args, raw) => {
    exports.spawnmanager.spawnPlayer({
        x: spawnPos[0],
        y: spawnPos[1],
        z: spawnPos[2],
        model: 's_m_y_baywatch_01'
    }, () => {
        emit('chat::addMessage', {
            args: ['You respawned']
        });
    });
}, false);

RegisterCommand('car', async (source, args, raw) => {
    let model = args.length > 0 ? args[0].toString() : "adder";

    const hash = GetHashKey(model);
    if (!IsModelInCdimage(hash) || !IsModelAVehicle(hash)) {
        emit('chat::addMessage', {
            args: [`invalid argument`]
        });
        return;
    }

    RequestModel(hash);
    while (!HasModelLoaded(hash)) {
        await Delay(500);
    }

    const ped = PlayerPedId();
    const coords = GetEntityCoords(ped);
    const vehicle = CreateVehicle(hash, coords[0], coords[1], coords[2], GetEntityHeading(ped), true, false);
    SetPedIntoVehicle(ped, vehicle, -1);
    SetEntityAsNoLongerNeeded(vehicle);
    SetModelAsNoLongerNeeded(model);

    emit('chat::addMessage', {
        args: ['Car spawned']
    });

  }, false);
