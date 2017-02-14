document.write('<html><head><title>Adobe DTM Debugger - BJM</title>'
               +'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">'
               +'<style type="text/css">td.de-type{cursor:pointer;text-decoration:underline}table tbody td,table thead th{padding-right:20px}body{margin:0}*{font-family:Arial,Helvetica,sans-serif}table{border:0;margin:10px 0}table thead th{text-align:left}table.info{margin:10px 0 0}table.info td{font-size:12px;color:#adadad}h1{margin-left:10px}h2{font-size: 25px}#dtm-content{padding:10px}#main{background:#252525;width:100%;height:60px}#notifications,code.language-js{white-space:-moz-pre-wrap!important;word-wrap:break-word;word-break:break-all}#data-elements .de-type,span[data-de]{text-decoration:underline}span[data-de]:hover{cursor:pointer}table td{vertical-align:top}#column1,#column2{height:100%;overflow-y:scroll}tr[data-fired=yes] td.fired{color:green} #data-elements .de-type {cursor: pointer;} #rules td.rule {text-decoration: underline; cursor: pointer;}</style>'
               +'<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>'
               +'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>'
               +'<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>'
               +'<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>'
                 +'<script src="https://cdn.rawgit.com/beautify-web/js-beautify/master/js/lib/beautify.js"></script>'
               +'</head><body>'
               +'<div id="main">'
               +'<h2 style=\"float:right; margin: 0 20px 0 0; height:60px; line-height: 60px; padding: 0; color:#fff;\">DTM Debugger</h2>'
               +'</div>'
               +'<div style=\"clear:both;\"></div>'
               +'<div id="dtm-content">'
               +'<div id=\"dtm-info\"></div>'
               +'<br/><br/><hr>'
               +'<div style="color: #adadad">Report issues <a href="https://github.com/brandonJY/Disruptive-Advertising-Adobe-DTM-Debugger/issues">to Brandon</a></div>'
               +'<script type="text/javascript">_dtmDebug.init();<\/script>'
               +'</div>'
               +'<div class="modal fade" id="modal">'
               +'<div class="modal-dialog">'
               +'<div class="modal-content" style="overflow:auto">'
               +'<div class="modal-header">'
               +'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
               +'<h4 class="modal-title"></h4>'
               +'</div>'
               +'<div class="modal-body">'
               +'<p></p>'
               +'</div>'
               +'<div class="modal-footer">'
               +'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
               +'</div>'
               +'</div>'
               +'</div>'
               +'</div>'
               +'</body></html>');
