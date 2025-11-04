// app.js - 修复版本
console.log('🚀 实时舆情气象图项目启动成功！');

// 显示当前时间
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const updateTimeElement = document.getElementById('update-time');
    if (updateTimeElement) {
        updateTimeElement.textContent = timeString;
    }
}

// 每秒钟更新时间
setInterval(updateTime, 1000);
updateTime(); // 立即执行一次

// 检查百度地图API是否加载成功
function checkBMapLoaded() {
    console.log('📍 检查百度地图API状态...');
    
    if (typeof BMap === 'undefined') {
        console.error('❌ 百度地图API未加载，可能的原因：');
        console.error('1. AK无效或被禁用');
        console.error('2. 网络连接问题');
        console.error('3. 白名单配置错误');
        
        // 显示错误信息给用户
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #ff4d4f;">
                    <h2>❌ 百度地图加载失败</h2>
                    <p>可能的原因：</p>
                    <ul style="text-align: left; display: inline-block;">
                        <li>API密钥(AK)无效或已被禁用</li>
                        <li>域名未添加到白名单</li>
                        <li>网络连接问题</li>
                        <li>浏览器缓存问题</li>
                    </ul>
                    <p style="margin-top: 20px;">
                        <small>请检查控制台(Console)获取详细错误信息</small>
                    </p>
                </div>
            `;
        }
        return false;
    }
    
    console.log('✅ 百度地图API加载成功');
    return true;
}

// 初始化地图
function initMap() {
    console.log('🗺️ 开始初始化地图...');
    
    // 先检查API是否加载成功
    if (!checkBMapLoaded()) {
        return;
    }
    
    try {
        // 初始化地图
        var map = new BMap.Map('map-container');
        console.log('✅ 地图实例创建成功');
        
        // 创建中心点（中国中心）
        var point = new BMap.Point(104.0, 35.0);
        
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 5);
        console.log('✅ 地图中心点和级别设置成功');
        
        // 启用滚轮缩放
        map.enableScrollWheelZoom(true);
        console.log('✅ 滚轮缩放启用成功');
        
        // 添加控件
        map.addControl(new BMap.NavigationControl());
        console.log('✅ 导航控件添加成功');
        
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
        console.log('✅ 标题覆盖物添加成功');
        
        // 添加测试标记点
        addTestMarkers(map);
        
        console.log('✅ 百度地图初始化成功！AK配置正确');
        
    } catch (error) {
        console.error('❌ 地图初始化失败:', error);
        
        // 显示具体错误信息
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #ff4d4f;">
                    <h2>❌ 地图初始化失败</h2>
                    <p>错误信息: ${error.message}</p>
                    <p>请检查百度地图AK配置和控制台错误信息</p>
                </div>
            `;
        }
    }
}

// 添加测试标记点
function addTestMarkers(map) {
    const cities = [
        { name: '北京', lng: 116.404, lat: 39.915 },
        { name: '上海', lng: 121.475, lat: 31.235 },
        { name: '广州', lng: 113.264, lat: 23.129 },
        { name: '深圳', lng: 114.057, lat: 22.543 }
    ];
    
    cities.forEach(city => {
        const point = new BMap.Point(city.lng, city.lat);
        const marker = new BMap.Marker(point);
        map.addOverlay(marker);
        
        const infoWindow = new BMap.InfoWindow(`
            <div style="min-width: 200px;">
                <h4>${city.name}</h4>
                <p>测试标记点</p>
                <p>经度: ${city.lng}</p>
                <p>纬度: ${city.lat}</p>
            </div>
        `);
        
        marker.addEventListener('click', function() {
            this.openInfoWindow(infoWindow);
        });
    });
    
    console.log('✅ 测试标记点添加完成');
}

// 页面加载后的初始化
window.onload = function() {
    console.log('📄 页面DOM加载完成');
    
    // 延迟执行，确保百度地图API有足够时间加载
    setTimeout(() => {
        initMap();
    }, 1000);
};

// 全局错误捕获
window.addEventListener('error', function(e) {
    console.error('🌐 全局错误捕获:', e.error);
});
