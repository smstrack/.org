const BAND_ACCESS_TOKEN = "ZQAAAX427aneVq70QpIz2bnepEX_pgwI0mioOJck9Pdola4-IPqEQkSkNx-TTmoRw_NSFmLuU6t-Lb0s8dd5eLHTp2dWUrWSPOtnhoB38mJuZ2Jx";
const SMSTF_KEY = "AABoOkqd1PNn4cndslgrrYNt";
const HEADLINE_MAX = 75;
const EVENT_UPLOAD = "Uploaded event."

function linkify(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
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