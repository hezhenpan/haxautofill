// ==UserScript==
// @name         HAX助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动填充账号密码,自动勾选CheckBox,抢购路上快人一步
// @author       DDP
// @match        *://*hax.co.id/*
// @match        *://woiden.id/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest
// @require      https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    //基本功能：自动填充

    var userid = ""
    var passwd = ""
    var clienttoken = ""
    var pushurl = "https://66.meta2.ml/pushinfo"

    //登录
    if (userid) {
        $("#text").val(userid);
    }

    // 所有需要输入密码都会填充这个密码
    $("#password").val(passwd);

    //创建
    //勾选 checkBox
    $(".form-check-input").each(function() {
        $(this).attr('checked', true);
    });
    //$("#checkbox").attr('checked', 'checked');

    // 创建 选择操作系统
    $("#os").val("ubuntu-20");
    $("#purpose").val("Web Server");


    // 删除 确认文本框
    $("#remove").val("AGREE");

    // 续期 确认文本框
    $("#web_address").val($("#web_address").attr('placeholder'));

    // 获取 详细信息
    var wsite = window.location.host;
    var dt = $("label:contains('Valid until')").next().text().trim();
    var nm = $("label:contains('Hostname')").next().text().trim().replace(/\s/g,"");
    var ip = $("label:contains('IPv6 Subnet')").next().text().trim().replace(/\s/g,"");
    var loc = $("label:contains('Location')").next().text().trim().replace(/\s/g,"");
    console.log("截止日期: ", dt, "账号ID: ", nm, "IPv6:", ip, "Location:", loc, "wsite:", wsite);

    if (nm && clienttoken) {

        GM_xmlhttpRequest({
            method: "POST",
            url: pushurl,
            data: "tgid="+nm+"&date="+dt+"&clitk="+clienttoken+"&ip="+ip+"&loc="+loc+"&wsite="+wsite,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response){
                console.log("上报结果: ", response.responseText);

                $("body > div:nth-child(3) > div").append('<div class="alert alert-info">'+ '上报DDP结果: ' + response.responseText +'</div>')
            }
        });

    }


})();
