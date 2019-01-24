// somewhat arbitrary event groups used for sorting and header names
export var EVENT_GROUPS = 
{
	TS: {sortPrefix:'aTS',    name:'Track'},            /* track sprints < 1000 meters */
	TD: {sortPrefix:'bTD',    name:'Track'},            /* track distance >= 1000 meters */
	THS:{sortPrefix:'cTH',    name:'Track'},            /* track hurdles short < 99 */
	TH: {sortPrefix:'dTH',    name:'Track'},            /* track hurdles */
	TRS:{sortPrefix:'eTRS',   name:'Relays'},           /* track relays sprint x < 1000 meters */
	TRD:{sortPrefix:'fTRD',   name:'Relays'},           /* track relays distance x >= 1000 meters */
	FHJ:{sortPrefix:'gFHJ',   name:'Field'},            /* field horizontal jumps */
	FVJ:{sortPrefix:'hFVJ',   name:'Field'},            /* field vertical jumps */
	FT: {sortPrefix:'iFT',    name:'Field'},            /* field throws */
	NS: {sortPrefix:'jNS',    name:'Non Standard'},     /* non-standard track */
	DT: {sortPrefix:'kDT',    name:'Discontinued'},     /* discontinued track */
	DF: {sortPrefix:'lDF',    name:'Discontinued'}      /* discontinued field */
};