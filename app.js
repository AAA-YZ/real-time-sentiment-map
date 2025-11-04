// app.js - 基础版本，后续会完善
console.log('🚀 实时舆情气象图项目启动成功！');

// 显示当前时间
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('update-time').textContent = timeString;
}

// 每秒钟更新时间
setInterval(updateTime, 1000);
updateTime(); // 立即执行一次

// 这里后面会添加百度地图和粒子效果代码
console.log('📍 等待集成百度地图API...');