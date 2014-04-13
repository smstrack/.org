function FP_xslview(oFrame,sXML,sXSL,sErr){
	var oXml,oXsl,oTarget=oFrame.parentNode,sHtml,oDoc=document,/*ie*/sMXSML="Microsoft.XMLDOM",/*moz*/oImp=oDoc.implementation,oXslProc,oXform,oXmlSer;
	
	if(!XformInIE()&&!XformInMoz())
	{
		oTarget.innerHtml=oTarget;
	}
	
	function OnMozXmlDocLoaded(e)
	{
		oXslProc=new XSLTProcessor(); 
		oXform=oImp.createDocument("","t2",null); 
		oXform.addEventListener("load",onloadXSL,false); 
		oXform.load(sXSL); 
		
		function onloadXSL()
		{ 
			try
			{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"); 
			}
			catch(e)
			{
				;
			}
			oXslProc.importStylesheet(oXform); 
			var oXmlXformed=oXslProc.transformToDocument(oXml);
			oXmlSer=new XMLSerializer();
			sHtml=oXmlSer.serializeToString(oXmlXformed);
			oTarget.innerHTML=sHtml; 	
		} 
	}
	
	function XformInIE()
	{ 
		if(!document.all)
		{
			return false;
		} 
		try
		{
			oXml=new ActiveXObject(sMXSML);
		} 
		catch(e)
		{
			return false;
		} 
		
		if(oXml)
		{ 
			oXml.async=false;
			oXml.load(sXML); 
			oXsl=new ActiveXObject(sMXSML); 
			oXsl.async=false; 
			oXsl.load(sXSL); 
			sHtml=String(oXml.transformNode(oXsl)); 
			oTarget.innerHTML=sHtml;
			return true; 
		} 
		return false; 
	}
			
	function XformInMoz()
	{ 
		if(oImp&&oImp.createDocument)
		{ 
			try
			{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"); 
			}
			catch(e)
			{
				;
			}

			oXml=oImp.createDocument("","t1",null); 
			oXml.addEventListener("load",OnMozXmlDocLoaded,false);
			oXml.load(sXML); 
			return true; 
		} 
		return false; 
	}	
}	