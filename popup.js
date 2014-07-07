/// <reference path="/Scripts/jquery-1.4.1-vsdoc.js" />

var articleData = {};
articleData.error = "加载中...";

// Search the groupname info when change the search keyword.--not work with textext.js
$(function () {
    $('#search').change(
        function () {
            $('#groupinfo').empty();
            $.ajax({
                url: "http://psd1935-v.iacp.iac/FIS/MAY/GetIacAdInfo/Default.aspx",
                cache: false,
                type: "POST",
                data: JSON.stringify({ url: $('#search').val() }),
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

// Search the groupname info when keydown the search keyword.
$(function () {
    $('#search').keydown(
        function () {
            $('#groupinfo').empty();
            $.ajax({
                url: "http://psd1935-v.iacp.iac/FIS/MAY/GetIacAdInfo/Default.aspx",
                cache: false,
                type: "POST",
                data: JSON.stringify({ url: $('#search').val() }),
                dataType: "json"
            }).done(function (msg) {
                $('#groupinfo').append("<pre>");
                $.each(msg, function (index, element) {
                    if (element.error) {
                        $('#groupinfo').append(element.error);
                    } else {
                        if (element.Name.trim() != "") {
                            $('#groupinfo').append(element.Name  + "<br>");
                            //$('#groupinfo').append(element.Name + "&#9;" + element.AdGroup + "<br>");
                        }
                    }
                })
                $('#groupinfo').append("</pre>");
            }).fail(function(jqXHR, textStatus) {
                $('#groupinfo').append("the status of the request: "+textStatus);
            });
        });
});

function GetGroupInfo() {
    $('#groupinfo').empty();
    $.ajax({
        url: "http://psd1935-v.iacp.iac/FIS/MAY/GetIacAdInfo/Default.aspx",
        cache: false,
        type: "POST",
        data: JSON.stringify({ url: $('#search').val() }),
        dataType: "json"
    }).done(function (msg) {
        $.each(msg, function (index, element) {
            if (element.error) {
                $('#groupinfo').append(element.error);
            } else {
                $('#groupinfo').append(element.Name + "<br>");
            }
        })
    }).fail(function (jqXHR, textStatus) {
        $('#groupinfo').append(textStatus);
    });
}

function dumpgroupinfo(query) {
    var articleData = {};
    articleData.error = "加载中...";
    articleData.Name = "获取中...";
    $.ajax({
        url: "http://psd1935-v.iacp.iac/FIS/MAY/GetIacAdInfo/Default.aspx",
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
