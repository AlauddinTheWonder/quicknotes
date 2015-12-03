/** Developed By Alauddin Ansari
 ** wonder_a7@yahoo.co.in
 ** April 2015
 **/

var bkg, notes, oldvalue;

chrome.runtime.getBackgroundPage(function(){
	bkg = chrome.extension.getBackgroundPage();
});

window.onload = function() 
{
	bkg = chrome.extension.getBackgroundPage();
	notes = document.getElementById("mynotes");
	getNoteData();

	document.getElementById('DevLink').onclick = function()
	{
		chrome.tabs.create({url: "http://thebestcoders.com"});
	}

	document.getElementById('LoadPrevNote').onclick = loadOldData;
}

window.onunload = updateData;


function updateData()
{
	if(oldvalue != notes.value)
	{
		bkg.addNoteData(notes.value, oldvalue);
	}
}

function getNoteData()
{
	chrome.storage.sync.get(null, function(items){
		if(items.MYNOTE != undefined){
			oldvalue = items.MYNOTE;
			notes.value = oldvalue;
			
			var d = new Date(items.TIME);
			document.getElementById('datetime').innerHTML = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		}
	});
}

function loadOldData()
{
	chrome.storage.sync.get(null, function(items){
		if(items.OLDNOTE != undefined){
			oldvalue = notes.value;
			notes.value = items.OLDNOTE;
		}
	});
}