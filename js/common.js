/*eslint-env browser */
/*eslint-disable no-unused-vars */
function displayHeader()
{
	document.write("<div id='banner' class='style1'>");
	document.write("<table cellspacing='0' cellpadding='0' class='style2' style='width: 100%'>");
	document.write("<tr>");
	document.write("<td align='left' valign='top' style='width: 410px'>");

	document.write("<a target='_blank' href='https://twitter.com/search?q=from%3ASMSWannamaker+%23SMSTF&ref_src=twsrc%5Etfw'>");
	document.write("<img alt='Twitter Feed' src='/images/Twitter_logo_blue_32.png' width='32' height='32' class='style22' align='middle'></a>");
	document.write("<a target='_blank' href='http://www.youtube.com/user/smsraidertrack'>");
	document.write("<img src='/images/youtube-icon-full_color_32.png' alt='Youtube channel' class='style22' align='middle'></a>");
	document.write("<br>");
	document.write("<a href='/index.htm'><img src='/images/clear.gif' alt='' style=' border:0;'></a>");
	document.write("</td>");
	document.write("<td class='style3' onclick='location.href=&quot;/index.htm&quot;' style='cursor:pointer;'>");
	document.write("<img border='0' src='/images/run.png' alt=''></td>");
	document.write("</tr>");

	document.write("</table>");
	document.write("</div>");
	document.write("<div id='menubar' class='menubar'>");
	document.write("<table class='menubar' border='0' cellpadding='0' style='border-collapse: collapse' width='100%' id='table1'>");
	document.write("<tr class='menubar'>");
	document.write("<td><a href='/index.htm'>Home</a></td>");
	document.write("<td><a href='/news.htm'>News</a></td>");
	document.write("<td><a href='/schedule.htm'>Schedule/Results</a></td>");
	document.write("<td><a href='/team.htm'>Team</a></td>");
	document.write("<td><a href='/coaches.htm'>Coaches</a></td>");
	document.write("<td><a href='/archives/state_champion_teams.htm'>Records/Lists</a></td>");
	document.write("<td><a href='/honors.htm'>Honors</a></td>");
	document.write("<td><a href='/pictures.htm'>Pictures</a></td>");
	document.write("<td><a href='/links.htm'>Links</a></td>");
	document.write("</tr>");
	document.write("</table>");
	document.write("</div>");
}

function displayFooter()
{
	document.write("<tr>");
	document.write("<td>");
	document.write("<p class='style23'><em>Home of the Shawnee Mission South Raiders Track & ");
	document.write("Field Team</em></p>");
	document.write("</td>");
	document.write("</tr>");
	document.write("<tr>");
	document.write("<td>");
	document.write("<p>&nbsp;</p>");
	document.write("</td>");
	document.write("</tr>");
	document.write("<tr align='center' style='display:block;'>");
	document.write("<td width='180px'>");
	document.write("<form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_blank'>");
	document.write("<input type='hidden' name='cmd' value='_s-xclick'>");
	document.write("<input type='hidden' name='hosted_button_id' value='BZJGCCBHK6VV8'>");
	document.write("<input border='0' type='image' width='180px' src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'>");
	document.write("<img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'>");
	document.write("</form>");
	document.write("</td>");
	document.write("</tr>");
	document.write("<tr>");
	document.write("<td>");
	document.write("<p>&nbsp;</p>");
	document.write("</td>");
	document.write("</tr>");
	document.write("<tr align='center'>");
	document.write("<td valign='bottom'>");
	document.write("<a href='http://www.smsd.org/schools/smsouth'>");
	document.write("<img border='0' src='/images/sms_tr2.jpg' width='83' height='101'></a>");
	document.write("</td>");
	document.write("</tr>");
	document.write("<tr>");
	document.write("<td>");
	document.write("<p align='center'>");
	document.write("<font face='Arial' size='2'>");
	document.write("<a href='https://smsouth.smsd.org'>Shawnee Mission South High School</a><br>");
	document.write("</font>");
	document.write("<font face='Arial' size='-1'>5800 West 107th Street<br> Overland Park, KS 66207</font>");
	document.write("</p>");
	document.write("</td>");
	document.write("</tr>");
}

function displayTeamHeader()
{
	document.write("<div class='menubar2'>");
	document.write("<table align='center' width='100%' class='menubar2'>");
	document.write("<tr class='menuba2r'>");
	document.write("<td><a href='guidelines.htm'>Policies</a></td>");
	document.write("<td><a href='rules.htm'>Rules</a></td>");
	document.write("<td><a href='forms.htm'>Forms</a></td>");
	document.write("<td><a href='roster.htm'>Roster</a></td>");
	document.write("<td><a href='throws/index.htm'>Shot/Disc</a></td>");
	document.write("<td><a href='https://store.thegraphicedge.com/eFlyer/main.asp?stid=southtrackfield17' target='_blank'>SMSTF Team Gear</a></td>");
	document.write("</tr>");
	document.write("</table>");
	document.write("</div>");

}

function displayRecordsHeader1()
{
	document.write("<div class='menubar2'>");
	document.write("<table align='center' width='100%' class='menubar2'>");
	document.write("<tr class='menuba2r'>");
	document.write("<td><a href='/archives/toptenalltimeboys.htm'>Records/Top Ten</a></td>");
	document.write("<td><a href='/archives/state_champion_teams.htm'>Team Championships</a></td>");
	document.write("<td><a href='/archives/state_champs_by_name.htm'>Individual State Champions</a></td>");
	document.write("</tr>");
	document.write("</table>");
	document.write("</div>");
}

function displayRecordsHeader2()
{
	document.write("<div class='menubar3'>");
	document.write("<table align='center' width='100%' class='menubar3'>");
	document.write("<tr class='menubar3'>");
	document.write("<td><a href='../archives/toptenalltimeboys.htm'>Varsity/Top Ten</a></td>");
	document.write("<td><a href='../records/boysfreshmanrecords.htm'>Freshman</a></td>");
	document.write("<td><a href='../records/smsrelaysboys.htm'>South Relays</a></td>");
	document.write("</tr>");
	document.write("</table>");
	document.write("</div>");
}

function displayThrowsHeader()
{
	document.write("<div id='banner' class='style1'>");
	document.write("<table cellspacing='0' cellpadding='0' class='style99' style='width: 100%; height: 200px;'>");
	document.write("<tr onclick='location.href=&quot;index.htm&quot;' style='cursor:pointer;'>");
	document.write("<td align='left' valign='top'>");
	document.write("</td>");
	document.write("</tr>");
	document.write("</table>");
	document.write("</div>");
	document.write("<div style='max-width:1597px' id='menubar' class='menubar'>");
	document.write("<table class='menubar' border='0' cellpadding='0' style='border-collapse: collapse' width='100%' id='table1'>");
	document.write("<tr class='menubar'>");
	document.write("<td><a href='/index.htm'>Track Home</a></td>");
	document.write("<td><a href='formchart.htm'>Meet Sheets</a></td>");
	document.write("<td><a href='videos.htm'>Videos</a></td>");
	document.write("<td><a href='practice.htm'>Practice</a></td>");
	document.write("<td><a href='links.htm'>Links</a></td>");
	document.write("<td><a href='/team.htm'>Team</a></td>");
	document.write("</tr>");
	document.write("</table>");
	document.write("</div>");
}