var $prizeBtn = $('#prizeBtn');
$prizeBtn.click(function () {
    getRegisterData();
})
function getRegisterData() {
    var userName = $('.userName').val(),
        tel = $('.tel').val(),
        address = $('.address').val(),
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
    if (!address) {
        var val = '请输入您的工作单位';
        numVal(val);
        return false;
    }
    if (!describe) {
        var val = '请填写备注信息';
        numVal(val);
        return false;
    }else {
        var val = '成功了'
        success(val);
    }
    return {
        userName: userName,
        tel: tel,
        address:address,
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
            "background":"url('/Content/Selection/Review/images/enroll-ok.png') no-repeat",
            "background-position":"center",
            "top":"",
            "background-size": "66%",
            "height":"6rem"
        });
        $writeMessage.show().fadeIn();
        $writeMessage.click(function () {
            $writeMessage.hide();
            window.location.href="/Selection/Review/";
        })
    }
}
