(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','urlUtil','wangEditor',"distpicker"],
        function ($,ajaxUtil,stringUtil,uploadImg,urlUtil, wangEditor,distpicker) {

            var url = "/industrialdevelop/chi-med";

            var pathUrl = "/userLogin";

            var orgType = "produce";

            var itemcode = stringUtil.getUUID();

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

            const editor = new wangEditor('#div1');
            // 或者 const editor = new E( document.getElementById('div1') )
            //菜单配置
            editor.config.menus = [
                'head',
                'bold',
                'fontSize',
                'fontName',
                'italic',
                'underline',
                'strikeThrough',
                'indent',
                'lineHeight',
                'foreColor',
                'backColor',
                'link',
                'list',
                'justify',
                'image',
                'table',
                'splitLine',
                'undo',
                'redo'
            ];
            //取消粘贴后的样式
            editor.config.pasteFilterStyle = false;
            //不粘贴图片
            editor.config.pasteIgnoreImg = true;
            //隐藏上传网络图片
            editor.config.showLinkImg = false;
            editor.config.uploadImgShowBase64 = true;
            editor.create();
            editor.txt.html('<p></p>');

            $("#div1").on("input propertychange", function() {
                var textNUm=editor.txt.text();
                var str;
                if(textNUm.length>=100000){
                    str = textNUm.substring(0,10000)+"";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                 //将替换的值赋值给当前对象
                }
            });

            $("#cancelBtn").click(function () {
                window.history.back();
            });

            function generateParam(){
                var param = {};
                param.name = $("#name").val();
                param.peoduceType = $("#peoduceType").val();
                param.peoduceDrug = $("#peoduceDrug").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val()
                param.addressCity = $("#addressCity").val()
                param.addressCountry = $("#addressCountry").val()
                param.address = $("#address").val()
                param.intruduce = $(".w-e-text").html();
                param.type = orgType;
                param.itemcode = itemcode;
                return param;
            }

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "——";
                param.itemcode = itemcode;
                if (uploadImg.isUpdate()){
                    ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],"undefined","undefined")
                }

                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect("/produce_add");
                    }else {
                        alert(data.msg);
                    }
                },true,"123",type);
                return false;
            });

            $("#submitBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "1";
                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        window.location.href = pathUrl;
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            });

            var init = function () {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#peoduceType").val(tempdata.peoduceType);
                    $("#peoduceDrug").val(tempdata.peoduceDrug);
                    $("#contacts").val(tempdata.contacts);
                    $("#distpicker").distpicker({
                        province: tempdata.addressPro,
                        city: tempdata.addressCity,
                        district: tempdata.addressCountry
                    });
                    $("#address").val(tempdata.address);
                    $("#phone").val(tempdata.phone);
                    $(".w-e-text").html(tempdata.intruduce);
                    itemcode = tempdata.itemcode
                    uploadImg.setImgSrc(tempdata.filePath)
                }else {
                    $("#distpicker").distpicker();
                }
                init = function () {}
            };
            init();


            function isUpdate() {
                return (urlUtil.getFullUrl().indexOf("/main#") != -1)
            }
    })
})();

