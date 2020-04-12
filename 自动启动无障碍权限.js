importClass(android.content.Context);
importClass(android.provider.Settings);
importClass(android.content.pm.PackageManager);
if (!checkSelfPermission("android.permission.WRITE_SECURE_SETTINGS")) {
    toastLog("出错了,请查看日志界面内容");
    console.error("\n您没有为autojs/autojsPro授予WRITE_SECURE_SETTINGS权限!\n" + "授权方法: 您需要打开USB调试并连接一台电脑,使用adb命令给autojs授权,命令为:\n" + "adb shell pm grant " + context.getPackageName() + " android.permission.WRITE_SECURE_SETTINGS");
    setClip("adb shell pm grant " + context.getPackageName() + " android.permission.WRITE_SECURE_SETTINGS");
    toastLog("命令已写入到剪贴板");
    exit();
}
if (auto.service == null) {
    //这里没有启动无障碍服务 这里我启动了autojs免费版和pro版的无障碍服务
    try {
        var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        var Services = enabledServices + ":org.autojs.autojspro/com.stardust.autojs.core.accessibility.AccessibilityService" + ":org.autojs.autojs/com.stardust.autojs.core.accessibility.AccessibilityService";
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
        Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
    } catch (e) {
        toastLog("您没有为autojs/autojsPro授予WRITE_SECURE_SETTINGS权限");
        exit();
    }
}
/** * 检查自身是否开启某权限 * @param {string} permission 权限名称 */
function checkSelfPermission(permission) {
    return context.checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED
}