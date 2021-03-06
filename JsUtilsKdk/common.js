/**
 * @author 김대광 <daekwang1026&#64;gmail.com>
 * @since 2018.12.02
 * @version 1.0
 * @description 특정 프로젝트가 아닌, 범용적으로 사용하기 위한 함수 모음
 * 
 * @property {object} CommonJS.Valid
 * @property {object} CommonJS.DateTime
 * @property {object} CommonJS.Format
 * @property {object} CommonJS.JSON
 * @property {object} CommonJS.File
 * @property {object} CommonJS.Cookie
 * @property {object} CommonJS.Byte
 * @property {object} CommonJS.Escape
 * @property {object} CommonJS.BrowserInfo
 * @property {method} prototype
 */
var CommonJS = {
    /**
     * 팝업창 띄우기
     * @param {string} url
     * @param {(undefined|null|blank|string)} name
     * @param {(undefined|null|number)} width
     * @param {(undefined|null|number)} height
     */
    openPopup: function(url, name, width, height) {
        var _height = (this.Valid.isUndefined(height)) ? screen.height : Number(height);
        var _width = (this.Valid.isUndefined(width)) ? screen.width : Number(width);
        var _left = (screen.width - width) / 2;
        var _top = (screen.height - height) / 2;
        var _option = '';
        _option += 'height='+_height+', width='+_width+', left='+_left+', top='+_top;
        _option += 'menubar=no, status=no';
        _option += 'resizable=no, scrollbars=no, toolbar=no';   // IE only | IE, Firefox, Opera only | IE, Firefox only

        window.open(url, name, _option);
    },
    /**
     * 10 이하의 숫자에 0을 붙여서 반환
     * @param {number} num
     * @returns {string}
     */
    addZero: function(num) {
        if (num < 10) {
            num = '0' + num;
        }
        return num;
    }
};

