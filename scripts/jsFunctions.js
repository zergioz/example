var g_sPlayers = "";

$( document ).ready(function() {
    UpdateListings();
});

// player name or steam64ID input text field
$(function() {
	g_instance = $('#playerSearch').magicSuggest({
		placeholder: 'player name or steam64D',
		useTabKey: true,
		toggleOnClick: true,
		mode: 'remote',
		maxSelection: 4,
		maxEntryLength: 25,
		typeDelay: 0,
		expanded: true,
		maxEntryRenderer: function(v) {
			return 'Must be below 25 characters';
		},
		data: [{
		"name":"test",
		"Steam64ID":"76561198887634121",
		"picture":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e5/e5968f7e76aa766afc9d5b29de430b9d4c89a412_full.jpg"
		},{
		"name":"150ms peek// tiger",
		"Steam64ID":"76561198130364038",
		"picture":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/58/580678d71f5b30a4dfc097289d76a4f6997debc4_full.jpg"
		}],
		valueField: 'Steam64ID',
		renderer: function(data){
			return rendererComboItems(data);
		}
	});
	
	$(g_instance).on('selectionchange', function(e,m){
	g_sPlayers = this.getValue();
	UpdateListings()
	});
});

/*
	Formats player drop-down list.
*/
function rendererComboItems(data) {
return '<div style="padding: 5px; overflow:hidden;" id="OpeningDiv">'
	+ '<div style="float: left;"><img style="max-width: 40px; max-height: 46px;" src="'
	+ data.picture + '" /></div>'
	+  '<div style="float: left; margin-left: 5px">'
	+  '<div style="font-weight: bold; color: #333; font-size: 10px; line-height: 11px">'
	+  data.name + '</div>'
	+  '<div style="color: #999; font-size: 9px">' + data.Steam64ID + '</div>'
	+  '</div></div>' + '<div style="clear:both;"></div>';
}


function UpdateListings() {

var xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function() {
	if (this.readyState==4 && this.status==200) {
	document.getElementById("ListingsArea").innerHTML=this.responseText;
	}
}
xmlhttp.open("GET","GenerateListings.php?players="+g_sPlayers, true);
xmlhttp.send();
}