/** Developed By Alauddin Ansari
 ** wonder_a7@yahoo.co.in
 ** April 2015
 **/


chrome.runtime.onInstalled.addListener(function()
{
	chrome.contextMenus.create({
		"title": "Add to Quick Notes", 
		"contexts":["selection"], 
		"id": "contextAddToNote"
	});
	/*chrome.contextMenus.create({
		"title": "Translate: %s", 
		"contexts":["selection"], 
		"id": "contextTranslate"
	});*/
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
	if(info.menuItemId == 'contextAddToNote')
	{
		var sText = info.selectionText;
		if(sText.trim() != "")
		{
			appendNoteData(sText);
			notifyMe('Selected text has been added to Quick Notes');
		}
	}

	/*if(info.menuItemId == 'contextTranslate')
	{
		var sText = info.selectionText;
		if(sText.trim() != "")
		{
			chrome.tabs.create({
				"url" : "https://translate.google.com/#auto/hi/"+sText
			});
		}
	}*/
};


function addNoteData(newData, oldData)
{
 	var obj = {"MYNOTE": newData, "TIME": new Date().getTime()};
 	if(oldData != undefined && oldData != ""){
 		obj.OLDNOTE = oldData;
 	}

 	chrome.storage.sync.set(obj, function(){
 		console.log("Note Saved!");
 	});
}

function appendNoteData(newData)
{
	chrome.storage.sync.get(null, function(items){
		var oldData = "";
		if(items.MYNOTE != undefined){
			oldData = items.MYNOTE;
		}
		addNoteData(oldData+"\n"+newData);
	});
}

function notifyMe(text) {
	chrome.notifications.create("NotificationQuickNotes", {"type": 'basic', "iconUrl": 'icon-128.png', "title": 'Quick Notes', "message": text}, function(){});
}