/* global process */

var dbus = require('dbus-native');
var sessionBus = dbus.sessionBus();
sessionBus.getService('com.intel.dleyna-renderer').getInterface(
    process.env.ENDPOINT,
    'org.mpris.MediaPlayer2.Player', function(err, player) {

    // dbus signals are EventEmitter events
//    player.on('ActionInvoked', function() {
//        console.log('ActionInvoked', arguments);
//    });
//    player.on('NotificationClosed', function() {
//        console.log('NotificationClosed', arguments);
//    });
    
    player.OpenUri("http://www.tv-radio.com/station/fip_mp3/fip_mp3-128k.m3u")
    
//    player.PlayPause();
});