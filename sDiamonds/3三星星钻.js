"auto";
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
sleep(500);//请求成功权限后，需暂停一下，直接提示单选款则打包apk会闪退

setScreenMetrics(1080, 2280);
main();

function main() {
    if(!click(200,200)){
        toastLog("点击测试失败，请尝试重启手机再试！");
        exit();
    }
    var num = dialogs.singleChoice("请选择执行动作", ["星钻乐园", "星钻助手（需安装对应软件）", "我的奖品领取"], 0);
    switch (num) {
        case 0:
            sPark();
            break;
        case 1:
            sDiamondTool();
            break;
        case 2:
            CheckReward();
            break;
    }
}

function sPark() {
    launchApp("三星生活助手");
    className("android.support.v7.app.ActionBar$Tab").desc("发现").findOne().click();
    id("item_quick_access_name").text("星钻乐园").findOne().parent().click();
    //toastLog("请进入星钻乐园！");
    id("lifeservice_actionbar_title_text").text("星钻乐园").waitFor();
    var complete = [];
    var ljlq = images.read("./Spark/ljlq.png");
    var close3 = images.read("./Spark/close3.png");
    var wl = images.read("./Spark/wl.png");
    var grasp = images.read("./Spark/grasp.png");
    var close1 = images.read("./Spark/close1.png");
    var close2 = images.read("./Spark/close2.png");
    var clickme = images.read("./Spark/click.png");
    var grasp2 = images.read("./Spark/grasp2.png");
    var cck = images.read("./Spark/cck.png");
    var ccy = images.read("./Spark/ccy.png");
    var cj = images.read("./Spark/cj.png");
    var lastTime = null;
    toastLog("ok");
    while (true) {
        let scr = captureScreen();
        if (text("乐享福利 玩赚星钻").exists()) {
            for (let child of idContains("box12").findOne().children()) {
                let txt = child.text();
                if (complete.indexOf(txt) == -1 && child.indexInParent() > 5 && child.clickable()) {
                    log("进入游戏：" + txt);
                    child.click();
                    complete.push(txt);
                    sleep(3500);
                    break;
                }
                if (complete.length == 6) {
                    toastLog("全部领取完成！");
                    exit();
                }
                sleep(200);
            }
        } else if (clickImg(scr, ljlq)) {
            log("中奖了" + textMatches(/\d*星钻/).findOne().text() + "，开始领星钻!");
            sleep(1500);
            textMatches(/领取成功，订单详情请查看|正在火速处理中，查看进度请点击/).waitFor();
            while (!clickImg(captureScreen(), close3)) {
                sleep(200);
            };
        } else if (clickImg(scr, wl)) {
            log("领完了");
            back();
            sleep(500);
        } else if (clickImg(scr, grasp) || clickImg(scr, cj) || clickImg(scr, clickme)) {
            log("抽红包");
            sleep(100);//过快点击容易点入广告
        } else if (clickImg(scr, grasp2)) {
            log("娃娃机");
            sleep(1000);
        } else if (clickImg(scr, cck, true)) {
            log("猜猜乐");
            click(70, 1800);
            sleep(1000);
        } else if (clickImg(scr, ccy, true)) {
            log("猜成语");
            click(250, 1700);
            sleep(1000);
        } else if (clickImg(scr, close1) || clickImg(scr, close2)) {
            log("关闭广告");
            let fq = text("放弃奖励").findOne(1000);
            if (fq) {
                fq.click();
            }
            sleep(500);
        } else {
            log("未识别界面!!");
            if (lastTime == null) {
                lastTime = new Date();
            }
            else{
                let d = new Date().getTime() - lastTime.getTime();
                if (d > 10000) {
                    if(!idContains("lifeservice_actionbar_title_text").exists()){
                        toastLog("非星钻乐园相关界面，停止运行！");
                        exit();
                    }
                    toastLog("在未识别界面超过10秒，自动返回");
                    back();
                    lastTime = null;
                }
            }
        }
        scr.recycle();
        sleep(100);
    }
}


