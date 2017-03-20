var genericTools = {
    outputHelper: function (outputFieldSelector) {
        var isOutputFieldExist = $(outputFieldSelector).length > 0;
        this.log = function (str, logLevel, cleanLog) {
            if (logLevel === 'debug') console.log(str);
            else if (isOutputFieldExist) {
                if (cleanLog === true) $(outputFieldSelector).text('');
                $(outputFieldSelector).text($(outputFieldSelector).text() + str + "\n");
            }
            else console.log(str);
        };
    },
    inputPopUp: function (toolName) {
        var inputHTML = genericTools[toolName].inputHTML;
        $('#modal').find('.modal-body p').html(inputHTML);
        $('#modal').modal('show');
    },
    parseInputData: function (e, formObj, toolName) {
        e.preventDefault();
        var fields = jQuery(formObj).serializeArray();
        var nameArray = genericTools[toolName].paramList;
        var isNameArrayEmpty = false;
        if (!nameArray || nameArray.length) isNameArrayEmpty = true;
        var param = [];
        fields.forEach(function (element, i) {
            var index;
            if (isNameArrayEmpty === true)
                index = i;
            else index = nameArray.indexOf(element.name);
            if (index >= 0) param[index] = element.value;
        });
        genericTools[toolName].callFn(param);
        return false;
    },
    splitPayload: {
        inputHTML: '<form onsubmit="return genericTools.parseInputData(event,this,\'splitPayload\')">'
        + '<textarea rows="4" cols="50" name="inputTxt" placeholder="Put the payload you want to split here."></textarea><br/>'
        + 'Split by Symbol: <input type="text" name="splitSymbol" size="1" value="&"/><br/>'
        + '<input type="submit" value="Split payload">'
        + '<pre class="prettyprint" id="outputTxt" placeholder="output text"></pre>',

        callFn: function (param) {
            rawPayload = param[0];
            rawPayload = rawPayload.trim();
            outputTxt = [];
            rawPayload.split(param[1]).forEach(function (para) {
                outputTxt.push(para + "\n");
            }, this);
            (new genericTools.outputHelper('#outputTxt')).log(outputTxt.join(''), 'info', true);
        }

    },
    jsBeautify:{
         inputHTML: '<form onsubmit="return genericTools.parseInputData(event,this,\'jsBeautify\')">'
        + '<textarea rows="4" cols="50" name="inputTxt" placeholder="Put the JS here."></textarea><br/>'
        + '<input type="submit" value="jsBeautify">'
        + '<pre class="prettyprint"  placeholder="output text"><code class="language-js" id="outputTxt"></code></pre>',

        callFn: function (param) {
            (new genericTools.outputHelper('#outputTxt')).log(js_beautify(param[0]), 'info', true);
            PR.prettyPrint();
        }
    },
    globalSearch: {
        inputHTML: '<form onsubmit="return genericTools.parseInputData(event,this,\'globalSearch\')">'
        + '<table><tr><td>Start Object</td><td><input type="text" name="startObject" value=""/></td></tr>'
        + '<tr><td>Search Value</td><td><input type="text" name="searchValue" value=""/></td></tr>'
        + '<tr><td>Search Batch Control</td><td><input type="text" name="searchBatch" value="5000"/></td></tr>'
        + '<tr><td>breakOnFirstFound</td><td><input type="text" name="breakOnFirstFound" value="false"></td></tr></table>'
        + '<input type="submit" value="Start Search">'
        + '</form>'
        + '<pre class="prettyprint" id="outputTxt" placeholder="output text"></pre>',

        paramList: ["startObject", "searchValue", "searchBatch", "breakOnFirstFound"],
        callFn: function (param) {
            globalSearch(eval('window.opener.' + param[0]), param[1], new genericTools.outputHelper('#outputTxt'), parseInt(param[2]), param[3] === 'true');

            //search by breath depth first
            function globalSearch(startObject, value, outputFunction, searchBatch, breakOnFirstFound) {
                var stack = [[startObject, '']];
                var searched = [];
                var found = [];
                searchBatch = searchBatch || 20000;
                var output = outputFunction || console;

                var isArray = function (test) {
                    return Object.prototype.toString.call(test) === '[object Array]';
                };
                output.log('', 'info', true); //clean the output field
                var count = 0;
                var isContinue = "yes";
                while (stack.length > 0 && isContinue == "yes") {
                    try {
                        count++;
                        if (count % searchBatch === 0) {
                            output.log("Searched:" + searched);
                            searched = [];
                            isContinue = prompt("continue?", "yes");
                        }

                        var fromStack = stack.shift();
                        var obj = fromStack[0];
                        var address = fromStack[1];
                        // console.log(address);
                        if (typeof obj == typeof value && obj.indexOf(value) >= 0) { //if contains value or equal
                            found.push(address);
                            output.log("found now=" + found, 'debug');
                            if (breakOnFirstFound)
                                break;
                        } else if (typeof obj == "object") { //&& searched.indexOf(obj) == -1
                            var prefix, postfix;
                            if (isArray(obj)) {
                                prefix = '[';
                                postfix = ']';
                            } else {
                                prefix = '.';
                                postfix = '';
                            }
                            for (var i in obj) {
                                if (typeof obj == typeof value && obj == value) {
                                    found = address;
                                    break;
                                }
                                stack.push([obj[i], address + prefix + i + postfix]);
                            }
                        }
                        searched.push(address);
                    } catch (err) {
                        output.log(err, 'debug');
                    }
                }
                output.log("Searched:" + searched);
                output.log("found=" + found);
                return found;
            }
        }

    }

};
