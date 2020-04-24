/**检查手机是否开启无障碍服务 */
auto();
//setScreenMetrics(1080, 1920);
var Automator = require("./Automator.js");
var automator = Automator();
/**请求截图权限*/
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
// /sdcard/脚本/head.png    tencent/QQfile_recv/20190309143523.png
var myHead = //images.read("/sdcard/脚本/head.png");
    images.read("/sdcard/脚本/hread.png");
//记录qq号
var qq = [];
//第一次运行QQ，第二运行分身应用
var qqName = ["双开QQ", "QQ"];

Main();
//qqZan();

function Main() {
    //qq.push("498953584");
    for (var i = 0; i < 1; i++) {
        OpenQQ(i);
        while (ChangeQQ()) {
            waitForActivity("com.tencent.mobileqq.activity.SplashActivity", 200);
            QzoneFeeds();
            //WeSee();
        }
    }
}

function OpenQQ(n) {
    if (n == 0) {
        app.launch("com.tencent.mobileqq");
        waitForActivity("com.tencent.mobileqq.activity.SplashActivity", 200);
    } else {
        app.launch("dkplugin.lkn.qjs");
        waitForActivity("com.bly.chaosapp.activity.SplashActivity");
    }
    //launchApp("QQ");
    //text("请选择要使用的应用").waitFor();
    //desc(qqName[n]).findOne().parent().parent().click();
    log("等待打开QQ界面");
    //waitForActivity("com.tencent.mobileqq.activity.SplashActivity", 200);
}

/**
 * 访问空间动态
 */
function QzoneFeeds() {
    log("点击动态");
    //while (!boundsInside(720, 1700, device.width, device.height).text("动态").findOne().selected() && !click("动态"));
    text("动态").findOne().parent().click();
    sleep(100);
    //toastLog("rt");
    //while (!click("好友动态"));
    id("qzone_feed_entry").findOne().click();
    log("进入好友动态");
    descMatches(/[浏览|热度].*/).waitFor();
    sleep(500);
    //waitForActivity("cooperation.qzone.QzoneFeedsPluginProxyActivity", 200);
    var point = null;
    while (!className("ImageView").desc("转发").exists()) {
        //循环查找头像相同的
        point = findImage(captureScreen(), myHead, {
            region: [0, 200, 200, 2000],
            threshold: 0.9
        });
        //toastLog(point);
        if (point) {
            automator.click(point.x + 800, point.y + 100);
            sleep(500);
        }
        //log("zhaijj");
        className("android.widget.AbsListView").findOne().scrollForward();
        sleep(800);
        //toastLog("hhh")
    }
    //press(point.x + 900, point.y + 100, 100);
    //toastLog(point.x + "  " + point.y);
    //className("android.view.View").descMatches(/[浏览|热度].*/).findOne().parent().click();

    className("ImageView").desc("转发").waitFor();
    //while (!click("返回"));
    id("ivTitleBtnLeft").findOne(1000).click();
    sleep(100);
    //while (!click("动态"));
    id("ivTitleBtnLeft").findOne(1000).click();
    sleep(500);
    log("访问动态完成");
}

/**
 * 访问微视
 */
function WeSee() {
    while (!boundsInside(720, 1700, device.width, device.height).text("动态").findOne().selected() && !click("动态"));
    sleep(100);
    log("开始好友微视");
    if (text("微视").exists()) {
        while (!click("微视"));
        sleep(500);
        while (!className("TextView").text("今̶生̶何̶求̶ۖิۣۖ雄ิ").exists()) {
            className("android.widget.AbsListView").findOne().scrollForward();
            sleep(200);
            click("加载更多");
        }
        //className("TextView").text("今̶生̶何̶求̶ۖิۣۖ雄ิ").waitFor();
        className("TextView").text("今̶生̶何̶求̶ۖิۣۖ雄ิ").findOne().parent().parent().child(2).child(0).click();
        sleep(2500);
        //while (!click("动态"));
        //id("ivTitleBtnLeft").text("动态").findOne(1000).click();
        back();
        id("ivTitleName").text("微视").waitFor();
        //while (activity("com.tencent.biz.qqstory.storyHome.QQStoryMainActivity").exists() &&
        // !id("ivTitleName").text("好友微视").exists()) {
        //    back();
        //    sleep(200);
        //}
        sleep(200);
        back();
        sleep(500);
        log("访问好友微视完成");
    }
}

function qqZan() {
    app.startActivity({
        //action: "android.intent.action.VIEW",
        //data: "http://mq.vip.qq.com/m/signsport/index",
        data: "mqqapi://card/show_pslcard?src_type=internal&source=sharecard&version=1&uin=498953584",
        //data: "mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=154465481",
        //packageName: "com.tencent.mtt",
        //className: "com.tencent.mtt.MainActivity",
    });
    //text("网页请求打开 QQ，确定打开？").waitFor();
    //text("确定").findOne().click();
    //waitForActivity("com.tencent.mobileqq.activity.QQBrowerActivity",200);
    id("ivTitleName").text("早起走运，成长加倍").waitFor();
    sleep(2000);
    text("打卡").findOne().click();
    toastLog("报名打卡");
    text("10点成长值报名明日打卡").findOne().click();
    text("报名").findOne().click();
    toastLog("打卡完成");
}

/**
 * 切换QQ帐号
 */
function ChangeQQ() {
    log("开始切换账号");
    if (!(text("设置").exists() &&
        text("我的钱包").exists() &&
        text("我的相册").exists())) {
        id("ba1").findOne().click();
    }
    while (false) {
        automator.swipe(200, 1000, 800, 1000, 100);
        //id("conversation_head").findOne().parent().click();
        //className("android.widget.Button").desc("帐户及设置").findOne().click();
        sleep(500);
        if (text("设置").exists() &&
            text("我的钱包").exists() &&
            text("我的相册").exists()) {
            break;
        }
    }

    while (!click("设置"));
    while (!click("帐号管理"));
    sleep(500);
    var qqNum = "";
    var count = 0;
    var qqChilds = id("account").find();
    //log(qqChilds.length);
    for (var i = 0; i < qqChilds.length; i++) {
        qqNum = qqChilds[i].text();
        if (qqNum != "") {
            //log(qqNum);
            if (qqNum !== "498953584" && qq.indexOf(qqNum) === -1) {
                qq.push(qqNum);
                qqChilds[i].parent().parent().click();
                toastLog("开始帐号：" + qqNum + "操作");
                break;
            }
            count++;
        }
    }
    if (count === qqChilds.length) {
        toastLog("所有帐号已切换完成！");
        var q = text("498953584").findOne(500);
        if (q != null) {
            q.parent().parent().click();
        }
        sleep(1000);
        back();
        sleep(100);
        back();
        sleep(100);
        back();
        //app.launch("com.tencent.mobileqq");
        //text("请选择要使用的应用").waitFor();
        //id("app2").findOne().click();
        //desc("QQ").findOne().parent().parent().click();
        //text("498953584").findOne().parent().parent().click();
        return false;
    }
    //等待切换QQ完成
    while (qqNum !== "") {
        if (text(qqNum).findOne().parent().parent().childCount() > 2) {
            break;
        }
        sleep(500);
    }
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(500);
    return true;
}