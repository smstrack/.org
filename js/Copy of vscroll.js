/**************************************
* http://vertical-scroller.vbarsan.com/
*    This notice may not be removed 
**************************************/
//-- Begin Scroller's Parameters and messages -->
//scroller's width
var swidth=178;
//scroller's height
var sheight=150;
//scroller's speed 
var sspeed=4;
var restart=sspeed;
var rspeed=sspeed;
//scroller's pause 
var spause=2000;
//scroller's background
var sbcolor="#FFFFFF";
//messages: set your own; use as many as you'd like; set up Hyperlinks to
//URLs as you normally do: <a target=... href="... URL ...">..message..</a>;
var singletext=new Array();
//singletext[0]='<table CELLSPACING="0" CELLPADDING="0" align="center"><tr><td height="80px" valign="middle"><table align="center"><tr><td><img src="http://vbarsan.com/homer.gif" width="18px" height="10px" alt="Vertical Scroller"></td><td><A class=tabb target="_self" href="http://vertical-scroller.vbarsan.com/">Dhtml Vertical Scroller Javascript 7.0</A></td><td><img src="http://vbarsan.com/homel.gif" width="18px" height="10px" alt="Vertical Scroller"></td></tr></table><div class=tanc>Multiple Messages may scroll & pause along 2 patterns:<br>- Singles: pause at top or may automatically be centered.<br>- One_or_More-up-to-area-size: Messages go equidistant,<br>  each&every message pausing when reaches top edge.</div></td></tr></table>';
//singletext[1]='<table CELLSPACING="0" CELLPADDING="0" align="center"><tr><td height="80px" valign="middle"><table align="center"><tr><td><img src="http://vbarsan.com/homer.gif" width="18px" height="10px" alt="Horizontal Scroller"></td><td align="center"><A class=tabb target="_self" href="http://news-scroller.vbarsan.com/">Dhtml Horizontal Scroller Javascript 7.0</A></td><td><img src="http://vbarsan.com/homel.gif" width="18px" height="10px" alt="Horizontal Scroller"></td></tr></table><div class=tanc>Multiple Messages may scroll & pause along 2 patterns:<br>- Singles: pause at left or centered depending upon CSS.<br>- One_or_More-up-to-area-size: Messages go equidistant,<br>  each&every message pausing when reaches left edge.</div></td></tr></table>';
//singletext[2]='<table CELLSPACING="0" CELLPADDING="0" align="center"><tr><td height="80px" valign="middle"><table align="center"><tr><td><img src="http://vbarsan.com/homer.gif" width="18px" height="10px" alt="Typewriter Vertical Text Scroller"></td><td><A class=tabb target="_self" href="http://news-ticker.vbarsan.com/">Dhtml Typewriter Vertical Text Scroller 5.0</A></td><td><img src="http://vbarsan.com/homel.gif" width="18px" height="10px" alt="Typewriter Vertical Text Scroller"></td></tr></table><div class=tanc>Typewriter ticker has 2 portions: typewriting & scrolling<br>with first one at the bottom - Scrolling portion is optional.<br />Typewriting portion may hold as many rows as desired.<br />Scrolling goes up with the size of actual typewritten text.</div></td></tr></table>';
//singletext[3]='<table CELLSPACING="0" CELLPADDING="0" align="center"><tr><td height="80px" valign="middle"><div class=tan><b>Javascript Vertical Scroller v3.5</b><br>Once a message left, next one comes in.<br>Adjustable: Size, Speed, Pause and Background.<br>Speed may be adjusted on the fly as well!<br>Runs any number of Messages/Images.</div></td></tr></table>';
//singletext[4]='<div class=tan><b>On Windows/Linux:</b><br>ie4+ firefox1+ ns6+ opera7+ ns4+.<br><br><b>On Mac OS X</b>:<br>Safari, ie5+ firefox1+ opera7+.<br><br>Any message may be <b><i>as large as desired.</i></B><br>===<br><br><font color="olive">Any wider row will automatically be adjusted into as many rows as to fit the width you set for the scrolling area.</font><br><br>===<br>One may use <b><i>any basic HTML code.</i><br><br>===</B></div>';
//						singletext[0] ='<h2 align="center"><a href="http://www.kansascity.com/696/story/634974.html">Boys Take State!</a></h2><h3 align="center">Girls Third!</h3><p align="center"><a href="Results/08results/state.htm">Highlighted Results</a><br><a href="http://tickertiming.com/2008/KSstateHS08/index.htm">Ticker Timing</a><br><a href="http://www.rlrphotos.com/albums.php?albumId=47614">Pictures!</a></p>';



