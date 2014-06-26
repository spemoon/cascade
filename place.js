function Place (config) {
    this._province = config.province;
    this._provinceVal = config.provinceVal;
    this._city = config.city;
    this._cityVal = config.cityVal;
    if( cityJson[config.provinceVal] == null ){
        this._provinceVal = "\u798F\u5EFA";
        this._cityVal = "\u798f\u5dde\u5e02";
    }
    this.trigger = config.trigger || "change";
    var _this = this;
    _this.init();
}
Place.prototype = {
    init : function() {
        var _this = this;
        var pLen = provList.length;
        var pVal = this._provinceVal;
        var cityArray = cityJson[pVal];
        var cLen = cityArray.length;
        var pOptionHtml = [];
        var cOptionHtml = [];
        for(var i = 0 ; i < pLen ; i++){
            pOptionHtml.push('<option value="',provList[i],'">',provList[i],'</option>');
        }
        pOptionHtml = pOptionHtml.join('');
        for(var j = 0 ; j < cLen ; j++){
            cOptionHtml.push('<option value="',cityArray[j],'">',cityArray[j],'</option>');
        }
        cOptionHtml = cOptionHtml.join('');
        this._province.innerHTML = pOptionHtml;
        this._city.innerHTML = cOptionHtml;
        var pOption = this._province.options;
        var cOption = this._city.options;
        setTimeout(function() {
            for(var i = 0, len = pOption.length; i < len; i++){
                if( pOption[i].value == _this._provinceVal ){
                    pOption[i].selected = true;
                    break;
                }
            }
            for(var i = 0, len = cOption.length; i < len; i++){
                if( cOption[i].value == _this._cityVal ){
                    cOption[i].selected = true;
                    break;
                }
            }
        },100);
        _this.listenEvent(this.trigger);
    },
    listenEvent : function(trigger) {
        var province = this._province;
        var city = this._city;
        if( !trigger || trigger == "change" ){
            addEvent(province, 'change', function() {
                var pVal = province.value;
                var cityArray = cityJson[pVal];
                var cLen = cityArray.length;
                var cOptionHtml = [];
                for(var j = 0 ; j < cLen ; j++){
                    cOptionHtml.push('<option value="',cityArray[j],'">',cityArray[j],'</option>');
                }
                cOptionHtml = cOptionHtml.join("");
                city.innerHTML = cOptionHtml;
            });
        }
    }
};
function addEvent(node, type, listener) {
    if( node.addEventListener ){
        node.addEventListener(type, listener, false);
        return true;
    }else if( node.attachEvent ){
        node['e' + type + listener] = listener;
        node[type + listener] = function() {
            node['e' + type + listener](window.event);
        };
        node.attachEvent( 'on' + type, node[type + listener]);
        return true;
    }
    return false;
}
