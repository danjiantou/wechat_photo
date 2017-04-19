var $prizeBtn = $('#prizeBtn');
$prizeBtn.click(function () {
    getRegisterData();
})
function getRegisterData() {
    var tit = $('.tit').val(),
        describeA = $('.describeA').val(),
        describe = $('.describe').val();
    if (!tit) {
        var val = '请填写推荐名称';
        numVal(val);
        return false;
    }
    if (!describeA) {
        var val = '请填写项目描述';
        numVal(val);
        return false;
    }
    if (!describe) {
        var val = '请填写推荐理由';
        numVal(val);
        return false;
    }else {
        success();
    }
    return {
        userName: userName,
        tit: tit,
        describeA:describeA,
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
    function success(){
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