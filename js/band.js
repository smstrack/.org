const BAND_ACCESS_TOKEN = "ZQAAAX427aneVq70QpIz2bnepEX_pgwI0mioOJck9Pdola4-IPqEQkSkNx-TTmoRw_NSFmLuU6t-Lb0s8dd5eLHTp2dWUrWSPOtnhoB38mJuZ2Jx";
const SMSTF_KEY = "AABoOkqd1PNn4cndslgrrYNt";
const HEADLINE_MAX = 75;
const EVENT_MESSAGE_START = "[";
const EVENT_UPLOADED = "Uploaded";
const BAND_LINK = "<a href='https://band.us/band/83079051' target='_blank' style='text-decoration:none'>SMS <img alt='Band' src='/images/BAND_LOGO_green.png' height='16' style='vertical-align: middle'/></a>";

function linkify(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}

function checkContent(content, role) {
    if (!(content.startsWith(EVENT_MESSAGE_START) || content.startsWith(EVENT_UPLOADED)) &&  
        (role == "leader" || role == "coleader") ) {
        return true;
    } 
    return false;
}

function getHeadline(content) {
    var headline = content;
    var stop = content.trim().search(/[\\.;:!]/);
    if (stop != -1) {
        headline = content.slice(0, stop + 1);
    } else if (content.length > HEADLINE_MAX) {
        var stop = content.indexOf(" ", HEADLINE_MAX);
        if (stop != -1) {
            headline = content.slice(0, stop + 1);
        }
    }
    return headline;
}