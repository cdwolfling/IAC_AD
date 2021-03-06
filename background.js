﻿function getDomainFromUrl(url){
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
	if(getDomainFromUrl(tab.url).toLowerCase()=="mail.google.com"){
		chrome.pageAction.show(tabId);
	}
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

var articleData = {};
articleData.error = "加载中...";
//chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
//	if(request.type!=="cnblog-article-information")
//		return;
//	articleData = request;
//	articleData.MemberInfo = "获取中...";
//	if(!articleData.error){
//		$.ajax({
//		    url: "http://127.0.0.1:45280/Default.aspx",
//			cache: false,
//			type: "POST",
//			data: JSON.stringify({url:articleData.url}),
//			dataType: "json"
//		}).done(function(msg) {
//			if(msg.error){
//				articleData.MemberInfo = msg.error;
//			} else {
//				articleData.MemberInfo = msg.MemberInfo;
//			}
//		}).fail(function(jqXHR, textStatus) {
//			articleData.MemberInfo = textStatus;
//		});
//	}
//});