//origin: http://assets.adobedtm.com/d00638433326249dc42ea6fc89a4f65bfba18066/scripts/satellite-55fae9a2666337593b0005c2.js
window._dtmDebug = {
  tool:{
    inputPayload: function(e){
      var strHtml=[]
      strHtml.push('<textarea rows="4" cols="50" id="inputTxt" placeholder="Put the payload you want to split here."></textarea><br/>');
      strHtml.push('<button onclick=\"window._dtmDebug.tool.parsePayload()\">Split payload</button><br/>');
      strHtml.push('<pre class="prettyprint" id="outputTxt" placeholder="output text"></pre>');
      
      $('#modal').find('.modal-body p').html('<table class="table">'+strHtml.join('')+'</table>');
      $('#modal').modal('show');

    },
    parsePayload: function(str){
      str=document.getElementById("inputTxt").value;
      str=str.trim();
      outputTxt=[];
       str.split("&").forEach(function(para) {
          outputTxt.push(para+"<br/>");
	        console.log(para);
	    }, this);
      document.getElementById("outputTxt").innerHTML=outputTxt.join('');
    },
    parseDataElement:function(_satellite,a,arg_a){
       var displayTxt='<td>'+arg_a+'</td>';
       if(arg_a&&arg_a.indexOf('%')==0){
          var dName=arg_a.replace(/%/g,'');
          var de = _satellite.dataElements[dName],
                type = '',
                deType = '';
          if(de){
              if(typeof de.customJS != "undefined"){
                type = "Custom JS";
                deType = "customJS";
              }
              if(typeof de.selector != "undefined"){
                type = "CSS Selector";
                deType = "selector";
              }
              if(typeof de.jsVariable != "undefined"){
                type = "JS Variable";
                deType = "jsVariable";
              }
              if(typeof de.cookie != "undefined"){
                type = "Cookie";
                deType = "cookie";
              }
              if(typeof de.queryParam != "undefined"){
                type = "Query Parameter";
                deType = "queryParam";
              }
              displayTxt= '<td class="de-type" data-type="'+deType+'" onclick="window._dtmDebug.tool.dataElementClick(this)">%'+dName+'%</td><td class="de-value">'+_dtmDebug.getDataElementValue(dName)+'</td>';
          }
       }
       if(displayTxt.length==0) displayTxt='<td>'+arg_a+'</td>';
       return '<tr><td style="padding-left: 20px;">'+a+'</td>'+displayTxt+'</tr>';
    },
    dataElementClick:function(obj){
         var displayElemId='modal-additional';
          
         var _satellite = window.opener._satellite,
           $m = $('#' + displayElemId).length > 0 ? $('#' + displayElemId) : $('#modal').clone().attr('id', displayElemId),
            def = [],
            name = $(obj).text().replace(/%/g,''),
            de = _satellite.dataElements[name],
            type = $(obj).attr('data-type');
        $m.find('.modal-title').html('Definition for data element "<b>'+name+'"</b>');
        if(type == 'customJS'){
          def.push('<tr><td><b>Type</b></td><td>Custom JS</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td><pre class="prettyprint"><code class="language-js">'+js_beautify(de.customJS.toString())+'</code></pre></td></tr>');
        }
        if(type == 'selector'){
          def.push('<tr><td><b>Type</b></td><td>CSS Selector</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td>'+de.selector+'</td></tr>');
          def.push('<tr><td><b>Element Property</b></td><td>'+de.property+'</td></tr>');
        }
        if(type == 'queryParam'){
          def.push('<tr><td><b>Type</b></td><td>Query Parameter</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td>'+de.queryParam+'</td></tr>');
          def.push('<tr><td><b>Case Sensitive?</b></td><td>'+(de.ignoreCase ? 'Yes' : 'No')+'</td></tr>');
        }
        if(type == 'jsVariable'){
          def.push('<tr><td><b>Type</b></td><td>JavaScript Variable</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td>'+de.jsVariable+'</td></tr>');
        }
        if(type == 'cookie'){
          def.push('<tr><td><b>Type</b></td><td>Cookie</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td>'+de.cookie+'</td></tr>');
        }
        if(de.default){
          def.push('<tr><td><b>Default Value</b></td><td>'+de.default+'</td></tr>');
        }
        def.push('<tr><td><b>Force Lowercase?</b></td><td>'+(de.forceLowerCase ? 'Yes' : 'No')+'</td></tr>');
        if(de.storeLength){
          def.push('<tr><td><b>Store Length</b></td><td>'+de.storeLength+'</td></tr>');
        }
        $m.find('.modal-body p').html('<table class="table">'+def.join('')+'</table>');
        PR.prettyPrint();
        document.body.append($m[0]);
        $('#'+displayElemId).modal('show');
      }
  },
  rules : [
    {
      id: "pageLoadRules",
      name: "Page Load",
      fired: function(r){
        var fired = "no";
        _satellite.each(_satellite.Logger.getHistory(), function(msg){
          var name = _dtmDebug.escapeRegEx(r.name),
              regex = new RegExp("Rule \""+name+"\" fired", "i");
          if(msg[1].match(regex)){
            fired = 'yes';
          }
        });
        return fired;
      },
      extra: function(r){
        return r.event;
      }
    },
    {
      id: "rules",
      name: "Event Based",
      fired: function(r){
        var fired = "no",
            name = _dtmDebug.escapeRegEx(r.name);
        _satellite.each(_satellite.Logger.getHistory(), function(msg){
          var regex = new RegExp("Rule \""+name+"\" fired", "i");
          if(msg[1].match(regex)){
            fired = 'yes';
          }
        });
        return fired;
      },
      extra: function(r){
        return r.event;
      }
    },
    {
      id: "directCallRules",
      name: "Direct Call",
      fired: function(r){
        var fired = "no";
        _satellite.each(_satellite.Logger.getHistory(), function(msg){
          var regex = new RegExp("Direct call Rule \""+r.name+"\" fired", "i");
          if(msg[1].match(regex)){
            fired = 'yes';
          }
        });
        return fired;
      }
    }
  ],
  saved: {
    showFired: false
  },
  escapeRegEx: function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  },
  ruleFired: function(r, type){
    var fired = "no",
        regex,
        _satellite = window.opener._satellite,
        name = _dtmDebug.escapeRegEx(r.name);

    if(type == 'pageLoadRules'){
      regex = new RegExp("Rule \""+name+"\" fired", "i");
    }
    else if(type == 'rules'){
      regex = new RegExp("Rule \""+name+"\" fired", "i");
    }
    else if(type == 'directCallRules'){
      regex = new RegExp("Direct call Rule \""+name+"\" fired", "i");
    }
    if(typeof _satellite != 'undefined'){
      _satellite.each(_satellite.Logger.getHistory(), function(msg){
        if(_satellite.isString(msg[1])){
          if(msg[1].match(regex)){
            fired = 'yes';
          }
        }
      });
    }
    else {
      fired = '--';
    }
    return fired;
  },
  firedText: function(txt){
    if(txt == "yes"){
      txt = '<span class="label label-success">yes</span>';
    }
    return txt;
  },
  pageEvents: {
    pagebottom:'Page Bottom',
    pagetop:'Page Top',
    submit:'Form Submit'
  },
  getNotifications: function(){
    var msgs = [],
        _satellite = window.opener._satellite,
        reverse = $('#custom-reverse-order').is(':checked'),
        onlyCustom = $('#custom-notifications').is(':checked');

    if(typeof _satellite != 'undefined'){
      _satellite.each(_satellite.Logger.messages, function(msg){
        // custom messages
        if(_satellite.isString(msg[1])){
          if(!msg[1].match(/^Rule.*fired\.$|^Direct call Rule|^Condition.*for rule|^Visitor ID|^Test & Target|^GAU:|^GA Universal|^detected|^Adobe Analytics|^Cannot read stored setting from localStorage|You may be using the async installation of Satellite|^Failed to trigger|^tracking a tweet button|^tracking a facebook|added.*elements\.$|^GA:|writeHTML|: Initializing at|^Cannot load sync the|^Condition function/)){
            var m = '<p class="custom">'+msg[1]+'</p>';
            if(reverse)
              msgs.unshift(m)
              else
                msgs.push(m);
          }
          // DTM messages
          else {
            var m = '<p class="dtm'+(onlyCustom == true ? ' hidden' : '')+'">'+msg[1]+'</p>';
            if(reverse)
              msgs.unshift(m)
              else
                msgs.push(m);
          }
        }
      });
    }
    $('#notifications').html(msgs.join(''));
  },
  init: function(){
    if(!_dtmDebug.saved.url){
      _dtmDebug.saved.url = window.opener.location.href;
    }
    window._satellite = window.opener._satellite;
    if(typeof _satellite != "undefined" && typeof _satellite.buildDate != 'undefined'){
      var html = []
      staging = _satellite.settings.isStaging,
        env = staging ? 'Staging' : 'Production',
        opp = staging ? 'Production' : 'Staging',
        rules = _dtmDebug.rules;

      _dtmDebug.hasLoaded = true;
      _dtmDebug._loading = false;
      _dtmDebug.saved.url = window.opener.location.href;

      /* COLUMN 1 */
      html.push('<div class="col-xs-6" id="column1">');

      html.push('<table class="info">'+this.getSettings(_satellite,true)+'</table>');
      html.push('<div class="clearfix"></div>');

      html.push('<h2>Rules</h2><div><input type="checkbox" id="show-fired"'+(_dtmDebug.saved.showFired == true ? ' checked="checked"' : '')+'> <label for="show-fired">Only show fired rules</label></div>');
      html.push('<table id="rules" class="table table-striped"><thead><tr><th>Rule Name</th><th>Rule Type</th><th>Fired?</th><th>Other Info</th></tr></thead><tbody>');
      _satellite.each(rules, function(rule){
        var rls = _satellite.configurationSettings[rule.id];
        if(_satellite.isArray(rls)){
          _satellite.each(_satellite.configurationSettings[rule.id], function(r){
            var f = _dtmDebug.ruleFired(r, rule.id);
            html.push('<tr data-rule="'+r.name+'" data-type="'+rule.id+'" data-fired="'+f+'"'+(_dtmDebug.saved.showFired == true && f == 'no' ? ' class="hidden"' : '')+'><td class="rule">'+r.name+'</td><td>'+rule.name+'</td><td class="fired">'+_dtmDebug.firedText(f)+'</td><td>'+(rule.extra ? rule.extra(r) : '')+'</tr>');
          });
        }
        else if(_satellite.isObject(rls)){
          for(var obj in rls){
            var r = rls[obj],
                f = _dtmDebug.ruleFired(r, rule.id);
            html.push('<tr data-rule="'+obj+'" data-type="'+rule.id+'" data-fired="'+f+'"'+(_dtmDebug.saved.showFired == true && f == 'no' ? ' class="hidden"' : '')+'><td class="rule">'+obj+'</td><td>'+rule.name+'</td><td class="fired">'+_dtmDebug.firedText(f)+'</td><td>'+(rule.extra ? rule.extra(r) : '')+'</tr>');
          }
        }
      });
      html.push('</tbody></table></div>');
      /* END COLUMN 1 */

      /* COLUMN 2 */
      html.push('<div class="col-xs-6" id="column2">');

      //tool kits
      html.push('<h2>Tool Kits</h2>');
      html.push('<button onclick=\"window._dtmDebug.tool.inputPayload()\">Split payload</button>');
      
      //configuration tool settings
      html.push("<h2>Configuration</h2>");
      html.push('<table class="table table-striped">');
      //<tr><td><strong>Environment:</strong></td><td>'+(_satellite.settings.isStaging == true ? "Staging" : "Production")+'</td></tr>
      html.push("<tr><td><strong>Installed Tools:</strong></td><td>");
      var toolNames = {
        "tnt": "Test & Target",
        "sc": "Adobe Analytics",
        "visitor_id": "Visitor ID",
        "ga_universal": "Google Analytics Universal",
        "adlens": "Adobe Adlens",
        "am": "Adobe Audience Manager",
        "ga": "Google Analytics Classic"
      };
      for(var tools in _satellite.tools){
        var tool = _satellite.tools[tools];
        var version='';
        if(tool.settings.engine=='sc'&&window.opener.s) {
          version="="+window.opener.s.version;
          version+="<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:#adadad'>Report Suite="+window.opener.s.account+"</span>";
          if(window.opener.s.trackingServer)
            version+="<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:#adadad'>Tracking Server="+window.opener.s.trackingServer+"</span>";
        }
        if(tool.settings.engine=='visitor_id'&&window.opener.Visitor) version="="+window.opener.Visitor.version;
        if(tool && tools != 'default')
          html.push('<p data-toolid="'+tools+'">'+toolNames[tool.settings.engine]+version+'</p>');
      }
      html.push("</td></tr>");
      html.push("</table>");
      // data elements
      html.push('<h2>Data Elements</h2>');
      html.push('<table id="data-elements" class="table table-striped"><thead><tr><th>Name</th><th>Type</th><th>Value</th></tr></thead><tbody>');

      for(var dName in _satellite.dataElements){
        var de = _satellite.dataElements[dName],
            type = '',
            deType = '';
        if(typeof de.customJS != "undefined"){
          type = "Custom JS";
          deType = "customJS";
        }
        if(typeof de.selector != "undefined"){
          type = "CSS Selector";
          deType = "selector";
        }
        if(typeof de.jsVariable != "undefined"){
          type = "JS Variable";
          deType = "jsVariable";
        }
        if(typeof de.cookie != "undefined"){
          type = "Cookie";
          deType = "cookie";
        }
        if(typeof de.queryParam != "undefined"){
          type = "Query Parameter";
          deType = "queryParam";
        }
        html.push('<tr data-dename="'+dName+'" data-type="'+deType+'"><td>'+dName+'</td><td class="de-type" data-type="'+deType+'">'+type+'</td><td class="de-value">'+_dtmDebug.getDataElementValue(dName)+'</td></tr>');
      }
      html.push('</tbody></table>');

      // notifications
      html.push('<h2>DTM Notifications</h2><div><label><input type="checkbox" id="custom-notifications"'+(_dtmDebug.saved.onlyCustom == true ? ' checked="checked"' : '')+'> Only show custom notifications</label> <label><input type="checkbox" id="custom-reverse-order"'+(_dtmDebug.saved.reverse == true ? ' checked="checked"' : '')+'> Show newest notifications on top</label></div><div class="panel panel-default"><div class="panel-body" id="notifications">');
      html.push('</div></div>');


      jQuery('#dtm-info').html(html.join(""));
      jQuery('#custom-reverse-order').on('click', function(){
        _dtmDebug.saved.reverse = $(this).is(':checked');
        _dtmDebug.getNotifications();
      });
      jQuery(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
      }); 
      jQuery('#rules tbody .rule').on('click', function(){
        var _satellite = window.opener._satellite,
          $m = $('#modal'),
          name = $(this).parents('tr').attr('data-rule'),
          type = $(this).parents('tr').attr('data-type'),
          def = [],
          hasAA = false;
        _satellite.each(_satellite[type], function(r){
          if(r.name == name){
            $m.find('.modal-title').html('Definition for rule "<b>'+name+'</b>"');
            var evt = _dtmDebug.pageEvents[r.event] || r.event;
            if(evt){
              def.push('<tr><td><b>Triggers At</b></td><td>'+(evt)+'</td></tr>');
            }
            if(r.selector){
              def.push('<tr><td><b>CSS Selector</b></td><td>'+r.selector+'</td></tr>');
            }
            if(r.scope){
              def.push('<tr><td><b>Condition</b></td><td>'+JSON.stringify(r.scope)+'</td></tr>');
            }
            if(r.conditions){
              def.push('<tr><td><b>Condition</b></td><td><pre class="prettyprint"><code class="language-js">'+js_beautify(r.conditions.toString())+'</code></pre></td></tr>');
            }
            if(r.bubbleFireIfParent!=null){
                var isDefault=r.bubbleFireIfParent ? ' (default)':'';
                def.push('<tr><td><b>Allow child elements to bubble</b></td><td>'+r.bubbleFireIfParent+isDefault+'</td></tr>');
            }
            if(r.bubbleFireIfChildFired!=null){
                var isDefault=r.bubbleFireIfChildFired ? ' (default)':'';
                def.push('<tr><td><b>Do not allow if child element already triggers</b></td><td>'+!r.bubbleFireIfChildFired+isDefault+'</td></tr>');
            }
            if(r.bubbleStop!=null){
                var isDefault=!r.bubbleStop ? ' (default)':'';
                def.push('<tr><td><b>Do not allow to bubble to parents</b></td><td>'+r.bubbleStop+isDefault+'</td></tr>');
            }
            if(r.trigger){
              _satellite.each(r.trigger, function(t){
                if(t.engine){
                  if(!hasAA && t.engine == 'sc'){
                    hasAA = true;
                    def.push('<tr><td colspan="2"><b>'+toolNames[t.engine]+'</b></td></tr>');
                  }
                  if(t.engine == 'sc'){
                    if(t.command == 'setVars'){
                      _satellite.each(t.arguments, function(arg){
                        for(var a in arg)
                          def.push(window._dtmDebug.tool.parseDataElement(_satellite,a,arg[a]));
                      });
                    }
                    else if(t.command == 'addEvent'){
                      def.push('<tr><td style="padding-left: 20px;">events</td><td>'+(t.arguments.join(',')));
                    }
                    else if(t.command == 'customSetup'){
                      def.push('<tr><td style="padding-left: 20px;">Custom Code</td><td><pre class="prettyprint"><code class="language-js">'+js_beautify(t.arguments[0].toString())+'</code></pre></td></tr>');
                    }
                    else if(t.command == 'trackLink'||t.command == 'trackPageView'){
                      var cl = {
                        'o':'Custom Link',
                        'd':'File Download',
                        'e':'Exit Link'
                      };
                      if(t.command == 'trackLink'){
                        def.push('<tr><td style="padding-left: 20px;">Hit Type</td><td>'+cl[t.arguments[0].type]+'</td></tr>');
                        def.push('<tr><td style="padding-left: 20px;">Link Name</td><td>'+t.arguments[0].linkName+'</td></tr>');
                      }
                      if(_satellite.isObject(t.arguments[0].setVars)){
                        for(var a in t.arguments[0].setVars)
                          def.push(window._dtmDebug.tool.parseDataElement(_satellite,a,t.arguments[0].setVars[a]));
                      }
                      if(t.arguments[0].addEvent){
                        def.push('<tr><td style="padding-left: 20px;">events</td><td>'+(t.arguments[0].addEvent.join(',')));
                      }
                      if(t.arguments[0].customSetup){
                        def.push('<tr><td style="padding-left: 20px;">Custom Code</td><td><pre class="prettyprint"><code class="language-js">'+t.arguments[0].customSetup.toString()+'</code></pre></td></tr>');
                      }
                    }
                  }
                }else if(t.command){
                     def.push('<tr><td colspan="2"><b>'+t.command +'</b></td></tr>');
                     if(t.arguments){
                       _satellite.each(t.arguments, function(arg){
                        for(var a in arg){
                            if(a=='scripts'){
                                def.push('<tr><td style="padding-left: 20px;">' + a + '</td>');
                                 _satellite.each(arg[a], function(scripts,i){
                                   if(i>0) def.push('<td></td>');
                                    def.push('<td><a href="http://assets.adobedtm.com/'+_satellite.settings.scriptDir+scripts.src +'" target="_blank">'+JSON.stringify(scripts.src)+'</a ></td ></tr >');
                                 });
                            } else def.push('<tr><td style="padding-left: 20px;">'+a+'</td><td>'+arg[a]+'</td></tr>');
                        }
                         
                      });
                     }
                }
              });
            }
            console.log(r);
          }
        });
        $m.find('.modal-body p').html('<table class="table">'+def.join('')+'</table>');
        PR.prettyPrint();
        $('#modal').modal('show');
      });

      jQuery('#data-elements .de-type').on('click', function(){
        var _satellite = window.opener._satellite,
            $m = $('#modal'),
            def = [],
            name = $(this).parents('tr').attr('data-dename'),
            de = _satellite.dataElements[name],
            type = $(this).attr('data-type');
        $m.find('.modal-title').html('Definition for data element "<b>'+name+'"</b>');
        if(type == 'customJS'){
          def.push('<tr><td><b>Type</b></td><td>Custom JS</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td><pre class="prettyprint"><code class="language-js">'+js_beautify(de.customJS.toString())+'</code></pre></td></tr>');
        }
        if(type == 'selector'){
          def.push('<tr><td><b>Type</b></td><td>CSS Selector</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td>'+de.selector+'</td></tr>');
          def.push('<tr><td><b>Element Property</b></td><td>'+de.property+'</td></tr>');
        }
        if(type == 'queryParam'){
          def.push('<tr><td><b>Type</b></td><td>Query Parameter</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td>'+de.queryParam+'</td></tr>');
          def.push('<tr><td><b>Case Sensitive?</b></td><td>'+(de.ignoreCase ? 'Yes' : 'No')+'</td></tr>');
        }
        if(type == 'jsVariable'){
          def.push('<tr><td><b>Type</b></td><td>JavaScript Variable</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td>'+de.jsVariable+'</td></tr>');
        }
        if(type == 'cookie'){
          def.push('<tr><td><b>Type</b></td><td>Cookie</td></tr>');
          def.push('<tr><td><b>Definition</b></td><td>'+de.cookie+'</td></tr>');
        }
        if(de.default){
          def.push('<tr><td><b>Default Value</b></td><td>'+de.default+'</td></tr>');
        }
        def.push('<tr><td><b>Force Lowercase?</b></td><td>'+(de.forceLowerCase ? 'Yes' : 'No')+'</td></tr>');
        if(de.storeLength){
          def.push('<tr><td><b>Store Length</b></td><td>'+de.storeLength+'</td></tr>');
        }
        $m.find('.modal-body p').html('<table class="table">'+def.join('')+'</table>');
        PR.prettyPrint();
        $('#modal').modal('show');
      });
      //    var dtm = document.getElementById("dtm-info").innerHTML = html;
    }
    else if(_dtmDebug.hasLoaded == true){
      jQuery('#dtm-info').html('<div class="text-center"><i class="fa fa-spinner fa-pulse"></i> Waiting for new page to load...</div>');
      _dtmDebug._loading = true;
    }
    else {
      jQuery('#dtm-info').html('<div class="text-center"><h1>DTM is not installed on this page!</h1><br><img src="//www.disruptiveadvertising.com/wp-content/uploads/2015/09/run-dtm.jpg"></div>');
    }

    $('#show-fired').on('click', function(){
      _dtmDebug.saved.showFired = $(this).is(':checked');
      if($(this).is(':checked')){
        $('table#rules tbody tr[data-fired="no"]').addClass('hidden');
      }
      else
        $('table#rules tbody tr').removeClass('hidden');
    });
    $('#custom-notifications').on('click', function(){
      _dtmDebug.saved.onlyCustom = $(this).is(':checked');
      if($(this).is(':checked')){
        $('#notifications p.dtm').addClass('hidden');
      }
      else
        $('#notifications p').removeClass('hidden');
    });
    _dtmDebug.getNotifications();
    setTimeout(function(){_dtmDebug.refresh()}, 1500);
  },
  getDataElementValue: function(de){
    try {
      return window.opener._satellite.getDataElement.call(window.opener._satellite, de)||window.opener._satellite.dataElementSafe.pageviewCache[de]||'';
    }
    catch(e){
      return '';
    }
  },
  getSettings: function(_satellite, ret){
    var staging = _satellite.settings.isStaging,
        env = staging ? 'Staging' : 'Production',
        opp = staging ? 'Production' : 'Staging',
        button = ' <button class="btn btn-default btn-xs" type="button" onclick="_dtmDebug.toggleEnvironment();">Load '+opp+'</button>',
        html = [];

    _satellite.cssQuery('script[src*="'+_satellite.settings.libraryName+'"]', function(scripts){
      if(scripts.length == 1){
        if(scripts[0].src.match(/-staging/)){
          button = '';
        }
      }
    });

    html.push('<tr><td>Current Environment:</td><td>'+env+button+'</td></tr>');
    html.push('<tr><td>Current URL:</td><td>'+window.opener.location.href+'</td></tr>');
    html.push('<tr><td>Web Property ID:</td><td>'+_satellite.settings.libraryName+'</td></tr>');
    if(env == true)
      html.push('<tr><td>Build Date:</td><td>'+_satellite.buildDate+'</td></tr>');
    else
      html.push('<tr><td>Publish Date:</td><td>'+_satellite.publishDate+'</td></tr>');

    if(ret === true){
      return html.join('');
    }
    else {
      $('table.info').html(html.join(''));
    }
  },
  refresh: function(){
    // get new info and update values, don't overwrite stuff
    // rules
    var _satellite = window.opener._satellite;
    if(typeof _satellite != 'undefined'){
      // check for the same URL
      if(_dtmDebug.saved.url != window.opener.location.href && !_dtmDebug._loading){
        _dtmDebug._loading = true;
      }

      if(_dtmDebug._loading == true){
        _dtmDebug.init();
      }
      else {
        _satellite.each(_dtmDebug.rules, function(rule){
          _satellite.each(_satellite.configurationSettings[rule.id], function(r){
            var f = _dtmDebug.ruleFired(r, rule.id),
                $tr = $('#rules tr[data-rule="'+r.name+'"]');

            if(f != $tr.attr('data-fired')){
              $tr.attr('data-fired', f);
              $tr.find('td.fired').html(_dtmDebug.firedText(f));
              $tr.css('background-color', '#ddddff');
              setTimeout(function(){
                $tr.css('background-color','transparent');
                $tr.effect('highlight', {color: '#ddddff'}, 3000);
              }, 1500);

              if($('#show-fired').is(':checked')){
                if(f == 'yes' && $tr.hasClass('hidden')){
                  $tr.removeClass('hidden');
                }
                else if(f == 'no' && !$tr.hasClass('hidden')){
                  $tr.addClass('hidden');
                }
              }
            }
          });
        });
        _dtmDebug.getDataElements(_satellite);
        _dtmDebug.getNotifications();
        _dtmDebug.getSettings(_satellite);
      }
    }
    else {
      _dtmDebug.init();
    }

    setTimeout(function(){_dtmDebug.refresh()}, 1000);
  },
  getDataElements: function(_satellite){
    for(var dName in _satellite.dataElements){
      var de = $('#data-elements').find('tr[data-dename="'+dName+'"]');
      if(de.size()>0){
        var v = _dtmDebug.getDataElementValue(dName),
            pv = de.find('.de-value').text();
        if(v != pv){
          de.find('.de-value').text(v);
        }
      }
    }
  },
  toggleEnvironment: function(){
    var _satellite = window.opener._satellite;

    if(_satellite){
      if(_satellite.settings.isStaging == true){
        window.opener.localStorage.removeItem("sdsat_stagingLibrary");
      }
      else {
        window.opener.localStorage.setItem("sdsat_stagingLibrary", true);
      }
      window.opener.location.reload();
    }
  }
};
