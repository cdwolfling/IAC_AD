/// <reference path="/Scripts/jquery-1.4.1-vsdoc.js" />

var articleData = {};
articleData.error = "加载中...";

// Search the groupname info when change the search keyword.
$(function () {
    $('#search').change(
        function () {
            $('#groupinfo').empty();
            $.ajax({
                url: "http://psd1926.iacp.iac/FIS/MAY/GetIacAdInfo/Json_GetUsersOfGroup.aspx",
                cache: false,
                type: "POST",
                data: JSON.stringify({ GroupName: $('#search').val() }),
                dataType: "json"
            }).done(function (msg) {
                $.each(msg, function (index, element) {
                    if (element.error) {
                        $('#groupinfo').append(element.error);
                    } else {
                        $('#groupinfo').append(element.Name +element.AdGroup + "<br>");
                    }
                })
            }).fail(function(jqXHR, textStatus) {
                $('#groupinfo').append("the status of the request: "+textStatus);
            });
        });
});

function dumpgroupinfo(query) {
    var articleData = {};
    articleData.error = "加载中...";
    articleData.Name = "获取中...";
    $.ajax({
        url: "http://psd1926.iacp.iac/FIS/MAY/GetIacAdInfo/Jsonp_Json_GetUsersOfGroup.aspx",
        cache: false,
        type: "POST",
        data: JSON.stringify({ url: $('#search').val() }),
        dataType: "json"
    }).done(function (msg) {
        if (msg.error) {
            articleData.Name = msg.error;
        } else {
            articleData.Name = msg.Name;
        }
    }).fail(function (jqXHR, textStatus) {
        articleData.Name = textStatus;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var data = chrome.extension.getBackgroundPage().articleData;
    if (data.error) {
        //$("#message").text(data.error);
        $("#content").hide();
    } else {
        $("#message").hide();
        $("#content-title").text(data.title);
        $("#content-author").text(data.author);
        $("#content-date").text(data.postDate);
        $("#content-first-access").text(data.Name);
        $("#search").val("MIT");
    }
});
