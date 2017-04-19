/**
 * Created by renhao on 2017/2/10.
 */
var maxCount = 10;
var loadFileCur = 0;
var uploadPhoto = [];
$(function(){
    $('html').css('font-size', document.documentElement.clientHeight / document.documentElement.clientWidth < 1.5 ? document.documentElement.clientHeight / 603 * 312.5 + '%' : document.documentElement.clientWidth / 375 * 312.5 + '%');

    new Swiper('.fileList-swiper', {
        slidesPerView: 'auto',
        freeMode: true,
        observer: true,
    });

    $('.addfileBtn input[type="file"]').on('change', function(f){
        var selectFile = f.target.files||f.dataTransfer.files;
        if (selectFile.length > 0) {
            loadFileCur = 0;
            createImage(selectFile);
        }
    });

    $('.fileList-swiper .swiper-wrapper').on('click', '.swiper-slide', function() {
        var delindex = $('.fileList-swiper .swiper-wrapper .swiper-slide').index(this);
        $(this).remove();
        uploadPhoto.splice(delindex, 1);
        if (uploadPhoto.length < maxCount) {
            $('.addfileBtn').show();
            $('.fileList-swiper').css('width', '3.4rem');
        }
    });
});

function createImage(file) {
    if (loadFileCur >= file.length || uploadPhoto.length >= maxCount) {
        $('.loadmask').fadeOut();
        if (uploadPhoto.length >= maxCount) {
            $('.addfileBtn').hide();
            $('.fileList-swiper').css('width', '7.4rem');
        }
        return;
    }
    $('.loadmask').fadeIn();
    $('.loadtext').html((parseInt(1 / (maxCount - uploadPhoto.length) * 100)) + '%');
    var curFile = file[loadFileCur];
    var mime = {'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp'};
    var fileType = curFile.type;
    if (!fileType) {
        fileType = mime[curFile.name.match(/\.([^\.]+)$/i)[1]];
    }
    if (!/image.(png|jpg|jpeg|bmp)/.test(fileType)) {
        alert('选择的文件类型不是图片');
        loadFileCur ++;
        createImage(file);
        return;
    }
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(curFile);
    } else if (window.URL!=undefined) {
        url = window.URL.createObjectURL(curFile);
    } else if (window.webkitURL!=undefined) {
        url = window.webkitURL.createObjectURL(curFile);
    }
    var image = new Image();
    image.src = url;
    image.onload = function() {
        uploadPhoto.push(drawImage(image, fileType,  1000, 1000));
        $('.fileList-swiper .swiper-wrapper').append('<div class="swiper-slide"><span style="background-image:url(' + drawImage(image, fileType,  200, 200) + ')"></span></div>');
        loadFileCur ++;
        createImage(file);
    }
}

function drawImage(img, type, maxWidth, maxHeight) {
    var sw = img.width;
    var sh = img.height;
    var tw = img.width;
    var th = img.height;
    var scale = (tw / th).toFixed(2);
    if (sw > maxWidth) {
        sw = maxWidth;
        sh = Math.round(sw / scale);
    }
    if (sh > maxHeight) {
        sh = maxHeight;
        sw = Math.round(sh * scale);
    }
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = sw;
    canvas.height = sh;
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, sw, sh);
    return canvas.toDataURL(type);
    ctx.clearRect(0, 0, tw, th);
    canvas.width = 0;
    canvas.height = 0;
    canvas = null;
};

function uploadData() {
    if (uploadPhoto.length < 1) {
        alert('请选择上传图片');
        return;
    } else {
        var fd = new FormData();
        //key,value 表单的书属性,值
        fd.append(key,value);

        for (var i = 0; i < uploadPhoto.length; i++) {
            var dataURI = uploadPhoto[i];
            var mimeString =  dataURI.split(',')[0].split(':')[1].split(';')[0];
            var byteString = atob(dataURI.split(',')[1]);
            var arrayBuffer = new ArrayBuffer(byteString.length);
            var intArray = new Uint8Array(arrayBuffer);
            for (var y = 0; y < byteString.length; y += 1) {
                intArray[y] = byteString.charCodeAt(y);
            }
            var blob = new Blob([intArray], { type:  mimeString });
            fd.append('file', blob);
        }

        $.ajax({
            type: 'POST',
            url: 'http://192.168.0.130:8085/Selection/Demo',
            data: fd,
            processData: false,
            contentType: false,
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        console.log('进度', percentComplete);
                    }
                }, false);
                return xhr;
            }
        }).done(function (res) {
            console.error('成功：' + res);
        }).fail(function (err) {
            console.error(err);
        });
    }
}
