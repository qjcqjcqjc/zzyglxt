(function () {
    require(['jquery','wangEditor','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','dictUtil'],
        function (jquery,wangEditor,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,dictUtil) {
            var type = isUpdate() ? "put" : "post" ;

            uploadImg.init();

            var showStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);

            $("#cancel").unbind().on('click',function () {
                var url = "/industrialdevelop/style";
                orange.redirect(url);
            });


            $("#btn_insert").unbind().on('click',function () {
                var baseStyleEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/industrialdevelop/base-style";
                    operateMessage = "上传基地风采成功";
                    baseStyleEntity = {
                        itemcode : stringUtil.getUUID(),
                        status : showStatus[1].id,
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/trav/trav/updTrav";
                    baseStyleEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新旅游景点成功";
                }

                fileUtil.handleFile(isUpdate(), baseStyleEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,baseStyleEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            var url = "/industrialdevelop/style";
                            orange.redirect(url);
                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.error(data.msg);
                    }
                },false,true,type);

            });


            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    var img = tempdata.filePath;
                    // console.log(tempdata);
                    // var imgName=tempdata.fileName;
                    uploadImg.setImgSrc(img);
                    // $("#upload_file").attr("value",imgName);

                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            };
        })
})();
