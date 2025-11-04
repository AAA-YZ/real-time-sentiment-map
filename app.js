// app.js - 基础版本，后续会完善
// 在app.js中替换为以下代码测试
function initMap() {
    // 初始化地图
    var map = new BMap.Map('map-container');
    
    // 创建中心点（中国中心）
    var point = new BMap.Point(104.0, 35.0);
    
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(point, 5);
    
    // 启用滚轮缩放
    map.enableScrollWheelZoom(true);
    
    // 添加控件
    map.addControl(new BMap.NavigationControl());
    
    // 添加标题
    var titleOverlay = new BMap.Label('🎉 百度地图API连接成功！实时舆情气象图项目', {
        position: point,
        offset: new BMap.Size(0, -100)
    });
    titleOverlay.setStyle({
        backgroundColor: 'rgba(255,255,255,0.9)',
        border: '2px solid #1890ff',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '16px',
        color: '#1a1a1a'
    });
    map.addOverlay(titleOverlay);
    
    console.log('✅ 百度地图初始化成功！AK配置正确');
}

// 页面加载后执行
window.onload = initMap;
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
