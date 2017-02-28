var genericTools = {
    outputHelper: function (outputFieldSelector) {
        var outputFieldSelector = outputFieldSelector;
        var isOutputFieldExist = $(outputFieldSelector).length > 0;
        this.log = function (str, logLevel) {
            if (logLevel === 'debug') console.log(str);
            else if (isOutputFieldExist) {
                $(outputFieldSelector).text($(outputFieldSelector).text() + str + "\n");
                $(outputFieldSelector).hide().show(0);
            }
            else console.log(str);
        }
    },
    inputPopUp: function (toolName) {
        var inputHTML = eval('genericTools.' + toolName + '.inputHTML');
        $('#modal').find('.modal-body p').html(inputHTML);
        $('#modal').modal('show');
    },
    parseInputData: function (e, formObj, toolName) {
        e.preventDefault();
        var fields = jQuery(formObj).serializeArray();
        var nameArray = eval('genericTools.' + toolName + '.paramList');
        var param = [];
        fields.forEach(function (element) {
            var index = nameArray.indexOf(element.name);
            if (index >= 0) param[index] = element.value;
        });
        eval('genericTools.' + toolName + '.callFn(param)');
        return false;
    },
    globalSearch: {
        inputHTML: '<form onsubmit="return genericTools.parseInputData(event,this,\'globalSearch\')">'
        + 'Start Object:<input type="text" name="startObject" value=""/><br/>'
        + 'Search Value:<input type="text" name="searchValue" value=""/><br/>'
        + 'Search Batch Control:<input type="text" name="searchBatch" value="5000"/><br/>'
        + 'breakOnFirstFound:<input type="text" name="breakOnFirstFound" value="false"><br/>'
        + '<input type="submit" value="Start Search">'
        + '</form>'
        + '<pre class="prettyprint" id="outputTxt" placeholder="output text" style="overflow:auto"></pre>',

        paramList: ["startObject", "searchValue", "searchBatch", "breakOnFirstFound"],
        callFn: function (param) {
            globalSearch(eval('window.opener.' + param[0]), param[1], '#outputTxt', parseInt(param[2]), param[3] === 'true');

            //search by breath depth first
            function globalSearch(startObject, value, outputFieldSelector, searchBatch, breakOnFirstFound) {
                var stack = [[startObject, '']];
                var searched = [];
                var found = [];
                searchBatch = searchBatch || 20000;
                var output = new genericTools.outputHelper(outputFieldSelector);

                var isArray = function (test) {
                    return Object.prototype.toString.call(test) === '[object Array]';
                }

                var count = 0;
                var isContinue = "yes";
                while (stack.length > 0 && isContinue == "yes") {
                    count++;
                    if (count % searchBatch == 0) {
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
                        if (isArray(obj)) {
                            var prefix = '[';
                            var postfix = ']';
                        } else {
                            var prefix = '.';
                            var postfix = '';
                        }
                        for (i in obj) {
                            if (typeof obj == typeof value && obj == value) {
                                var found = address;
                                break;
                            }
                            stack.push([obj[i], address + prefix + i + postfix]);
                        }
                    }
                    searched.push(address);
                }
                output.log("Searched:" + searched);
                output.log("found now=" + found);
                return found;
            }
        }

    }

};
