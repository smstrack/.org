<?xml version="1.0" encoding="utf-8" ?>

<xsl:stylesheet version="1.0" exclude-result-prefixes="xsl ddwrt msxsl" xmlns:ddwrt="https://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:xsl="https://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:ddwrt2="urn:frontpage:internal">
	<xsl:param name="dvt_adhocmode"></xsl:param>
	<xsl:param name="dvt_adhocfiltermode">xsl</xsl:param>
	<xsl:param name="dvt_fieldsort"></xsl:param>
	<xsl:param name="dvt_sortfield"></xsl:param>
	<xsl:param name="dvt_groupfield"></xsl:param>
	<xsl:param name="dvt_groupdisplay"></xsl:param>
	<xsl:param name="dvt_sortdir">ascending</xsl:param>
	<xsl:param name="dvt_groupdir">ascending</xsl:param>
	<xsl:param name="dvt_grouptype"></xsl:param>
	<xsl:param name="dvt_sorttype">text</xsl:param>
	<xsl:param name="dvt_groupsorttype">text</xsl:param>
	<xsl:param name="dvt_filterfield"></xsl:param>
	<xsl:param name="dvt_filterval"></xsl:param>
	<xsl:param name="dvt_filtertype"></xsl:param>
	<xsl:param name="dvt_firstrow">1</xsl:param>
	<xsl:param name="dvt_nextpagedata"></xsl:param>
	<xsl:param name="dvt_apos">'</xsl:param>
	<xsl:param name="filterParam"></xsl:param>
	<xsl:template match="/">
		<xsl:call-template name="dvt_1"/>
	</xsl:template>
	<xsl:template name="dvt_1.empty">
		<xsl:variable name="ViewEmptyText">There are no items to show in this view.</xsl:variable>
		<table border="0" width="100%">
			<tr>
				<td class="ms-vb">
					<xsl:value-of select="$ViewEmptyText"/>
				</td>
			</tr>
		</table>
	</xsl:template>
	<xsl:template name="dvt_1">
		<xsl:variable name="StyleName">RepForm1</xsl:variable>
		<xsl:variable name="Rows" select="/rss/channel/item" />
		<xsl:variable name="RowCount" select="count($Rows)" />
		<xsl:variable name="IsEmpty" select="$RowCount = 0" />
		<xsl:choose>
			<xsl:when test="$IsEmpty">
				<xsl:call-template name="dvt_1.empty" />
			</xsl:when>
			<xsl:otherwise>
				<table border="0" width="100%">
					<xsl:call-template name="dvt_1.body">
						<xsl:with-param name="Rows" select="$Rows" />
						<xsl:with-param name="FirstRow" select="1" />
						<xsl:with-param name="LastRow" select="$RowCount" />
					</xsl:call-template>
				</table>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="dvt_1.body">
		<xsl:param name="Rows" />
		<xsl:param name="FirstRow" />
		<xsl:param name="LastRow" />
		<xsl:for-each select="$Rows">
			<xsl:variable name="KeepItemsTogether" select="false()" />
			<xsl:variable name="HideGroupDetail" select="false()" />
			<xsl:variable name="GroupStyle" select="'auto'" />
			<xsl:if test="true()">
				<xsl:if ddwrt:cf_ignore="1" test="not($HideGroupDetail)">
					<tr style="display:{$GroupStyle}">
						<td class="ms-vb" colspan="2" width="100%">
						<hr />
						<p>
							<span style="font-size:large; font-weight:bold" >
							  <xsl:value-of select="title" />
							</span><br />
							<span style="font-size:85%; color:gray"><xsl:value-of select="pubDate" /></span></p>
										
						</td>
					</tr>
					<tr style="display:{$GroupStyle}">
						<td class="ms-vb" colspan="2" width="100%">
							
							
				
							
							<p style="font-family:Arial, Helvetica, sans-serif">
							<xsl:value-of select="description" />
							<br />
							<a><xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>Read more...</a>
							</p>
							
							</td>
					</tr>
					<tr>
						<td></td>
					</tr>
				</xsl:if>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>