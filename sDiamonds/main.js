toastLog("请手动打开Auto星钻辅助功能，开启后退出软件再打开");
"auto";
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}
sleep(500);//请求成功权限后，需暂停一下，直接提示单选款则打包apk会闪退

// setScreenMetrics(1080, 2280);

/**
 * 分辨率大小
 */
var deviceSize = getDeviceSize();

main();

function main() {
    if (!click(0, 0)) {
        toastLog("点击测试失败，请尝试重启手机再试！");
        exit();
    }
    log(device.model + "  " + deviceSize.width.toString() + "*" + deviceSize.height.toString() + "    " + app.versionName);
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

var grasp, grasp2, cck, ccy, clickme, cj, wl, ljlq, close3, ggl, zhb, zjd, start;

function sPark() {
    launchApp("三星生活助手");
    className("android.support.v7.app.ActionBar$Tab").desc("发现").findOne().click();
    id("item_quick_access_name").text("星钻乐园").findOne().parent().click();

    let titleBounds = id("lifeservice_actionbar_title_text").text("星钻乐园").findOne().parent().bounds();
    let closeRegion = { region: [titleBounds.right, titleBounds.bottom + 100, 100, 400] };
    let closeRegion1 = { region: [getScaleX(600), getScaleY(2660), 250, getScaleY(300)] };
    var close1 = images.read("./Spark/close1.png");
    var close2 = images.read("./Spark/close2.png");
    var close4 = images.read("./Spark/close42k.png");
    getDeviceConfigure(0);

    var complete = [];
    var lastTime = null;
    let txt = null;
    let clickIndex = 0;
    toastLog("ok");
    sleep(1500);
    while (true) {
        let scr = captureScreen();
        if (text("乐享福利 玩赚星钻").exists()) {
            for (let child of idContains("box12").findOne().children()) {
                txt = child.text();
                if (complete.indexOf(txt) == -1 && child.indexInParent() > 5 && child.clickable()) {
                    log("进入游戏：" + txt);
                    child.click();
                    clickIndex = 0;
                    sleep(3500);
                    break;
                }
                if (complete.length == 6) {
                    toastLog("全部领取完成！");
                    back();
                    sleep(200);
                    back();
                    exit();
                }
                sleep(200);
            }
        } else if (clickImg(scr, ljlq)) {
            log("中了" + textMatches(/\d*星钻/).findOne().text() + "，开始领星钻!");
            sleep(1500);
            textMatches(/领取成功，订单详情请查看|正在火速处理中，查看进度请点击/).waitFor();
            while (!clickImg(captureScreen(), close3)) {
                sleep(200);
            };
        } else if (clickImg(scr, wl, true)) {
            log("领完了");
            if (txt) {
                complete.push(txt);
            }
            back();
            sleep(2000);
            if (!text("乐享福利 玩赚星钻").exists()) {
                back();
                sleep(500);
            }
        } else if (clickImg(scr, grasp) || clickImg(scr, clickme)) {
            log("抽红包");
            sleep(500);//过快点击容易点入广告
        } else if (clickImg(scr, grasp2) || clickImg(scr, cj) || clickImg(scr, start)) {
            log("娃娃机、寻宝、惊喜");
            sleep(3000);
        } else if (clickImg(scr, cck, true)) {
            log("猜猜乐");
            let title = textMatches(/今日(免费.*|机会已用完)/).findOne();
            if (title.text() != "今日机会已用完") {
                try {
                    let tParent = title.parent().parent();
                    tParent.children().forEach(function (child) {
                        if (child.childCount() == 2) {
                            child.child(0).click();
                        }
                    });
                } catch (error) {
                    log(error);
                }
            }
            sleep(500);
        } else if (clickImg(scr, ccy, true)) {
            log("猜成语");
            // let title = textMatches(/第[一二三四五六七八九十]题/).findOne();
            // let tParent = title.parent();
            // tParent.child(tParent.childCount() - 1).click();
            click(getScaleX(300), getScaleY(2200));
            sleep(1500);
        }
        else if (clickImg(scr, ggl, true)) {
            log("刮刮乐");
            swipe(getScaleX(600), getScaleY(1500), getScaleX(700), getScaleY(1500), 200);
            sleep(3500);
        }
        else if (clickImg(scr, zhb, true) || clickImg(scr, zjd, true)) {
            log("砸红包、金蛋");
            let title = textMatches(/今日((免费|剩余).*|机会已用完|次数用完)/).findOne();
            if (title.text() != "今日机会已用完" && title.text() != "今日次数用完") {
                try {
                    let tParent = title.parent();
                    let ok = false;
                    tParent.children().forEach(function (c) {
                        if (c && c.indexInParent() == title.indexInParent() + 1) {
                            for (let cc of c.children()) {
                                if (cc.child(0) && cc.child(0).childCount() == 0) {
                                    cc.click();
                                    // clickIndex++;
                                    ok = true;
                                    // break;
                                    sleep(50);
                                }
                            }
                        }
                    });
                    if (ok) { sleep(3500); }
                } catch (error) {
                    log(error);
                }
            }
            sleep(500);
        }
        else if (id("close").exists() || clickImg(scr, close1) || clickImg(scr, close2) || clickImg(scr, close4) || (!textMatches(/\d*星钻/).exists() && clickImg(scr, close3)) ||
            (!text("登录").exists() && (clickMultiColors(scr, "#FEFEFE", [[-15, -15, "#FEFEFE"], [15, 15, "#FEFEFE"], [14, -14, "#FEFEFE"], [-11, 11, "#FEFEFE"]], closeRegion) ||
                clickMultiColors(scr, "#FEFEFE", [[-15, -15, "#FEFEFE"], [15, 15, "#FEFEFE"], [14, -14, "#FEFEFE"], [-11, 11, "#FEFEFE"]], closeRegion1)))) {
            log("关闭广告");
            let c = id("close").findOne(500);
            if (c) { c.click(); }
            let fq = text("放弃奖励").findOne(1000);
            if (fq) {
                fq.click();
            }
            sleep(500);
        }
        else if (currentPackage() == "com.eg.android.AlipayGphone") {
            log("支付宝返回");
            back();
            sleep(1000);
        }
        else {
            log("未识别界面!!");
            if (lastTime == null) {
                lastTime = new Date();
            }
            else {
                let d = new Date().getTime() - lastTime.getTime();
                if (d > 10000) {
                    if (!idContains("lifeservice_actionbar_title_text").exists()) {
                        toastLog("非星钻乐园相关界面，停止运行！");
                        exit();
                    }
                    toastLog("在未识别界面超过10秒，自动返回");
                    back();
                    lastTime = null;
                }
            }
            scr.recycle();
            sleep(500);
            continue;
        }
        lastTime = null;
        scr.recycle();
        sleep(200);
    }
}


function CheckReward() {
    toastLog("请进入我的奖品界面！");
    id("lifeservice_actionbar_title_text").text("星钻乐园").waitFor();
    idContains("db-content").waitFor();
    getDeviceConfigure(1);
    toastLog("ok");
    while (true) {
        let unclaimed = textMatches(/待领取|账号错误/).findOne(500);
        if (unclaimed) {
            unclaimed.parent().click();
            sleep(200);
            while (!click("去领取"));
            click("去填写");
            sleep(2000);
            while (!clickImg(captureScreen(), ljlq)) {
                sleep(200);
            }
            log("中了" + textMatches(/\d*星钻/).findOne().text() + "，开始领星钻!");
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
    let thread = threads.start(function () { while (true) { click("我要助力"); click("今日已助力"); sleep(1500); } });
    for (let child of id("root").findOne().children()) {
        let txt = child.text();
        log(txt);
        // if (txt.indexOf("签到聚合") == -1) { continue; }
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
                sleep(2000);
                while (true) {
                    let scr = captureScreen();
                    click(getScaleX(700), getScaleY(1350));
                    sleep(1000);
                    if (findMultiColors(scr, "#FAFAFA", [[-22, -12, "#D0D0D0"], [51, 30, "#D0D0D0"], [59, 14, "#FAFAFA"], [97, 54, "#D0D0D0"]])) {
                        log("已签到");
                        sleep(200);
                        break;
                    }
                    sleep(200);
                }
            } else if (txt.indexOf("签到聚合") > -1) {
                text("签到聚合页").waitFor();
                log("签到礼包");
                sleep(1000);
                let img = className("android.view.View").text("0").findOne().parent().parent();
                img.children().find(className("android.widget.Image")).forEach(function (c) {
                    c.click();
                    sleep(500);
                    let t = textMatches(/\+\d+星钻/).findOne(1000);
                    if (t) {
                        log(t.text());
                        click("开心收下");
                    }
                });
                sleep(800);
            } else {
                textMatches(/签到成功.*/).waitFor();
            }
            sleep(500);
            back();
            sleep(500);
        } else {
            sleep(2500);
            textMatches(/助力成功.*|活动已结束/).waitFor();
            sleep(500);
            id("lifeservice_menu_close").findOne().click();
            sleep(1000);
        }
    }
    //停止线程执行
    thread.interrupt();
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
    let p = findImage(scr, img, {
        threshold: 0.9
    });
    if (p) {
        if (!bc) {
            let widht = (p.x + img.getWidth() / 2);
            let height = (p.y + img.getHeight() / 2);
            click(widht, height);
        }
        return true;
    } else {
        return false;
    }
}

function clickMultiColors(scr, firstColor, colors, options, bc) {
    let p = findMultiColors(scr, firstColor, colors, options);
    if (p) {
        log(p);
        if (!bc) {
            click(p.x, p.y);
        }
        return true;
    }
    else {
        return false;
    }
}


function getDeviceConfigure(type) {
    let model = device.model;
    if (1440 == deviceSize.width) {
        if (type == 0) {
            grasp = images.read("./Spark/grasps102k.jpg");
            clickme = images.read("./Spark/clickmes102k.jpg");
            grasp2 = images.read("./Spark/grasp2s102k.jpg");
            cck = images.read("./Spark/ccks102k.jpg");
            ccy = images.read("./Spark/ccys102k.jpg");
            cj = images.read("./Spark/cjs102k.jpg");
            wl = images.read("./Spark/wls102k.jpg");
            ggl = images.read("./Spark/ggl2k.png");
            zhb = images.read("./Spark/zhb2k.png");
            zjd = images.read("./Spark/zjd2k.png");
            start = images.read("./Spark/start2k.png");
        }
        ljlq = images.read("./Spark/ljlqs102k.jpg");
        close3 = images.read("./Spark/close3s102k.jpg");
    }
    else {
        if (type == 0) {
            grasp = images.read("./Spark/grasp.png");
            clickme = images.read("./Spark/click.png");
            grasp2 = images.read("./Spark/grasp2.png");
            cck = images.read("./Spark/cck.png");
            ccy = images.read("./Spark/ccy.png");
            cj = images.read("./Spark/cj.png");
            wl = images.read("./Spark/wl.png");
            ggl = images.read("./Spark/ggl.png");
            zhb = images.read("./Spark/zhb.png");
            zjd = images.read("./Spark/zjd.png");
            start = images.read("./Spark/start.png");
        }
        ljlq = images.read("./Spark/ljlq.png");
        close3 = images.read("./Spark/close3.png");
    }
}

/**
 * 获取屏幕分辨率
 */
function getDeviceSize() {
    let screen = captureScreen();
    return { width: screen.getWidth(), height: screen.getHeight() };
}

/**
 * 获取缩放的x轴坐标
 * @param {x轴值} x 
 */
function getScaleX(x) {
    return x * deviceSize.width / 1440;
}

/**
 * 获取缩放的y轴坐标
 * @param {y轴值} y 
 */
function getScaleY(y) {
    return y * deviceSize.height / 3040;
}
