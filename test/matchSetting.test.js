//const jest = require('jest');

const Jukebox = require('../src/models/Jukebox.js');
const Setting = require('../src/models/Setting.js');

beforeEach(() => {

    setting = [
        new Setting("b43f247a-8478-4f24-8e28-792fcfe539f5", ["camera", "amplifier"]),
        new Setting("2f58dbd4-47cb-4eef-bb72-623f4aa4fe5d", ["money_pcb", "money_receiver", "speaker", "led_panel", "money_receiver"])
    ],

    jukebox = [
        new Jukebox("5ca94a8ac470d3e47cd4713c", "fusion", [{name: "led_panel"}, {name: "amplifier"}, {name: "led_panel"}, {name: "led_panel"}, {name: "pcb"}]),
        new Jukebox("5ca94a8a77e20d15a7d16d0a", "angelina", [{name: "pcb"}, {name: "money_pcb"}, {name: "touchscreen"}, {name: "speaker"}, {name: "speaker"}]),
        new Jukebox("5ca94a8a75c231bb18715112", "fusion", [{name: "amplifier"}, {name: "led_panel"}]),
        new Jukebox("5ca94a8a20905ffff6f0561c", "virtuo", [{name: "led_panel"}, {name: "money_receiver"}, {name: "money_receiver"}]),
        new Jukebox("5ca94a8ab592da6c6f2d562e", "fusion", [{name: "camera"}, {name: "amplifier"}])
    ]
});

test('Match 1 jukebox with exacte setting requirements', () =>{
    expect(jukebox.filter(jb => {
        return jb.matchSetting(setting[0].requires)
    })[0].id)
    .toBe("5ca94a8ab592da6c6f2d562e")
});

test('Match no jukebox with execte setting requirements', () =>{
    expect(jukebox.filter( jb => {
        return jb.matchSetting(setting[1].requires)
    }).length)
    .toEqual(0)
});