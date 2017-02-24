document.write('<html><head><title>Adobe DTM Debugger - BJM</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"><style type="text/css">td.de-type{cursor:pointer;text-decoration:underline}table tbody td,table thead th{padding-right:20px}body{margin:0}*{font-family:Arial,Helvetica,sans-serif}table{border:0;margin:10px 0}table thead th{text-align:left}table.info{margin:10px 0 0}table.info td{font-size:12px;color:#adadad}h1{margin-left:10px}h2{font-size: 25px}#dtm-content{padding:10px}#main{background:#252525;width:100%;height:60px}#notifications,code.language-js{white-space:-moz-pre-wrap!important;word-wrap:break-word;word-break:break-all}#data-elements .de-type,span[data-de]{text-decoration:underline}span[data-de]:hover{cursor:pointer}table td{vertical-align:top}#column1,#column2{height:100%;overflow-y:scroll}tr[data-fired=yes] td.fired{color:green} #data-elements .de-type {cursor: pointer;} #rules td.rule {text-decoration: underline; cursor: pointer;}</style><script src="https://code.jquery.com/jquery-1.12.4.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script><script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script><script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script><script src="https://cdn.rawgit.com/beautify-web/js-beautify/master/js/lib/beautify.js"></script></head><body><div id="main"><h2 style="float:right; margin: 0 20px 0 0; height:60px; line-height: 60px; padding: 0; color:#fff;">DTM Debugger</h2></div><div style="clear:both;"></div><div id="dtm-content"><div id="dtm-info"></div><br/><br/><hr><div style="color: #adadad">Report issues <a href="https://github.com/brandonJY/Disruptive-Advertising-Adobe-DTM-Debugger/issues">to Brandon</a></div><script type="text/javascript">_dtmDebug.init();</script></div><div class="modal fade" id="modal"><div class="modal-dialog"><div class="modal-content" style="overflow:auto"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title"></h4></div><div class="modal-body"><p></p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div></body></html>'),window._dtmDebug={tool:{inputPayload:function(t){var e=[];e.push('<textarea rows="4" cols="50" id="inputTxt" placeholder="Put the payload you want to split here."></textarea><br/>'),e.push('<button onclick="window._dtmDebug.tool.parsePayload()">Split payload</button><br/>'),e.push('<pre class="prettyprint" id="outputTxt" placeholder="output text"></pre>'),$("#modal").find(".modal-body p").html('<table class="table">'+e.join("")+"</table>"),$("#modal").modal("show")},parsePayload:function(t){t=document.getElementById("inputTxt").value,t=t.trim(),outputTxt=[],t.split("&").forEach(function(t){outputTxt.push(t+"<br/>"),console.log(t)},this),document.getElementById("outputTxt").innerHTML=outputTxt.join("")},parseDataElement:function(t,e,d){var a="<td>"+d+"</td>";if(d&&0==d.indexOf("%")){var i=d.replace(/%/g,""),r=t.dataElements[i],n="",s="";r&&("undefined"!=typeof r.customJS&&(n="Custom JS",s="customJS"),"undefined"!=typeof r.selector&&(n="CSS Selector",s="selector"),"undefined"!=typeof r.jsVariable&&(n="JS Variable",s="jsVariable"),"undefined"!=typeof r.cookie&&(n="Cookie",s="cookie"),"undefined"!=typeof r.queryParam&&(n="Query Parameter",s="queryParam"),a='<td class="de-type" data-type="'+s+'" onclick="window._dtmDebug.tool.dataElementClick(this)">%'+i+'%</td><td class="de-value">'+_dtmDebug.getDataElementValue(i)+"</td>")}return 0==a.length&&(a="<td>"+d+"</td>"),'<tr><td style="padding-left: 20px;">'+e+"</td>"+a+"</tr>"},dataElementClick:function(t){var e="modal-additional",d=window.opener._satellite,a=$("#"+e).length>0?$("#"+e):$("#modal").clone().attr("id",e),i=[],r=$(t).text().replace(/%/g,""),n=d.dataElements[r],s=$(t).attr("data-type");a.find(".modal-title").html('Definition for data element "<b>'+r+'"</b>'),"customJS"==s&&(i.push("<tr><td><b>Type</b></td><td>Custom JS</td></tr>"),i.push('<tr><td><b>Definition</b></td><td><pre class="prettyprint"><code class="language-js">'+js_beautify(n.customJS.toString())+"</code></pre></td></tr>")),"selector"==s&&(i.push("<tr><td><b>Type</b></td><td>CSS Selector</td></tr>"),i.push("<tr><td><b>Definition</b></td><td>"+n.selector+"</td></tr>"),i.push("<tr><td><b>Element Property</b></td><td>"+n.property+"</td></tr>")),"queryParam"==s&&(i.push("<tr><td><b>Type</b></td><td>Query Parameter</td></tr>"),i.push("<tr><td><b>Definition</b></td><td>"+n.queryParam+"</td></tr>"),i.push("<tr><td><b>Case Sensitive?</b></td><td>"+(n.ignoreCase?"Yes":"No")+"</td></tr>")),"jsVariable"==s&&(i.push("<tr><td><b>Type</b></td><td>JavaScript Variable</td></tr>"),i.push("<tr><td><b>Definition</b></td><td>"+n.jsVariable+"</td></tr>")),"cookie"==s&&(i.push("<tr><td><b>Type</b></td><td>Cookie</td></tr>"),i.push("<tr><td><b>Definition</b></td><td>"+n.cookie+"</td></tr>")),n["default"]&&i.push("<tr><td><b>Default Value</b></td><td>"+n["default"]+"</td></tr>"),i.push("<tr><td><b>Force Lowercase?</b></td><td>"+(n.forceLowerCase?"Yes":"No")+"</td></tr>"),n.storeLength&&i.push("<tr><td><b>Store Length</b></td><td>"+n.storeLength+"</td></tr>"),a.find(".modal-body p").html('<table class="table">'+i.join("")+"</table>"),PR.prettyPrint(),document.body.append(a[0]),$("#"+e).modal("show")}},rules:[{id:"pageLoadRules",name:"Page Load",fired:function(t){var e="no";return _satellite.each(_satellite.Logger.getHistory(),function(d){var a=_dtmDebug.escapeRegEx(t.name),i=new RegExp('Rule "'+a+'" fired',"i");d[1].match(i)&&(e="yes")}),e},extra:function(t){return t.event}},{id:"rules",name:"Event Based",fired:function(t){var e="no",d=_dtmDebug.escapeRegEx(t.name);return _satellite.each(_satellite.Logger.getHistory(),function(t){var a=new RegExp('Rule "'+d+'" fired',"i");t[1].match(a)&&(e="yes")}),e},extra:function(t){return t.event}},{id:"directCallRules",name:"Direct Call",fired:function(t){var e="no";return _satellite.each(_satellite.Logger.getHistory(),function(d){var a=new RegExp('Direct call Rule "'+t.name+'" fired',"i");d[1].match(a)&&(e="yes")}),e}}],saved:{showFired:!1},escapeRegEx:function(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},ruleFired:function(t,e){var d,a="no",i=window.opener._satellite,r=_dtmDebug.escapeRegEx(t.name);return"pageLoadRules"==e?d=new RegExp('Rule "'+r+'" fired',"i"):"rules"==e?d=new RegExp('Rule "'+r+'" fired',"i"):"directCallRules"==e&&(d=new RegExp('Direct call Rule "'+r+'" fired',"i")),"undefined"!=typeof i?i.each(i.Logger.getHistory(),function(t){i.isString(t[1])&&t[1].match(d)&&(a="yes")}):a="--",a},firedText:function(t){return"yes"==t&&(t='<span class="label label-success">yes</span>'),t},pageEvents:{pagebottom:"Page Bottom",pagetop:"Page Top",submit:"Form Submit"},getNotifications:function(){var t=[],e=window.opener._satellite,d=$("#custom-reverse-order").is(":checked"),a=$("#custom-notifications").is(":checked");"undefined"!=typeof e&&e.each(e.Logger.messages,function(i){if(e.isString(i[1]))if(i[1].match(/^Rule.*fired\.$|^Direct call Rule|^Condition.*for rule|^Visitor ID|^Test & Target|^GAU:|^GA Universal|^detected|^Adobe Analytics|^Cannot read stored setting from localStorage|You may be using the async installation of Satellite|^Failed to trigger|^tracking a tweet button|^tracking a facebook|added.*elements\.$|^GA:|writeHTML|: Initializing at|^Cannot load sync the|^Condition function/)){var r='<p class="dtm'+(1==a?" hidden":"")+'">'+i[1]+"</p>";d?t.unshift(r):t.push(r)}else{var r='<p class="custom">'+i[1]+"</p>";d?t.unshift(r):t.push(r)}}),$("#notifications").html(t.join(""))},init:function(){if(_dtmDebug.saved.url||(_dtmDebug.saved.url=window.opener.location.href),window._satellite=window.opener._satellite,"undefined"!=typeof _satellite&&"undefined"!=typeof _satellite.buildDate){var t=[];staging=_satellite.settings.isStaging,env=staging?"Staging":"Production",opp=staging?"Production":"Staging",rules=_dtmDebug.rules,_dtmDebug.hasLoaded=!0,_dtmDebug._loading=!1,_dtmDebug.saved.url=window.opener.location.href,t.push('<div class="col-xs-6" id="column1">'),t.push('<table class="info">'+this.getSettings(_satellite,!0)+"</table>"),t.push('<div class="clearfix"></div>'),t.push('<h2>Rules</h2><div><input type="checkbox" id="show-fired"'+(1==_dtmDebug.saved.showFired?' checked="checked"':"")+'> <label for="show-fired">Only show fired rules</label></div>'),t.push('<table id="rules" class="table table-striped"><thead><tr><th>Rule Name</th><th>Rule Type</th><th>Fired?</th><th>Other Info</th></tr></thead><tbody>'),_satellite.each(rules,function(e){var d=_satellite.configurationSettings[e.id];if(_satellite.isArray(d))_satellite.each(_satellite.configurationSettings[e.id],function(d){var a=_dtmDebug.ruleFired(d,e.id);t.push('<tr data-rule="'+d.name+'" data-type="'+e.id+'" data-fired="'+a+'"'+(1==_dtmDebug.saved.showFired&&"no"==a?' class="hidden"':"")+'><td class="rule">'+d.name+"</td><td>"+e.name+'</td><td class="fired">'+_dtmDebug.firedText(a)+"</td><td>"+(e.extra?e.extra(d):"")+"</tr>")});else if(_satellite.isObject(d))for(var a in d){var i=d[a],r=_dtmDebug.ruleFired(i,e.id);t.push('<tr data-rule="'+a+'" data-type="'+e.id+'" data-fired="'+r+'"'+(1==_dtmDebug.saved.showFired&&"no"==r?' class="hidden"':"")+'><td class="rule">'+a+"</td><td>"+e.name+'</td><td class="fired">'+_dtmDebug.firedText(r)+"</td><td>"+(e.extra?e.extra(i):"")+"</tr>")}}),t.push("</tbody></table></div>"),t.push('<div class="col-xs-6" id="column2">'),t.push("<h2>Tool Kits</h2>"),t.push('<button onclick="window._dtmDebug.tool.inputPayload()">Split payload</button>'),t.push("<h2>Configuration</h2>"),t.push('<table class="table table-striped">'),t.push("<tr><td><strong>Installed Tools:</strong></td><td>");var e={tnt:"Test & Target",sc:"Adobe Analytics",visitor_id:"Marketing Cloud ID",ga_universal:"Google Analytics Universal",adlens:"Adobe Adlens",am:"Adobe Audience Manager",ga:"Google Analytics Classic",aem:"AEM ContextHub"};for(var d in _satellite.tools){var a=_satellite.tools[d],i="";if("sc"==a.settings.engine&&window.opener.s){i="="+window.opener.s.version;var r=window.opener.s.account||window.opener.s.un;i+="<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:#adadad'>Report Suite="+r+"</span>",window.opener.s.trackingServer&&(i+="<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:#adadad'>Tracking Server="+window.opener.s.trackingServer+"</span>")}"visitor_id"==a.settings.engine&&window.opener.Visitor&&(i="="+window.opener.Visitor.version),a&&"default"!=d&&t.push('<p data-toolid="'+d+'">'+e[a.settings.engine]+i+"</p>")}t.push("</td></tr>"),t.push("</table>"),t.push("<h2>Data Elements</h2>"),t.push('<table id="data-elements" class="table table-striped"><thead><tr><th>Name</th><th>Type</th><th>Value</th></tr></thead><tbody>');for(var n in _satellite.dataElements){var s=_satellite.dataElements[n],o="",l="";"undefined"!=typeof s.customJS&&(o="Custom JS",l="customJS"),"undefined"!=typeof s.selector&&(o="CSS Selector",l="selector"),"undefined"!=typeof s.jsVariable&&(o="JS Variable",l="jsVariable"),"undefined"!=typeof s.cookie&&(o="Cookie",l="cookie"),"undefined"!=typeof s.queryParam&&(o="Query Parameter",l="queryParam"),t.push('<tr data-dename="'+n+'" data-type="'+l+'"><td>'+n+'</td><td class="de-type" data-type="'+l+'">'+o+'</td><td class="de-value">'+_dtmDebug.getDataElementValue(n)+"</td></tr>")}t.push("</tbody></table>"),t.push('<h2>DTM Notifications</h2><div><label><input type="checkbox" id="custom-notifications"'+(1==_dtmDebug.saved.onlyCustom?' checked="checked"':"")+'> Only show custom notifications</label> <label><input type="checkbox" id="custom-reverse-order"'+(1==_dtmDebug.saved.reverse?' checked="checked"':"")+'> Show newest notifications on top</label></div><div class="panel panel-default"><div class="panel-body" id="notifications">'),t.push("</div></div>"),jQuery("#dtm-info").html(t.join("")),jQuery("#custom-reverse-order").on("click",function(){_dtmDebug.saved.reverse=$(this).is(":checked"),_dtmDebug.getNotifications()}),jQuery(document).on("hidden.bs.modal",".modal",function(){$(".modal:visible").length&&$(document.body).addClass("modal-open")}),jQuery("#rules tbody .rule").on("click",function(){var t=window.opener._satellite,d=$("#modal"),a=$(this).parents("tr").attr("data-rule"),i=$(this).parents("tr").attr("data-type"),r=[],n=!1;t.each(t[i],function(i){if(i.name==a){d.find(".modal-title").html('Definition for rule "<b>'+a+'</b>"');var s=_dtmDebug.pageEvents[i.event]||i.event;if(s&&r.push("<tr><td><b>Triggers At</b></td><td>"+s+"</td></tr>"),i.selector&&r.push("<tr><td><b>CSS Selector</b></td><td>"+i.selector+"</td></tr>"),i.scope&&r.push("<tr><td><b>Condition</b></td><td>"+JSON.stringify(i.scope)+"</td></tr>"),i.conditions&&r.push('<tr><td><b>Condition</b></td><td><pre class="prettyprint"><code class="language-js">'+js_beautify(i.conditions.toString())+"</code></pre></td></tr>"),null!=i.bubbleFireIfParent){var o=i.bubbleFireIfParent?" (default)":"";r.push("<tr><td><b>Allow child elements to bubble</b></td><td>"+i.bubbleFireIfParent+o+"</td></tr>")}if(null!=i.bubbleFireIfChildFired){var o=i.bubbleFireIfChildFired?" (default)":"";r.push("<tr><td><b>Do not allow if child element already triggers</b></td><td>"+!i.bubbleFireIfChildFired+o+"</td></tr>")}if(null!=i.bubbleStop){var o=i.bubbleStop?"":" (default)";r.push("<tr><td><b>Do not allow to bubble to parents</b></td><td>"+i.bubbleStop+o+"</td></tr>")}i.trigger&&t.each(i.trigger,function(d){if(d.engine){if(n||"sc"!=d.engine||(n=!0,r.push('<tr><td colspan="2"><b>'+e[d.engine]+"</b></td></tr>")),"sc"==d.engine)if("setVars"==d.command)t.each(d.arguments,function(e){for(var d in e)r.push(window._dtmDebug.tool.parseDataElement(t,d,e[d]))});else if("addEvent"==d.command)r.push('<tr><td style="padding-left: 20px;">events</td><td>'+d.arguments.join(","));else if("customSetup"==d.command)r.push('<tr><td style="padding-left: 20px;">Custom Code</td><td><pre class="prettyprint"><code class="language-js">'+js_beautify(d.arguments[0].toString())+"</code></pre></td></tr>");else if("trackLink"==d.command||"trackPageView"==d.command){var a={o:"Custom Link",d:"File Download",e:"Exit Link"};if("trackLink"==d.command&&(r.push('<tr><td style="padding-left: 20px;">Hit Type</td><td>'+a[d.arguments[0].type]+"</td></tr>"),r.push('<tr><td style="padding-left: 20px;">Link Name</td><td>'+d.arguments[0].linkName+"</td></tr>")),t.isObject(d.arguments[0].setVars))for(var i in d.arguments[0].setVars)r.push(window._dtmDebug.tool.parseDataElement(t,i,d.arguments[0].setVars[i]));d.arguments[0].addEvent&&r.push('<tr><td style="padding-left: 20px;">events</td><td>'+d.arguments[0].addEvent.join(",")),d.arguments[0].customSetup&&r.push('<tr><td style="padding-left: 20px;">Custom Code</td><td><pre class="prettyprint"><code class="language-js">'+d.arguments[0].customSetup.toString()+"</code></pre></td></tr>")}}else d.command&&(r.push('<tr><td colspan="2"><b>'+d.command+"</b></td></tr>"),d.arguments&&t.each(d.arguments,function(e){for(var d in e)"scripts"==d?(r.push('<tr><td style="padding-left: 20px;">'+d+"</td>"),t.each(e[d],function(e,d){d>0&&r.push("<td></td>"),r.push('<td><a href="http://assets.adobedtm.com/'+t.settings.scriptDir+e.src+'" target="_blank">'+JSON.stringify(e.src)+"</a ></td ></tr >")})):r.push('<tr><td style="padding-left: 20px;">'+d+"</td><td>"+e[d]+"</td></tr>")}))}),console.log(i)}}),d.find(".modal-body p").html('<table class="table">'+r.join("")+"</table>"),PR.prettyPrint(),$("#modal").modal("show")}),jQuery("#data-elements .de-type").on("click",function(){var t=window.opener._satellite,e=$("#modal"),d=[],a=$(this).parents("tr").attr("data-dename"),i=t.dataElements[a],r=$(this).attr("data-type");e.find(".modal-title").html('Definition for data element "<b>'+a+'"</b>'),"customJS"==r&&(d.push("<tr><td><b>Type</b></td><td>Custom JS</td></tr>"),d.push('<tr><td><b>Definition</b></td><td><pre class="prettyprint"><code class="language-js">'+js_beautify(i.customJS.toString())+"</code></pre></td></tr>")),"selector"==r&&(d.push("<tr><td><b>Type</b></td><td>CSS Selector</td></tr>"),d.push("<tr><td><b>Definition</b></td><td>"+i.selector+"</td></tr>"),d.push("<tr><td><b>Element Property</b></td><td>"+i.property+"</td></tr>")),"queryParam"==r&&(d.push("<tr><td><b>Type</b></td><td>Query Parameter</td></tr>"),d.push("<tr><td><b>Definition</b></td><td>"+i.queryParam+"</td></tr>"),d.push("<tr><td><b>Case Sensitive?</b></td><td>"+(i.ignoreCase?"Yes":"No")+"</td></tr>")),"jsVariable"==r&&(d.push("<tr><td><b>Type</b></td><td>JavaScript Variable</td></tr>"),d.push("<tr><td><b>Definition</b></td><td>"+i.jsVariable+"</td></tr>")),"cookie"==r&&(d.push("<tr><td><b>Type</b></td><td>Cookie</td></tr>"),d.push("<tr><td><b>Definition</b></td><td>"+i.cookie+"</td></tr>")),i["default"]&&d.push("<tr><td><b>Default Value</b></td><td>"+i["default"]+"</td></tr>"),d.push("<tr><td><b>Force Lowercase?</b></td><td>"+(i.forceLowerCase?"Yes":"No")+"</td></tr>"),i.storeLength&&d.push("<tr><td><b>Store Length</b></td><td>"+i.storeLength+"</td></tr>"),e.find(".modal-body p").html('<table class="table">'+d.join("")+"</table>"),PR.prettyPrint(),$("#modal").modal("show")})}else 1==_dtmDebug.hasLoaded?(jQuery("#dtm-info").html('<div class="text-center"><i class="fa fa-spinner fa-pulse"></i> Waiting for new page to load...</div>'),_dtmDebug._loading=!0):jQuery("#dtm-info").html('<div class="text-center"><h1>DTM is not installed on this page!</h1><br><img src="//www.disruptiveadvertising.com/wp-content/uploads/2015/09/run-dtm.jpg"></div>');$("#show-fired").on("click",function(){_dtmDebug.saved.showFired=$(this).is(":checked"),$(this).is(":checked")?$('table#rules tbody tr[data-fired="no"]').addClass("hidden"):$("table#rules tbody tr").removeClass("hidden")}),$("#custom-notifications").on("click",function(){_dtmDebug.saved.onlyCustom=$(this).is(":checked"),$(this).is(":checked")?$("#notifications p.dtm").addClass("hidden"):$("#notifications p").removeClass("hidden")}),_dtmDebug.getNotifications(),setTimeout(function(){_dtmDebug.refresh()},1500)},getDataElementValue:function(t){try{return window.opener._satellite.getDataElement.call(window.opener._satellite,t)||window.opener._satellite.dataElementSafe.pageviewCache[t]||""}catch(e){return""}},getSettings:function(t,e){var d=t.settings.isStaging,a=d?"Staging":"Production",i=d?"Production":"Staging",r=' <button class="btn btn-default btn-xs" type="button" onclick="_dtmDebug.toggleEnvironment();">Load '+i+"</button>",n=[];return t.cssQuery('script[src*="'+t.settings.libraryName+'"]',function(t){1==t.length&&t[0].src.match(/-staging/)&&(r="")}),n.push("<tr><td>Current Environment:</td><td>"+a+r+"</td></tr>"),n.push("<tr><td>Current URL:</td><td>"+window.opener.location.href+"</td></tr>"),n.push("<tr><td>Web Property ID:</td><td>"+t.settings.libraryName+"</td></tr>"),1==a?n.push("<tr><td>Build Date:</td><td>"+t.buildDate+"</td></tr>"):n.push("<tr><td>Publish Date:</td><td>"+t.publishDate+"</td></tr>"),e===!0?n.join(""):void $("table.info").html(n.join(""))},refresh:function(){var t=window.opener._satellite;"undefined"!=typeof t?(_dtmDebug.saved.url==window.opener.location.href||_dtmDebug._loading||(_dtmDebug._loading=!0),1==_dtmDebug._loading?_dtmDebug.init():(t.each(_dtmDebug.rules,function(e){t.each(t.configurationSettings[e.id],function(t){var d=_dtmDebug.ruleFired(t,e.id),a=$('#rules tr[data-rule="'+t.name+'"]');d!=a.attr("data-fired")&&(a.attr("data-fired",d),a.find("td.fired").html(_dtmDebug.firedText(d)),a.css("background-color","#ddddff"),setTimeout(function(){a.css("background-color","transparent"),a.effect("highlight",{color:"#ddddff"},3e3)},1500),$("#show-fired").is(":checked")&&("yes"==d&&a.hasClass("hidden")?a.removeClass("hidden"):"no"!=d||a.hasClass("hidden")||a.addClass("hidden")))})}),_dtmDebug.getDataElements(t),_dtmDebug.getNotifications(),_dtmDebug.getSettings(t))):_dtmDebug.init(),setTimeout(function(){_dtmDebug.refresh()},1e3)},getDataElements:function(t){for(var e in t.dataElements){var d=$("#data-elements").find('tr[data-dename="'+e+'"]');if(d.size()>0){var a=_dtmDebug.getDataElementValue(e),i=d.find(".de-value").text();a!=i&&d.find(".de-value").text(a)}}},toggleEnvironment:function(){var t=window.opener._satellite;t&&(1==t.settings.isStaging?window.opener.localStorage.removeItem("sdsat_stagingLibrary"):window.opener.localStorage.setItem("sdsat_stagingLibrary",!0),window.opener.location.reload())}};