var $prizeBtn = $('#prizeBtn');
$prizeBtn.click(function () {
    getRegisterData();
})
function getRegisterData() {
    var userName = $('.userName').val(),
        tel = $('.tel').val(),
        name = $('.name').val(),
        gameName = $('.gameName').val(),
        prizeName = $('.prizeName').val
        makePrize = $('.makePrize').val(),
        address = $('.address').val(),
        describes = $('.describes').val(),
        describe = $('.describe').val();
    if (!userName) {
        var val = '请输入您的姓名';
        numVal(val);
        return false;
    }
    if (!/^\d{11}$/.test(tel)) {
        var val = '您输入的手机号码有误';
        numVal(val);
        return false;
    }
    if (gameName && !gameName) {
        var val = '请输入当前赛事名称';
        numVal(val);
        return false;
    }
    if (prizeName && !prizeName) {
        var val = '请输入您的获奖作品';
        numVal(val);
        return false;
    }
    if (makePrize && !makePrize) {
        var val = '请输入您的获奖名称"';
        numVal(val);
        return false;
    }
    if (!address) {
        var val = '请输入您的工作单位';
        numVal(val);
        return false;
    }
    if (describes && !describes) {
        var val = '请填写备注信息';
        numVal(val);
        return false;
    }
    if (!describe) {
        var val = '请填写自我描述内容';
        numVal(val);
        return false;
    }else {
        var val = '成功了'
        success(val);
    }
    return {
        userName: userName,
        tel: tel,
        gameName: gameName,
        prizeName: prizeName,
        makePrize: makePrize,
        address:address,
        describes: describes,
        describe: describe,
    }
    function numVal(val) {
        var $writeMessage = $('.writeMessage');
        $writeMessage.show().fadeIn();
        $writeMessage.find('p').html(val);
        $writeMessage.click(function () {
            $writeMessage.fadeOut();
        });
    }
    function success(val){
        var $writeMessage = $('.writeMessage');
        $writeMessage.find('.content').css({
            "background":"url('../zhaoweb/images/enroll-ok.png') no-repeat",
            "background-position":"center",
            "top":"",
            "background-size": "66%",
            "height":"6rem"
        });
        $writeMessage.show().fadeIn();
        $writeMessage.click(function () {
            $writeMessage.hide();
            window.location.href="../zhaoweb/default.html";
        })
    }
}