CommonJS.Valid = {
    /**
     * 공백, 빈 문자열 체크 (undefined == null)
     * @param {*} val
     * @returns {boolean}
     */
    isBlank: function(val) {
        return (val == null || val.replace(/ /gi,'') == '');
    },
    /**
     * undefined 체크 ('undefined' 포함)
     * @param {*} val
     * @returns {boolean}
     */
    isUndefined: function(val) {
        return (val == undefined || val === 'undefined');
    },
    /**
     * 숫자 체크
     * @param {*} val
     * @returns {boolean}
     */
    isNumber: function(val) {
        var _re = /^[0-9]+$/;
        return _re.test(val);
    },
    /**
     * 특수문자 체크
     * @param {*} val
     * @returns {boolean}
     */
    isSpecial: function(val) {
        var _re = /[`~!@#$%^&*()-_=+{}|;:'\",.<>?]+$/;
        return _re.test(val);
    },
    /**
     * 날짜 형식 체크 (YYYYMMDD, YYYY-MM-DD)
     * @param {string} val1
     * @returns {boolean}
     */
	isDate: function(val) {
		var _re = /^[0-9]{4}-?(0[1-9]|1[012])-?(0[1-9]|1[0-9]|2[0-9]|3[01])+$/;
		return _re.test(val);
    },
    /**
     * 시간 형식 체크 (HH24MI, HH24:MI, HH24MISS, HH24:MI:SS)
     * @param {string} val1
     * @returns {boolean}
     */
    isTime: function(val) {
        var _re = /^([1-9]|[01][0-9]|2[0-3]):?([0-5][0-9])?(:?([0-5][0-9]))+$/;
        return _re.test(val);
    },
    /**
     * 이메일 형식 체크
     * @param {string} val1
     * @param {(undefined|null|string)} val2
     * @returns {boolean}
     */
	isEmail: function(val1, val2) {
        var _val = val1;
        if ( !this.isBlank(val2) ) {
            _val = val1 +'@'+ val2;
        }
		var _re = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})+$/;
		return _re.test(_val);
    },
    /**
     * 전화번호 형식 체크
     * @param {string} val1
     * @param {(undefined|null|string)} val2
     * @param {(undefined|null|string)} val3
     * @returns {boolean}
     */
	isPhoneNumber: function(val1, val2, val3) {
        var _val = val1;
        if ( !this.isBlank(val2) && !this.isBlank(val3) ) {
            _val = val1 +'-'+ val2 +'-'+ val3;
        }
		var _re = /^(0[2|3[1|2|3]|4[1|2|3|4]|5[1|2|3|4|5]|6[1|2|3|4]])-?(\d{3,4})-?(\d{4})+$/;
		return _re.test(_val);
    },
    /**
     * 휴대폰 번호 형식 체크
     * @param {string} val1
     * @param {(undefined|null|string)} val2
     * @param {(undefined|null|string)} val3
     * @returns {boolean}
     */
	isCellPhoneNumber: function(val1, val2, val3) {
        var _val = val1;
        if ( !this.isBlank(val2) && !this.isBlank(val3) ) {
            _val = val1 +'-'+ val2 +'-'+ val3;
        }
		var _re = /^(01[016789])-?(\d{3,4})-?(\d{4})+$/;
		return _re.test(_val);
    },
    /**
     * 사업자등록번호 형식 체크
     * @param {string} val1
     * @param {(undefined|null|string)} val2
     * @param {(undefined|null|string)} val3
     * @returns {boolean}
     */
	isBusinessRegNumber: function(val1, val2, val3) {
        var _val = val1;
        if ( !this.isBlank(val2) && !this.isBlank(val3) ) {
            _val = val1 +'-'+ val2 +'-'+ val3;
        }
		var _re = /^[(\d{3})-?(\d{2})-?(\d{5})+$]/;
		return _re.test(_val);
    },
    /**
     * 아이디 형식 체크 (첫 글자 영문, 7자 이상 30자 이내)
     * @param {string} val
     * @returns {boolean}
     */
	isId: function(val) {
		var _re = /^[a-zA-Z](?=.*[a-zA-Z])(?=.*[0-9]).{6,29}$/;
		return _re.test(val);
    },
	/**
	 * 공백 체크
	 * @param {string} val
	 * @returns {boolean}
	 */
	checkSpace: function(val) {
		if (val.search(/\s/) != -1) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 한글만 입력 체크
	 * @param {string} val
	 * @returns {boolean}
	 */
	isNotHangul: function(val) {
		var _re = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
		return _re.test(val);
	}
}

CommonJS.DateTime = {
    /**
     * 날짜를 yyyy-MM-dd 형식으로 반환
     * @param {Date} date
     * @returns {string}
     */
	dateToString: function(date) {
		var _year = date.getFullYear();
		var	_month = (date.getMonth() + 1);
		var	_day = date.getDate();
		
		_month = CommonJS.addZero(_month);
		_day = CommonJS.addZero(_day);
			
		return [_year, _month, _day].join('-'); 
    },
    /**
     * 시간을 HH:mm:ss 형식으로 반환
     * @param {Date} date
     * @returns {string}
     */
	timeToString: function(date) {
		var _hour = date.getHours();
		var	_minute = date.getMinutes();
		var	_second = date.getSeconds();
		
		_hour = CommonJS.addZero(hour);
		_minute = CommonJS.addZero(minute);
		_second = CommonJS.addZero(second);
		
		return [_hour, _minute, _second].join(':'); 
    },
    /**
     * 날짜 형식의 문자열을 Date 객체로 반환
     * @param {string} val
     * @returns {Date}
     */
	stringToDate: function(val) {
		var _date = new Date();
		val = val.replace(/-|\s|:/gi, '');
		
		if ( !/^[\d]+$/.test(val) ) {
			return false;
		}
		
		_date.setFullYear(val.substr(0, 4));
		_date.setMonth(val.substr(4, 2) - 1);
		_date.setDate(val.substr(6, 2));
		
		if (val.length == 14) {
			_date.setHours(val.substr(8, 2));
			_date.setMinutes(val.substr(10, 2));
			_date.setSeconds(val.substr(12, 2));
        }
        
		return _date;
    },
    /**
     * 현재 날짜의 이전/이후 날짜를 반환
     *  - day가 음수 = 이전 날짜
     *  - day가 양수 = 이후 날짜
     * @param {number} day 
     * @returns {Date}
     */
	plusMinusDay: function(day) {
		var _date = new Date();
		var _newDate = new Date();
		
		_newDate.setDate(_date.getDate() + day);
		return _newDate;
	},
    /**
     * 현재 날짜의 이전/이후 날짜를 반환
     *  - month가 음수 = 이전 날짜
     *  - month가 양수 = 이후 날짜
     * @param {number} month 
     * @returns {Date}
     */
	plusMinusMonth: function(month) {
		var _date = new Date();
		var _newDate = new Date();
		
		_newDate.setMonth(_date.getMonth() + month);
		return _newDate;
	},
    /**
     * 현재 날짜의 이전/이후 날짜를 반환
     *  - year가 음수 = 이전 날짜
     *  - year가 양수 = 이후 날짜
     * @param {number} year 
     * @returns {Date}
     */
	plusMinusYear: function(year) {
		var _date = new Date();
		var _newDate = new Date();
		
		_newDate.setFullYear(_date.getFullYear() + year);
		return _newDate;
	},
    /**
     * 현재 시간의 이전/이후 시간을 반환
     *  - hours가 음수 = 이전 시간
     *  - hours가 양수 = 이후 시간
     * @param {number} hours 
     * @returns {Date}
     */
	plusMinusHour: function(hours) {
		var _date = new Date();
		var _newDate = new Date();
		
		_newDate.setHours(_date.getHours() + hours);
		return _newDate;
	},
    /**
     * 현재 시간의 이전/이후 시간을 반환
     *  - minutes가 음수 = 이전 시간
     *  - minutes가 양수 = 이후 시간
     * @param {number} minutes 
     * @returns {Date}
     */
	plusMinusMinute: function(minutes) {
		var _date = new Date();
		var _newDate = new Date();
		
		_newDate.setMinutes(_date.getMinutes() + minutes);
		return _newDate;
	},
    /**
     * 현재 시간의 이전/이후 시간을 반환
     *  - seconds가 음수 = 이전 시간
     *  - seconds가 양수 = 이후 시간
     * @param {number} seconds 
     * @returns {Date}
     */
	plusMinusSecond: function(seconds) {
		var _date = new Date();
		var _newDate = new Date();
		
		_newDate.setSeconds(_date.getSeconds() + seconds);
		return _newDate;
    },
    /**
     * 한글 요일 구하기
     * @param {Date} date
     * @returns {string}
     */
	getKorDayOfWeek: function(date) {
		var _week = new Array('일', '월', '화', '수', '목', '금', '토');
		return _week[date.getDay()];
    },
    /**
     * 현재 월의 마지막 일자를 반환
     * @param {Date} date 
     */
	getLastDayOfMonth: function(date) {
		return new Date(date.getYear(), date.getMonth()+1, 0).getDate();
	}
}

CommonJS.Format = {
    /**
     * 숫자 금액 형식 변환 (세자리 콤마)
     * @param {number} num
     * @returns {string}
     */
    formatNumber: function(num) {
        return (num + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    },
    /**
     * 전화번호, 휴대폰 번호 형식 변환
     * @param {number} num
     * @returns {string}
     */
    addHyphenPhoneNumber: function(num) {
        return (num + '').replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,'$1-$2-$3');
    },
    /**
     * 날짜 형식 변환
     * @param {number} num
     * @returns {string}
     */
    addHyphenDate: function(num) {
        return (num + '').replace(/([0-9]{4})(0[1-9]|1[012])(0[1-9]|1[0-9]|2[0-9]|3[01])/,'$1-$2-$3');
    },
    /**
     * 특정 문자 제거
     * @param {string}} val
     * @returns {string}
     */
    removeSpecial: function(val) {
        var _re = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        return val.replace(_re, '');
    }
}

CommonJS.JSON = {
    /**
     * JSON String을 Object로 변환
     * @param {string} jsonStr
     * @returns {Object}
     */
    jsonToObject: function(jsonStr) {
        return JSON.parse(jsonStr);
    },
    /**
     * Object를 JSON String으로 변환
     * @param {Object} obj
     * @returns {string}
     */
    objectToJsonString: function(obj) {
        return JSON.stringify(obj);
    },
    /**
     * Object를 Tree 구조의 JSON String으로 변환
     * @param {Object} obj
     * @returns {string}
     */
    objectToJsonStringPretty: function(obj) {
        return JSON.stringify(obj, null, 2);
    }
}

CommonJS.File = {
    /**
     * 파일 정보 가져오기
     * @param {Element} fileElement
     * @returns {Object}
     * @example
     * [JavaScript]
     * document.getElementById('file').addEventListener('change', function() {
     *      CommonJS.File.getFileInfo(this);
     * });
     * 
     * [jQuery]
     * $('#file').on('change', function() {
     *      CommonJS.File.getFileInfo(this);
     * });
     * 
     * @link https://developer.mozilla.org/en-US/docs/Web/API/File
     */
	getFileInfo: function(fileElement) {
        var _fileObj;
		if (window.File) {
			// IE 10 이상
            _fileObj = fileElement.files[0];
		} else {
            // IE 9 이하
            var _fso = new ActiveXObject("Scripting.FileSystemObject")						
            var _fsoFile = _fso.getFile(fileElement.value);
            
            _fileObj = {};
            _fileObj.name = _fsoFile.name;
            _fileObj.type = _fsoFile.type;
            _fileObj.size = _fsoFile.size;
        }
		return _fileObj;
    },
    /**
     * 파일 확장자 가져오기
     * @param {Object}
     * @returns {string}
     */
	getFileExt: function(fileObj) {
		var _fileName = fileObj.name;
		return _fileName.substring(_fileName.lastIndexOf(".")+1);
    },
    /**
     * 지원 파일 체크 (문서, 이미지)
     * @param {Object}
     * @returns {boolean}}
     */
    isAllowFile: function(fileObj) {
        var _ext = CommonJS.File.getFileExt(fileObj);
        var _arrAllowExt = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'hwp', 'odt', 'odp', 'ods', 'jpg', 'jpeg', 'gif', 'png'];
        return _arrAllowExt.includes(_ext);
    },
    /**
     * 지원 파일 체크 (문서)
     * @param {Object}
     * @returns {boolean}}
     */
    isAllowDoc: function(fileObj) {
        var _ext = CommonJS.File.getFileExt(fileObj);
        var _arrAllowExt = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'hwp', 'odt', 'odp', 'ods'];
        return _arrAllowExt.includes(_ext);
    },
    /**
     * 지원 파일 체크 (이미지)
     * @param {Object}
     * @returns {boolean}}
     */
    isAllowImg: function(fileObj) {
        var _ext = CommonJS.File.getFileExt(fileObj);
        var _arrAllowExt = ['jpg', 'jpeg', 'gif', 'png'];
        return _arrAllowExt.includes(_ext);
    },
    /**
     * 파일 용량 단위 구하기
     * @param {number} size
     * @returns {string}
     */
	readableFileSize: function(size) {
		if (size == 0) return '0';
		var _arrDataUnits = ['B', 'kB', 'MB', 'GB', 'TB'];
		var _i = Number(Math.floor(Math.log(size) / Math.log(1024)));		
		return Math.round(size / Math.pow(1024, _i)) + ' ' + _arrDataUnits[i];
    },
    /**
     * 파일 용량 체크
     * @param {Object} fileObj
     * @param {number} maxSize - byte 단위 (예: 1MB = 1024 x 1024 x 1)
     * @returns {boolean}
     */
    isFileMaxSize: function(fileObj, maxSize) {
        return (Number(fileObj.size) > Number(maxSize));
    },
    /**
     * 이미지 미리보기
     * @param {Element} fileElement
     * @param {Element} imgElement
     * @example
     * [JavaScript]
     * CommonJS.File.previewImage(document.getElementById('file'), document.getElementById('img'));
     * 
     * [jQuery]
     * CommonJS.File.previewImage($('#file')[0], $('#img')[0]);
     */
	previewImage: function(fileElement, imgElement) {
        if (window.addEventListener) {
            fileElement.addEventListener('change', fnSrc);
        } else {
            fileElement.attachEvent('onchange', fnSrc);
        }

        function fnSrc(e) {
            if (window.FileReader) {
                // IE 10 이상
                var _reader = new FileReader();
                _reader.onload = function(e) {
                    imgElement.src = e.target.result;
                }
                _reader.readAsDataURL(e.target.files[0]);
            } else {
                // IE 9 이하
                fileElement.select();
                imgElement.setAttribute("src", document.selection.createRange().text);
            }
        }
	}
}

CommonJS.Cookie = {
    /**
     * 쿠키 생성
     * @param {string} name
     * @param {*} value
     * @param {number} expireDay
     */
	setCookie: function(name, value, expireDay) {
		var _date = new Date();
		_date.setDate(_date.getDate() + Number(expireDay));
		document.cookie = name +'='+ escape(value) +'; path=/; expires='+ _date.toGMTString() +';';
    },
    /**
     * 쿠키 얻기
     * @param {string} name
     * @returns {*}
     */
	getCookie: function(name) {
        var _value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return _value? _value[2] : null;
    },
    /**
     * 쿠키 삭제
     * @param {string} name
     */
	deleteCookie: function(name) {
		var _date = new Date();
        _date.setDate(_date.getDate() -1);
        document.cookie = name +'='+ '; path=/; expires='+ _date.toGMTString() +';';
	}
}

CommonJS.Byte = {
    /**
     * Byte 길이 구하기 (UTF8)
     * @param {*} val
     * @returns {number}
     */
    getByteLengthUtf8: function(val) {
        var _char = '';
        var _nCnt = 0;

        for (var i=0; i < val.length; i++) {
        	_char = val.charCodeAt(i);
        	if ( _char > 127 ) {
        		_nCnt += 3;
        	} else {
        		_nCnt ++;
        	}
        }
        return _nCnt;
    },
    /**
     * Byte 길이 구하기 (EUC_KR)
     * @param {*} val
     * @returns {number}
     */
    getByteLengthEucKr: function(val) {
        var _char = '';
        var _nCnt = 0;

        for (var i=0; i < val.length; i++) {
        	_char = val.charCodeAt(i);
        	if ( _char > 127 ) {
        		_nCnt += 2;
        	} else {
        		_nCnt ++;
        	}
        }
        return _nCnt;
    }
}

CommonJS.Escape = {
    /**
     * HTML Escape 처리
     * @param {*} val
     * @returns {string}
     */
    escapeHtml: function(val) {
        var _ret = val.replace('\"', '&quot;').replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
        return _ret;
    },
    /**
     * HTML Unescape 처리
     * @param {*} val
     * @returns {string}
     */
    unescapeHtml: function(val) {
        var _ret = val.replace('&quot;', '\"').replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>');
        return _ret;
    },
    /**
     * JSON Escape 처리
     * @param {*} val
     * @returns {string}
     */
    escapeJson: function(val) {
        var _ret = val.replace('\"', '\\\"').replace('\\"', '\\\\"').replace('/', '\\/');
        return _ret;
    },
    /**
     * JSON Unescape 처리
     * @param {*} val
     * @returns {string}
     */
    unescapeJson: function(val) {
        var _ret = val.replace('\\\"', '\"').replace('\\\\"', '\\"').replace('\\/', '/');
        return _ret;
    }
}

CommonJS.BrowserInfo = {
    /**
     * IE 버전, 브라우저 종류 체크
     * @returns {string}
     */
    checkTypeVersion: function() {
        var _word;
        var _versionOrType = '';
        var _agent = navigator.userAgent.toLowerCase();
        
        // IE 체크
        if (_agent.match(/msie/) || _agent.match(/trident/) || _agent.match(/edge/)) {
            // IE 10 이하
            if (_agent.match(/msie/)) {
                _word = 'msie';
            } else {
                // IE 11
                if (_agent.match(/trident/)) {
                    _word = "trident/.*rv:";
                }
                // IE 12 (Edge)
                else if (_agent.match(/edge/)) {
                    _word = "edge/";
                }
            }
            var _re = new RegExp(_word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
            if (_re.exec(_agent) != null) {
                _versionOrType = RegExp.$1 + RegExp.$2;
            }
        } else {
            if (_agent.match(/chrome/)) _versionOrType = "Chrome";
            else if (_agent.match(/opera/)) _versionOrType = "Opera";
            else if (_agent.match(/firefox/)) _versionOrType = "Firefox";
            else if (_agent.match(/safari/)) _versionOrType = "Safari";
        }

        return _versionOrType;
    },
    /**
     * 모바일 브라우저 여부 체크
     * @returns {boolean}
     */
    isMobile: function() {
        var _filter = 'win16|win32|win64|mac';
        if (navigator.platform) {
            if (_filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    /**
     * Android, iOS 여부 체크
     * @returns {boolean}
     */
    isMobileOs: function() {
        var _ret = {
            Android: navigator.userAgent.match(/Android/i) == null ? false : true,
			iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true
        };
        return _ret;
    }
}

//--------------------------------------------------------------------
// prototype
//--------------------------------------------------------------------
/**
 * IE 12(Edge) / Chrome 41 이하에서 startsWith 사용
 * @param {string} val
 * @returns {boolean}
 */
String.prototype.startsWith = function(val) {
	return this.substring(0, val.length) === val;
}
/**
 * IE 12(Edge) / Chrome 41 이하에서 endsWith 사용
 * @param {string} val
 * @returns {boolean}
 */
String.prototype.endsWith = function(val) {
	return this.substring(this.length - val.length, this.length) === val;
}
/**
 * IE 12(Edge) / Chrome 41 이하에서 includes 사용
 * @param {string} val 
 */
String.prototype.includes = function(val) {
	return this.indexOf(val) != -1;
}
/**
 * IE 14(Edge) / Chrome 47 이하에서 includes 사용 (start는 제외)
 * @param {*} element
 * @returns {boolean} 
 */
Array.prototype.includes = function(element) {
	var i = this.length;
	while (i--) {
		if (this[i] === element) {
			return true;
		}
	}
	return false;
}