http://www.deltatiming.com/results/events_byschedule.aspx?yf=2012&mf=2012-kansas-relays
singletext[0]='<p align="center" style="color:green"><span style="font-size:125%"><strong>State Qualifiers<br/></span></strong><span style="font-size:90%"><a target="_blank" href="http://www.varsitykansas.com/2013/05/18/49614/class-5a-track-qualifiers.html">Class 5A</a></span><br><br><span style="font-size:125%"><strong>5A State Rankings<br/></span></strong><span style="font-size:90%"><a target="_blank" href="http://www.catchitkansas.com/rankings/cik-class-5a-state-track-rankings-2013,0,7449508.story">CatchItKansas</a></span><br><span style="font-size:90%"><a target="_blank" href="http://ks.milesplit.com/rankings/2013/outdoor/hs/m?cv=&m=50&cn=&r=ks&l=4222">KansasMileSplit</a></span></span></p>';
//singletext[1]='<p align="center" style="color:green"><span style="font-size:125%"><strong>SMN JV<br/></span></strong><span style="font-size:90%"><a target="_blank" href="/Results/2012/SM North JV Meet-05-Apr-12Results.htm">Results</a></span></p>';
//singletext[1]='<p align="center" style="color:green"><span style="font-size:125%"><strong>South Relays<br/></span></strong><span style="font-size:90%"><a target="_blank" href="/Results/2012/2012 South Relay Results.pdf">Results</a></span></p>';
//singletext[1] ='';	
								
//singletext[...]='...';
//-- end Parameters and message -->
//-- begin: Scroller's Algorithm -->
var ii=0;
function goup()
{
    if(sspeed!=rspeed*16)
    {
        sspeed=sspeed*2;
        restart=sspeed;
    }
}
function start()
{
    if(document.getElementById)
    {
        ns6div=document.getElementById('iens6div');
        ns6div.style.top=sheight+"px";
        ns6div.innerHTML=singletext[0];
        sizeup=ns6div.offsetHeight;
        ns6scroll();
    }
    else 
    if(document.layers)
    {
        ns4layer=document.ns4div.document.ns4div1;
        ns4layer.top=sheight;
        ns4layer.document.write(singletext[0]);
        ns4layer.document.close();
        sizeup=ns4layer.document.height;
        ns4scroll();
    }
    else 
    if(document.all)
    {
        iediv=iens6div;
        iediv.style.pixelTop=sheight+"px";
        iediv.innerHTML=singletext[0];
        sizeup=iediv.offsetHeight;
        iescroll();
    }
}
function iescroll()
{
    if(iediv.style.pixelTop>0&&iediv.style.pixelTop<=sspeed)
    {
        iediv.style.pixelTop=0;
        setTimeout("iescroll()",spause);
    }
    else
    if(iediv.style.pixelTop>=sizeup*-1)
    {
        iediv.style.pixelTop-=sspeed+"px";
        setTimeout("iescroll()",100);
    }
    else
    {
        if(ii==singletext.length-1)
            ii=0;
        else 
            ii++;
        iediv.style.pixelTop=sheight+"px";
        iediv.innerHTML=singletext[ii];
        sizeup=iediv.offsetHeight;
        iescroll();
    }
}
function ns4scroll()
{
    if(ns4layer.top>0&&ns4layer.top<=sspeed)
    {
        ns4layer.top=0;
        setTimeout("ns4scroll()",spause);
    }
    else 
    if(ns4layer.top>=sizeup*-1)
    {
        ns4layer.top-=sspeed;
        setTimeout("ns4scroll()",100);
    }
    else
    {
        if(ii==singletext.length-1)
            ii=0;
        else 
            ii++;
        ns4layer.top=sheight;
        ns4layer.document.write(singletext[ii]);
        ns4layer.document.close();
        sizeup=ns4layer.document.height;
        ns4scroll();
    }
}
function ns6scroll()
{
    if(parseInt(ns6div.style.top)>0&&parseInt(ns6div.style.top)<=sspeed)
    {
        ns6div.style.top=0;
        setTimeout("ns6scroll()",spause);
    }
    else 
    if(parseInt(ns6div.style.top)>=sizeup*-1){
        ns6div.style.top=parseInt(ns6div.style.top)-sspeed+"px";
        setTimeout("ns6scroll()",100);
    }
    else
    {
        if(ii==singletext.length-1)
            ii=0;
        else 
            ii++;
        ns6div.style.top=sheight+"px";
        ns6div.innerHTML=singletext[ii];
        sizeup=ns6div.offsetHeight;
        ns6scroll();
    }
}
//-- end Algorithm -->
if(document.layers)
{
    document.write('<ilayer id="ns4div" width="'+swidth+'" height="'+sheight+'" bgcolor='+sbcolor+'><layer id="ns4div1" width="'+swidth+'" height="'+sheight+'" onmouseover="sspeed=0;" onmouseout="sspeed=rspeed"></layer></ilayer>')
}
if(document.getElementById||document.all)
{
    document.write('<div style="position:relative;overflow:hidden;width:'+swidth+'px;height:'+sheight+'px;clip:rect(0 '+swidth+'px '+sheight+'px 0);background-color:'+sbcolor+';" onmouseover="sspeed=0" onmouseout="sspeed=rspeed"><div id="iens6div" style="position:relative;width:'+swidth+'px;"></div></div>');
}
