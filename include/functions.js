const fetch = require('node-fetch');
module.exports = {
    configcheck(client) {
        if (!client.config.token) {
            console.log('No token detected in config file\nexiting....');
            process.exit();
        }
        if (!client.config.prefix) {
            console.log('No prefix detected in config file\nexiting....');
            process.exit();
        }
        if (!client.config.admin_id) {
            console.log('No adminid detected in config file\nexiting....');
            process.exit();
        }
        if (client.config.presence_update_interval) {
            if (client.config.presence_update_interval < 600) {
                console.log('Update interval should be more than 600 seconds (10 minutes)\nexiting....');
                process.exit();
            }
            if (!(client.config.presence_template in [, 1, 2, 3])) {
                console.log('Presence template must be among 1, 2 or 3\nexiting....');
                process.exit();
            }
        }
        if (client.config.colour) {
            client.color = '#' + client.config.colour.replace(/#/gi, '');
        } else {
            client.color = '#007acc';
        }
        if (client.config.thumbnail_image_url) {
            client.thumbnail = client.config.thumbnail_image_url;
        } else {
            client.thumbnail = 'https://raidmax.org/IW4MAdmin/img/iw4adminicon-3.png';
        }
        if (client.config.footer) {
            client.footer = client.config.footer;
        } else {
            client.footer = 'Bot by Sparker, IW4M Admin by Raidmax';
        }
    },

    timeformat(uptime) {
        var days = Math.floor((uptime % 31536000) / 86400);
        var hours = Math.floor((uptime % 86400) / 3600);
        var minutes = Math.floor((uptime % 3600) / 60);
        var seconds = Math.round(uptime % 60);
        return (days > 0 ? days + " days, " : "") + (hours > 0 ? hours + " hours, " : "") + (minutes > 0 ? minutes + " minutes, " : "") + (seconds > 0 ? seconds + " seconds" : "");
    },

    async fetchinfo(id, length) {
        let response = await fetch('http://api.raidmax.org:5000/instance/' + id)
            .then((res) => res.json())
            .catch(() => { console.log('Masterserver not reachable') });
        if (response && response.servers) {
            let hostnames = new Array();
            let players = new Array();
            let maxplayers = new Array();
            let gamemap = new Array();
            var total = length || response.servers.length;
            for (i = 0; i < total; i++) {
                if (response.servers[i]) {
                    hostnames[i] = '🔹 ' + response.servers[i].hostname.replace(/\^[0-9:;c]/g, '');
                    players[i] = response.servers[i].clientnum;
                    maxplayers[i] = response.servers[i].maxclientnum;
                    gamemap[i] = response.servers[i].map;
                }
            }
            return [hostnames, players, maxplayers, gamemap, response.uptime];
        } else {
            return false;
        }
    },

    getmap(console) {
        var alias = "";
        switch (console) {
            case "mp_railyard":
                alias = "Railyard";
                break;
            case "mp_convoy":
                alias = "Ambush";
                break;
            case "mp_backlot":
                alias = "Backlot"
                break;
            case "mp_bloc":
                alias = "Bloc";
                break;
            case "mp_bog":
                alias = "Bog";
                break;
            case "mp_countdown":
                alias = "Countdown";
                break;
            case "mp_crash":
                alias = "Crash";
                break;
            case "mp_crossfire":
                alias = "Crossfire";
                break;
            case "mp_citystreets":
                alias = "District";
                break;
            case "mp_farm":
                alias = "Downpour";
                break;
            case "mp_overgrown":
                alias = "Overgrown";
                break;
            case "mp_pipeline":
                alias = "Pipeline";
                break;
            case "mp_shipment":
                alias = "Shipment";
                break;
            case "mp_showdown":
                alias = "Showdown";
                break;
            case "mp_strike":
                alias = "Strike";
                break;
            case "mp_vacant":
                alias = "Vacant";
                break;
            case "mp_cargoship":
                alias = "Wet Work";
                break;
            case "mp_crash_snow":
                alias = "Winter Crash";
                break;
            case "mp_broadcast":
                alias = "Broadcast";
                break;
            case "mp_creek":
                alias = "Creek";
                break;
            case "mp_carentan":
                alias = "Chinatown";
                break;
            case "mp_killhouse":
                alias = "Killhouse";
                break;
            case "mp_airfield":
                alias = "Airfield";
                break;
            case "mp_asylum":
                alias = "Asylum";
                break;
            case "mp_castle":
                alias = "Castle";
                break;
            case "mp_shrine":
                alias = "Cliffside";
                break;
            case "mp_courtyard":
                alias = "Courtyard";
                break;
            case "mp_dome":
                alias = "Dome";
                break;
            case "mp_downfall":
                alias = "Downfall";
                break;
            case "mp_hangar":
                alias = "Hangar";
                break;
            case "mp_makin":
                alias = "Makin";
                break;
            case "mp_outskirts":
                alias = "Outskirts";
                break;
            case "mp_roundhouse":
                alias = "Roundhouse";
                break;
            case "mp_suburban":
                alias = "Upheaval";
                break;
            case "mp_kneedeep":
                alias = "Knee Deep";
                break;
            case "mp_nachtfeuer":
                alias = "Nightfire";
                break;
            case "mp_subway":
                alias = "Station";
                break;
            case "mp_kwai":
                alias = "Banzai";
                break;
            case "mp_stalingrad":
                alias = "Corrosion";
                break;
            case "mp_docks":
                alias = "Sub Pens";
                break;
            case "mp_drum":
                alias = "Battery";
                break;
            case "mp_bgate":
                alias = "Breach";
                break;
            case "mp_vodka":
                alias = "Revolution";
                break;
            case "mp_rust":
                alias = "Rust";
                break;
            case "mp_terminal":
                alias = "Terminal";
                break;
            case "mp_afghan":
                alias = "Afghan";
                break;
            case "mp_derail":
                alias = "Derail";
                break;
            case "mp_estate":
                alias = "Estate";
                break;
            case "mp_favela":
                alias = "Favela";
                break;
            case "mp_highrise":
                alias = "Highrise";
                break;
            case "mp_invasion":
                alias = "Invasion";
                break;
            case "mp_checkpoint":
                alias = "Karachi";
                break;
            case "mp_quarry":
                alias = "Quarry";
                break;
            case "mp_rundown":
                alias = "Rundown";
                break;
            case "mp_boneyard":
                alias = "Scrapyard";
                break;
            case "mp_nightshift":
                alias = "Skidrow";
                break;
            case "mp_subbase":
                alias = "Sub Base";
                break;
            case "mp_underpass":
                alias = "Underpass";
                break;
            case "mp_brecourt":
                alias = "Wasteland";
                break;
            case "mp_overgrown":
                alias = "Overgrown";
                break;
            case "mp_strike":
                alias = "Strike";
                break;
            case "mp_abandon":
                alias = "Carnival";
                break;
            case "mp_trailerpark":
                alias = "Trailer Park";
                break;
            case "mp_fuel2":
                alias = "Fuel";
                break;
            case "mp_storm":
                alias = "Storm";
                break;
            case "mp_complex":
                alias = "Bailout";
                break;
            case "mp_compact":
                alias = "Salvage";
                break;
            case "mp_nuked":
                alias = "Nuketown";
                break;
            case "iw4_credits":
                alias = "Test map";
                break;
            case "mp_bog_sh":
                alias = "Bog";
                break;
            case "mp_cargoship_sh":
                alias = "Freighter";
                break;
            case "mp_cargoship":
                alias = "Cargoship";
                break;
            case "mp_shipment_long":
                alias = "Shipment Long";
                break;
            case "mp_rust_long":
                alias = "Rust Long";
                break;
            case "mp_firingrange":
                alias = "Firing Range";
                break;
            case "mp_storm_spring":
                alias = "Chemical Plant";
                break;
            case "mp_fav_tropical":
                alias = "Tropical Favela";
                break;
            case "mp_estate_tropical":
                alias = "Tropical Estate";
                break;
            case "mp_crash_tropical":
                alias = "Tropical Crash";
                break;
            case "mp_bloc_sh":
                alias = "Forgotten City";
                break;
            case "mp_cross_fire":
                alias = "Crossfire";
                break;
            case "oilrig":
                alias = "Oilrig";
                break;
            case "co_hunted":
                alias = "Village";
                break;
            case "co_hunted":
                alias = "Array";
                break;
            case "mp_berlinwall2":
                alias = "Berlin Wall";
                break;
            case "mp_gridlock":
                alias = "Convoy";
                break;
            case "mp_cracked":
                alias = "Cracked";
                break;
            case "mp_crisis":
                alias = "Crisis";
                break;
            case "mp_discovery":
                alias = "Discovery";
                break;
            case "mp_drivein":
                alias = "Drive In";
                break;
            case "mp_duga":
                alias = "Grid";
                break;
            case "mp_area51":
                alias = "Hangar 18";
                break;
            case "mp_hanoi":
                alias = "Hanoi";
                break;
            case "mp_cairo":
                alias = "Havana";
                break;
            case "mp_golfcourse":
                alias = "Hazard";
                break;
            case "mp_hotel":
                alias = "Hotel";
                break;
            case "mp_havoc":
                alias = "Jungle";
                break;
            case "mp_kowloon":
                alias = "Kowloon";
                break;
            case "mp_cosmodrome":
                alias = "Launch";
                break;
            case "mp_nuked":
                alias = "Nuketown";
                break;
            case "mp_radiation":
                alias = "Radiation";
                break;
            case "mp_silo":
                alias = "Silo";
                break;
            case "mp_stadium":
                alias = "Stadium";
                break;
            case "mp_outskirts":
                alias = "Stockpile";
                break;
            case "mp_mountain":
                alias = "Summit";
                break;
            case "mp_villa":
                alias = "Villa";
                break;
            case "mp_russianbase":
                alias = "WMD";
                break;
            case "mp_zoo":
                alias = "Zoo";
                break;
            case "mp_seatown":
                alias = "Seatown";
                break;
            case "mp_alpha":
                alias = "Lockdown";
                break;
            case "mp_bravo":
                alias = "Mission";
                break;
            case "mp_carbon":
                alias = "Carbon";
                break;
            case "mp_plaza2":
                alias = "Arkaden";
                break;
            case "mp_exchange":
                alias = "Downturn";
                break;
            case "mp_bootleg":
                alias = "Bootleg";
                break;
            case "mp_hardhat":
                alias = "Hardhat";
                break;
            case "mp_interchange":
                alias = "Interchange";
                break;
            case "mp_lambeth":
                alias = "Fallen";
                break;
            case "mp_radar":
                alias = "Outpost";
                break;
            case "mp_mogadishu":
                alias = "Bakaara";
                break;
            case "mp_paris":
                alias = "Resistance";
                break;
            case "mp_underground":
                alias = "Underground";
                break;
            case "mp_village":
                alias = "Village / Standoff";
                break;
            case "mp_aground_ss":
                alias = "Aground";
                break;
            case "mp_boardwalk":
                alias = "Boardwalk";
                break;
            case "mp_burn_ss":
                alias = "U Turn";
                break;
            case "mp_cement":
                alias = "Foundation";
                break;
            case "mp_courtyard_ss":
                alias = "Erosion";
                break;
            case "mp_crosswalk_ss":
                alias = "Intersection";
                break;
            case "mp_hillside_ss":
                alias = "Gateway";
                break;
            case "mp_italy":
                alias = "Piazza";
                break;
            case "mp_meteora":
                alias = "Sanctuary";
                break;
            case "mp_moab":
                alias = "Gulch";
                break;
            case "mp_morningwood":
                alias = "Backbox";
                break;
            case "mp_nola":
                alias = "Parish";
                break;
            case "mp_overwatch":
                alias = "Overwatch";
                break;
            case "mp_park":
                alias = "Liberation";
                break;
            case "mp_qadeem":
                alias = "Oasis";
                break;
            case "mp_restrepo_ss":
                alias = "Lookout";
                break;
            case "mp_roughneck":
                alias = "Offshore";
                break;
            case "mp_shipbreaker":
                alias = "Decommission";
                break;
            case "mp_six_ss":
                alias = "Vortex";
                break;
            case "mp_terminal_cls":
                alias = "Terminal";
                break;
            case "mp_la":
                alias = "Aftermath";
                break;
            case "mp_dockside":
                alias = "Cargo";
                break;
            case "mp_carrier":
                alias = "Carrier";
                break;
            case "mp_drone":
                alias = "Drone";
                break;
            case "mp_express":
                alias = "Express";
                break;
            case "mp_hijacked":
                alias = "Hijacked";
                break;
            case "mp_meltdown":
                alias = "Meltdown";
                break;
            case "mp_overflow":
                alias = "Overflow";
                break;
            case "mp_nightclub":
                alias = "Plaza";
                break;
            case "mp_raid":
                alias = "Raid";
                break;
            case "mp_slums":
                alias = "Slums";
                break;
            case "mp_turbine":
                alias = "Turbine";
                break;
            case "mp_socotra":
                alias = "Yemen";
                break;
            case "mp_nuketown_2020":
                alias = "Nuketown 2025";
                break;
            case "mp_downhill":
                alias = "Downhill";
                break;
            case "mp_mirage":
                alias = "Mirage";
                break;
            case "mp_hydro":
                alias = "Hydro";
                break;
            case "mp_skate":
                alias = "Grind";
                break;
            case "mp_concert":
                alias = "Encore";
                break;
            case "mp_magma":
                alias = "Magma";
                break;
            case "mp_vertigo":
                alias = "Vertigo";
                break;
            case "mp_studio":
                alias = "Studio";
                break;
            case "mp_uplink":
                alias = "Uplink";
                break;
            case "mp_bridge":
                alias = "Detour";
                break;
            case "mp_castaway":
                alias = "Cove";
                break;
            case "mp_paintball":
                alias = "Rush";
                break;
            case "mp_dig":
                alias = "Dig";
                break;
            case "mp_frostbite":
                alias = "Frost";
                break;
            case "mp_pod":
                alias = "Pod";
                break;
            case "mp_takeoff":
                alias = "Takeoff";
                break;
            case "zm_buried":
                alias = "Buried / Resolution 1295";
                break;
            case "zm_highrise":
                alias = "Die Rise / Great Leap Forward";
                break;
            case "zm_nuked":
                alias = "Nuketown";
                break;
            case "zm_prison":
                alias = "Mob of the Dead";
                break;
            case "zm_tomb":
                alias = "Origins";
                break;
            case "zm_transit_dr":
                alias = "Diner";
                break;
            case "zm_transit":
                alias = "Green Run/Bus Depot/Farm/Town";
                break;
            default:
                alias = console;
                break;
        }
        return alias;
    }
}