function CheckReward() {
    toastLog("请进入我的奖品界面！");
    id("lifeservice_actionbar_title_text").text("星钻乐园").waitFor();
    idContains("db-content").waitFor();
    var ljlq = images.read("./Spark/ljlq.png");
    var close3 = images.read("./Spark/close3.png");
    toastLog("ok");
    while (true) {
        let unclaimed = text("待领取").findOne(500);
        if (unclaimed) {
            unclaimed.parent().click();
            sleep(200);
            while (!click("去领取"));
            sleep(2000);
            while (!clickImg(captureScreen(), ljlq)) {
                sleep(200);
            }
            log("中奖了" + textMatches(/\d*星钻/).findOne().text() + "，开始领星钻!");
            sleep(1500);
            text("领取成功，订单详情请查看").waitFor();
            while (!clickImg(captureScreen(), close3)) {
                sleep(200);
            }
        }
        if (className("android.view.View").text("没有更多了！").exists()) {
            toastLog("奖品检查完成！");
            exit();
        }
        className("android.webkit.WebView").text("我的奖品").findOne().scrollForward();
        sleep(100);
    }
}

function Convert(type) {
    switch (type) {
        case "我爱猜成语":
            break;
        case "天天抽红包":
            break;
        case "寻宝赢大奖":
            break;
        case "好运猜猜乐":
            break;
        case "开心娃娃机":
            break;
        case "幸运扭蛋机":
            break;
    }
}

function Playing(type) {
    text("乐享福利 玩赚星钻").waitFor();
    for (let child of idContains("box12").findOne().children()) {
        let txt = child.text();
        if (child.indexInParent() > 5 && child.clickable()) {
            log("进入游戏：" + txt);
            child.click();
            sleep(3500);
        }
        sleep(200);
    }
}

function sDiamondTool() {
    launchApp("星钻助手");
    for (let child of id("root").findOne().children()) {
        let txt = child.text();
        log(txt);
        //if(txt!="三星浏览器能赠能花签到"){continue;}
        child.click();
        if (txt.indexOf("签到") > -1) {
            log("签到");
            sleep(1500);
            if (txt.indexOf("三星浏览器") > -1) {
                log("浏览器签到");
                let choiceBrowser = text("三星浏览器").findOne(1000);
                if (choiceBrowser) {
                    choiceBrowser.parent().click();
                }
                let sign = images.read("./Spark/sqiandao.png");
                let ysign = images.read("./Spark/syiqiandao.png");
                while (true) {
                    let scr = captureScreen();
                    if(clickImg(scr, sign)){
                        log("点击签到");
                    }
                    sleep(1000);
                    if (findImage(scr, ysign, { threshold: 0.9 })) {
                        log("已签到");
                        sleep(200);
                        break;
                    }
                    sleep(200);
                }
            } else if (text("签到聚合页").exists()) {
                log("签到礼包");
                sleep(1000);
                let img = className("android.view.View").text("0").findOne().parent().parent();
                img.children().find(className("android.widget.Image")).forEach(function (c) {
                    c.click();
                    sleep(500);
                });
                sleep(1000);
            } else {
                textMatches(/签到成功.*/).waitFor();
            }
            sleep(500);
            back();
            sleep(500);
        } else {
            sleep(2500);
            textMatches(/我要助力|今日已助力/).findOne().click();
            sleep(500);
            textMatches(/助力成功.*|活动已结束/).waitFor();
            id("lifeservice_menu_close").findOne().click();
            sleep(1500);
        }
    }
    back();
    toastLog("全部领取完毕，请注意浏览器签到及最后三个礼包领取情况！");
}


/**
 * 图中找图，并点击
 * @param {源图} scr 
 * @param {待查找的目标图} img 
 * @param {是否点击，默认点击，true不点击} bc 
 */
function clickImg(scr, img, bc) {
    //截图并找图
    var p = findImage(scr, img, {
        threshold: 0.9
    });
    if (p) {
        if (!bc) {
            click(p.x + img.getWidth() / 2, p.y + img.getHeight() / 2);
        }
        return true;
    } else {
        return false;
    }
}