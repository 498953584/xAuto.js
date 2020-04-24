"auto";

main();
//while(click("电子单程票"));
//toastLog("11");
function main() {
    app.launch("com.chinasofti.shanghaihuateng.metroapp");
    waitForActivity("com.chinasofti.shanghaihuateng.metroapp.main.MainActivity");
    var i = 0;

    while (i < 5) {
        //var text = id("tv_piaojia").findOne().getText();
        id("ll_main_buy_ticket").findOne().click();
        //toastLog("2"+i);
        id("tv_qishizhan").findOne().click();
        sleep(500);
        //waitForActivity("com.chinasofti.shanghaihuateng.metroapp.ticket.SelStationListActivity")
        id("listViewStation").findOne().children()[0].click();
        // id("textViewStationName").findOne().parent().click();
        id("tv_zhongdianzhan").findOne().click();
        //click(300,386,1080,551);
        sleep(500);
        id("listViewStation").findOne().children()[0].click();
        id("bt_buy_ticket").findOne().click();
        id("btn_ok").findOne().click();
        id("title").className("android.widget.TextView").text("我的").findOne().parent().click();
        while (!click("电子单程票"));
        id("btn_order_return").findOne().click();
        id("tv_right").findOne().click();
        id("btn_ok").findOne().click();
        //toastLog(i);
        i = i + 1;
    }
    sleep(100);
    back();
    sleep(50);
    back();
}