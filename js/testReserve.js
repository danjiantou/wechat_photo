/**
 * Created by renhao on 2017/2/16.
 */
~(function () {
    (function () {
        var filter = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var $btn = $('.btn');
        $btn.click(function () {
            getRegisterData();
        })
        function getRegisterData() {
            var $error = $('.error');
            var username = $('.username').val(),
                tel = $('.tel').val(),
                email = $('.email').val(),
                describes = $('.describes').val();

            if (!describes) {
                $error.html("*请填写您的推荐理由");
                return false;
            }
            if (!username) {
                $error.html("*请填写用户名称");
                return false;
            }
            if (!/^1+\d{10}$/.test(tel)) {
                $error.html("*您输入的手机号码格式不正确，请重新输入");
                return false;
            }
            if (!filter.test(email)) {
                $error.html("*请填写正确email地址");
                return false;
            }

            $error.html("");


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


            $error.html("");
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

                    showHide(data);
                    var timer = '';
                    clearTimeout(timer);

                    timer = setTimeout(function () {

                        location.href = "/Selection/";

                    }, 2000);

                }
            });



//            return {
//                username: username,
//                tel: tel,
//                email: email,
//                describes: describes,
//            }
        }
    })();

})()