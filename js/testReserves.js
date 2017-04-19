var filter = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
var $btn = $('.btn');
$btn.click(function () {
    getRegisterData();
})
function getRegisterData() {
    var username = $('.username').val(),
        tel = $('.tel').val(),
        email = $('.email').val(),
        describes = $('.describes').val();
    if (!describes) {
        var val = "*请填写您的推荐理由";
        numVal(val);
        return false;
    }
    if (!username) {
        var val = "*请填写用户名称";
        numVal(val);
        return false;
    }
    if (!/^1+\d{10}$/.test(tel)) {
        var val = "*您输入的手机号码不正确";
        numVal(val);
        return false;
    }
    if (!filter.test(email)) {
        var val = "*请填写正确email地址";
        numVal(val);
        return false;
    }

    var ReserveArr = new Array();
    //var

    $("input[name='ReserveID']").each(function () { //遍历table里的全部checkbox
        if ($(this).attr("checked")) {
            var rs = $(this).val();
            ReserveArr.push(rs);
        }
    });

    var ReserveTs = ReserveArr.join(',');
    if (ReserveTs==null)
        ReserveTs = '';
    $.ajax({
        type: 'post',
        //                    async: false,
        url: '/Selection/reserve/',
        dataType: 'text',
        data: {
            Name: username,
            Mobile: tel,
            Email: email,
            Content: describes,
            ReserveTs: ReserveTs,
            CreateUCode: $('#hid_ucode').val()
        },
        success: function (data) {
            successful(data);
        }
    });


};

function successful(data) {
    var $writeMessage = $('.writeMessage');
    $writeMessage.show().fadeIn();
    $writeMessage.addEventListener('touchmove',function (event) {
        event.preventDefault();
    });
    $writeMessage.find('.content').attr("style","background:url(/Content/Selection/images/error2.png) no-repeat center;background-size:66%");
    console.log($writeMessage.find('.content'));
    $writeMessage.find('p').html(data);
    $writeMessage.click(function () {
        $writeMessage.fadeOut();
        window.location.href = "/Selection/Review";
    });

};
function numVal(val) {
    var $writeMessage = $('.writeMessage');
    $writeMessage.show().fadeIn();
    $writeMessage.find('p').html(val);
    $writeMessage.click(function () {
        $writeMessage.fadeOut();
    });
}
