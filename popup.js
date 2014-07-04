/// <reference path="/Scripts/jquery-1.4.1-vsdoc.js" />

var articleData = {};
articleData.error = "加载中...";

// Search the groupname info when entering the search keyword.
$(function () {
    $('#search').change(
    function () {
        $('#groupinfo').empty();
        $.ajax({
            url: "http://127.0.0.1:45280/Default.aspx",
            cache: false,
            type: "POST",
            data: JSON.stringify({ url: $('#search').val() }),
            dataType: "json"
        }).done(function (msg) {
            $.each(msg, function (index, element) {
                if (element.error) {
                    $('#groupinfo').append(element.error);
                } else {
                    $('#groupinfo').append(element.firstAccess + "<br>");
                }
            })
        }).fail(function (jqXHR, textStatus) {
            $('#groupinfo').append(textStatus);
        });
    });
});

function GetGroupInfo() {
    $('#groupinfo').empty();
    $.ajax({
        url: "http://127.0.0.1:45280/Default.aspx",
        cache: false,
        type: "POST",
        data: JSON.stringify({ url: $('#search').val() }),
        dataType: "json"
    }).done(function (msg) {
        $.each(msg, function (index, element) {
            if (element.error) {
                $('#groupinfo').append(element.error);
            } else {
                $('#groupinfo').append(element.firstAccess + "<br>");
            }
        })
    }).fail(function (jqXHR, textStatus) {
        $('#groupinfo').append(textStatus);
    });
}

function dumpgroupinfo(query) {
    var articleData = {};
    articleData.error = "加载中...";
    articleData.firstAccess = "获取中...";
    $.ajax({
        url: "http://127.0.0.1:45280/Default.aspx",
        cache: false,
        type: "POST",
        data: JSON.stringify({ url: $('#search').val() }),
        dataType: "json"
    }).done(function (msg) {
        if (msg.error) {
            articleData.firstAccess = msg.error;
        } else {
            articleData.firstAccess = msg.firstAccess;
        }
    }).fail(function (jqXHR, textStatus) {
        articleData.firstAccess = textStatus;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var data = chrome.extension.getBackgroundPage().articleData;
    if (data.error) {
        $("#message").text(data.error);
        $("#content").hide();
        $("#search").val("EIT");
    } else {
        $("#message").hide();
        $("#content-title").text(data.title);
        $("#content-author").text(data.author);
        $("#content-date").text(data.postDate);
        $("#content-first-access").text(data.firstAccess);
        $("#search").val("MIT");
    }
});

$('#search')
        .textext({
            plugins: 'prompt autocomplete arrow'
        })
        .bind('getSuggestions', function (e, data) {
            var list = [
            'FISMonitor',
'HPStorAlertIACP',
'IAC(IS&T-WebFlowAlert)',
'IAC(Maintenance)',
'IACN(Change)',
'IACP(AL_7A_Arctic)',
'IACP(Change)',
'IACP(CX500 Alert)',
'IACP(DL/IDL未維護SAP警報群組)',
'IACP(Dragon CPK Alert Group)',
'IACP(Dragon&Tymon CR Alert)',
'IACP(EVA6000 Alert)',
'IACP(HP Insight Manager(SIM))',
'IACP(Marlins IMEI Alert Mail)',
'IACP(MAY IT-PSD Alert)',
'IACP(SMT CVS Part Alert)',
'IACP(TED PCB Alert Group)',
'IACP(TRUMP MAC Address Alert Mail)',
'IACP(Tymon FIS Alert)',
'IACP(Venus FIS alert)',
'IACT(Change)',
'NSAlertMail',
'WEBFLOWMonitor'
                ],
                textext = $(e.target).textext()[0],
                query = (data ? data.query : '') || ''
                ;

            $(this).trigger(
                'setSuggestions',
                { result: textext.itemManager().filter(list, query) }
            );
        })
        ;
